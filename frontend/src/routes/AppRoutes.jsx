import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import LandingPage from "../modules/landing/LandingPage";
import LoginPage from "../modules/auth/LoginPage";
import RegisterPage from "../modules/auth/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "../modules/dashboard/DashboardPage";
import AnalyticsPage from "../modules/analytics/AnalyticsPage";
import UrlPage from "../modules/urls/UrlPage";

function AppRoutes() {
    return (
        <Routes>

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
                <Route
                    path="/"
                    element={<LandingPage />}
                />
            </Route>

            {/* Authentication Routes */}
            <Route element={<AuthLayout />}>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
            </Route>

            {/* Dashboard */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    index
                    element={<DashboardPage />}
                />

                <Route
                    path="analytics/:urlId"
                    element={<AnalyticsPage />}
                />

                <Route
                    path="urls"
                    element={<UrlPage />}
                />
            </Route>

        </Routes>
    );
}

export default AppRoutes;