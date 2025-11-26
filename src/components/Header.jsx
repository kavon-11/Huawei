import React from "react";
import { Link } from "react-router-dom";
import { FaCog } from "react-icons/fa";

export default function Header() {
  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container flex items-center justify-end p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <Link
          to="/settings"
          className="flex items-center gap-2 text-gray-800 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 mx-1.5 sm:mx-6"
        >
          <FaCog className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
}
