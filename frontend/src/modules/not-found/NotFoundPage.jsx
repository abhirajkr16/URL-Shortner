import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { getToken } from "../../utils/token";
import "./not-found.css";

function NotFoundPage() {
    const navigate = useNavigate();
    const isAuthenticated = !!getToken();

    const destination = isAuthenticated ? "/dashboard" : "/";
    const buttonText = isAuthenticated ? "Go to Dashboard" : "Back to Home";

    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Page Not Found</h2>
                <p className="not-found-text">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Button
                    variant="primary"
                    onClick={() => navigate(destination)}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
}

export default NotFoundPage;
