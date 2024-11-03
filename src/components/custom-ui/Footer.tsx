"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { LinkType } from "@/abstract/interface";

const links: LinkType[] = [
  { href: "/", label: "Home" },
  // { href: "/cheat-sheets", label: "Cheat Sheets" },
  // { href: "/tutorials", label: "Tutorials" },
  // { href: "/articles", label: "Articles" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
  // { href: "/mentorship", label: "Mentorship Program" },
];

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 0.3,
      rotate: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 0.5,
      },
    },
  },
};

const AnimatedIcon: React.FC<{
  href: string;
  aria: string;
  children: React.ReactNode;
}> = ({ href, aria, children }) => (
  <motion.div whileHover="hover" variants={iconVariants}>
    <Link
      href={href}
      className="w-10 h-10 bg-accent hover:bg-primary grid place-items-center text-primary hover:text-white transition-all duration-200 rounded-sm"
      aria-label={aria}
      target="_blank"
    >
      {children}
    </Link>
  </motion.div>
);

const Footer: React.FC = () => {
  const pathname = usePathname();
  return pathname === "/login" ? null : (
    <footer className="text-gray-200 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <motion.h3
              className="text-lg font-semibold mb-4 text-accent cursor-pointer inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="hover:border-b border-accent">
                About The Educative
              </span>
            </motion.h3>
            <p className="text-gray-300">
              The Educative is your go-to resource for all things computer
              science. Our mission is to provide high-quality educational
              content that helps you excel in your coding journey. From beginner
              tutorials to advanced topics, we cover everything you need to
              become a proficient developer.
            </p>
          </div>
          <div>
            <motion.h3
              className="text-lg font-semibold mb-4 text-accent cursor-pointer inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="hover:border-b border-accent">Quick Links</span>
            </motion.h3>
            <ul className="space-y-2">
              {links.map((link, index) => {
                const { href, label } = link;
                return (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={href}
                      className={`hover:text-accent transition-colors duration-200`}
                    >
                      {label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </div>
          <div>
            <motion.h3
              className="text-lg font-semibold mb-4 text-accent cursor-pointer inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="hover:border-b border-accent">
                Stay Connected
              </span>
            </motion.h3>
            <p className="text-gray-300">
              Follow us on social media for updates and discussions:
            </p>
            <div className="flex space-x-4 mt-4">
              <AnimatedIcon href="https://twitter.com" aria="Twitter">
                <FaTwitter size={18} />
              </AnimatedIcon>
              <AnimatedIcon href="https://facebook.com" aria="Facebook">
                <FaFacebookF size={18} />
              </AnimatedIcon>
              <AnimatedIcon href="https://linkedin.com" aria="LinkedIn">
                <FaLinkedinIn size={18} />
              </AnimatedIcon>
              <AnimatedIcon href="https://instagram.com" aria="Instagram">
                <FaInstagram size={18} />
              </AnimatedIcon>
            </div>
          </div>
        </div>
        <motion.div
          className="mt-10 text-center border-t border-gray-700 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400">
            &copy; 2024 The Educative. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
