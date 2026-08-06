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
import AnalyticsOverviewPage from "../modules/analytics/AnalyticsOverviewPage";
import HelpPage from "../modules/help/HelpPage";
import PrivacyPage from "../modules/privacy/PrivacyPage";
import TermsPage from "../modules/terms/TermsPage";
import ProfilePage from "../modules/profile/ProfilePage";
import QRPage from "../modules/qr/QRPage";
import SettingsPage from "../modules/settings/SettingsPage";

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
                    path="urls"
                    element={<UrlPage />}
                />

                <Route
                    path="analytics"
                    element={<AnalyticsOverviewPage />}
                />

                <Route
                    path="analytics/:urlId"
                    element={<AnalyticsPage />}
                />

                <Route
                    path="qr-codes"
                    element={<QRPage />}
                />

                <Route
                    path="help"
                    element={<HelpPage />}
                />

                <Route
                    path="privacy"
                    element={<PrivacyPage />}
                />

                <Route
                    path="terms"
                    element={<TermsPage />}
                />

                <Route
                    path="profile"
                    element={<ProfilePage />}
                />

                <Route
                    path="settings"
                    element={<SettingsPage />}
                />

            </Route>




        </Routes>
    );
}

export default AppRoutes;