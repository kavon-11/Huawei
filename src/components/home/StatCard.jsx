import Counter from "./counter";
import { FaArrowRight } from "react-icons/fa";

export default function StatCard({
  title,
  end,
  suffix,
  icon,
  image,
  effect = true,
  subtitle,
  imagePosition = "left",
  showCounter = true,
  cardWidth = "max-w-[480px]",
  imageSize = "w-36",
  minHeight = "min-h-[480px]",
  compactLayout = false,
}) {
  return (
    <div
      className={`relative w-full ${cardWidth} ${minHeight} rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-6 text-white hover:bg-white/10 transition-colors duration-300 flex flex-col`}
    >
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

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center text-xl font-semibold mb-8">
          <span className="pr-12">{title}</span>
          <span className="ml-auto opacity-60">{icon || <FaArrowRight />}</span>
        </div>

        {showCounter && end !== undefined && (
          <div className="mb-8 text-[40px] font-light leading-none">
            <Counter end={end} suffix={suffix} />
          </div>
        )}

        {subtitle && (
          <p
            className={`text-base text-white/70 leading-relaxed ${
              compactLayout ? "mb-4" : "mb-8 flex-grow"
            }`}
          >
            {subtitle}
          </p>
        )}

        {image && (
          <div
            className={`${compactLayout ? "" : "mt-auto"} pt-6 ${
              imagePosition === "center" ? "flex justify-center" : ""
            }`}
          >
            <img
              src={image}
              alt={title}
              className={`block ${imageSize} h-auto`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
