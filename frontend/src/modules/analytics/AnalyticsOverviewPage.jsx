import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAnalyticsOverview } from "./analyticsService";
import "./analytics.css";

function formatDate(dateString) {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString();
}

function formatLastClicked(dateString) {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleString();
}

function AnalyticsOverviewPage() {
    const navigate = useNavigate();
    const [overview, setOverview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";

    useEffect(() => {
        fetchOverview();
    }, []);

    async function fetchOverview() {
        try {
            const response = await getAnalyticsOverview();
            setOverview(response.data);
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
                <button onClick={fetchOverview}>Retry</button>
            </div>
        );
    }

    if (!overview || overview.topUrls?.length === 0) {
        return (
            <section className="analytics-page">
                <div className="analytics-header">
                    <h1>Analytics</h1>
                    <p>Overview of all your shortened URLs.</p>
                </div>
                <div className="empty-state">
                    <p>No analytics data available yet.</p>
                    <p style={{ fontSize: "0.9rem", marginTop: "4px" }}>
                        Create some short URLs to start tracking clicks.
                    </p>
                </div>
            </section>
        );
    }

    const totalClicks = overview.totalClicks || 0;
    const topUrls = overview.topUrls || [];

    const filteredUrls = topUrls.filter((url) => {
        const originalLower = url.original_url?.toLowerCase() || "";
        const codeLower = url.short_code?.toLowerCase() || "";
        const queryLower = search.toLowerCase();
        return originalLower.includes(queryLower) || codeLower.includes(queryLower);
    });

    return (
        <section className="analytics-page">
            <div className="analytics-header">
                <h1>Analytics</h1>
                <p>Overview of all your shortened URLs with click statistics.</p>
            </div>

            <div className="analytics-summary">
                <div className="analytics-card">
                    <h3>Total URLs</h3>
                    <span className="number">{topUrls.length}</span>
                </div>
                <div className="analytics-card">
                    <h3>Total Clicks</h3>
                    <span className="number">{totalClicks}</span>
                </div>
                <div className="analytics-card">
                    <h3>Avg Clicks</h3>
                    <span className="number">
                        {topUrls.length > 0 ? Math.round(totalClicks / topUrls.length) : 0}
                    </span>
                </div>
            </div>

            <div className="analytics-history">
                <h2>All URLs</h2>
                <div className="analytics-table-wrapper">
                    <table className="analytics-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Short URL</th>
                                <th>Original URL</th>
                                <th>Clicks</th>
                                <th>Last Clicked</th>
                                <th>Created</th>
                                <th>Expires</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUrls.map((url, index) => {
                                const isExpired = url.expires_at && new Date(url.expires_at) < new Date();
                                const isActive = !url.is_deleted && !isExpired;

                                return (
                                    <tr key={url.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <a
                                                href={`http://localhost:3000/${url.short_code}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="short-url"
                                            >
                                                {url.short_code}
                                            </a>
                                        </td>
                                        <td className="original-url" title={url.original_url}>
                                            {url.original_url}
                                        </td>
                                        <td>{url.clicks}</td>
                                        <td>{formatLastClicked(url.last_clicked_at)}</td>
                                        <td>{formatDate(url.created_at)}</td>
                                        <td>{formatDate(url.expires_at)}</td>
                                        <td>
                                            {url.is_deleted ? (
                                                <span className="status-badge deleted">Deleted</span>
                                            ) : isExpired ? (
                                                <span className="status-badge expired">Expired</span>
                                            ) : (
                                                <span className="status-badge active">Active</span>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className="analytics-view-btn"
                                                onClick={() =>
                                                    navigate(`/dashboard/analytics/${url.id}`)
                                                }
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default AnalyticsOverviewPage;