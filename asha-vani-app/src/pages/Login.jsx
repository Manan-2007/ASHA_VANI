import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";
import VoiceOrb from "../components/VoiceOrb";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const result = login({ phone, password });
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
  }

  return (
    <main className="w-full min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* LEFT SIDE: Brand Hero Section */}
      <section className="w-full md:w-1/2 editorial-gradient flex flex-col p-8 md:p-16 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary-container/30 rounded-full blur-3xl" />

        <div className="z-10 flex flex-col items-start lg:mt-8">
          <Logo className="mb-6" />
          <h2 className="font-headline font-semibold text-2xl md:text-3xl text-primary mb-6 leading-tight">
            Offline Voice AI for Frontline Health Workers
          </h2>
          <p className="text-on-surface-variant text-lg max-w-md leading-relaxed mb-12">
            Helping ASHA workers make real-time healthcare decisions with
            voice-based guidance — even without internet.
          </p>

          {/* Intelligent Cursor Tracking Orb */}
          <div className="w-full max-w-md flex justify-center lg:justify-start">
            <VoiceOrb mode="interactive-preview" className="scale-[0.85] origin-left" />
          </div>
        </div>
      </section>

      {/* RIGHT SIDE: Login Form Section */}
      <section className="w-full md:w-1/2 bg-surface-low flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="bg-surface-lowest p-8 md:p-12 rounded-lg shadow-[0_12px_40px_rgba(56,57,41,0.06)] border border-outline-variant/10">
            <div className="text-center mb-10">
              <h3 className="font-headline font-bold text-3xl text-on-surface mb-2">
                Welcome Back
              </h3>
              <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest">
                Login to continue
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-error-container/30 text-error rounded-lg text-sm text-center font-medium border border-error/20">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-on-surface-variant ml-4 font-label">
                  Phone Number
                </label>
                <input
                  className="w-full px-6 py-4 rounded-full bg-surface-highest border-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline outline-none transition-all"
                  placeholder="Enter your phone number"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-4">
                  <label className="text-sm font-medium text-on-surface-variant font-label">
                    Password
                  </label>
                  <Link
                    to="#"
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <input
                  className="w-full px-6 py-4 rounded-full bg-surface-highest border-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline outline-none transition-all"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <button
                className="w-full py-4 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-bold rounded-full shadow-lg shadow-primary/10 hover:opacity-90 active:scale-[0.98] transition-all"
                type="submit"
              >
                Login
              </button>
            </form>

            <div className="relative my-10 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30" />
              </div>
              <span className="relative px-4 bg-surface-lowest text-outline-variant font-label text-xs tracking-widest">
                OR
              </span>
            </div>

            <div className="text-center space-y-6">
              <p className="text-on-surface-variant text-sm font-label">
                New here? Create an account
              </p>
              <Link
                to="/signup"
                className="block w-full py-4 bg-primary-container text-on-primary-container font-bold rounded-full hover:bg-primary-fixed transition-colors text-center"
              >
                Sign Up
              </Link>
            </div>

            {/* Trust Elements */}
            <div className="mt-12 pt-8 border-t border-outline-variant/10 grid grid-cols-1 gap-4">
              {[
                { icon: "cloud_off", text: "Works completely offline" },
                { icon: "diversity_3", text: "Built for ASHA workers" },
                { icon: "verified_user", text: "Secure and private" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 text-on-surface-variant"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-secondary">
                      {item.icon}
                    </span>
                  </div>
                  <span className="text-xs font-medium font-label">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="mt-8 flex justify-center gap-6 text-[10px] uppercase tracking-[0.2em] text-outline">
            <Link to="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link to="#" className="hover:text-primary transition-colors">
              Help Center
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
