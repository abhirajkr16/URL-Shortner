import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import TooltipPopup from "../../components/ui/TooltipPopup";
import { validateRegisterForm } from "./authValidation";
import useForm from "../../hooks/useForm";
import { registerUser } from "../../services/authService";

import "./register.css";

function RegisterPage() {
    const navigate = useNavigate();
    const successTimeoutRef = useRef(null);
    const errorTimeoutRef = useRef(null);

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        form,
        errors,
        setErrors,
        handleChange,
    } = useForm({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });

    useEffect(() => {
        return () => {
            if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
            if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
        };
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validateRegisterForm(form);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            setLoading(true);
            const response = await registerUser({
                fullName: form.fullName,
                username: form.username,
                email: form.email,
                password: form.password,
            });

            console.log(response);

            setShowSuccess(true);
            successTimeoutRef.current = setTimeout(() => {
                navigate("/login");
            }, 1800);

        } catch (error) {
            setLoading(false);
            console.log("Full Error:", error);
            console.log("Response:", error.response);
            console.log("Data:", error.response?.data);

            setErrorMsg(error.response?.data?.message || "Registration failed.");
            setShowError(true);

            errorTimeoutRef.current = setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    }

    return (
        <section className="register">

            <Link
                to="/"
                className="register__back"
            >
                <ArrowLeft size={18} />
                Back to Home
            </Link>

            <div className="container register__container">

                {/* Left Side */}

                <div className="register__content">

                    <span className="register__badge">
                        Join Shortify
                    </span>

                    <h1 className="register__title">
                        Create your account
                    </h1>

                    <p className="register__description">
                        Start creating short URLs, monitor analytics,
                        and manage everything from one simple dashboard.
                    </p>

                    <div className="register__features">

                        <div className="feature-item">
                            <span>⚡</span>
                            <p>Fast URL Shortening</p>
                        </div>

                        <div className="feature-item">
                            <span>📊</span>
                            <p>Powerful Analytics</p>
                        </div>

                        <div className="feature-item">
                            <span>🔒</span>
                            <p>Secure Authentication</p>
                        </div>

                    </div>

                </div>

                {/* Right Side */}

                <Card>

                    <div className="register__logo">
                        Shortify
                    </div>

                    <h2>Create Account</h2>

                    <form onSubmit={handleSubmit} style={{ position: "relative" }}>

                        <Input
                            label="Full Name"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            error={errors.fullName}
                            disabled={loading}
                        />
                        <Input
                            label="Username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            error={errors.username}
                            disabled={loading}
                        />

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            error={errors.email}
                            disabled={loading}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            error={errors.password}
                            disabled={loading}
                        />

                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            error={errors.confirmPassword}
                            disabled={loading}
                        />

                        <label className="checkbox">

                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={form.agreeTerms}
                                onChange={handleChange}
                                disabled={loading}
                            />

                            <span>
                                I agree to the
                                <Link to="#">
                                    Terms
                                </Link>
                                {" "} &
                                <Link to="#">
                                    Privacy Policy
                                </Link>
                            </span>

                        </label>

                        {errors.agreeTerms && (
                            <p className="input__error">
                                {errors.agreeTerms}
                            </p>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            fullWidth
                        >
                            Create Account
                        </Button>

                        {showSuccess && (
                            <div className="auth-success-popup">
                                Registration successful! Redirecting...
                            </div>
                        )}

                        <TooltipPopup
                            show={showError}
                            message={errorMsg}
                            type="error"
                        />

                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <p className="register__footer">
                        Already have an account?

                        <Link to="/login">
                            Sign In →
                        </Link>
                    </p>

                </Card>

            </div>

        </section>
    );
}

export default RegisterPage;