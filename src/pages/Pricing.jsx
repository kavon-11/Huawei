import PricingHeader from "../components/pricing/PricingHeader";
import PricingGrid from "../components/pricing/PricingGrid";
import Shape2 from "../components/shapes/shape2";
import Shape4 from "../components/shapes/shape4";
import pricingBg from "@/EchoAIAssets/gradient-abstract-wireframe-background_23-2149003418.avif";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative w-full py-32 px-6 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundColor: "#060606",
      }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <PricingHeader />
        <PricingGrid />
      </div>
    </section>
  );
}
