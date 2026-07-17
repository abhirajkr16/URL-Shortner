import { CACHE_PREFIX } from "../constants/cache.constants.js";

export const getUrlCacheKey = (shortCode) =>
    `${CACHE_PREFIX.URL}:${shortCode}`;