import {
    getTotalUrls,
    getActiveUrls,
    getTotalClicks,
} from "../repositories/dashboard.repository.js";

export async function getDashboardStatistics(userId) {

    const [
        totalUrls,
        activeUrls,
        totalClicks,
    ] = await Promise.all([

        getTotalUrls(userId),

        getActiveUrls(userId),

        getTotalClicks(userId),

    ]);

    return {

        totalUrls: totalUrls.totalUrls,

        activeUrls: activeUrls.activeUrls,

        totalClicks: totalClicks.totalClicks,

    };

}