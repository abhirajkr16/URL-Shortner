import api from "../../services/api";

export async function getAnalytics(urlId) {

    const response = await api.get(
        `/analytics/${urlId}`
    );

    return response.data;

}