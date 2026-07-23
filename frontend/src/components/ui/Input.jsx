import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import "./Input.css";

function Input({
    label,
    name,
    type = "text",
    placeholder = "",
    value,
    onChange,
    error = "",
    required = false,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
        <div className="input">

            {label && (<label className="input__label">{label}</label>)}

            <div className="input__wrapper">
                <input
                    className={`input__field ${error ? "input__field--error" : ""}`}
                    name={name}
                    type={isPassword ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                />

                {isPassword && (

                    <button
                        type="button"
                        className="input__icon"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                    >
                        {showPassword
                            ? <EyeOff size={20} />
                            : <Eye size={20} />}
                    </button>

                )}

            </div>

            {error && (

                <p className="input__error">
                    {error}
                </p>

            )}

        </div>
    );
}

export default Input;