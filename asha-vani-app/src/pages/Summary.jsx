export default function Summary() {
  return (
    <div className="bg-surface text-on-surface font-body">
      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-8 py-20 lg:py-32 pt-40 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container rounded-full text-sm font-semibold tracking-wide uppercase">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              emergency_home
            </span>
            Project Summary
          </div>
          <h1 className="text-6xl md:text-7xl font-headline font-extrabold tracking-tight leading-[1.1] text-primary">
            Offline Voice AI <br />
            <span className="text-on-surface-variant">for ASHA Workers.</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed">
            A real-time, fully offline voice assistant that provides clinical
            guidance in{" "}
            <span className="font-bold text-primary italic">Hinglish</span>.
          </p>
          <div className="pt-4 flex gap-4">
            <button className="bg-gradient-to-br from-primary to-primary-dim text-on-primary px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
              Explore Architecture
            </button>
            <button className="bg-surface-high text-on-surface px-8 py-4 rounded-xl font-bold hover:bg-surface-highest transition-all">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="w-full aspect-square rounded-xl overflow-hidden bg-surface-low shadow-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-primary/20 text-[120px]">
              record_voice_over
            </span>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-surface-lowest p-6 rounded-lg shadow-xl border border-outline-variant/10 max-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-error rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Live Offline
              </span>
            </div>
            <p className="text-sm font-medium text-on-surface">
              98% Protocol Accuracy in Hinglish
            </p>
          </div>
        </div>
      </header>

      {/* What is ASHA VANI */}
      <section className="bg-surface-low py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-surface-lowest p-12 rounded-lg flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-headline font-bold text-primary">
                What is ASHA VANI?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: "mic", title: "Voice-based AI", desc: "Natural conversation interface for hands-free clinical use." },
                  { icon: "wifi_off", title: "Works Offline", desc: "Zero internet required, ideal for remote rural terrain." },
                  { icon: "memory", title: "SLM + RAG", desc: "Grounding Small Language Models with verified medical data." },
                  { icon: "verified_user", title: "NHM Standards", desc: "Strict adherence to National Health Mission protocols." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-on-surface">{item.title}</h4>
                      <p className="text-sm text-on-surface-variant">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-primary/5 p-8 rounded-lg border border-primary/10">
                <p className="text-primary font-medium italic leading-relaxed">
                  &quot;ASHA VANI acts as a digital bridge, ensuring no healthcare
                  worker has to make a life-critical decision alone, regardless
                  of their location.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-headline font-bold text-primary mb-4">
            The Problem
          </h2>
          <div className="h-1 w-20 bg-primary/20 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "person_off", title: "Isolated Workers", desc: "Rural ASHA workers often operate alone without senior clinical oversight." },
            { icon: "signal_cellular_connected_no_internet_4_bar", title: "No Connectivity", desc: "Vast rural pockets lack stable 3G/4G/5G, making cloud AI useless." },
            { icon: "alarm_on", title: "High Pressure", desc: "Emergency decisions under intense pressure lead to human cognitive fatigue." },
            { icon: "cloud_off", title: "System Failure", desc: "Existing tools like IVR or cloud-based apps fail when latency is high." },
          ].map((item) => (
            <div
              key={item.title}
              className="p-8 rounded-lg bg-surface-low hover:bg-surface-container transition-colors group"
            >
              <span className="material-symbols-outlined text-4xl text-primary/40 group-hover:text-primary transition-colors mb-6 block">
                {item.icon}
              </span>
              <h3 className="text-lg font-bold mb-2 font-headline">{item.title}</h3>
              <p className="text-sm text-on-surface-variant">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Solution */}
      <section className="bg-primary py-24 text-on-primary">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-headline font-bold mb-16 text-center">
            Our Solution
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-on-primary/10 -translate-y-1/2 z-0" />
            {[
              { icon: "record_voice_over", title: "1. Speak in Hinglish", desc: 'Natural query like "Bache ko bukhar hai, kya kare?"' },
              { icon: "psychology", title: "2. Local AI Processing", desc: "Edge compute processes speech and logic in milliseconds." },
              { icon: "volume_up", title: "3. Instant Response", desc: "Clear voice response following NHM approved steps." },
            ].map((step) => (
              <div
                key={step.title}
                className="relative z-10 flex flex-col items-center text-center max-w-[280px]"
              >
                <div className="w-20 h-20 bg-primary-fixed-dim rounded-full flex items-center justify-center mb-6 shadow-xl">
                  <span className="material-symbols-outlined text-primary text-4xl">
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline">{step.title}</h3>
                <p className="text-sm text-on-primary/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold text-primary mb-4">
              System Architecture
            </h2>
            <p className="text-on-surface-variant">
              The 7-step edge computing pipeline
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { icon: "sound_detection_dog_barking", step: "Step 1", name: "VAD", desc: "Voice Detection" },
              { icon: "speech_to_text", step: "Step 2", name: "STT", desc: "Hinglish Speech Engine" },
              { icon: "priority_high", step: "Step 3", name: "Urgency", desc: "Tone & Context" },
              { icon: "database", step: "Step 4", name: "RAG", desc: "Protocol Retrieval" },
              { icon: "smart_toy", step: "Step 5", name: "SLM", desc: "Inference Engine" },
              { icon: "text_to_speech", step: "Step 6", name: "TTS", desc: "Voice Synthesis" },
              { icon: "list_alt", step: "Step 7", name: "Logging", desc: "Session Tracking" },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 bg-surface-low rounded-lg text-center border-t-4 border-primary"
              >
                <span className="material-symbols-outlined text-primary mb-3 block">
                  {item.icon}
                </span>
                <div className="text-xs font-bold uppercase tracking-tighter opacity-60 mb-1">
                  {item.step}
                </div>
                <div className="font-bold text-sm">{item.name}</div>
                <div className="text-[10px] text-on-surface-variant leading-tight mt-1">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes It Unique */}
      <section className="py-24 bg-surface-low">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-headline font-bold text-primary mb-12 text-center">
            What Makes It Unique
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "shutter_speed", title: "Latency < 500ms", desc: "Edge-optimized models ensure conversation flows naturally without lag." },
              { icon: "translate", title: "Hinglish-Native", desc: "Built from ground up to understand the linguistic blend of rural Hindi and medical English." },
              { icon: "cloud_off", title: "100% Offline", desc: "The entire stack—STT, LLM, TTS—runs on the device without pinging a server." },
              { icon: "model_training", title: "Fine-tuned SLM", desc: "Small Language Models specifically trained on Indian healthcare corpora." },
              { icon: "anchor", title: "RAG-Grounded", desc: "Answers are strictly tied to verified protocol documents, not generic training data." },
              { icon: "security", title: "Anti-Hallucination", desc: "Multi-layer safety checks ensure zero hallucinated medical advice is given." },
            ].map((item) => (
              <div key={item.title} className="bg-surface-lowest p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 font-headline">{item.title}</h3>
                <p className="text-sm text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Reliability */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-headline font-bold text-primary mb-6">
              Safety &amp; Reliability
            </h2>
            <p className="text-on-surface-variant">
              Trust is paramount in healthcare. ASHA VANI is engineered to be a
              conservative advisor.
            </p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              "Based on NHM Guidelines",
              "Refuses out-of-scope queries",
              "No hallucinated medical advice",
            ].map((text) => (
              <div
                key={text}
                className="p-6 bg-surface-container rounded-lg border border-outline-variant/20 flex flex-col gap-4"
              >
                <span
                  className="material-symbols-outlined text-green-700"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  check_circle
                </span>
                <p className="font-semibold text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-World Impact */}
      <section className="py-24 bg-primary-container/30">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-headline font-bold text-primary mb-12 text-center">
            Real-World Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "~1 Million", label: "ASHA Workers", desc: "Empowering the backbone of rural healthcare." },
              { value: "70%", label: "Rural Coverage", desc: "Bridging the gap in areas with zero network." },
              { value: "0 KB", label: "Data Required", desc: "Truly decentralized AI assistance." },
              { value: "90%", label: "Stress Reduction", desc: "Lowering decision fatigue during triage." },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-8 bg-surface-lowest rounded-lg shadow-sm"
              >
                <div className="text-4xl font-black text-primary mb-2 font-headline">
                  {stat.value}
                </div>
                <p className="text-sm font-bold text-on-surface">{stat.label}</p>
                <p className="text-xs text-on-surface-variant mt-2">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
