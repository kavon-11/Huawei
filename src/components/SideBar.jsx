import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <div className="flex flex-col h-full py-8 overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900 w-full">
      <nav className="flex flex-col flex-1 space-y-6 px-2">
        {/* Logo & Toggle Area */}
        <div className="flex items-center justify-between px-2 mb-4">
          <a href="#" className="flex items-center gap-2 overflow-hidden">
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
          </a>

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
        {[
          {
            iconPath:
              "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
            label: "Home",
          },
          {
            iconPath:
              "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
            label: "Analytics",
          },
          {
            iconPath:
              "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75",
            label: "Tasks",
          },
          {
            iconPath:
              "M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5",
            label: "Media",
          },
          {
            iconPath:
              "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
            label: "Users",
          },
        ].map((item, idx) => (
          <a
            key={idx}
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
                d={item.iconPath}
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
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        ))}
      </nav>

      <div className="flex flex-col space-y-6 px-2">
        {/* Settings */}
        <a
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
        </a>

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
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  John Doe
                </span>
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
