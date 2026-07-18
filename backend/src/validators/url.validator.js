import ValidationError from "../errors/ValidationError.js";

export const validateCreateUrlData = ({
    originalUrl,
    customAlias,
    expiresAt,
}) => {
    if (!originalUrl) {
        throw new ValidationError("Original URL is required");
    }

    try {
        new URL(originalUrl);
    } catch {
        throw new ValidationError("Invalid URL");
    }

    if (customAlias) {
        if (customAlias.length < 3 || customAlias.length > 50) {
            throw new ValidationError(
                "Custom alias must be between 3 and 50 characters"
            );
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(customAlias)) {
            throw new ValidationError(
                "Custom alias can contain only letters, numbers, hyphens and underscores"
            );
        }
    }

    if (expiresAt) {
        const expiryDate = new Date(expiresAt);

        if (Number.isNaN(expiryDate.getTime())) {
            throw new ValidationError("Invalid expiration date");
        }

        if (expiryDate <= new Date()) {
            throw new ValidationError(
                "Expiration date must be in the future"
            );
        }
    }
};

export const validateUpdateUrlData = ({
    originalUrl,
    expiresAt,
}) => {
    if (originalUrl) {
        try {
            new URL(originalUrl);
        } catch {
            throw new ValidationError("Invalid URL");
        }
    }

    if (expiresAt) {
        const expiryDate = new Date(expiresAt);

        if (Number.isNaN(expiryDate.getTime())) {
            throw new ValidationError("Invalid expiration date");
        }

        if (expiryDate <= new Date()) {
            throw new ValidationError(
                "Expiration date must be in the future"
            );
        }
    }
};