export default function FutureScope() {
  return (
    <div className="bg-surface text-on-surface">
      <main className="max-w-7xl mx-auto px-6 pt-40 pb-24">
        {/* Header Section */}
        <header className="mb-24 flex flex-col md:flex-row gap-12 items-end">
          <div className="flex-1">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-sm font-bold tracking-wide mb-6 uppercase">
              Our Trajectory
            </div>
            <h1 className="text-7xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-8 leading-[0.95] font-headline">
              Future Scope
            </h1>
            <h2 className="text-3xl font-light text-on-surface-variant leading-tight max-w-2xl font-headline">
              Scaling ASHA VANI Across India: Expanding from emergency
              assistance to a full healthcare intelligence system for frontline
              workers.
            </h2>
          </div>
          <div className="w-full md:w-1/3 aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative bg-surface-low flex items-center justify-center">
            <span className="material-symbols-outlined text-primary/20 text-[100px]">
              rocket_launch
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
        </header>

        {/* Phase-Based Roadmap */}
        <section className="mb-32">
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-4xl font-bold tracking-tight font-headline">
              Growth Roadmap
            </h3>
            <div className="h-px flex-1 mx-12 bg-surface-highest" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* PHASE 1 */}
            <div className="lg:col-span-4 p-8 rounded-lg bg-surface-low border-l-4 border-primary/20">
              <div className="text-primary font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">rocket_launch</span>
                Phase 1 — Emergency Voice Assistant
              </div>
              <ul className="space-y-4">
                {[
                  "Real-time voice guidance",
                  "Offline operation",
                  "Hinglish understanding",
                  "NHM protocol-based responses",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">
                      check_circle
                    </span>
                    <span className="text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PHASE 2 */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3 p-8 rounded-lg bg-primary-container text-on-primary-container flex justify-between items-center">
                <div>
                  <div className="font-bold text-xl mb-1 font-headline">
                    Phase 2 — Healthcare Expansion
                  </div>
                  <p className="opacity-80">
                    Broadening the reach of intelligent diagnostics
                  </p>
                </div>
                <span className="material-symbols-outlined text-4xl">
                  clinical_notes
                </span>
              </div>
              {[
                { icon: "pregnant_woman", label: "Maternal & antenatal care" },
                { icon: "coronavirus", label: "TB DOTS tracking" },
                { icon: "biotech", label: "Malaria rapid testing" },
                { icon: "vaccines", label: "Immunization schedules" },
                { icon: "child_care", label: "Child malnutrition monitoring" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 rounded-lg bg-surface-highest flex flex-col gap-4"
                >
                  <span className="material-symbols-outlined text-primary">
                    {item.icon}
                  </span>
                  <div className="font-bold">{item.label}</div>
                </div>
              ))}
              <div className="p-6 rounded-lg bg-secondary-container/50 flex flex-col justify-center">
                <div className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">
                  Automation
                </div>
                <div className="text-sm leading-snug">
                  Auto data entry into RCH portal using structured AI extraction
                </div>
              </div>
            </div>

            {/* PHASE 3 */}
            <div className="lg:col-span-12 mt-6 p-12 rounded-xl bg-on-surface text-surface flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3">
                <div className="text-primary-fixed font-black text-4xl mb-4 font-headline">
                  Phase 3
                </div>
                <h4 className="text-2xl font-bold leading-tight font-headline">
                  Nationwide Intelligence Layer
                </h4>
              </div>
              <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: "translate", text: "Multilingual support (Marathi, Bengali, Tamil, Odia)" },
                  { icon: "memory", text: "Region-specific AI models (LoRA swapping)" },
                  { icon: "health_and_safety", text: "Ayush-based preventive module" },
                  { icon: "monitoring", text: "Real-time trend detection & analytics" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary-fixed">
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scalability & Cost Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {/* Built for Scale */}
          <div className="space-y-8">
            <h3 className="text-4xl font-bold tracking-tight font-headline">
              Built for Scale
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-lg bg-surface-low">
                <span className="material-symbols-outlined text-3xl mb-4 block">
                  cloud_off
                </span>
                <div className="font-bold">Fully Offline</div>
                <p className="text-sm text-on-surface-variant">
                  No internet required for core operations
                </p>
              </div>
              <div className="p-6 rounded-lg bg-surface-low">
                <span className="material-symbols-outlined text-3xl mb-4 block">
                  usb
                </span>
                <div className="font-bold">Easy Deployment</div>
                <p className="text-sm text-on-surface-variant">
                  Deploy via simple USB or local sync
                </p>
              </div>
            </div>
            <div className="p-6 rounded-lg border-2 border-dashed border-outline-variant/30 text-center italic text-on-surface-variant">
              Optimized for the toughest rural environments where connectivity
              fails.
            </div>
          </div>

          {/* Cost Efficiency */}
          <div className="bg-surface-container p-10 rounded-xl">
            <h3 className="text-2xl font-bold mb-8 font-headline">
              Cost Efficiency
            </h3>
            <div className="space-y-6">
              <div className="relative pt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Cloud-based AI</span>
                  <span className="font-bold text-error">High Recurring Cost</span>
                </div>
                <div className="h-4 bg-surface-highest rounded-full overflow-hidden">
                  <div className="h-full bg-error w-[85%] rounded-full" />
                </div>
              </div>
              <div className="relative">
                <div className="flex justify-between text-sm mb-2">
                  <span>ASHA VANI</span>
                  <span className="font-bold text-primary">
                    Near-Zero Marginal Cost
                  </span>
                </div>
                <div className="h-4 bg-surface-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[8%] rounded-full" />
                </div>
              </div>
              <div className="mt-8 p-4 bg-surface-lowest rounded-lg">
                <p className="text-sm font-medium">
                  <span className="text-primary font-black">Note:</span> Scalable
                  to 1 million ASHA workers with minimal infrastructure overhead.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data & Analytics Section */}
        <section className="mb-32">
          <div className="bg-surface-highest rounded-xl p-12 overflow-hidden relative">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-4xl font-bold mb-6 font-headline">
                  Future Data Intelligence
                </h3>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                  Empowering national health policy with granular, real-time
                  insights extracted directly from the frontline.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: "database", text: "Extract structured health data" },
                    { icon: "sync", text: "Sync with gov databases (RCH/Ayushman)" },
                    { icon: "query_stats", text: "Real-time public health monitoring" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-4 bg-surface-lowest p-4 rounded-lg"
                    >
                      <span className="material-symbols-outlined text-primary">
                        {item.icon}
                      </span>
                      <span className="font-semibold">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-primary/5 rounded-xl border border-primary/10 p-8 flex flex-col justify-center items-center text-center">
                <div className="text-8xl font-black text-primary opacity-20 mb-4 font-headline">
                  99%
                </div>
                <div className="text-xl font-bold mb-2 font-headline">
                  Extraction Accuracy
                </div>
                <p className="text-sm text-on-surface-variant">
                  Converting unstructured voice reports into actionable medical
                  data entries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Vision */}
        <section className="max-w-4xl mx-auto text-center py-24">
          <div className="text-primary font-black tracking-widest uppercase mb-6">
            Vision
          </div>
          <h3 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8 font-headline">
            Transforming ASHA workers into AI-assisted healthcare
            decision-makers across India.
          </h3>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
        </section>
      </main>
    </div>
  );
}
