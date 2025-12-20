import Counter from "./counter";
import { FaArrowRight } from "react-icons/fa";

export default function StatCard({
  title,
  end,
  suffix,
  icon,
  image,
  effect = true,
}) {
  return (
    <div className="relative w-full max-w-[480px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-4 text-white hover:bg-white/10 transition-colors duration-300">
      {effect && (
        <>
          <div
            className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "#15399A" }}
          />
          <div
            className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "#A93E17" }}
          />
        </>
      )}

      <div className="relative z-10">
        <div className="flex items-center text-lg font-semibold">
          <span className="pr-12">{title}</span>
          <span className="ml-auto opacity-60">{icon || <FaArrowRight />}</span>
        </div>

        <div className="mt-6 text-[40px] font-light leading-none">
          <Counter end={end} suffix={suffix} />
        </div>

        {image && (
          <div className="mt-10">
            <img src={image} alt={title} className="block w-36 h-auto" />
          </div>
        )}
      </div>
    </div>
  );
}
