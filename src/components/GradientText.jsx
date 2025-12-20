export default function GradientText({ children }) {
  return (
    <span className="group inline-block relative">
      <span
        className="
          absolute
          top-0
          left-0
          text-transparent 
          bg-clip-text 
          bg-gradient-to-r 
          from-[#15399A] 
          to-[#A93E17]
          transition-opacity
          duration-700
          ease-in-out
          group-hover:opacity-0
        "
      >
        {children}
      </span>
      <span
        className="
          absolute
          top-0
          left-0
          text-transparent 
          bg-clip-text 
          bg-gradient-to-r 
          from-[#A93E17] 
          to-[#15399A]
          opacity-0
          transition-opacity
          duration-700
          ease-in-out
          group-hover:opacity-100
        "
      >
        {children}
      </span>
      <span className="invisible">{children}</span>
    </span>
  );
}
