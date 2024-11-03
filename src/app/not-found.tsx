"use client";

import "@/assets/css/custom.css";
import ErrorImage from "@/assets/images/error-404.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Footer from "@/components/custom-ui/Footer";
import PageTransition from "@/components/custom-ui/PageTransition";
import "@/assets/css/custom.css";
import AnimatedBackground from "@/components/custom-ui/AnimatedBg";
import { useState, useEffect } from "react";
import Header from "@/components/custom-ui/Header";
import StairTransition from "@/components/custom-ui/StairTransition";
import Social from "./(landing_pages)/components/social";
import RootLayout from "./(root)/layout";
import RootLayoutCode from "./(root)/layout_";

export default function NotFound() {
  return (
    <>
      <Header />
      <Social />
      <StairTransition />
      <PageTransition>
        <AnimatedBackground />
        <NotFoundPage />
      </PageTransition>
      <Footer />
    </>
  );
}

export function NotFoundPage(){
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <Image
          src={ErrorImage.src}
          alt="404 Error"
          className="w-72 md:w-[30vw] object-contain mb-0"
          width={400}
          height={400}
          priority={true}
        />
        <h2 className="text-2xl md:text-5xl font-semibold text-accent mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-sm md:text-[16px] text-accent mb-8 text-center">
          The page you&apos;re looking for doesn&apos;t exist. It might have
          been removed or the URL might be incorrect.
        </p>
        <Button
          onClick={() => {
            router.push(
              pathname.split("/").includes("educative")
                ? "/educative/dashboard"
                : "/"
            );
          }}
          className="px-6 py-3 font-serif bg-accent text-white font-medium  rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          <p className="">
            Return to{" "}
            {pathname.split("/").includes("educative") ? "Dashboard" : "Home"}
          </p>
        </Button>
      </div>
    </>
  );
}