"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { contentData } from "@/app/contents";
import { EnhancedTitle } from "@/components/custom-ui/TitleComponents";
import useMediaQuery from "@/hooks/MediaQuery";

const ContentSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>(
    Object.keys(contentData.explore.sections)[0]
  );
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasInteracted(true);
    }, 5000); // Auto-trigger animation after 5 seconds if no interaction

    return () => clearTimeout(timer);
  }, []);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? -20 : 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const firstInteractionVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    },
  };

  return (
    <motion.section
      key="content-sec-001"
      className="relative overflow-hidden sm:h-[70vh] py-12 sm:py-16 lg:py-24 text-gray-100"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <EnhancedTitle mainText="Discover Our" accentText="Content" />
        </div>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div
            className="lg:col-span-4 space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(contentData.explore.sections).map(
              ([subTitle, content]) => (
                <motion.div
                  key={subTitle}
                  variants={tabVariants}
                  className={`rounded-lg transition-all duration-300 overflow-hidden ${
                    selectedTab === subTitle
                      ? "bg-gradient-to-r from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/50"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                  onClick={() => handleTabClick(subTitle)}
                  whileHover={hasInteracted ? { scale: 1.05 } : {}}
                  animate={hasInteracted ? "animate" : "initial"}
                >
                  <button
                    className="w-full p-4 text-left focus:outline-none"
                    role="tab"
                    aria-selected={selectedTab === subTitle}
                  >
                    <h3 className="text-lg font-semibold">
                      {subTitle.replace("_", " ")}
                    </h3>
                    <AnimatePresence>
                      {isMobile ||
                        (!isMobile && selectedTab === subTitle && (
                          <motion.p
                            className="mt-2 text-sm text-white h-auto"
                            initial={{
                              opacity: 0,
                              height: 0,
                            }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {content.description}
                          </motion.p>
                        ))}
                    </AnimatePresence>
                  </button>
                </motion.div>
              )
            )}
          </motion.div>
          <div className="lg:col-span-8 mt-6 sm:mt-0">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <CardHeader className="border-b border-gray-700">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={selectedTab}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500"
                    style={{
                      WebkitBackgroundClip: "text",
                      MozBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {selectedTab.replace("_", " ")}
                  </motion.h2>
                </AnimatePresence>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTab}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                  >
                    {Array.isArray(
                      contentData.explore.sections[selectedTab].items.contents
                    ) &&
                      contentData.explore.sections[
                        selectedTab
                      ].items.contents.map((contentItem, index) => (
                        <motion.div
                          key={contentItem.id || index}
                          className="bg-gray-700 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-all duration-300 group"
                          whileHover={{
                            scale: 1.03,
                            boxShadow: "0 0 20px rgba(38, 194, 129, 0.3)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        >
                          <div className="flex items-center mb-2 sm:mb-3">
                            <contentItem.icon className="text-2xl sm:text-3xl text-teal-400 group-hover:text-cyan-500 transition-colors duration-300 mr-2 sm:mr-3" />
                            <h3 className="text-base text-accent sm:text-lg font-semibold group-hover:text-cyan-400 transition-colors duration-300">
                              {contentItem.title}
                            </h3>
                          </div>
                          <p className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                            {contentItem.data}
                          </p>
                        </motion.div>
                      ))}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContentSection;
