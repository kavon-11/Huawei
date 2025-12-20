import { useState } from "react";
import ChevronDownIcon from "./ChevronDownIcon";
import PricingFeatureList from "./PricingFeatureList";

export default function PricingFeatureAccordion({ features, subtitle }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div data-orientation="vertical">
      <div
        data-state={isOpen ? "open" : "closed"}
        data-orientation="vertical"
        className="border-b-0"
      >
        <h3
          data-orientation="vertical"
          data-state={isOpen ? "open" : "closed"}
          className="flex"
        >
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
          >
            See what's included
            <ChevronDownIcon />
          </button>
        </h3>
        {isOpen && (
          <div role="region" className="overflow-hidden text-sm transition-all">
            <PricingFeatureList features={features} subtitle={subtitle} />
          </div>
        )}
      </div>
    </div>
  );
}
