export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`bg-white/40 backdrop-blur-md border border-white/20 shadow-md rounded-2xl hover:shadow-lg hover:scale-[1.01] transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
