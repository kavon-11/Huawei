import GradientText from "../GradientText";

export default function Footer() {
  return (
    <footer
      className="text-white py-16 font-manrope"
      style={{ backgroundColor: "#060606" }}
    >
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Transform your business with{" "}
            <GradientText>AI solutions</GradientText>
          </h2>

          <p className="max-w-md mx-auto mt-4 text-white/70">
            Leverage cutting-edge AI technology to drive innovation and growth
            for your business.
          </p>

          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-3 text-sm font-bold tracking-wide text-white capitalize transition-all duration-300 transform rounded-full hover:scale-105"
              style={{
                background: "linear-gradient(90deg, #A93E17 0%, #15399A 100%)",
              }}
            >
              Get Started
            </button>
          </div>
        </div>

        <hr className="my-10 border-white/10" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-white/60">
            © Copyright {new Date().getFullYear()}. All Rights Reserved.
          </p>

          <div className="flex mt-3 -mx-2 sm:mt-0">
            <a
              href="#"
              className="mx-2 text-sm text-white/60 transition-colors duration-300 hover:text-white"
              aria-label="Teams"
            >
              Teams
            </a>

            <a
              href="#"
              className="mx-2 text-sm text-white/60 transition-colors duration-300 hover:text-white"
              aria-label="Privacy"
            >
              Privacy
            </a>

            <a
              href="#"
              className="mx-2 text-sm text-white/60 transition-colors duration-300 hover:text-white"
              aria-label="Cookies"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
