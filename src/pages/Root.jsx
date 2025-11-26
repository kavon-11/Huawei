import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav.jsx";

export default function Root() {
  return (
    <div>
      <MainNav />
    </div>
  );
}
