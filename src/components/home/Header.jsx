import NavBar from "./NavBar";
import { Link } from "react-router-dom";

export default function Header({ mode = "dark" }) {
  const isLight = mode === "light";

  const headerClass = isLight
    ? "fixed top-0 left-0 right-0 w-full flex items-center justify-between px-6 py-4 z-50 backdrop-blur-sm border-b border-black/5 bg-white"
    : "fixed top-0 left-0 right-0 w-full flex items-center justify-between px-6 py-4 z-50 backdrop-blur-sm border-b border-white/5 bg-black";

  const textClass = isLight ? "text-black" : "text-white";

  return (
    <header className={headerClass}>
      <div
        className={`flex items-center gap-3 font-manrope font-bold text-[24px] ${textClass}`}
      >
        <img
          id="logo"
          src="/src/EchoAIAssets/real-impact-image-2.png"
          alt="Echo AI Logo"
          className="w-10 h-10 object-contain"
        />
        <label htmlFor="logo" className={textClass}>
          logo
        </label>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <NavBar mode={mode} />
      </div>

      <div className="flex items-center gap-3">
        <Link to="/auth">
          <button
            className={`${textClass} px-6 py-2.5 rounded-full font-manrope font-bold text-[16px] transition-all hover:scale-105 border-2`}
            style={{ borderColor: isLight ? "#000" : "#A93E17" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = isLight
                ? "#f0f0f0"
                : "#A93E17")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Login
          </button>
        </Link>
        <Link to="/dashboard">
          <button
            className={`${textClass} px-6 py-2.5 rounded-full font-manrope font-bold text-[16px] transition-all hover:scale-105`}
            style={{
              background: isLight
                ? "linear-gradient(90deg, #ff6b35 0%, #1e3a8a 100%)"
                : "linear-gradient(90deg, #A93E17 0%, #15399A 100%)",
            }}
          >
            Dashboard
          </button>
        </Link>
      </div>
    </header>
  );
}
