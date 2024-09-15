"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { mentorshipFeatures } from "@/app/contents";
import { EnhancedTitle } from "@/components/custom-ui/TitleComponents";

const MentorshipProgram: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <EnhancedTitle mainText="Mentorship" accentText="Program" />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {mentorshipFeatures.map((feature, index) => {
            if (index === 3) return null; // Skip the 4th item as per original code
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-400 to-cyan-500" />
                <div className="flex flex-col items-center mb-6 text-primary">
                  <Icon className="h-16 w-16 mb-4 text-teal-500" />
                  <h3 className="text-xl font-bold text-center">
                    {feature.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {feature.points.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      <p className="text-gray-600 text-sm">
                        <strong className="text-gray-800">
                          {point.title}:
                        </strong>{" "}
                        {point.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default MentorshipProgram;
