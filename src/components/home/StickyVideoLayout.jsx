import videoSrc from "../../EchoAIAssets/nextmind-how-work-video.mp4";
import { FaBrain, FaDatabase, FaCog,  FaAward } from "react-icons/fa";
import GradientText from "../GradientText";

const steps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    desc: "We dive deep into your goals and challenges to uncover high-impact AI opportunities.",
    icon: FaBrain,
  },
  {
    step: "02",
    title: "Data & Infrastructure Assessment",
    desc: "We evaluate your data readiness and technical foundation.",
    icon: FaDatabase,
  },
  {
    step: "03",
    title: "Custom AI Development",
    desc: "We design and deploy scalable AI solutions tailored to your needs.",
    icon: FaCog,
  },
  {
    step: "04",
    title: "Continuous Improvement",
    desc: "We monitor performance and refine models to ensure lasting impact.",
    icon: FaAward,
  }
];

export default function StickyVideoLayout() {
  return (
    <section
      className="text-white py-24"
      style={{ backgroundColor: "#060606" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT — CONTENT */}
        <div className="space-y-10">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/80">
            ✦ HOW IT WORK ✦
          </span>

          {/* Title */}
          <h2 className="text-4xl font-semibold leading-tight">
            Our process for smarter <br />
            <GradientText>AI solutions</GradientText>
          </h2>

          {/* Steps */}
          <div className="space-y-6 pt-6">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.step}
                  className="rounded-2xl bg-white/5 border border-white/10 p-6 flex gap-6"
                >
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 text-orange-500 text-xl">
                    <IconComponent />
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-xs text-white/50 mb-1">
                      STEP {step.step}
                    </p>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — STICKY IMAGE / VIDEO */}
        <div className="sticky top-24 self-start">
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <video
              src={videoSrc}
              className="w-full h-[520px] object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* Caption */}
          <p className="mt-6 text-sm text-white/60">
            We help businesses design, build, and deploy intelligent solutions
            that drive real results.{" "}
            <span className="text-orange-500 cursor-pointer">Contact Now</span>
          </p>
        </div>
      </div>
    </section>
  );
}
