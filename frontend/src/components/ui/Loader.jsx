import "./Loader.css";

function Loader({ size = "md", inline = false }) {
    const className = [
        "loader-spinner",
        `loader-spinner--${size}`,
        inline ? "loader-spinner--inline" : "",
    ]
        .filter(Boolean)
        .join(" ");

    if (inline) {
        return <span className={className} />;
    }

    return (
        <div className="loader-container">
            <div className={className} />
        </div>
    );
}

export default Loader;
