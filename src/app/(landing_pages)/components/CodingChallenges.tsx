"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { dailyChallenges } from "@/app/contents";
import { TitleWithIcon } from "@/components/custom-ui/TitleComponents";
import { RxRocket } from "react-icons/rx";

const CodingChallenges: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <TitleWithIcon
          mainText={"Coding"}
          accentText={"Challenges"}
          icon={RxRocket}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {dailyChallenges.map((challenge, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-teal-400 to-cyan-500 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    {challenge.contents.title}
                  </h3>
                  <challenge.contents.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {challenge.contents.data.map((data, dataIndex) => (
                    <li key={dataIndex}>
                      <h4 className="text-lg font-semibold text-teal-600 mb-2">
                        {data.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {data.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CodingChallenges;
