import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import TooltipPopup from "../../components/ui/TooltipPopup";

import { validateLoginForm } from "./authValidation";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

import {
    saveToken,
    saveUser,
} from "../../utils/token";

import "./login.css";

function LoginPage() {
    const navigate = useNavigate();
    const errorTimeoutRef = useRef(null);

    const [form, setForm] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        return () => {
            if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
        };
    }, []);

    function handleChange(event) {

        const { name, value, type, checked } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: type === "checkbox"
                ? checked
                : value,
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: "",
        }));

    }

    async function handleSubmit(event) {

        event.preventDefault();

        const validationErrors =
            validateLoginForm(form);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            setLoading(true);

            const response = await loginUser(form);

            saveToken(response.data.token);

            saveUser(response.data.user);

            navigate("/dashboard");

        }
        catch (error) {
            setLoading(false);

            console.error(error);

            setErrorMsg(error.response?.data?.message || "Login failed.");
            setShowError(true);

            if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
            errorTimeoutRef.current = setTimeout(() => {
                setShowError(false);
            }, 3000);

        }

    }

    return (
        <section className="login">

            <Link
                to="/"
                className="login__back"
            >
                <ArrowLeft size={18} />
                Back to Home
            </Link>

            <div className="container login__container">

                {/* Left */}

                <div className="login__content">

                    <span className="login__badge">
                        Welcome Back
                    </span>

                    <h1 className="login__title">
                        Sign in to your account
                    </h1>

                    <p className="login__description">
                        Continue managing your shortened URLs,
                        analytics and account from one dashboard.
                    </p>

                    <div className="login__features">

                        <div className="feature-item">
                            ⚡ Fast URL Management
                        </div>

                        <div className="feature-item">
                            📊 Real-time Analytics
                        </div>

                        <div className="feature-item">
                            🔒 Secure Authentication
                        </div>

                    </div>

                </div>

                {/* Right */}

                <Card>

                    <div className="login__logo">
                        Shortify
                    </div>

                    <h2>Sign In</h2>

                    <form onSubmit={handleSubmit} style={{ position: "relative" }}>

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            error={errors.email}
                            disabled={loading}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            error={errors.password}
                            disabled={loading}
                        />

                        <div className="login__options">

                            <label className="checkbox">

                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={form.rememberMe}
                                    onChange={handleChange}
                                    disabled={loading}
                                />

                                Remember Me

                            </label>

                            <Link to="#" className="forgetPass">
                                Forgot Password?
                            </Link>

                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            fullWidth
                        >
                            Sign In
                        </Button>

                        <TooltipPopup
                            show={showError}
                            message={errorMsg}
                            type="error"
                        />

                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <p className="login__footer">

                        Don't have an account?

                        <Link to="/register">
                            Create Account →
                        </Link>

                    </p>

                </Card>

            </div>

        </section>
    );
}

export default LoginPage;