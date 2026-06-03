import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const BOT_TOKEN = Deno.env.get("BOT_TOKEN")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

Deno.serve(async (req: Request) => {
    console.log("[CRON] Running avatar update job...");
    
    try {
        // Fetch all unique owners who have avatars
        const { data: ownersData } = await supabase.from("user_avatars").select("owner_id");
        const uniqueOwnerIds = [...new Set(ownersData?.map(o => o.owner_id) || [])];

        for (const ownerId of uniqueOwnerIds) {
            // Find next unused avatar
            let { data: avatars } = await supabase
                .from("user_avatars")
                .select("*")
                .eq("owner_id", ownerId)
                .eq("is_used", false)
                .order("id", { ascending: true })
                .limit(1);

            // If all are used, reset cycle and re-fetch
            if (!avatars || avatars.length === 0) {
                await supabase.from("user_avatars").update({ is_used: false }).eq("owner_id", ownerId);
                
                const resetRes = await supabase
                    .from("user_avatars")
                    .select("*")
                    .eq("owner_id", ownerId)
                    .eq("is_used", false)
                    .order("id", { ascending: true })
                    .limit(1);
                avatars = resetRes.data;
            }

            if (!avatars || avatars.length === 0) continue; // Should not happen unless table is empty
            const avatar = avatars[0];

            // Get business connection
            const { data: connections } = await supabase
                .from("connections")
                .select("connection_id")
                .eq("owner_id", ownerId)
                .limit(1);

            if (!connections || connections.length === 0) {
                console.log(`[CRON] No business connection for owner ${ownerId}`);
                continue;
            }
            const connectionId = connections[0].connection_id;

            // Download file from storage
            const { data: fileData, error: downloadErr } = await supabase.storage.from("avatars").download(avatar.storage_path);
            if (downloadErr || !fileData) {
                console.error(`[CRON] Storage download error for ${avatar.storage_path}:`, downloadErr);
                continue;
            }

            // Upload to Telegram using setBusinessAccountProfilePhoto
            const formData = new FormData();
            formData.append("business_connection_id", connectionId);
            formData.append("photo", fileData, "avatar.jpg");

            const url = `https://api.telegram.org/bot${BOT_TOKEN}/setBusinessAccountProfilePhoto`;
            const tgRes = await fetch(url, {
                method: "POST",
                body: formData
            });

            const tgJson = await tgRes.json();
            if (tgJson.ok) {
                console.log(`[CRON] Successfully updated avatar for owner ${ownerId}`);
                // Mark as used
                await supabase.from("user_avatars").update({ is_used: true }).eq("id", avatar.id);
            } else {
                console.error(`[CRON] Telegram API error for owner ${ownerId}:`, tgJson);
            }
        }

        return new Response("Cron executed successfully", { status: 200 });
    } catch (e) {
        console.error("[CRON] Error:", e);
        return new Response("Internal Server Error", { status: 500 });
    }
});
