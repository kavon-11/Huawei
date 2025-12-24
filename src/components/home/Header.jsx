import NavBar from "./NavBar";
import { Link } from "react-router-dom";

export default function Header({ mode = "dark" }) {
  const isLight = mode === "light";

  const headerClass = isLight
    ? "fixed top-0 left-0 right-0 w-full flex items-center justify-between px-6 py-4 z-50 backdrop-blur-sm border-b border-black/5 bg-white"
    : "fixed top-0 left-0 right-0 w-full flex items-center justify-between py-6 z-50 max-w-7xl mx-auto ";

  const textClass = isLight ? "text-black" : "text-white";

  return (
    <header className={headerClass}>
      <div
        className={`flex items-center gap-3 font-manrope font-bold text-[24px] ${textClass}`}
      >
        <img
          id="logo"
          src="/src/EchoAIAssets/echo.png"
          alt="Echo AI Logo"
          className="w-44 h-auto"
        />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <NavBar mode={mode} />
      </div>

      <div className="flex items-center gap-3">
        <Link to="/auth">
          <button
            className={`${textClass} px-6 py-2 rounded-full font-medium text-[16px] transition-all hover:scale-105`}
            style={{
              background: isLight
                ? "linear-gradient(90deg, #ff6b35 0%, #1e3a8a 100%)"
                : "linear-gradient(90deg, #A93E17 0%, #15399A 100%)",
            }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </header>
  );
}
