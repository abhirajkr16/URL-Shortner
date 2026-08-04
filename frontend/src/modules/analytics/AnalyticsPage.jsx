import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./analytics.css";
import { getAnalytics } from "./analyticsService";

function AnalyticsPage() {

    const { urlId } = useParams();

    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchAnalytics();

    }, []);

    async function fetchAnalytics() {

        try {

            const response = await getAnalytics(urlId);

            setAnalytics(response.data);

        }
        catch (error) {

            console.error(
                error.response?.data ||
                error.message
            );

        }
        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <p>Loading Analytics...</p>;

    }

    return (

        <section className="analytics-page">

            <div className="analytics-header">

                <h1>

                    URL Analytics

                </h1>

                <p>

                    View all click activity for this short URL.

                </p>

            </div>

            <div className="analytics-summary">

                <div className="analytics-card">

                    <h3>Total Clicks</h3>

                    <h2>{analytics.totalClicks}</h2>

                </div>

            </div>

            <div className="analytics-history">

                <h2>Click History</h2>

                <table className="analytics-table">

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>Date</th>

                            <th>Time</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            analytics.clicks.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="3"
                                        className="empty-table"
                                    >

                                        No Click History

                                    </td>

                                </tr>

                            ) : (

                                analytics.clicks.map((click, index) => (

                                    <tr key={click.id}>

                                        <td>

                                            {index + 1}

                                        </td>

                                        <td>

                                            {

                                                new Date(click.clicked_at)
                                                    .toLocaleDateString()

                                            }

                                        </td>

                                        <td>

                                            {

                                                new Date(click.clicked_at)
                                                    .toLocaleTimeString()

                                            }

                                        </td>

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </section>

    );

}

export default AnalyticsPage;