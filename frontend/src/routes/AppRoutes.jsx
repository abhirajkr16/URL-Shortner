// import { Outlet } from "react-router-dom";

// function AuthLayout() {
//     return (
//         <main>
//             <Outlet />
//         </main>
//     );
// }

// export default AuthLayout;

import { Routes, Route } from "react-router-dom";
import LandingPage from "../modules/landing/LandingPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
        </Routes>
    );
}

export default AppRoutes;