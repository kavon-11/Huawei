export default function DashboardCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}
