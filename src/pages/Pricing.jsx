import PricingHeader from "../components/pricing/PricingHeader";
import PricingGrid from "../components/pricing/PricingGrid";

export default function Pricing() {
  return (
    <section className="py-32">
      <div className="container">
        <PricingHeader />
        <PricingGrid />
      </div>
    </section>
  );
}
