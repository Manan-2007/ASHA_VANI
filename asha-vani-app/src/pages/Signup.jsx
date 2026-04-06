import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";
import VoiceOrb from "../components/VoiceOrb";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const result = signup({ name, phone, password });
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
  }

  return (
    <>
      <main className="min-h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Hero Section */}
        <section className="relative w-full md:w-1/2 lg:w-[55%] flex flex-col p-8 md:p-16 lg:px-24 bg-surface-low min-h-[409px] md:min-h-screen">
          {/* Background Decorative */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-primary-container/30 to-transparent" />

          <div className="relative z-10 max-w-xl flex flex-col items-start lg:mt-8">
            <Logo className="mb-6" />
            <p className="font-headline font-medium text-xl md:text-2xl text-primary mb-6 leading-tight">
              Offline Voice AI for Frontline Health Workers
            </p>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-md mb-12">
              Empowering community health leaders with seamless voice-to-data
              technology that works wherever the care happens, even without
              internet.
            </p>

            {/* Intelligent Cursor Tracking Orb */}
            <div className="w-full max-w-md flex justify-center lg:justify-start">
              <VoiceOrb mode="interactive-preview" className="scale-[0.85] origin-left" />
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-40 bg-gradient-to-t from-surface-high to-transparent pointer-events-none" />
        </section>

        {/* Right Side: Signup Form */}
        <section className="w-full md:w-1/2 lg:w-[45%] flex items-center justify-center p-6 md:p-12 lg:p-16 bg-background">
          <div className="w-full max-w-md bg-surface-lowest p-8 md:p-10 rounded-lg shadow-xl shadow-stone-900/5 border border-outline-variant/10">
            <div className="mb-10">
              <h2 className="font-headline font-bold text-3xl text-on-surface mb-2">
                Create Account
              </h2>
              <p className="font-label text-sm text-on-surface-variant">
                Join the community of digital-first health workers.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-error-container/30 text-error rounded-lg text-sm text-center font-medium border border-error/20">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  className="font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant ml-1"
                  htmlFor="signup-name"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    className="w-full px-6 py-4 rounded-full bg-surface-highest border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-low transition-all placeholder:text-outline/60 text-on-surface"
                    id="signup-name"
                    placeholder="Enter your full name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-outline/50">
                    person
                  </span>
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label
                  className="font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant ml-1"
                  htmlFor="signup-phone"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    className="w-full px-6 py-4 rounded-full bg-surface-highest border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-low transition-all placeholder:text-outline/60 text-on-surface"
                    id="signup-phone"
                    placeholder="+91 00000 00000"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-outline/50">
                    call
                  </span>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  className="font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant ml-1"
                  htmlFor="signup-password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full px-6 py-4 rounded-full bg-surface-highest border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-low transition-all placeholder:text-outline/60 text-on-surface"
                    id="signup-password"
                    placeholder="Create a secure password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-outline/50 cursor-pointer">
                    visibility
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                className="w-full py-4 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-bold text-lg rounded-full shadow-lg shadow-primary/10 hover:opacity-90 active:scale-[0.98] transition-all mt-4"
                type="submit"
              >
                Create Account
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-outline-variant/15">
              <p className="text-center font-label text-sm text-on-surface-variant mb-8">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-bold hover:underline"
                >
                  Log in
                </Link>
              </p>

              {/* Trust Elements */}
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: "cloud_off", text: "Works completely offline" },
                  { icon: "groups", text: "Built for ASHA workers" },
                  { icon: "verified_user", text: "Secure and private data encryption" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 px-4 py-3 bg-surface-low rounded-lg"
                  >
                    <span
                      className="material-symbols-outlined text-primary text-xl"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      {item.icon}
                    </span>
                    <span className="font-label text-xs font-medium text-on-surface">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Background Overlay */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-container/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-secondary-container/20 rounded-full blur-[100px]" />
      </div>
    </>
  );
}
