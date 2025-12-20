import { useState } from "react";
import { motion } from "framer-motion";
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
          <motion.button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-1 items-center justify-between py-4 font-medium transition-all text-gray-200 hover:text-white"
          >
            See what's included
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDownIcon />
            </motion.div>
          </motion.button>
        </h3>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          role="region"
          className="overflow-hidden text-sm transition-all"
        >
          <div className="pb-4">
            <PricingFeatureList features={features} subtitle={subtitle} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
