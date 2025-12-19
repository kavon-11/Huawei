import GradientText from "../GradientText";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Shape3 from "../shapes/shape3";

const faqs = [
  {
    question: "What services does your AI agency offer?",
    answer:
      "We provide end-to-end AI solutions including AI strategy consulting, custom machine learning models, AI-powered automation, chatbots, data analytics, and system integrations tailored to your business needs.",
  },
  {
    question: "Do I need a large amount of data to use AI?",
    answer:
      "Not necessarily. While more data can improve model performance, we can work with small datasets using pre-trained models, data augmentation, or hybrid AI approaches depending on your use case.",
  },
  {
    question: "How long does it take to develop an AI solution?",
    answer:
      "Timelines vary by complexity. Simple AI integrations can take 2–4 weeks, while custom AI systems typically take 2–3 months including discovery, development, and testing.",
  },
  {
    question: "Is my data secure with you?",
    answer:
      "Yes. We follow strict data security best practices, including encryption, access controls, and compliance with industry standards. Your data remains confidential and is never shared without consent.",
  },
  {
    question: "Can you integrate AI into our existing systems?",
    answer:
      "Absolutely. We specialize in integrating AI solutions into existing platforms, APIs, CRMs, and internal tools with minimal disruption to your current workflows.",
  },
];

export default function FAQSection() {

  const [open, setOpen] = useState(null);

  return (
    <section
      className="text-white py-28"
      style={{ backgroundColor: "#060606" }}
    >
        
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT — STICKY CONTENT */}
        <div className="sticky top-28 self-start space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/80">
            ✦ FAQ’s ✦
          </span>

          <h2 className="text-4xl font-semibold leading-tight">
            Your AI questions, expertly{" "}
            <GradientText>answered here</GradientText>
          </h2>

          <button
            className="text-white px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{
              background: "linear-gradient(90deg, #A93E17 0%, #15399A 100%)",
            }}
          >
            View All FAQs
          </button>
        </div>

        {/* RIGHT — FAQ ACCORDION */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/5"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium">
                  {i + 1}. {faq.question}
                </span>
                <span className="text-lg">
                  {open === i ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>

              {open === i && (
                <div className="px-6 pb-6 text-white/70 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
        <Shape3 />
    </section>
  );
}
