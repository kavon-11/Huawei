export default function SectionBadge({ text }) {
  return (
    <div className="relative z-10 flex justify-center mb-10">
      <h1
        className="
            inline-flex items-center gap-2
            font-manrope font-semibold text-[18px]
            px-8 py-3
            rounded-full
            border border-white/10
            bg-white/5 backdrop-blur-xl
            shadow-[0_0_20px_rgba(255,255,255,0.05)]
            text-white
          "
      >
        ✦ {text} ✦
      </h1>
    </div>
  );
}
