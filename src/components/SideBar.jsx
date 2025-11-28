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
    <div className="flex flex-col h-full py-8 overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900 w-full">
      <nav className="flex flex-col flex-1 space-y-6 px-2">
        {/* Logo & Toggle Area */}
        <div className="flex items-center justify-between px-2 mb-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              className="w-auto h-6 flex-shrink-0"
              src="https://merakiui.com/images/logo.svg"
              alt="Logo"
            />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  variants={showLabel}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="font-bold text-gray-700 dark:text-white whitespace-nowrap"
                >
                  Meraki UI
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Toggle Arrow Button */}
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
            >
              <motion.div whileTap={{ scale: 0.9 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
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
          )}
        </div>

        {/* Collapsed Toggle Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="mx-auto p-1.5 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
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
        )}

        {/* Menu Items */}
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className={`flex items-center p-2 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 ${
              !isOpen ? "justify-center" : ""
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
                  className="ml-3 whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </nav>

      <div className="flex flex-col space-y-6 px-2">
        {/* Settings */}
        <Link
          to="/settings"
          className={`flex items-center p-2 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 ${
            !isOpen ? "justify-center" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
            />
          </svg>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                variants={showLabel}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="ml-3 whitespace-nowrap"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Avatar */}
        <a
          className={`flex items-center gap-2 ${
            !isOpen ? "justify-center" : ""
          }`}
        >
          <img
            className="object-cover w-8 h-8 rounded-full"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
            alt="User"
          />
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={showLabel}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-col"
              >
                <p className=" text-sm font-medium text-gray-700 dark:text-gray-200">
                  John Doe
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  View Profile
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </a>
      </div>
    </div>
  );
}
