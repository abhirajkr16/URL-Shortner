import api from "../../services/api";

export const getAnalyticsOverview = async () => {
    const response = await api.get("/analytics");
    return response.data;
};

export const getUrlAnalytics = async (urlId) => {
    const response = await api.get(`/analytics/${urlId}`);
    return response.data;
};