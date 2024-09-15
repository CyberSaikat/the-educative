"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaHome,
  FaListAlt,
  FaUser,
  FaCaretDown,
  FaComments,
  FaPenNib,
  FaTags,
} from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItems } from "@/abstract/interface";

export default function SideBarMenu({
  isMenuOpen,
  setIsMenuOpen,
  userdata,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  userdata: any;
}) {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const currentActiveMenu = menuItems.find(
      (item) =>
        item.href === pathname ||
        (item.children &&
          item.children.some((child) => child.href === pathname))
    );
    if (currentActiveMenu) {
      setActiveMenu(currentActiveMenu.label);
      setOpenSubmenus((prev) => ({ ...prev, [currentActiveMenu.label]: true }));
    }
  }, [pathname]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isLinkActive = (href: string) => pathname === href;

  let menuItems: MenuItems[] = [
    // Home
    {
      icon: FaHome,
      label: "Home",
      href: "/educative/dashboard",
      permissions: ["admin", "user"],
      isRendered: false,
    },
    // Users
    {
      icon: FaUser,
      label: "Users",
      href: "/educative/users",
      permissions: ["admin"],
      isRendered: false,
    },
    // Blog
    {
      icon: FaPenNib,
      label: "Blog",
      href: "#!",
      permissions: ["admin"],
      isRendered: false,
      children: [
        {
          icon: FaFileAlt,
          label: "All Posts",
          href: "/educative/blog",
        },
        {
          icon: FaListAlt,
          label: "Categories",
          href: "/educative/blog/categories",
        },
        {
          icon: FaListAlt,
          label: "Sub Categories",
          href: "/educative/blog/sub-categories",
        },
        {
          icon: FaTags,
          label: "Tags",
          href: "/educative/blog/tags",
        },
        {
          icon: FaComments,
          label: "Comments",
          href: "/educative/blog/comments",
        },
      ],
    },
    {
      icon: MdOutlineSettings,
      label: "Principal Entry",
      href: "#!",
      permissions: ["admin"],
      isRendered: false,
      children: [
        {
          icon: GrResources,
          label: "Resources",
          href: "/educative/resources",
        },
      ],
    },
  ];

  return (
    <>
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isMenuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-gradient-to-br from-primary to-accent top-0 w-64 h-full fixed shadow-2xl sm:shadow-xl shadow-black overflow-hidden z-50"
      >
        <div className="h-full overflow-y-auto scrollbar-hide">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center h-16 border-b border-white/20"
          >
            <h1 className="text-2xl font-bold text-white">The Educative</h1>
          </motion.div>
          <ul className="list-none mb-0 px-2 py-4 space-y-2">
            <AnimatePresence>
              {menuItems.map((item, index) =>
                item.permissions?.includes(userdata?.usertype) ? (
                  <motion.li
                    key={`${item.href}_${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={item.href}
                        className={`group flex items-center justify-between w-full p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300 ${
                          isLinkActive(item.href) ? "bg-white/20 shadow-md" : ""
                        }`}
                        onClick={(e) => {
                          if (item.children) {
                            e.preventDefault();
                            toggleSubmenu(item.label);
                            setActiveMenu(
                              activeMenu === item.label ? null : item.label
                            );
                          }
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.span
                            whileHover={{ rotate: 20 }}
                            className={`flex items-center justify-center w-8 h-8 rounded-md transition-all duration-300 ${
                              isLinkActive(item.href)
                                ? "bg-white text-primary"
                                : "bg-white/10 group-hover:bg-white/20"
                            }`}
                          >
                            <item.icon className="text-lg" />
                          </motion.span>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.children && (
                          <motion.span
                            animate={{
                              rotate: openSubmenus[item.label] ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaCaretDown />
                          </motion.span>
                        )}
                      </Link>
                    </motion.div>
                    <AnimatePresence>
                      {item.children && openSubmenus[item.label] && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 ml-4 space-y-1 border-l border-white/20 px-2"
                        >
                          {item.children.map((child, childIndex) => (
                            <motion.li
                              key={`${child.href}_${childIndex}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ delay: childIndex * 0.05 }}
                            >
                              <motion.div
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Link
                                  href={child.href}
                                  className={`flex items-center w-full p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 ${
                                    isLinkActive(child.href)
                                      ? "bg-white/20 text-white shadow-md"
                                      : ""
                                  }`}
                                >
                                  <motion.span
                                    whileHover={{ rotate: 20 }}
                                    className={`flex items-center justify-center w-6 h-6 rounded-md mr-2 transition-all duration-300 ${
                                      isLinkActive(child.href)
                                        ? "bg-white text-primary"
                                        : "bg-white/10"
                                    }`}
                                  >
                                    <child.icon className="text-sm" />
                                  </motion.span>
                                  <span>{child.label}</span>
                                </Link>
                              </motion.div>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ) : null
              )}
            </AnimatePresence>
          </ul>
        </div>
      </motion.aside>
    </>
  );
}
