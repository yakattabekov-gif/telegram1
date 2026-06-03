import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-4">Страница не найдена</p>
        <Link to="/" className="text-primary hover:underline">На главную</Link>
      </div>
    </div>
  );
};

export default NotFound;
