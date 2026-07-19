import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/TempSidebar";

function DashboardLayout() {
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-6">
                    Dashboard Content
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;