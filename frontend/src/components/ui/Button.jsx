import Loader from "./Loader";
import "./Button.css";

function Button({
    children,
    type = "button",
    variant = "primary",
    fullWidth = false,
    disabled = false,
    loading = false,
    className = "",
    onClick,
}) {
    const combinedClassName = [
        "button",
        `button--${variant}`,
        fullWidth ? "button--full" : "",
        loading ? "button--loading" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={combinedClassName}
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