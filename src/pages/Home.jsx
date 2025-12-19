import React from "react";
import Header from "../components/home/Header.jsx";
import Hero from "../components/home/Hero.jsx";
import AboutUs from "@/components/home/AboutUs.jsx";
import Services from "@/components/home/Services.jsx";
import StickyVideoLayout from "@/components/home/StickyVideoLayout.jsx";
import FAQ from "@/components/home/FAQ.jsx";
import Footer from "@/components/home/Footer.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AboutUs />
      <Services />
      <StickyVideoLayout />
      <FAQ />
      <Footer />
    </>
  );
}
