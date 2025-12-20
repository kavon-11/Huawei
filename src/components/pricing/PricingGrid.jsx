import { motion } from "framer-motion";
import PricingCard from "./PricingCard";
import { pricingPlans } from "../../data/pricingPlans";

export default function PricingGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="mx-auto grid max-w-screen-sm grid-cols-1 gap-6 rounded-2xl overflow-hidden lg:max-w-none lg:grid-cols-4 lg:gap-0 lg:rounded-3xl lg:border lg:border-zinc-700/50 lg:overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {pricingPlans.map((plan) => (
        <motion.div key={plan.id} variants={itemVariants}>
          <PricingCard plan={plan} />
        </motion.div>
      ))}
    </motion.div>
  );
}
