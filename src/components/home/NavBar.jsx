export default function NavBar() {
  return (
    <nav className="font-manrope font-semibold text-[18px]">
      <ul
        className="
          flex items-center gap-8
          px-8 py-3
          rounded-full
          border border-white/10
          bg-white/5 backdrop-blur-xl
          shadow-[0_0_20px_rgba(255,255,255,0.05)]
          text-white
        "
      >
        <li className="cursor-pointer hover:text-white/80 transition">Home</li>
        <li className="cursor-pointer hover:text-white/80 transition">About Us</li>
        <li className="cursor-pointer hover:text-white/80 transition">Blog</li>
        <li className="cursor-pointer hover:text-white/80 transition">Services</li>
        <li className="cursor-pointer hover:text-white/80 transition">Pages</li>
        <li className="cursor-pointer hover:text-white/80 transition">Contact Us</li>
      </ul>
    </nav>
  );
}
