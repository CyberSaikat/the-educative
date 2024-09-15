"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-accent opacity-20 blur-3xl"
        animate={{
          x: [0, dimensions.width - 256, dimensions.height - 256, 0],
          y: [0, dimensions.height - 256, dimensions.height - 256, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-purple-500 opacity-20 blur-3xl"
        animate={{
          x: [dimensions.width - 256, 0, dimensions.width - 256],
          y: [dimensions.height - 256, 0, dimensions.height - 256],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
