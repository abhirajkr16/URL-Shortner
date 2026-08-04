import { useState } from "react";

import "./dashboard-navbar.css";

function DashboardNavbar() {

    const [search, setSearch] = useState("");

    return (

        <header className="dashboard-navbar">

            <div className="navbar-search-wrapper">

                <i className="fa-solid fa-magnifying-glass search-icon"></i>

                <input
                    type="text"
                    placeholder="Search by URL or Short Code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="navbar-search"
                />

            </div>

            <div className="navbar-user">

                <div className="user-avatar">

                    A

                </div>

                <div className="user-info">

                    <span className="user-name">
                        Abhiraj Kumar
                    </span>

                    <span className="user-role">
                        Developer
                    </span>

                </div>

                <button className="user-dropdown">

                    <i className="fa-solid fa-chevron-down"></i>

                </button>

            </div>

        </header>

    );

}

export default DashboardNavbar;