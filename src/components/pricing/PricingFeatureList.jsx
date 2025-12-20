import CheckIcon from "./CheckIcon";

export default function PricingFeatureList({ features, subtitle }) {
  return (
    <>
      {subtitle && (
        <p className="mb-4 text-sm font-semibold text-gray-300">{subtitle}</p>
      )}
      <ul className="mb-4 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <CheckIcon />
            <span className="text-gray-200 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
