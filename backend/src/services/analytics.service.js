import NotFoundError from "../errors/NotFoundError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { findUrlById } from "../repositories/url.repository.js";
import {
    getTotalClicks,
    getAnalyticsByUrlId,
    getUserTotalClicks,
    getTopUrls,
    getRecentClicks,
} from "../repositories/analytics.repository.js";

export const getUrlAnalytics = async ({ urlId, userId }) => {
    const url = await findUrlById(urlId);

    if (!url) {
        throw new NotFoundError("URL not found");
    }

    if (url.user_id !== userId) {
        throw new UnauthorizedError("You are not authorized to view analytics");
    }

    const totalClicks = await getTotalClicks(urlId);
    const clicks = await getAnalyticsByUrlId(urlId);

    return {
        url: {
            id: url.id,
            short_code: url.short_code,
            original_url: url.original_url,
            created_at: url.created_at,
            updated_at: url.updated_at,
            expires_at: url.expires_at,
            is_deleted: !!url.deleted_at,
        },
        totalClicks: totalClicks.totalClicks || 0,
        clicks: clicks || [],
    };
};

export const getAnalyticsOverview = async (userId) => {
    const [totalClicks, topUrls, recentClicks] = await Promise.all([
        getUserTotalClicks(userId),
        getTopUrls(userId),
        getRecentClicks(userId),
    ]);

    return {
        totalClicks: totalClicks.totalClicks || 0,
        topUrls: topUrls || [],
        recentClicks: recentClicks || [],
    };
};