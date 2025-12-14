import React, { useState } from "react";
import { motion } from "framer-motion";
import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" data-lenis-prevent>
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
        className="bg-white dark:bg-gray-900 border-r dark:border-gray-700 z-10 flex-shrink-0"
      >
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </motion.div>

      {/* Right area: header on top, content fills remaining space */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-[#0f172a] text-white">
          <Header />
        </header>

        <main
          className="flex-1 bg-[#111827] overflow-y-auto p-4"
          data-lenis-prevent
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
