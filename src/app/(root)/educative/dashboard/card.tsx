"use client";

import { FaUsers, FaThumbsUp } from "react-icons/fa6";
import { GoArrowUpRight, GoZap } from "react-icons/go";
import { motion } from "framer-motion";
import { TbSquareRoundedChevronsUpFilled } from "react-icons/tb";
import { IconType } from "react-icons/lib";
import { IconPreview } from "@/components/custom-ui/IconPicker";

const variants = {
  green: "from-green-500 to-green-700",
  blue: "from-blue-500 to-blue-700",
  purple: "from-purple-500 to-purple-700",
  orange: "from-orange-500 to-orange-700",
  pink: "from-pink-500 to-pink-700",
};

export const AnimatedUserCard = ({
  title,
  variant = "green",
  mainNumber,
  allNumber,
  CardIcon,
}: {
  title: string;
  variant?: "green" | "blue" | "purple" | "orange" | "pink";
  mainNumber: number;
  allNumber?: number;
  CardIcon: string;
}) => {
  return (
    <>
      <motion.div
        className={`w-full h-full bg-gradient-to-br ${variants[variant]} text-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center items-start px-6 py-4`}
      >
        <motion.div
          className="flex items-center mb-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <IconPreview icon={`${CardIcon}`} className="text-2xl mr-2"/>
          <h4 className="text-xl font-semibold">Total {title}</h4>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {mainNumber}
        </motion.h1>
      </motion.div>
    </>
  );
};
