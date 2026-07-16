import { redirectToOriginalUrl } from "../services/redirect.service.js";

export const redirect = async (req, res, next) => {
    try {
        const originalUrl = await redirectToOriginalUrl(
            req.params.shortCode
        );

        return res.redirect(302, originalUrl);

    } catch (error) {
        next(error);
    }
};