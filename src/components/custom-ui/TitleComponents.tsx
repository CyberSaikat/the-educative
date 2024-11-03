"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";
import { IconType } from "react-icons/lib";

const TitleWrapper = styled(motion.div)`
  display: inline-block;
`;

const Title = styled.h1`
  font-size: 2rem;
  display: inline-block;
  position: relative;
  @media (min-width: 768px) {
    font-size: 2rem;
  }
  font-weight: 800;
  color: transparent;
  background: linear-gradient(
    135deg,
    hsl(var(--accent)) 0%,
    hsl(var(--accent-secondary, var(--accent))) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  letter-spacing: -0.05em;
  line-height: 1.2;
  margin: 0;
  padding: 0 10px;
  z-index: 1;
`;

const TitleDecoration = styled(motion.span)`
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 4px;
  background: hsl(var(--accent));
  border-radius: 2px;
  z-index: -1;
`;

const TitleComponent = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <TitleWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Title className={className}>
        {title}
        <TitleDecoration
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        />
      </Title>
    </TitleWrapper>
  );
};

const AnimatedTitle = ({
  title,
  className = "",
}: {
  title: string;
  className: string;
}) => {
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <h1
      className={`text-2xl md:text-4xl font-bold text-accent inline-block ${className}`}
    >
      {title.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <motion.div
        className="h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mt-1"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: title.length * 0.1 }}
      />
    </h1>
  );
};

const EnhancedTitle = ({
  mainText,
  accentText,
  className = "",
}: {
  mainText: string;
  accentText: string;
  className?: string;
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.9,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const accentVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        delay: 1.4,
      },
    },
  };

  return (
    <motion.h2
      className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.span className="inline-block" variants={textVariants}>
        {mainText}
      </motion.span>{" "}
      <motion.span
        className="inline-block text-accent relative"
        variants={accentVariants}
      >
        {accentText}
        <motion.span
          className="absolute -bottom-1 left-0 w-full h-1 bg-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        />
      </motion.span>
    </motion.h2>
  );
};

const TitleWithIcon = ({
  mainText,
  accentText,
  icon: Icon,
  className = "",
}: {
  mainText: string;
  accentText: string;
  icon: IconType;
  className?: string;
}) => {
  return (
    <motion.h2
      className={`text-center font-bold text-3xl sm:text-4xl md:text-5xl mb-8 relative ${className}`}
      initial={{ opacity: 0, y: -50 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.8, ease: "easeOut" }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: "easeOut",
        },
      }}
      viewport={{ once: true }}
    >
      <motion.span
        className="inline-block"
        initial={{ rotate: -5 }}
        animate={{ rotate: 5 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Icon />
      </motion.span>{" "}
      <span className="bg-gradient-to-r from-teal-400 to-cyan-500 text-transparent bg-clip-text">
        {mainText}
      </span>{" "}
      {accentText}
    </motion.h2>
  );
};

const EnhancedTitle2 = ({
  mainText,
  accentText,
  className = "",
}: {
  mainText: string;
  accentText: string;
  className?: string;
}) => {
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h2
      className="text-center font-bold text-3xl sm:text-4xl md:text-5xl mb-8 relative"
      variants={titleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.span className="inline-block" variants={wordVariants}>
        {mainText}
      </motion.span>{" "}
      <motion.span
        className="inline-block text-accent relative"
        variants={wordVariants}
      >
        {accentText}
        <motion.span
          className="absolute -z-10 top-0 left-0 w-full h-full bg-accent opacity-20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </motion.span>
      <motion.span
        className="absolute -z-10 bottom-0 left-0 w-full h-1 bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      />
    </motion.h2>
  );
};

export { TitleComponent, AnimatedTitle, EnhancedTitle, TitleWithIcon, EnhancedTitle2 };
