import crypto from "crypto";

import ConflictError from "../errors/ConflictError.js";
import NotFoundError from "../errors/NotFoundError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";

import {
    createUrl,
    findUrlById,
    findUrlByShortCode,
    findUrlsByUserId,
    updateUrl,
    softDeleteUrl,
} from "../repositories/url.repository.js";

import {
    validateCreateUrlData,
    validateUpdateUrlData,
} from "../validators/url.validator.js";

const generateShortCode = () => {
    return crypto.randomBytes(5).toString("base64url").substring(0, 7);
};

export const createShortUrl = async ({
    userId,
    originalUrl,
    customAlias,
    expiresAt,
}) => {
    validateCreateUrlData({
        originalUrl,
        customAlias,
        expiresAt,
    });

    let shortCode = customAlias;

    if (shortCode) {
        const existingUrl = await findUrlByShortCode(shortCode);

        if (existingUrl) {
            throw new ConflictError("Custom alias already exists");
        }
    } else {
        do {
            shortCode = generateShortCode();
        } while (await findUrlByShortCode(shortCode));
    }

    const formattedExpiresAt = expiresAt
        ? new Date(expiresAt)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")
        : null;

    const urlId = await createUrl({
        userId,
        originalUrl,
        shortCode,
        customAlias,
        expiresAt: formattedExpiresAt,
    });

    return await findUrlById(urlId);
};

export const getUserUrls = async (userId) => {
    return await findUrlsByUserId(userId);
};

export const getUrlById = async (id, userId) => {
    const url = await findUrlById(id);

    if (!url) {
        throw new NotFoundError("URL not found");
    }

    if (url.user_id !== userId) {
        throw new UnauthorizedError("You are not authorized to access this URL");
    }

    return url;
};

export const updateUserUrl = async ({
    id,
    userId,
    originalUrl,
    expiresAt,
}) => {
    validateUpdateUrlData({
        originalUrl,
        expiresAt,
    });

    const url = await findUrlById(id);

    if (!url) {
        throw new NotFoundError("URL not found");
    }

    if (url.user_id !== userId) {
        throw new UnauthorizedError(
            "You are not authorized to update this URL"
        );
    }

    const formattedExpiresAt = expiresAt
        ? new Date(expiresAt)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")
        : null;

    await updateUrl({
        id,
        originalUrl,
        expiresAt: formattedExpiresAt,
    });

    return await findUrlById(id);
};

export const deleteUserUrl = async ({
    id,
    userId,
}) => {
    const url = await findUrlById(id);

    if (!url) {
        throw new NotFoundError("URL not found");
    }

    if (url.user_id !== userId) {
        throw new UnauthorizedError("You are not authorized to delete this URL");
    }

    await softDeleteUrl(id);

    return;
};