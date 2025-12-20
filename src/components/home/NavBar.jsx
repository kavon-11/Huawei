import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ mode = "dark" }) {
  const isLight = mode === "light";

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navClass = isLight
    ? "flex items-center gap-6 px-8 py-3 rounded-full border border-black/10 bg-black/5 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.05)] text-black whitespace-nowrap"
    : "flex items-center gap-6 px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)] text-white whitespace-nowrap";

  const hoverClass = isLight ? "hover:text-black/80" : "hover:text-white/80";

  return (
    <nav className="font-normal text-base">
      <ul className={navClass}>
        <li>
          <button
            onClick={scrollToTop}
            className={`cursor-pointer ${hoverClass} transition`}
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("about")}
            className={`cursor-pointer ${hoverClass} transition`}
          >
            About Us
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("blog")}
            className={`cursor-pointer ${hoverClass} transition`}
          >
            Blog
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("services")}
            className={`cursor-pointer ${hoverClass} transition`}
          >
            Services
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("pricing")}
            className={`cursor-pointer ${hoverClass} transition`}
          >
            Pricing
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("faq")}
            className={`cursor-pointer ${hoverClass} transition`}
          >
            FAQ
          </button>
        </li>

        <li>
          <button
            onClick={() => scrollToSection("contact")}
            className={`cursor-pointer ${hoverClass} transition`}
          >
            Contact Us
          </button>
        </li>
      </ul>
    </nav>
  );
}
