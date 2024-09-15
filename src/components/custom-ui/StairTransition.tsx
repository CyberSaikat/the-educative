"use client";

import { usePathname } from "next/navigation";

import Stair from "./Stair";
import { AnimatePresence, motion } from "framer-motion";

export default function StairTransition() {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        <div className="w-screen h-screen fixed top-0 left-0 right-0 pointer-events-none flex flex-col z-50">
          <Stair />
        </div>
        <motion.div
          className="w-screen h-screen fixed bg-primary top-0 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: { delay: 1, duration: 0.5, ease: "easeInOut" },
          }}
        />
      </div>
    </AnimatePresence>
  );
}
