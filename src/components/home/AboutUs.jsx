import ScrollAnimatedText from "./ScrollAnimatedText";
import StatCard from "./StatCard";
import img1 from "../../EchoAIAssets/about-item-image-1.png";
import img2 from "../../EchoAIAssets/about-item-image-2.png";
import img3 from "../../EchoAIAssets/about-item-image-3.png";
import img4 from "../../EchoAIAssets/about-item-image-4.png";
import {
  FaCheckCircle,
  FaProjectDiagram,
  FaRobot,
  FaRocket,
} from "react-icons/fa";
import Shape2 from "../shapes/shape2";
import Shape4 from "../shapes/shape4";
import SectionBadge from "../SectionBadge";

export default function AboutUs() {
  return (
    <section
      className="relative w-full py-24 overflow-hidden"
      style={{ backgroundColor: "#060606" }}
    >
      {/* ABOUT BADGE */}
      <SectionBadge text="About Us" />

      {/* MAIN TEXT */}
      <ScrollAnimatedText text="Our team of data scientists, engineers, and designers work at the intersection technology and strategy turning complex challenges into simple, AI powered solutions." />

      {/* STATS GRID */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            title="Seamless Integration"
            end={298}
            suffix="+"
            icon={<FaCheckCircle />}
            image={img1}
            cardWidth="max-w-[520px]"
            imageSize="w-48"
            minHeight="min-h-auto"
            compactLayout={true}
          />
          <StatCard
            title="AI Projects Delivered"
            end={978}
            suffix="+"
            icon={<FaProjectDiagram />}
            image={img2}
            cardWidth="max-w-[520px]"
            imageSize="w-48"
            minHeight="min-h-auto"
            compactLayout={true}
          />
          <StatCard
            title="Handled by AI Bots"
            end={300}
            suffix="%"
            icon={<FaRobot />}
            image={img3}
            cardWidth="max-w-[520px]"
            imageSize="w-48"
            minHeight="min-h-auto"
            compactLayout={true}
          />
          <StatCard
            title="Faster Time to Market"
            end={95}
            suffix="X"
            icon={<FaRocket />}
            image={img4}
            cardWidth="max-w-[520px]"
            imageSize="w-48"
            minHeight="min-h-auto"
            compactLayout={true}
          />
        </div>
      </div>
      <Shape2 />
      <Shape4 />
    </section>
  );
}
