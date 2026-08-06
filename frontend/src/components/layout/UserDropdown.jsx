import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUser, clearAuth } from "../../utils/token";

import "./UserDropdown.css";
import ConfirmationModal from "../ui/ConfirmationModal";

function UserDropdown() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const dropdownRef = useRef(null);

    const [user, setUser] = useState(getUser());

    useEffect(() => {

        function handleUserUpdate() {

            setUser(getUser());

        }

        window.addEventListener("user-updated", handleUserUpdate);

        return () => {

            window.removeEventListener("user-updated", handleUserUpdate);

        };

    }, []);

    function handleLogout() {

        clearAuth();

        setShowLogoutModal(false);

        navigate("/login");

    }
    useEffect(() => {

        function handleClickOutside(event) {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {

                setOpen(false);

            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);
    useEffect(() => {

        function handleEscape(event) {

            if (event.key === "Escape") {

                setOpen(false);

            }

        }

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {

            document.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, []);

    return (

        <div
            className="user-dropdown-container"
            ref={dropdownRef}
        >

            <button
                className="user-trigger"
                onClick={() => setOpen(!open)}
            >

                <div className="user-avatar">

                    {user?.fullName?.charAt(0).toUpperCase() || "A"}

                </div>

                <div className="user-info">

                    <span className="user-name">

                        {user?.fullName || "Abhiraj Kumar"}

                    </span>

                </div>

                <i
                    className={`fa-solid fa-chevron-down dropdown-arrow ${open ? "rotate" : ""
                        }`}
                ></i>

            </button>

            {

                open && (

                    <div className="user-menu">

                        <div className="menu-user">

                            <h4>

                                {user?.fullName}

                            </h4>

                            <p>

                                {user?.email}

                            </p>

                        </div>

                        <div className="menu-divider"></div>

                        <button
                            className="menu-item"
                            onClick={() =>
                                navigate("/dashboard/profile")
                            }
                        >

                            <i className="fa-solid fa-user"></i>

                            <span>

                                My Profile

                            </span>

                        </button>

                        <button className="menu-item"
                            onClick={() => navigate("/dashboard/settings")}
                        >

                            <i className="fa-solid fa-gear"></i>

                            <span>

                                Settings

                            </span>

                        </button>

                        <div className="menu-divider"></div>

                        <button
                            className="menu-item"
                            onClick={() => navigate("/dashboard/help")}
                        >

                            <i className="fa-solid fa-circle-question"></i>

                            <span>

                                Help & Support

                            </span>

                        </button>

                        <button
                            className="menu-item"
                            onClick={() => navigate("/dashboard/privacy")}
                        >

                            <i className="fa-solid fa-shield-halved"></i>

                            <span>

                                Privacy Policy

                            </span>

                        </button>

                        <button
                            className="menu-item"
                            onClick={() => navigate("/dashboard/terms")}
                        >

                            <i className="fa-solid fa-file-lines"></i>

                            <span>

                                Terms & Conditions

                            </span>

                        </button>

                        <div className="menu-divider"></div>

                        <button
                            className="menu-item logout"
                            onClick={() => {

                                setOpen(false);

                                setShowLogoutModal(true);

                            }}
                        >

                            <i className="fa-solid fa-right-from-bracket"></i>

                            <span>

                                Logout

                            </span>

                        </button>

                    </div>

                )

            }
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

        </div>

    );

}

export default UserDropdown;