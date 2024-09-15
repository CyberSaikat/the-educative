"use client";

import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Card,
  CardHeader,
} from "@nextui-org/react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { FaBars, FaTimes, FaUser, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import $ from "jquery";
import { CardTitle } from "@/components/ui/card";
import ProfileCard from "./profileCard";

export default function NavBar({
  isMenuOpen,
  setIsMenuOpen,
  profileCard,
  setProfileCard,
  userdata,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  profileCard: boolean;
  setProfileCard: React.Dispatch<React.SetStateAction<boolean>>;
  userdata: any;
}) {
  useEffect(() => {
    $(document).ready(function () {
      $(document).click(function (e) {
        if ($(e.target).is(".profile-card")) {
          return;
        }
        if ($(e.target).is(".profile-card *")) {
          return;
        }
        setProfileCard(false);
      });
    });
  });

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-accent h-16 z-40 sticky top-0 left-0"
    >
      <NavbarContent justify="start" className="gap-0">
        <Button
          className="flex items-center text-xl sm:text-2xl"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {isMenuOpen ? (
            <motion.div
              initial={{ rotate: 360, opacity: 0, scale: 0.5 }}
              whileInView={{
                rotate: 0,
                opacity: 1,
                scale: 1,
              }}
              className="ms-64"
            >
              <FaTimes className="text-white text-2xl sm:text-xl" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 0, opacity: 0, scale: 0.5 }}
              whileInView={{
                rotate: 360,
                opacity: 1,
                scale: 1,
              }}
            >
              <FaBars className="text-white text-2xl sm:text-xl" />
            </motion.div>
          )}
        </Button>
      </NavbarContent>
      <NavbarContent>
        <NavbarBrand>
          <p className="font-bold text-inherit sm:text-2xl text-xl">
            The Educative
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-0">
        <NavbarItem className="relative">
          <Button>
            <Link>
              <HiOutlineBellAlert className="text-white text-xl" />
            </Link>
          </Button>
        </NavbarItem>
        <NavbarItem className="relative profile-card">
          <ProfileCard
            profileCard={profileCard}
            setProfileCard={setProfileCard}
            userdata={userdata}
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
