import Image from "next/image";
import React, { useEffect, useState } from "react";
import LazyImage from "./LazyImage";
import { motion } from "framer-motion";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
};

type CustomLightGalleryProps = {
  images: GalleryImage[];
  width: number;
  height: number;
  className?: string;
};

const CustomLightGallery: React.FC<CustomLightGalleryProps> = ({
  images,
  width,
  height,
  className,
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (e.target === document.querySelector(".target")) {
        closeLightbox();
      }
    };

    window.addEventListener("click", handleClick);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div>
      {images.map((image) => (
        <div
          key={image.id}
          className="relative cursor-pointer"
          onClick={() => openLightbox(image)}
        >
          <LazyImage
            src={image.src}
            alt={image.alt}
            className={`object-cover ${className}`}
            width={width}
            height={height}
          />
        </div>
      ))}

      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75 target"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="absolute top-0 bg-accent w-full h-16 flex justify-between items-center px-10">
            <div></div>
            <div>
              <h1 className="text-primary font-bold text-xl">
                {selectedImage.alt}
              </h1>
            </div>
            <div className="flex gap-4">
              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button className="text-white text-[14px]">
                      <FaMinus />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zoom Out</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button className="text-white text-[14px]">
                      <FaPlus />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zoom In</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider> */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      onClick={closeLightbox}
                      className="text-white text-[18px]"
                    >
                      <FaTimes />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Close</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <LazyImage
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="object-contain max-w-full max-h-screen"
              width={width}
              height={height}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CustomLightGallery;
