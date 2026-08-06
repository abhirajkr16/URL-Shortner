import { useState } from "react";
import DashboardCards from "./DashboardCards";
import CreateUrlCard from "./CreateUrlCard";
import RecentUrls from "./RecentUrls";

import "./dashboard.css";

function DashboardPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    function handleUrlCreated() {
        setRefreshTrigger((prev) => prev + 1);
    }

    return (

        <section className="dashboard-page">

            <div className="dashboard-header">

                <h1>Dashboard</h1>

                <p>
                    Welcome back! Manage all your shortened URLs here.
                </p>

            </div>

            <DashboardCards refreshTrigger={refreshTrigger} />

            <CreateUrlCard onUrlCreated={handleUrlCreated} />

            <RecentUrls
                title="Recent URLs"
                limit={5}
                refreshTrigger={refreshTrigger}
                onUrlChange={handleUrlCreated}
            />

        </section>

    );
}

export default DashboardPage;