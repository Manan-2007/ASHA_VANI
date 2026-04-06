import { Outlet, useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.name || "Guest";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-surface">
      <DashboardSidebar />
      {/* Top Header Bar */}
      <header className="fixed top-0 right-0 left-72 z-30 bg-surface/70 backdrop-blur-xl flex justify-between items-center px-8 py-4 shadow-sm font-headline text-base">
        <div className="flex items-center gap-4">
          <span className="text-on-surface font-semibold text-lg">Offline Voice AI for ASHA Workers</span>
        </div>
        <div className="flex items-center gap-6">

          <div className="flex items-center gap-4 text-primary">

            <button
              onClick={handleLogout}
              className="material-symbols-outlined cursor-pointer hover:opacity-80 text-2xl"
              title="Logout"
            >
              logout
            </button>

          </div>
        </div>
      </header>
      <main className="ml-72 pt-24 min-h-screen px-12 pb-12">
        <Outlet />
      </main>
    </div>
  );
}
