import { useSearchParams } from "react-router-dom";

import UserDropdown from "./UserDropdown";

import "./dashboard-navbar.css";

function DashboardNavbar() {

    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";

    function handleSearch(e) {

        const value = e.target.value;

        if (value) {

            setSearchParams({ search: value });

        } else {

            setSearchParams({});

        }

    }

    return (

        <header className="dashboard-navbar">

            <div className="navbar-search-wrapper">

                <i className="fa-solid fa-magnifying-glass search-icon"></i>

                <input
                    type="text"
                    placeholder="Search by URL or Short Code..."
                    value={search}
                    onChange={handleSearch}
                    className="navbar-search"
                />

            </div>

            <UserDropdown />

        </header>

    );

}

export default DashboardNavbar;