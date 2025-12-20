import { motion, useScroll, useTransform } from "framer-motion";
import GradientText from "../GradientText";
import SectionBadge from "../SectionBadge";

export default function PricingHeader() {
  const { scrollYProgress } = useScroll();

  // Scroll-based animation
  const opacity = useTransform(scrollYProgress, [0.25, 0.4], [0.4, 1]);
  const fontWeight = useTransform(scrollYProgress, [0.25, 0.4], [400, 700]);

  return (
    <>
      <SectionBadge text="Pricing Plans" />
      <motion.div
        className="mx-auto mb-20 max-w-screen-lg text-center"
        style={{ opacity }}
      >
        <h2 className="mb-3 text-pretty text-4xl md:text-5xl font-bold lg:text-6xl text-white font-manrope leading-tight">
          Flexible plans designed for your <GradientText>growth</GradientText>
        </h2>
        <p className="text-gray-300 lg:text-xl mt-6">
          Choose the perfect plan that scales with your business. From startups
          to enterprises, we have the right solution for you.
        </p>
      </motion.div>
    </>
  );
}
