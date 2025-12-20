import { motion } from "framer-motion";
import PricingFeatureAccordion from "./PricingFeatureAccordion";
import PricingFeatureList from "./PricingFeatureList";

export default function PricingCard({ plan }) {
  const {
    name,
    description,
    price,
    billing,
    buttonText,
    buttonStyle,
    features,
    subtitle,
    highlighted,
  } = plan;

  const isEnterprise = price === null;
  const isHighlighted = highlighted;

  // Dark theme styling
  const bgClass = isHighlighted
    ? "bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700/50 lg:scale-105"
    : "bg-zinc-900/40 border border-zinc-800/50";
  const textColorClass = "text-white";
  const descriptionColorClass = "text-gray-300";
  const buttonClass =
    buttonStyle === "primary"
      ? "bg-gradient-to-r from-[#15399A] to-[#A93E17] text-white hover:opacity-90 border-0"
      : "border border-zinc-600 bg-transparent text-white hover:bg-zinc-800/50";

  return (
    <motion.div
      className={`flex flex-col rounded-2xl p-8 h-full transition-all duration-300 ${bgClass}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Title */}
      <div className={`text-2xl md:text-3xl font-bold ${textColorClass} mb-2`}>
        {name}
      </div>

      {/* Description */}
      <div
        className={`text-balance ${descriptionColorClass} mb-6 text-sm md:text-base`}
      >
        {description}
      </div>

      {/* Price */}
      <div className="mb-6">
        {!isEnterprise ? (
          <>
            <div className="mb-4 flex items-start justify-center">
              <span className="text-xl font-semibold text-gray-400 mt-1">
                $
              </span>
              <span className="text-5xl md:text-6xl font-bold text-white ml-1">
                {price}
              </span>
            </div>
            {billing && (
              <p className="text-xs md:text-sm text-gray-400 text-center">
                {billing.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </p>
            )}
          </>
        ) : (
          <div className="text-center text-gray-400 py-8 text-sm">
            Custom pricing based on your needs
          </div>
        )}
      </div>

      {/* CTA Button */}
      <motion.button
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold px-6 py-3 w-full transition-all duration-300 ${buttonClass}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {buttonText}
      </motion.button>

      {buttonStyle === "primary" && (
        <p className="mt-4 text-gray-400 text-center text-sm">
          or
          <a
            href="#"
            className="ml-1 text-blue-400 hover:text-blue-300 underline"
          >
            purchase now
          </a>
        </p>
      )}

      {/* Divider */}
      <div className="my-6 h-px bg-zinc-700/50"></div>

      {/* Features */}
      <div className="flex-1 text-left">
        {/* Desktop Features */}
        <div className="hidden lg:block">
          <PricingFeatureList features={features} subtitle={subtitle} />
          <a
            href="#"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-4 inline-block"
          >
            Learn more →
          </a>
        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden">
          <PricingFeatureAccordion features={features} subtitle={subtitle} />
          <a
            href="#"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-4 inline-block"
          >
            Learn more →
          </a>
        </div>
      </div>
    </motion.div>
  );
}
