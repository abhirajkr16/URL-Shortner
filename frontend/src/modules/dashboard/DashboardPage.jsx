import DashboardCards from "./DashboardCards";
import CreateUrlCard from "./CreateUrlCard";
import RecentUrls from "./RecentUrls";

import "./dashboard.css";

function DashboardPage() {

    return (

        <section className="dashboard-page">

            <div className="dashboard-header">

                <h1>Dashboard</h1>

                <p>
                    Welcome back! Manage all your shortened URLs here.
                </p>

            </div>

            <DashboardCards />

            <CreateUrlCard />

            <RecentUrls />

        </section>

    );
}

export default DashboardPage;