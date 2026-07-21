import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { validateRegisterForm } from "./authValidation";

import "./register.css";

function RegisterPage() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });

    const [errors, setErrors] = useState({});



    function handleChange(event) {
        console.log(event.target.name, event.target.value);

        const { name, value, type, checked } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: "",
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validateRegisterForm(form);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.table(form);


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

                    <form onSubmit={handleSubmit}>

                        <Input
                            label="Full Name"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            error={errors.fullName}
                        />

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            error={errors.email}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            error={errors.password}
                        />

                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            error={errors.confirmPassword}
                        />

                        <label className="checkbox">

                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={form.agreeTerms}
                                onChange={handleChange}
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
                            fullWidth
                        >
                            Create Account
                        </Button>

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