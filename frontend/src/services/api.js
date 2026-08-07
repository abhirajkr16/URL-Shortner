import axios from "axios";

import { getToken, clearAuth } from "../utils/token";
console.log("VITE_API_BASE_URL =", import.meta.env.VITE_API_BASE_URL);
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

let isRedirecting = false;

api.interceptors.request.use(

    (config) => {

        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }

);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url || "";

        const isAuthRoute = requestUrl.includes("/auth/login") || requestUrl.includes("/auth/register");

        if (status === 401 && !isAuthRoute) {
            if (!isRedirecting && window.location.pathname !== "/login") {
                isRedirecting = true;
                clearAuth();
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;