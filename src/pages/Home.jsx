import React from "react";
import Header from "../components/home/Header.jsx";
import Hero from "../components/home/Hero.jsx";
import AboutUs from "@/components/home/AboutUs.jsx";
import Services from "@/components/home/Services.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AboutUs />
      <Services />
    </>
  );
}
