import NotFoundError from "../errors/NotFoundError.js";

import { findUrlByShortCode } from "../repositories/url.repository.js";

export const redirectToOriginalUrl = async (shortCode) => {
    const url = await findUrlByShortCode(shortCode);

    if (!url) {
        throw new NotFoundError("Short URL not found");
    }

    if (
        url.expires_at &&
        new Date(url.expires_at) < new Date()
    ) {
        throw new NotFoundError("Short URL has expired");
    }

    return url.original_url;
};