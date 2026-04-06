import GlassCard from "../components/GlassCard";

export default function About() {
  return (
    <div className="text-on-surface font-body relative z-10 w-full mb-10">
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-24">
        
        {/* Hero Section */}
        <GlassCard className="p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          {/* Subtle decoration inside the glass card */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex-1 space-y-6 z-10">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">
              Team EVOLVE AI
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tight leading-[1.1]">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant max-w-xl font-medium leading-relaxed">
              A team of engineers building real-time offline AI systems for
              frontline healthcare workers.
            </p>
          </div>
          <div className="flex-1 w-full h-[300px] md:h-[350px] rounded-[2rem] overflow-hidden bg-white/30 backdrop-blur-md border border-white/40 shadow-inner flex flex-col items-center justify-center text-primary/60 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            <span className="material-symbols-outlined text-[100px] z-10" style={{ fontVariationSettings: '"FILL" 1' }}>
              groups
            </span>
          </div>
        </GlassCard>

        {/* Project Intro */}
        <GlassCard className="p-8 md:p-12">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface">
                What We Built
              </h2>
              <div className="h-1.5 w-24 bg-primary rounded-full shadow-sm" />
            </div>
            <p className="text-lg text-on-surface-variant leading-relaxed font-body font-medium">
              ASHA VANI is a fully offline voice AI assistant designed to help ASHA
              workers make critical healthcare decisions in real time. We bridge
              the gap between complex NHM protocols and frontline delivery through
              localized intelligence.
            </p>
          </section>
        </GlassCard>

        {/* Team Structure */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-headline font-extrabold">
              Our Team Structure
            </h2>
            <p className="text-lg text-on-surface-variant font-medium">
              Specialized engineering for mission-critical impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {[
              { icon: "psychology", title: "AI / ML Lead", desc: "Model fine-tuning, RAG system, and inference optimization for edge devices." },
              { icon: "keyboard_voice", title: "STT Lead", desc: "Speech recognition, voice processing, and real-time transcript logging." },
              { icon: "graphic_eq", title: "TTS / Backend Lead", desc: "Voice output, API server architecture, and real-time streaming logic." },
              { icon: "database", title: "Dataset Lead", desc: "NHM protocol dataset curation and training data validation." },
              { icon: "integration_instructions", title: "Integration & Demo", desc: "Full pipeline integration, latency optimization, and demo execution." },
            ].map((member) => (
              <GlassCard key={member.title} className="p-8 flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-[1.2rem] bg-white/60 shadow-inner border border-white/60 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <span className="material-symbols-outlined text-primary text-[32px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    {member.icon}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-[17px] mb-3 leading-tight">
                  {member.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                  {member.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* How We Built It */}
        <GlassCard className="p-8 md:p-14 overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8 flex flex-col justify-center">
              <div className="space-y-4">
                <h2 className="text-4xl font-headline font-extrabold text-on-surface">
                  How We Built It
                </h2>
                <div className="h-1.5 w-24 bg-primary rounded-full shadow-sm" />
              </div>
              <p className="text-on-surface-variant text-lg leading-relaxed font-medium">
                Our development process was engineered for speed and reliability,
                mirroring the environment our AI serves.
              </p>
              <div className="flex gap-8 items-center bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-sm w-fit">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-primary font-headline">
                    &lt;500ms
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-1">
                    Response Target
                  </span>
                </div>
                <div className="h-12 w-px bg-outline-variant/30" />
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-primary font-headline">
                    100%
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-1">
                    Offline Capable
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 justify-center">
              {[
                "Clear role-based ownership (no overlap)",
                "Fixed system contracts between components",
                "Parallel development using stubs",
                "Real-time integration pipeline",
                "Focus on strict latency targets",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white/40 backdrop-blur-sm p-5 rounded-2xl flex items-center gap-4 border border-white/50 shadow-sm custom-hover transition-all"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-sm font-bold">
                      check
                    </span>
                  </div>
                  <span className="font-semibold text-on-surface">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Internal Decorative Blob */}
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        </GlassCard>

        {/* Our Approach */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-headline font-extrabold">
              Our Approach
            </h2>
            <p className="text-lg text-on-surface-variant font-medium">
              The core principles driving our architecture decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "cloud_off", title: "Real-world Constraints", desc: "Built specifically for offline, rural deployment scenarios." },
              { icon: "health_and_safety", title: "Safety Over Complexity", desc: "Deterministic outcomes prioritized over experimental flair." },
              { icon: "speed", title: "Reliability & Speed", desc: "Every millisecond saved translates to more time for patient care." },
              { icon: "language", title: "National Scalability", desc: "Designed to adapt seamlessly across diverse Indian dialects." },
            ].map((item) => (
              <GlassCard key={item.title} className="text-center p-8 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-secondary-container/40 flex items-center justify-center mb-6 text-secondary border border-secondary/10">
                  <span className="material-symbols-outlined text-[32px]">
                    {item.icon}
                  </span>
                </div>
                <h4 className="font-headline font-bold text-xl mb-3 leading-tight">{item.title}</h4>
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Hackathon Context */}
        <section className="pt-8 text-center pb-12">
          <GlassCard className="inline-flex items-center gap-4 px-8 py-5 !rounded-full">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
               <span className="material-symbols-outlined text-secondary text-lg">
                 workspace_premium
               </span>
            </div>
            <span className="font-headline font-bold text-on-surface text-lg">
              Built during Eclipse 6.0 Hackathon — Oumi Sponsor Track
            </span>
          </GlassCard>
        </section>
        
      </main>
    </div>
  );
}
