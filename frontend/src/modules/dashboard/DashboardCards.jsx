import { useEffect, useState } from "react";

import { getDashboardStats } from "./dashboardService";

function DashboardCards({ refreshTrigger }) {

    const [stats, setStats] = useState({

        totalUrls: 0,

        activeUrls: 0,

        totalClicks: 0,

    });

    useEffect(() => {

        fetchDashboardStats();

    }, [refreshTrigger]);

    async function fetchDashboardStats() {

        try {

            const response =
                await getDashboardStats();

            setStats(response.data);

        }

        catch (error) {

            console.error(
                error.response?.data ||
                error.message
            );

        }

    }

    return (

        <section className="dashboard-cards">

            <div className="dashboard-card">

                <h3>Total URLs</h3>

                <h2>{stats.totalUrls}</h2>

            </div>

            <div className="dashboard-card">

                <h3>Active URLs</h3>

                <h2>{stats.activeUrls}</h2>

            </div>

            <div className="dashboard-card">

                <h3>Total Clicks</h3>

                <h2>{stats.totalClicks}</h2>

            </div>

        </section>

    );

}


export default DashboardCards;