import CheckIcon from "./CheckIcon";

export default function PricingFeatureList({ features, subtitle }) {
  return (
    <>
      {subtitle && <p className="mb-2 text-lg font-semibold">{subtitle}</p>}
      <ul className="mb-4 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
