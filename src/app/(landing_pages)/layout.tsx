"use client";

import Footer from "@/components/custom-ui/Footer";
import PageTransition from "@/components/custom-ui/PageTransition";
import Social from "./components/social";
import "@/assets/css/custom.css";
import AnimatedBackground from "@/components/custom-ui/AnimatedBg";
import { useState, useEffect } from "react";
import Header from "@/components/custom-ui/Header";
import StairTransition from "@/components/custom-ui/StairTransition";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isScrolled, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Header />
      <Social />
      <StairTransition />
      <PageTransition>
        <div className={`transition-all duration-300`}>{children}</div>
      </PageTransition>
      <Footer />
    </>
  );
}
