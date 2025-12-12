import NavBar from "./NavBar";

export default function Header() {
  return (
    <header 
      className="fixed top-0 left-0 right-0 w-full flex items-center justify-center px-6 py-4 z-50 backdrop-blur-sm border-b border-white/5"
      
    >
      <div className="flex items-center gap-3 font-manrope font-bold text-[24px] text-white">
        <img
          id="logo"
          src="/src/EchoAIAssets/real-impact-image-2.png"
          alt="Echo AI Logo"
          className="w-10 h-10 object-contain"
        />
        <label htmlFor="logo">logo</label>
      </div>

      <div className="flex-1 flex justify-center">
        <NavBar />
      </div>

      <button
        className="text-white px-6 py-2.5 rounded-full font-manrope font-bold text-[16px] transition-all hover:scale-105"
        style={{
          background: "linear-gradient(90deg, #A93E17 0%, #15399A 100%)",
        }}
      >
        Upgrade Plan
      </button>
    </header>
  );
}
