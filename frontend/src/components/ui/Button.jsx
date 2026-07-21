import "./Button.css";

function Button({
    children,
    type = "button",
    variant = "primary",
    fullWidth = false,
    disabled = false,
    onClick,
}) {
    const className = [
        "button",
        `button--${variant}`,
        fullWidth ? "button--full" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={className}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;