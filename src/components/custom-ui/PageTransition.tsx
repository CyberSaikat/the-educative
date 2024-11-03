"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const PageTransition = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: { delay: 1, duration: 0.5, ease: "easeInOut" },
          }}
          className="h-screen w-screen fixed top-0 bg-primary left-0 pointer-events-none z-40"
        />
        <div>
          {children}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;
