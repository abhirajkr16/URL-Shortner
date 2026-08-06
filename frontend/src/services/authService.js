import api from "./api";
import { clearAuth } from "../utils/token";

export function logout() {
    clearAuth();
}

export async function registerUser(userData) {
    const response = await api.post("/auth/register", userData);
    return response.data;
}

export async function loginUser(userData) {
    const response = await api.post("/auth/login", userData);
    return response.data;
}