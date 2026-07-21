import { Link, NavLink } from "react-router-dom";

import NAVIGATION_LINKS from "../../constants/navigation";

import "./Navbar.css";

function Navbar() {
    return (
        <header className="navbar">
            <div className="container navbar__container">

                <Link
                    to="/"
                    className="navbar__logo"
                >
                    Shortify
                </Link>

                <nav className="navbar__navigation">

                    {NAVIGATION_LINKS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar__link navbar__link--active"
                                    : "navbar__link"
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}

                </nav>

                <div className="navbar__actions">

                    <Link
                        to="/login"
                        className="navbar__login"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="navbar__button"
                    >
                        Get Started
                    </Link>

                </div>

            </div>
        </header>
    );
}

export default Navbar;