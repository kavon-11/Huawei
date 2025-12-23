import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaThLarge,
  FaHistory,
  FaRobot,
  FaBook,
  FaChartLine,
} from "react-icons/fa";

export default function SideBar({ isOpen, setIsOpen }) {
  // Helper to animate text labels
  const showLabel = {
    hidden: { opacity: 0, width: 0, display: "none" },
    visible: {
      opacity: 1,
      width: "auto",
      display: "block",
      transition: { delay: 0.1 },
    },
  };

  const menuItems = [
    {
      to: "/dashboard",
      icon: <FaThLarge className="w-6 h-6" />,
      label: "Overview",
    },
    {
      to: "/dashboard/history",
      icon: <FaHistory className="w-6 h-6" />,
      label: "Call History",
    },
    {
      to: "/dashboard/ai-config",
      icon: <FaRobot className="w-6 h-6" />,
      label: "Configure AI",
    },
    {
      to: "/dashboard/knowledge",
      icon: <FaBook className="w-6 h-6" />,
      label: "Knowledge Base",
    },
    {
      to: "/dashboard/analytics",
      icon: <FaChartLine className="w-6 h-6" />,
      label: "Analytics",
    },
  ];

  return (
    <div className="flex flex-col h-full py-8 overflow-y-auto overflow-x-hidden w-full font-manrope">
      <nav className="flex flex-col flex-1 space-y-2 px-3">
        {/* Logo & Toggle Area */}
        <div className="flex items-center justify-between px-2 mb-8">
          {isOpen ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#15399A] to-[#A93E17] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-bold text-white whitespace-nowrap text-lg"
                >
                  EchoAI
                </motion.span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition"
              >
                <motion.div whileTap={{ scale: 0.9 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </motion.div>
              </button>
            </>
          ) : (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#15399A] to-[#A93E17] flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-gray-400 rounded-lg hover:bg-white/5 hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Menu Items */}
        {menuItems.map((item, idx) => {
          const isActive = window.location.pathname === item.to;
          return (
            <Link
              key={idx}
              to={item.to}
              className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
                !isOpen ? "justify-center" : ""
              } ${
                isActive
                  ? "bg-gradient-to-r from-[#15399A] to-[#A93E17] text-white shadow-lg"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    variants={showLabel}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="ml-3 whitespace-nowrap font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col space-y-3 px-3">
        {/* Divider */}
        <div className="h-px bg-white/10 my-2"></div>

        {/* User Profile Card */}
        {isOpen ? (
          <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#15399A] to-[#A93E17] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col min-w-0 flex-1"
            >
              <p className="text-sm font-semibold text-white truncate">
                John Doe
              </p>
              <span className="text-xs text-gray-400 truncate">
                john@example.com
              </span>
            </motion.div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#15399A] to-[#A93E17] flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
