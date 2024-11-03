import { AnimatePresence, motion } from "framer-motion";

export default function Stair() {
  const stairAnimation = {
    initial: {
      left: "0%",
    },
    animate: {
      left: "100%",
    },
    exit: {
      left: ["100%", "0%"],
    },
  };
  const reverseIndex = (index) => {
    const total = 6;
    return total - index - 1;
  };
  return (
    <>
      {[...Array(6)].map((_, index) => {
        return (
          <motion.div
            key={index}
            className="stair w-full h-full bg-accent relative z-50"
            variants={stairAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.5,
              delay: reverseIndex(index) * 0.1,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </>
  );
}
