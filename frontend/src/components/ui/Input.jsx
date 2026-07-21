import "./Input.css";

function Input({
    label,
    type = "text",
    placeholder = "",
    value,
    onChange,
    required = false,
    children,
}) {
    return (
        <div className="input">

            {label && (
                <label className="input__label">
                    {label}
                </label>
            )}

            <div className="input__wrapper">

                <input
                    className="input__field"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                />

                {children}

            </div>

        </div>
    );
}

export default Input;