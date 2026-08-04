import { Outlet } from "react-router-dom";
import { useState } from "react";

import DashboardNavbar from "../components/layout/DashboardNavbar";
import Sidebar from "../components/layout/Sidebar";

import "./dashboard-layout.css";

function DashboardLayout() {

    const [collapsed, setCollapsed] = useState(false);

    return (

        <div className="dashboard-shell">

            <Sidebar
                collapsed={collapsed}
            />

            <button
                className={
                    collapsed
                        ? "floating-toggle collapsed"
                        : "floating-toggle"
                }
                onClick={() =>
                    setCollapsed(!collapsed)
                }
            >

                <i
                    className={
                        collapsed
                            ? "fa-solid fa-angles-right"
                            : "fa-solid fa-angles-left"
                    }
                />

            </button>

            <div className="dashboard-main">

                <DashboardNavbar />

                <main className="dashboard-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default DashboardLayout;