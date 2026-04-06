import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import AudioSettings from "./AudioSettings";

const sidebarLinks = [
  { to: "/dashboard", icon: "dashboard", label: "Dashboard", active: true }
];

export default function DashboardSidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const displayName = user?.name || "Guest";

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 h-screen w-72 flex flex-col bg-surface-low font-headline font-medium text-sm">
      <div className="px-8 pt-10 pb-4">
        <Logo disableLink className="!h-[4.5rem] -ml-2 mb-8" />

        {/* Welcome User Card */}
        <div className="bg-surface-lowest rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-outline-variant/10 relative overflow-hidden flex items-start gap-4">
          {/* Subtle Left Accent Highlight */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary-dim to-primary" />

          {/* Avatar Icon */}
          <div className="w-10 h-10 rounded-full bg-primary-container/40 flex flex-shrink-0 items-center justify-center border border-primary/20">
            <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>person</span>
          </div>

          {/* Text Content */}
          <div className="flex flex-col">
            <span className="text-on-surface-variant text-[13px] font-medium leading-none mb-1">
              Welcome,
            </span>
            <span className="text-[26px] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dim tracking-tight leading-[1] pb-1">
              {displayName}
            </span>
            <span className="text-[11px] text-outline mt-1 font-medium">
              Ready to assist you today
            </span>
          </div>
        </div>
      </div>
      <nav className="flex-1 mt-4">
        <div className="flex flex-col space-y-2">
          {sidebarLinks.map((link, idx) => {
            const isActive = link.active || location.pathname === link.to;
            return (
              <Link
                key={idx}
                to={link.to}
                className={`transition-colors duration-200 ${isActive
                  ? "text-on-surface font-bold bg-surface rounded-l-full ml-4 pl-4 py-3 scale-95 transition-transform duration-150"
                  : "text-[#5f635d] px-8 py-3 hover:text-on-surface"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">{link.icon}</span>
                  <span>{link.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
      {/* Audio Settings Panel */}
      <AudioSettings />
      {/* Language Switcher Section */}
      <LanguageSwitcher />
    </aside>
  );
}
