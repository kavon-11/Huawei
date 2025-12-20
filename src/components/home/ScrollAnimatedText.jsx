import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function ScrollAnimatedText({ text }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "start 70%"],
  });

  const words = text.split(" ");

  return (
    <div
      ref={ref}
      className="relative z-10 max-w-5xl mx-auto text-center mb-20 px-6"
    >
      <p className="  text-[32px] md:text-[44px] leading-tight">
        {words.map((word, index) => {
          const start = index / words.length;
          const end = (index + 1) / words.length;

          const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
          const fontWeight = useTransform(
            scrollYProgress,
            [start, end],
            [300, 500]
          );

          return (
            <motion.span
              key={index}
              style={{
                opacity,
                fontWeight,
              }}
              className="inline-block  mr-2 text-white"
            >
              {word}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
}
export default ScrollAnimatedText;
