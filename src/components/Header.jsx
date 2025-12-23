import React from "react";
import { Link } from "react-router-dom";
import { FaCog, FaBell, FaUser } from "react-icons/fa";

export default function Header() {
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
          <button className="relative p-2 rounded-lg hover:bg-white/5 transition text-gray-400 hover:text-white">
            <FaBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#A93E17] rounded-full"></span>
          </button>

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
