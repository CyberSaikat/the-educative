"use client";

import { IResourcesContent, ResourcesContents } from "@/abstract/interface";
import { BlockKeys } from "@/abstract/type";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IconPreview } from "@/components/custom-ui/IconPicker";
import copy from "clipboard-copy";
import "@/assets/scss/tiptap.scss";
import {
  Container,
  Grid,
  Card,
  CardContent,
  HeaderWrapper,
  IconWrapper,
  Title,
  Description,
  ExpandButton,
} from "@/assets/custom-styles/style";

const ResourcesContent2 = ({ contents }: { contents: ResourcesContents }) => {
  const [expandedId, setExpandedId] = useState<number | null>(0); // Initially expand the first block

  const toggleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  useEffect(() => {
    function scrollToContent() {
      const element = document.getElementById(`block_${expandedId}`);
      if (element) {
        // Calculate the initial position before expansion
        const initialOffset = window.pageYOffset;

        // Trigger content expansion
        element.scrollIntoView({ behavior: "smooth" });

        // Calculate the new position after expansion
        setTimeout(() => {
          const finalOffset = window.pageYOffset;

          
          // Calculate the difference in offset and adjust the scroll
          const offsetDiff = finalOffset - initialOffset;
          window.scrollTo({
            top: initialOffset - offsetDiff,
            behavior: "smooth",
          });
        }, 300); // Wait for the expansion animation to complete
      }
    }

    scrollToContent();
  }, [expandedId]);

  return (
    <Container className="!min-h-0">
      <Grid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((block, index) => {
          const content = contents[`block_${block}` as BlockKeys];
          if (!content) return null;
          return (
            content && (
              <Content
                key={index}
                content={content}
                index={index}
                isExpanded={expandedId === index}
                toggleExpand={() => toggleExpand(index)}
                contentId={`block_${block}`}
              />
            )
          );
        })}
      </Grid>
    </Container>
  );
};

const Content = ({
  content,
  index,
  isExpanded,
  toggleExpand,
  contentId,
}: {
  content: IResourcesContent;
  index: number;
  isExpanded: boolean;
  toggleExpand: () => void;
  contentId?: string;
}) => {
  useEffect(() => {
    const addCopyButtons = () => {
      document.querySelectorAll(".tiptap_code_block").forEach((codeBlock) => {
        if (!codeBlock.querySelector(".copy-button")) {
          const copyButton = document.createElement("button");
          copyButton.className = "copy-button";
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
                console.error(error);
              }
            }
          });
          codeBlock.appendChild(copyButton);
        }
      });
    };

    addCopyButtons();
  }, [isExpanded]);

  return (
    <Card
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      id={contentId}
    >
      <CardContent>
        <HeaderWrapper>
          <IconWrapper>
            <IconPreview icon={content.icon} />
          </IconWrapper>
          <Title>{content.title}</Title>
        </HeaderWrapper>
        <AnimatePresence>
          {isExpanded && (
            <Description
              className="description-container"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          )}
        </AnimatePresence>
      </CardContent>
      <ExpandButton
        onClick={toggleExpand}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isExpanded ? "−" : "+"}
      </ExpandButton>
    </Card>
  );
};

export default ResourcesContent2;
