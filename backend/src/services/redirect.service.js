import NotFoundError from "../errors/NotFoundError.js";

import { findUrlByShortCode } from "../repositories/url.repository.js";
import { createAnalytics } from "../repositories/analytics.repository.js";

import { URL_CACHE_TTL } from "../constants/cache.constants.js";
import { getUrlCacheKey } from "../utils/cache.util.js";

import {
    getCache,
    setCache,
} from "./redis.service.js";

export const redirectToOriginalUrl = async (shortCode) => {
    const cacheKey = getUrlCacheKey(shortCode);

    // notes: checking cache
    let url = null;

    try {
        url = await getCache(cacheKey);
    } catch (error) {
        console.error("Redis GET Error:", error.message);
    }
    // notes: if cache not found then check in database

    if (!url) {
        const dbUrl = await findUrlByShortCode(shortCode);

        if (!dbUrl) {
            throw new NotFoundError("Short URL not found");
        }

        if (
            dbUrl.expires_at &&
            new Date(dbUrl.expires_at).getTime() < Date.now()
        ) {
            throw new NotFoundError("Short URL has expired");
        }

        url = {
            id: dbUrl.id,
            originalUrl: dbUrl.original_url,
            expiresAt: dbUrl.expires_at,
        };

        try {
            await setCache(cacheKey, url, URL_CACHE_TTL);
        } catch (error) {
            console.error("Redis SET Error:", error.message);
        }
    }

    if (
        url.expiresAt &&
        new Date(url.expiresAt).getTime() < Date.now()
    ) {
        throw new NotFoundError("Short URL has expired");
    }

    try {
        await createAnalytics(url.id);
    } catch (error) {
        console.error("Analytics Error:", error.message);
    }

    return url.originalUrl;
};

// before redis implementation 

// import NotFoundError from "../errors/NotFoundError.js";

// import { findUrlByShortCode } from "../repositories/url.repository.js";
// import { createAnalytics } from "../repositories/analytics.repository.js";

// export const redirectToOriginalUrl = async (shortCode) => {
//     const url = await findUrlByShortCode(shortCode);

//     if (!url) {
//         throw new NotFoundError("Short URL not found");
//     }

//     if (
//         url.expires_at &&
//         new Date(url.expires_at) < new Date()
//     ) {
//         throw new NotFoundError("Short URL has expired");
//     }
//     // creating analytics record for each redirect
//     await createAnalytics(url.id);

//     return url.original_url;
// };