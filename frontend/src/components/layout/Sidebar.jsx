import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import useTheme from "../../hooks/useTheme";
import { logout } from "../../services/authService";

import ConfirmationModal from "../ui/ConfirmationModal";
import logo from "../../assets/logo/logoshortify1.png";

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
            path: "/dashboard/analytics",
            icon: "fa-solid fa-chart-simple",
        },
        {
            name: "QR Codes",
            path: "/dashboard/qr-codes",
            icon: "fa-solid fa-qrcode",
        },
    ];
    const navigate = useNavigate();

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    function handleLogout() {

        logout();

        navigate("/");

        setShowLogoutModal(false);

    }

    return (
        <>
            <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>
                <div className="sidebar-brand" onClick={() => navigate("/dashboard")}>

                    <img
                        src={logo}
                        alt="Shortify Logo"
                        className="brand-logo"
                    />

                    {
                        !collapsed && (

                            <h2 className="brand-name">

                                <span style={{ color: "#22c55e" }}>short</span>ify

                            </h2>

                        )
                    }

                </div>
                <div className="sidebar-top">
                    <nav className="sidebar-nav">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/dashboard"}
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
                    {/* <button className="theme-toggle-btn">
                        <i className="fa-solid fa-moon"></i>
                        {!collapsed && <span>Dark Mode</span>}
                    </button> */}

                    <button
                        className="sidebar-logout"
                        onClick={() => setShowLogoutModal(true)}
                    >

                        <i className="fa-solid fa-right-from-bracket"></i>

                        {

                            !collapsed && (

                                <span>

                                    Logout

                                </span>

                            )

                        }

                    </button>
                </div>
            </aside>
            <ConfirmationModal
                isOpen={showLogoutModal}
                title="Logout"
                message="Are you sure you want to logout?"
                confirmText="Logout"
                cancelText="Cancel"
                confirmType="danger"
                onConfirm={handleLogout}
                onCancel={() => setShowLogoutModal(false)}
            />
        </>
    );
}

export default Sidebar;