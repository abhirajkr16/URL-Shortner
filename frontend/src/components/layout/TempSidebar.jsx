function Sidebar() {
    return (
        <aside className="h-[calc(100vh-64px)] w-64 border-r bg-white">
            <nav className="flex flex-col gap-3 p-5">

                <button>Dashboard</button>

                <button>My URLs</button>

                <button>Analytics</button>

                <button>Profile</button>

            </nav>
        </aside>
    );
}

export default Sidebar;