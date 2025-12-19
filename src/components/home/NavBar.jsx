import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <li>
          <button
            onClick={scrollToTop}
            className="cursor-pointer hover:text-white/80 transition"
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("about")}
            className="cursor-pointer hover:text-white/80 transition"
          >
            About Us
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("services")}
            className="cursor-pointer hover:text-white/80 transition"
          >
            Services
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("faq")}
            className="cursor-pointer hover:text-white/80 transition"
          >
            FAQ
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("contact")}
            className="cursor-pointer hover:text-white/80 transition"
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
}
