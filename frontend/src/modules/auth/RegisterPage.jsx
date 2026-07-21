import { Link } from "react-router-dom";
import { Eye, ArrowLeft } from "lucide-react";

import "./register.css";

function RegisterPage() {
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

                {/* Left */}

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

                {/* Right */}

                <div className="register__card">

                    <div className="register__logo">
                        Shortify
                    </div>

                    <h2>Create Account</h2>

                    <form>

                        <div className="form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Password
                            </label>

                            <div className="password-field">

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                />

                                <Eye
                                    size={20}
                                    className="password-icon"
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>
                                Confirm Password
                            </label>

                            <div className="password-field">

                                <input
                                    type="password"
                                    placeholder="Confirm your password"
                                />

                                <Eye
                                    size={20}
                                    className="password-icon"
                                />

                            </div>

                        </div>

                        <label className="checkbox">

                            <input
                                type="checkbox"
                            />

                            <span>
                                I agree to the
                                <Link to="#">
                                    Terms
                                </Link>
                                {" "}&
                                <Link to="#">
                                    Privacy Policy
                                </Link>
                            </span>

                        </label>

                        <button
                            className="register__button"
                        >
                            Create Account
                        </button>

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

                </div>

            </div>

        </section>
    );
}

export default RegisterPage;