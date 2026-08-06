import { useState } from "react";

import UserDropdown from "./UserDropdown";

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

            <UserDropdown />

        </header>

    );

}

export default DashboardNavbar;