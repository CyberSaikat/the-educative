"use client";

import Link from "next/link";
import Nav from "../Nav/Nav";
import MobileNav from "../Nav/MobileNav";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LinkType } from "@/abstract/interface";

const links: LinkType[] = [
  { href: "/", label: "Home" },
  // { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        setIsScrolled(true);
        if(window.pageYOffset > 500 ){
          setIsFixed(true);
        }else{
          setIsFixed(false);
        }
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = usePathname();
  return pathname === "/login" ? null : (
    <>
      <header
        className={`text-white flex items-center py-2 xl:py-2 w-full z-50 transition-all duration-300 ease-linear`}
      >
        <div className="container mx-auto py-4 flex">
          <h1 className="text-2xl xl:text-3xl font-bold whitespace-nowrap h-[36px]">
            <Link href="/">
              <svg className="w-[205px] h-full fill-accent font-['Russo_One',_sans-serif] main-text">
                <text
                  x="50%"
                  y="50%"
                  dy=".35em"
                  textAnchor="middle"
                  className="animate-stroke"
                >
                  The Educative
                </text>
              </svg>
            </Link>
          </h1>
          <nav className="hidden xl:flex justify-between items-start container mx-auto p-2 pr-0 font-bold ml-[50px]">
            <Nav links={links} />
          </nav>
        </div>
        <nav className="xl:hidden flex items-center justify-center w-1/5">
          <MobileNav links={links} />
        </nav>
      </header>
    </>
  );
}
