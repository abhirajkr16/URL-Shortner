import CreateUrlCard from "../dashboard/CreateUrlCard";
import RecentUrls from "../dashboard/RecentUrls";

import "./urls.css";

function UrlPage() {

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

            <CreateUrlCard />

            <RecentUrls
                title="All URLs"
            />

        </section>

    );

}

export default UrlPage;