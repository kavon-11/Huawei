import Counter from "./counter";

export default function StatCard({
  title,
  end,
  suffix,
  icon,
  image,
  effect = true,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-white hover:bg-white/10 transition-colors duration-300 flex flex-col h-full relative overflow-hidden">
      {/* Conditional gradient effects */}
      {effect && (
        <>
          {/* Top left blue fade */}
          <div
            className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "#15399A" }}
          />
          {/* Bottom right orange fade */}
          <div
            className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "#A93E17" }}
          />
        </>
      )}

      <div className="flex items-center justify-between mb-8 relative z-10">
        <span className="text-sm text-white/70">{title}</span>
        <span className="opacity-60 text-xl">{icon || <FaArrowRight />}</span>
      </div>

      <div className="text-[40px] font-light mb-6 relative z-10">
        <Counter end={end} suffix={suffix} />
      </div>

      {image ? (
        <div className="h-32 w-full rounded-lg overflow-hidden mt-auto relative z-10">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className="h-16 opacity-60 mt-auto relative z-10">
          {/* Placeholder for mini chart / svg */}
          <div className="w-full h-full bg-gradient-to-r from-white/5 to-transparent rounded-lg" />
        </div>
      )}
    </div>
  );
}
