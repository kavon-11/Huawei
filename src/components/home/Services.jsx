import { motion, useScroll, useTransform } from "framer-motion";
import StatCard from "./StatCard";
import { FaBolt, FaLayerGroup, FaRobot } from "react-icons/fa";
import img1 from "@/EchoAIAssets/service-item-1.png"
import img2 from "@/EchoAIAssets/service-item-2.png"
import img3 from "@/EchoAIAssets/service-item-3.png"
import GradientText from "../GradientText";
import ScrollAnimatedText from "./ScrollAnimatedText";

export default function Services() {
  const { scrollYProgress } = useScroll();

  // Scroll-based animation for main text
  const opacity = useTransform(scrollYProgress, [0.15, 0.3], [0.4, 1]);
  const fontWeight = useTransform(scrollYProgress, [0.15, 0.3], [400, 700]);

  return (
    <section
      className="relative w-full py-32 px-6"
      style={{ backgroundColor: "#060606" }}
    >
      {/* Badge */}
      <div className="flex justify-center mb-6">
        <span
          className="
            inline-flex items-center gap-2
            px-6 py-2 rounded-full
            border border-white/10
            bg-white/5 backdrop-blur
            text-xs text-white/80
          "
        >
          ✦ OUR SERVICES ✦
        </span>
      </div>

      {/* Title */}
      <motion.h2
        style={{ opacity, fontWeight }}
        className="
          text-center text-4xl md:text-5xl
          font-manrope text-white
          max-w-3xl mx-auto mb-20
        "
      >
        AI-driven design services for future{" "}
        <GradientText>innovations</GradientText>
      </motion.h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <StatCard
          title="AI Strategy & Consulting"
          end={120}
          suffix="+"
          icon={<FaBolt />}
          image={img1}
        />

        <StatCard
          title="AI Integration & Deployment"
          end={98}
          suffix="%"
          icon={<FaLayerGroup />}
          image={img2}
        />

        <StatCard
          title="Custom AI Solutions"
          end={300}
          suffix="%"
          icon={<FaRobot />}
          image={img3}
        />
      </div>
    </section>
  );
}
