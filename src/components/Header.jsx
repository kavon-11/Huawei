import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCog,
  FaBell,
  FaUser,
  FaPhone,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mockNotifications = [
    {
      id: 1,
      icon: <FaPhone className="w-4 h-4" />,
      title: "New Call Completed",
      message: "Call with customer #1234 completed successfully",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      icon: <FaChartLine className="w-4 h-4" />,
      title: "Weekly Report Ready",
      message: "Your analytics report for this week is ready to view",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      icon: <FaExclamationTriangle className="w-4 h-4" />,
      title: "System Update",
      message: "New AI model update available. Update recommended.",
      time: "3 hours ago",
      unread: false,
    },
  ];

  return (
    <nav className="font-manrope">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#15399A] to-[#A93E17] flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <span className="text-white font-bold text-xl">EchoAI</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-white/5 transition text-gray-400 hover:text-white"
            >
              <FaBell className="w-5 h-5" />
              {mockNotifications.some((n) => n.unread) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#A93E17] rounded-full"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-white/10">
                  <h3 className="text-white font-semibold">Notifications</h3>
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b border-white/5 hover:bg-white/5 transition cursor-pointer ${
                        notification.unread ? "bg-white/[0.02]" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#15399A] to-[#A93E17] flex items-center justify-center text-white">
                          {notification.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-white text-sm font-medium">
                              {notification.title}
                            </h4>
                            {notification.unread && (
                              <span className="flex-shrink-0 w-2 h-2 bg-[#A93E17] rounded-full mt-1"></span>
                            )}
                          </div>
                          <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <span className="text-gray-500 text-xs mt-1 block">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-white/10 text-center">
                  <button className="text-sm text-gray-400 hover:text-white transition">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition text-gray-400 hover:text-white"
          >
            <FaCog className="w-5 h-5" />
            <span className="hidden md:inline">Settings</span>
          </Link>

          {/* User Avatar */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-white font-medium text-sm">John Doe</span>
              <span className="text-gray-400 text-xs">Administrator</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#15399A] to-[#A93E17] flex items-center justify-center">
              <FaUser className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
