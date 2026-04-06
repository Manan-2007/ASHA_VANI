import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const navLinks = [
  { to: "/", label: "Overview" },
  { to: "/summary", label: "Summary" },
  { to: "/future-scope", label: "Future Scopes" },
  { to: "/about", label: "About Us" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#fdf9f0]/95 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8 py-6 h-24 md:h-28 flex items-center">
        {/* Logo */}
        <Logo />

        {/* Center Nav Links */}
        <div className="flex-1 hidden md:flex justify-center">
          <div className="bg-[#F5F1E8] p-1.5 rounded-full inline-flex gap-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] border border-[#E8E1D5]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-6 lg:px-8 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${isActive
                      ? "bg-primary-container text-white font-bold"
                      : "text-[#2E2E2E] hover:bg-white/50"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden ml-auto flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-3xl">menu</span>
          <Link to="/login">
            <span className="material-symbols-outlined text-primary text-3xl cursor-pointer">
              account_circle
            </span>
          </Link>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex justify-end items-center gap-4">
          <Link
            to="/login"
            className="text-on-surface font-semibold px-4 py-2 hover:bg-surface-low rounded-lg transition-colors text-sm"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-primary text-white hover:bg-primary-dim px-6 py-2.5 flex items-center gap-2 rounded-full font-bold shadow-md shadow-primary/20 hover:shadow-lg transition-all text-sm"
          >
            Sign up
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
