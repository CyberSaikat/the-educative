"use client";

import { IPost } from "@/abstract/interface";
import { useEffect } from "react";
import copy from "clipboard-copy";
import { AnimatePresence, motion } from "framer-motion";

export const BlogContent = ({ content }: { content: IPost }) => {
  useEffect(() => {
    const addCopyButtons = () => {
      document.querySelectorAll(".tiptap_code_block").forEach((codeBlock) => {
        if (!codeBlock.querySelector(".copy-button")) {
          const button_parent = document.createElement("div");
          button_parent.className = "button-parent copy-button";
          const copyButton = document.createElement("button");
          copyButton.className = "";
          copyButton.textContent = "Copy";
          copyButton.type = "button";

          copyButton.addEventListener("click", async () => {
            const codeText = codeBlock.querySelector("code")?.textContent;
            if (codeText) {
              try {
                await copy(codeText);
                copyButton.textContent = "Copied!";
                setTimeout(() => {
                  copyButton.textContent = "Copy";
                }, 1000);
              } catch (error) {
                console.error("Failed to copy text:", error);
              }
            }
          });
          button_parent.appendChild(copyButton);
          codeBlock.appendChild(button_parent);
        }
      });
    };

    addCopyButtons();
  }, [content]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      id={content._id}
      className="my-4 sm:p-4 bg-[#222] rounded-lg relative"
    >
      <div className="p-3 text-justify text-[#fff] ">
        <AnimatePresence mode="wait">
          <motion.div
            key={content._id}
            className="description-container relative text-[rgba(255, 255, 255, 0.8)] text-[12.5px] sm:text-base"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
