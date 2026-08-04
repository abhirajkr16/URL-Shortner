import { NavLink } from "react-router-dom";
import "./sidebar.css";

function Sidebar({ collapsed }) {
    const navItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "fa-solid fa-house",
        },
        {
            name: "My URLs",
            path: "/dashboard/urls",
            icon: "fa-solid fa-link",
        },
        {
            name: "Analytics",
            path: "/analytics",
            icon: "fa-solid fa-chart-simple",
        },
        {
            name: "Profile",
            path: "/dashboard/profile",
            icon: "fa-solid fa-user",
        },
    ];

    return (
        <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>
            <div className="sidebar-top">
                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? "sidebar-link active" : "sidebar-link"
                            }
                        >
                            <span className="sidebar-icon">
                                <i className={item.icon}></i>
                            </span>
                            {!collapsed && (
                                <span className="sidebar-text">{item.name}</span>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="sidebar-footer">
                <button className="theme-toggle-btn">
                    <i className="fa-solid fa-moon"></i>
                    {!collapsed && <span>Dark Mode</span>}
                </button>

                <button className="sidebar-logout">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;