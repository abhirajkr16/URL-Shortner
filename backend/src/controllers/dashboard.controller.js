import { getDashboardStatistics } from "../services/dashboard.service.js";

export const getDashboardStats = async (
    req,
    res,
    next
) => {

    try {

        const stats =
            await getDashboardStatistics(
                req.user.id
            );

        return res.status(200).json({

            success: true,

            data: stats,

        });

    }
    catch (error) {

        next(error);

    }

};