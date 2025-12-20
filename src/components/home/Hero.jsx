import Shape1 from "../shapes/shape1";
import Shape2 from "../shapes/shape2";
import Shape3 from "../shapes/shape3";
import Shape4 from "../shapes/shape4";
import GradientText from "../GradientText";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="  min-h-screen flex flex-col items-center justify-center text-center px-6 pt-52 overflow-hidden 
      bg-[url('/src/EchoAIAssets/hero-bg.webp')] bg-cover bg-center bg-no-repeat"
      style={{ backgroundColor: "#060606" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#A93E17]/10 via-transparent to-[#15399A]/20"></div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/square-bg.png')] opacity-[0.03]"></div>

      <Shape1 />
      <Shape2 />
      <Shape3 />
      <Shape4 />

      {/* Text + Buttons */}
      <div className="relative z-10 max-w-5xl">
        <h1 className="text-white text-5xl md:text-7xl font-semibold leading-tight ">
          Transform your business
          <br />
          with the <GradientText>power of AI</GradientText>
        </h1>

        <p className="text-gray-400 mt-6 text-lg font-normal max-w-4xl mx-auto mb-12 ">
          In a world where cyberattacks are becoming more sophisticated, your
          business deserves the best protection. Our expert team leverages
          cutting-edge technology.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/auth">
            <button className="px-7 border border-[#A93E17] bg-black py-3 rounded-full text-white transition hover:scale-105  font-bold">
              Get Started Today
            </button>
          </Link>
          <Link to="/auth">
            <button
              className="px-7 py-3 rounded-full text-white transition hover:scale-105  font-bold"
              style={{
                background: "linear-gradient(90deg, #15399A 0%, #A93E17 100%)",
              }}
            >
              Join Now
            </button>
          </Link>
        </div>
      </div>

      <div className="space-y-4 mt-20">
        <p className="font-semibold text-xl text-gray-300">
          Already chosen by the leaders
        </p>
        <div className="flex gap-2">
          <img src="/src/EchoAIAssets/Writesonic.png" className="w-auto h-20" />
          <img src="/src/EchoAIAssets/Writesonic.png" className="w-auto h-20" />
          <img src="/src/EchoAIAssets/Writesonic.png" className="w-auto h-20" />
          <img src="/src/EchoAIAssets/Writesonic.png" className="w-auto h-20" />
          <img src="/src/EchoAIAssets/Writesonic.png" className="w-auto h-20" />
        </div>
      </div>

      {/* Gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#060606] via-[#060606]/80 "></div>
    </section>
  );
}
