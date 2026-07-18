import { getUrlAnalytics } from "../services/analytics.service.js";

export const getAnalytics = async (req, res, next) => {
    try {
        const analytics = await getUrlAnalytics({
            urlId: Number(req.params.urlId),
            userId: req.user.id,
        });

        return res.status(200).json({
            success: true,
            data: analytics,
        });
    } catch (error) {
        next(error);
    }
};