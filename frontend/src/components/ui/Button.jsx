import Loader from "./Loader";
import "./Button.css";

function Button({
    children,
    type = "button",
    variant = "primary",
    fullWidth = false,
    disabled = false,
    loading = false,
    onClick,
}) {
    const className = [
        "button",
        `button--${variant}`,
        fullWidth ? "button--full" : "",
        loading ? "button--loading" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={className}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? (
                <>
                    <Loader size="sm" inline />
                    <span style={{ marginLeft: "8px" }}>Loading...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}

export default Button;