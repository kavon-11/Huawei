import PricingCard from "./PricingCard";
import { pricingPlans } from "../../data/pricingPlans";

export default function PricingGrid() {
  return (
    <div className="mx-auto grid max-w-screen-sm rounded-md border text-center lg:max-w-none lg:grid-cols-4 lg:border-x-0 lg:border-y">
      {pricingPlans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
