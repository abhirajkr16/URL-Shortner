import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUrlAnalytics } from "./analyticsService";
import "./analytics.css";

function AnalyticsPage() {
    const { urlId } = useParams();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAnalytics();
    }, [urlId]);

    async function fetchAnalytics() {
        try {
            const response = await getUrlAnalytics(urlId);
            setAnalytics(response.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
            setError(error.response?.data?.message || "Failed to load analytics");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="loading-state">Loading analytics...</div>;
    }

    if (error) {
        return (
            <div className="error-state">
                <p>{error}</p>
                <button onClick={fetchAnalytics}>Retry</button>
            </div>
        );
    }

    if (!analytics) {
        return (
            <section className="analytics-page">
                <div className="analytics-header">
                    <h1>URL Analytics</h1>
                    <p>View all click activity for this short URL.</p>
                </div>
                <div className="empty-state">
                    <p>No data available for this URL.</p>
                </div>
            </section>
        );
    }

    const { url, totalClicks, clicks } = analytics;

    return (
        <section className="analytics-page">
            <div className="analytics-header">
                <h1>URL Analytics</h1>
                <p>Detailed statistics for your shortened URL.</p>
            </div>

            <div className="analytics-summary">
                <div className="analytics-card">
                    <h3>Total Clicks</h3>
                    <span className="number">{totalClicks}</span>
                </div>
            </div>

            <div className="analytics-details">
                <h2>URL Details</h2>
                <div className="analytics-details-grid">
                    <div className="detail-item">
                        <span className="detail-label">Short URL</span>
                        <a
                            href={`${import.meta.env.VITE_SHORTENED_BASE_URL}/${url.short_code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="detail-value short-url-link"
                        >
                            {url.short_code}
                        </a>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Original URL</span>
                        <span className="detail-value original-url-value" title={url.original_url}>
                            {url.original_url}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Created At</span>
                        <span className="detail-value">
                            {new Date(url.created_at).toLocaleString()}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Updated At</span>
                        <span className="detail-value">
                            {url.updated_at ? new Date(url.updated_at).toLocaleString() : "Never"}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Expires At</span>
                        <span className="detail-value">
                            {url.expires_at ? new Date(url.expires_at).toLocaleString() : "Never"}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Status</span>
                        <span className={`status-badge ${url.is_deleted ? "deleted" : url.expires_at && new Date(url.expires_at) < new Date() ? "expired" : "active"}`}>
                            {url.is_deleted ? "Deleted" : url.expires_at && new Date(url.expires_at) < new Date() ? "Expired" : "Active"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="analytics-history">
                <h2>Click History</h2>
                <div className="analytics-table-wrapper">
                    <table className="analytics-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clicks && clicks.length > 0 ? (
                                clicks.map((click, index) => (
                                    <tr key={click.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {new Date(click.clicked_at).toLocaleDateString()}
                                        </td>
                                        <td>
                                            {new Date(click.clicked_at).toLocaleTimeString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="empty-state">No click history available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default AnalyticsPage;