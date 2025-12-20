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

  const bgClass = isHighlighted ? "bg-zinc-100" : "";
  const buttonClass =
    buttonStyle === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-900/90"
      : "border border-input bg-white hover:bg-zinc-100 hover:text-zinc-800";

  return (
    <div className={`flex flex-col ${bgClass}`}>
      {/* Title */}
      <div className={`px-6 pb-2 pt-6 text-3xl font-semibold ${bgClass}`}>
        {name}
      </div>

      {/* Description */}
      <div className={`text-balance px-6 text-zinc-600 ${bgClass}`}>
        {description}
      </div>

      {/* Price */}
      <div className={`p-6 ${bgClass}`}>
        {!isEnterprise ? (
          <>
            <div className="mb-4 flex justify-center">
              <span className="text-lg font-semibold">$</span>
              <span className="text-6xl font-semibold">{price}</span>
            </div>
            {billing && (
              <p className="text-sm text-zinc-600">
                {billing.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </p>
            )}
          </>
        ) : null}
      </div>

      {/* CTA Button */}
      <div className={`p-6 ${bgClass}`}>
        <button
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full ${buttonClass}`}
        >
          {buttonText}
        </button>
        {buttonStyle === "primary" && (
          <p className="mt-4 text-zinc-600">
            or
            <a href="#" className="ml-1 text-gray-800 hover:underline">
              purchase now
            </a>
          </p>
        )}
      </div>

      {/* Features */}
      <div
        className={`border-b p-6 text-left ${
          isHighlighted ? "border-b bg-zinc-100" : "border-b"
        } lg:border-b-0 lg:border-t`}
      >
        {/* Desktop Features */}
        <div className="hidden lg:block">
          <PricingFeatureList features={features} subtitle={subtitle} />
          <a href="#" className="hover:underline">
            Learn more
          </a>
        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden">
          <PricingFeatureAccordion features={features} subtitle={subtitle} />
          <a href="#" className="hover:underline">
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
