import { Link } from "react-router-dom";
import { Eye, ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

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

                <Card >

                    <div className="register__logo">
                        Shortify
                    </div>

                    <h2>Create Account</h2>

                    <form>

                        <div className="form-group">

                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                            />

                        </div>

                        <div className="form-group">

                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                            />

                        </div>

                        <div className="form-group">

                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                            >
                                <Eye
                                    size={20}
                                    className="password-icon"
                                />
                            </Input>

                        </div>

                        <div className="form-group">

                            <Input
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm your password"
                            >
                                <Eye
                                    size={20}
                                    className="password-icon"
                                />
                            </Input>

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