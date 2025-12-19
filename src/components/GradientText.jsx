export default function GradientText({ children }) {
  return (
    <span className="group inline-block">
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
        {children}
      </span>
    </span>
  );
}
