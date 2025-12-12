import Shape1 from "../shapes/shape1";
import Shape2 from "../shapes/shape2";
import Shape3 from "../shapes/shape3";
import Shape4 from "../shapes/shape4";

export default function Hero() {
  return (
    <section
      className="  min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden 
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
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight font-manrope group">
  Transform your business
  <br />
  with the{" "}
  <span
    className="
      text-transparent 
      bg-clip-text 
      bg-gradient-to-r 
      from-[#15399A] 
      to-[#A93E17] 
      transition-all 
      duration-500 
      group-hover:from-[#A93E17] 
      group-hover:to-[#15399A]
    "
  >
    power of AI
  </span>
</h1>


        <p className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto font-manrope">
          In a world where cyberattacks are becoming more sophisticated, your
          business deserves the best protection. Our expert team leverages
          cutting-edge technology.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button
            className="px-7 py-3 rounded-full text-white border-2 transition hover:scale-105 font-manrope font-bold"
            style={{ borderColor: "#A93E17" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#A93E17")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Get Started Today
          </button>

          <button
            className="px-7 py-3 rounded-full text-white transition hover:scale-105 hover:opacity-90 font-manrope font-bold"
            style={{
              background: "linear-gradient(90deg, #15399A 0%, #A93E17 100%)",
            }}
          >
            Join Now
          </button>
        </div>

        </div>
    </section>
  );
}
