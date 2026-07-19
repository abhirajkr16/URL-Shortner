import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>{" | "}
            <NavLink to="/login">Login</NavLink>{" | "}
            <NavLink to="/register">Register</NavLink>{" | "}
            <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
    );
}

export default Navbar;