import {
    getToken,
    getUser,
    clearAuth,
} from "../utils/token";

export function useAuth() {

    function isAuthenticated() {
        return !!getToken();
    }

    function currentUser() {
        return getUser();
    }

    function logout() {
        clearAuth();
    }

    return {
        isAuthenticated,
        currentUser,
        logout,
    };
}