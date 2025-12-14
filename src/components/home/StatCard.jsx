import Counter from "./counter";

export default function StatCard({ title, end, suffix, icon, image }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-white hover:bg-white/10 transition-colors duration-300 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <span className="text-sm text-white/70">{title}</span>
        <span className="opacity-60 text-xl">{icon || <FaArrowRight />}</span>
      </div>

      <div className="text-[40px] font-light mb-6">
        <Counter end={end} suffix={suffix} />
      </div>

      {image ? (
        <div className="h-32 w-full rounded-lg overflow-hidden mt-auto">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className="h-16 opacity-60 mt-auto">
          {/* Placeholder for mini chart / svg */}
          <div className="w-full h-full bg-gradient-to-r from-white/5 to-transparent rounded-lg" />
        </div>
      )}
    </div>
  );
}
