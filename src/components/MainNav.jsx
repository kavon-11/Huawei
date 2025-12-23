import React, { useState } from "react";
import { motion } from "framer-motion";
import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="flex h-screen overflow-hidden"
      data-lenis-prevent
      style={{ backgroundColor: "#060606" }}
    >
      {/* Sidebar Wrapper with Framer Motion */}
      <motion.div
        initial={{ width: "4rem" }} // Start collapsed (w-16 equivalent)
        animate={{ width: isOpen ? "16rem" : "4rem" }} // Animate to w-64 or w-16
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="border-r border-white/10 z-10 flex-shrink-0"
        style={{ backgroundColor: "#060606" }}
      >
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </motion.div>

      {/* Right area: header on top, content fills remaining space */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="border-b border-white/10"
          style={{ backgroundColor: "#060606" }}
        >
          <Header />
        </header>

        <main
          className="flex-1 overflow-y-auto"
          data-lenis-prevent
          style={{ backgroundColor: "#060606" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
