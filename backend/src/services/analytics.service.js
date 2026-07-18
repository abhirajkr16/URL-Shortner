import NotFoundError from "../errors/NotFoundError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";

import { findUrlById } from "../repositories/url.repository.js";

import {
    getTotalClicks,
    getAnalyticsByUrlId,
} from "../repositories/analytics.repository.js";

export const getUrlAnalytics = async ({
    urlId,
    userId,
}) => {

    const url = await findUrlById(urlId);

    if (!url) {
        throw new NotFoundError("URL not found");
    }

    if (url.user_id !== userId) {
        throw new UnauthorizedError(
            "You are not authorized to view analytics"
        );
    }

    const totalClicks = await getTotalClicks(urlId);

    const clicks = await getAnalyticsByUrlId(urlId);

    return {
        totalClicks: totalClicks.totalClicks,
        clicks,
    };
};