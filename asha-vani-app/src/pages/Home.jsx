import { Link } from "react-router-dom";
import VoiceOrb from "../components/VoiceOrb";

export default function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="pt-32 md:pt-48 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Hero Content */}
            <div className="space-y-10 order-2 lg:order-1">
              <div className="space-y-6">
                <span className="inline-block px-5 py-2 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase">
                  Digital Sanctuary
                </span>
                <h1 className="text-6xl md:text-7xl font-extrabold text-on-background leading-[1.05] tracking-tighter font-headline">
                  Offline Voice AI
                  <br />
                  for Frontline
                  <br />
                  Health Workers
                </h1>
                <p className="text-xl text-on-surface-variant font-body max-w-lg leading-relaxed">
                  Empowering ASHA workers with real-time Hinglish voice guidance.
                  Built to work in the heart of rural India without needing a data
                  connection.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/dashboard"
                  className="primary-gradient text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 sunken-shadow flex items-center gap-3"
                >
                  Start Consultation
                  <span className="material-symbols-outlined">play_circle</span>
                </Link>
              </div>
            </div>

            {/* Right: Voice Assistant Interface Card */}
            <div className="order-1 lg:order-2">
              <div className="bg-[#F5F1E8] rounded-[1.5rem] p-8 md:p-12 border border-[#E8E1D5] soft-inset flex flex-col items-center space-y-6 text-center">
                <div className="space-y-2 mb-2">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold tracking-widest uppercase">
                    AI Voice Assistant Preview
                  </span>
                </div>

                {/* Voice Orb in Preview Mode */}
                <div className="scale-90 md:scale-100 transform origin-center">
                  <VoiceOrb mode="preview" state="idle" />
                </div>

                {/* Static Example Conversation */}
                <div className="w-full mt-4 space-y-4 text-left">
                  {/* User Message */}
                  <div className="w-full flex justify-end">
                    <div className="bg-primary text-on-primary p-4 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
                      <p className="text-sm md:text-base font-medium">
                        &quot;Bachche ko bukhar hai.&quot;
                      </p>
                    </div>
                  </div>
                  
                  {/* AI Response Card */}
                  <div className="w-full bg-white/90 backdrop-blur-md p-4 rounded-2xl rounded-tl-sm border border-outline-variant/20 shadow-sm flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span
                        className="material-symbols-outlined text-on-primary-container text-sm"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        smart_toy
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-on-surface text-sm font-semibold leading-relaxed">
                        &quot;Temperature check karein aur zarurat ho toh PHC le jayein.&quot;
                      </p>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                        Asha Vani (Hinglish)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Information Bento Section */}
        <section className="grid md:grid-cols-2 gap-8 border-t border-outline-variant/10 pt-20">
          {/* Card 1 */}
          <div className="bg-surface-low p-10 rounded-lg hover:bg-surface-container transition-colors group">
            <div className="flex flex-col h-full space-y-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">
                  psychology
                </span>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-on-background font-headline">
                  What is ASHA VANI
                </h2>
                <p className="text-on-surface-variant leading-relaxed text-lg">
                  An intelligent offline companion that bridges the gap between
                  rural healthcare workers and specialized clinical knowledge
                  using advanced voice recognition.
                </p>
              </div>
              <div className="pt-6 mt-auto">
                <div className="h-48 rounded-lg bg-white/50 overflow-hidden relative border border-white">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-primary/20">
                      hub
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-low p-10 rounded-lg hover:bg-surface-container transition-colors group">
            <div className="flex flex-col h-full space-y-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">
                  volunteer_activism
                </span>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-on-background font-headline">
                  How it helps ASHA workers
                </h2>
                <p className="text-on-surface-variant leading-relaxed text-lg">
                  It provides step-by-step guidance during home visits, ensuring
                  that every patient receives standard clinical care regardless
                  of internet connectivity.
                </p>
              </div>
              <div className="pt-6 mt-auto">
                <div className="h-48 rounded-lg bg-white/50 overflow-hidden relative border border-white">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-primary/20">
                      health_and_safety
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="mt-8 grid lg:grid-cols-3 gap-8 pb-20">
          <div className="lg:col-span-1 bg-surface-high p-8 rounded-lg space-y-4">
            <span className="material-symbols-outlined text-primary">wifi_off</span>
            <h4 className="text-xl font-bold font-headline">100% Offline</h4>
            <p className="text-on-surface-variant text-sm">
              Our proprietary compression models allow the entire AI to run
              locally on mid-range Android devices.
            </p>
          </div>
          <div className="lg:col-span-1 bg-surface-high p-8 rounded-lg space-y-4">
            <span className="material-symbols-outlined text-primary">translate</span>
            <h4 className="text-xl font-bold font-headline">Dialect Support</h4>
            <p className="text-on-surface-variant text-sm">
              Understands complex Hinglish and regional dialects, ensuring
              workers don&apos;t have to change how they speak.
            </p>
          </div>
          <div className="lg:col-span-1 bg-primary text-white p-8 rounded-lg space-y-4">
            <span className="material-symbols-outlined">security</span>
            <h4 className="text-xl font-bold font-headline">Data Privacy</h4>
            <p className="text-primary-container text-sm">
              Patient data never leaves the device. Complete privacy by design
              for sensitive health information.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
