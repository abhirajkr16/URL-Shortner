import { useState } from "react";
import CreateUrlCard from "../dashboard/CreateUrlCard";
import RecentUrls from "../dashboard/RecentUrls";

import "./urls.css";

function UrlPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    function handleUrlCreated() {
        setRefreshTrigger((prev) => prev + 1);
    }

    return (

        <section className="url-page">

            <div className="url-page-header">

                <h1>

                    My URLs

                </h1>

                <p>

                    Manage all your shortened URLs.

                </p>

            </div>

            <CreateUrlCard onUrlCreated={handleUrlCreated} />

            <RecentUrls
                title="All URLs"
                refreshTrigger={refreshTrigger}
                onUrlChange={handleUrlCreated}
            />

        </section>

    );

}

export default UrlPage;