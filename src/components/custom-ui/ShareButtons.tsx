"use client";

import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import UniversalShare from "./UniversalShare";
import { Tooltip } from "@nextui-org/react";

const ShareButtons = () => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // This will run only on the client-side
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="relative mt-5 z-10 flex space-x-2">
      <Tooltip content="Share on Facebook" placement="top">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative rounded-full w-[40px] h-[40px] cursor-pointer bg-blue-600 flex items-center justify-center"
        >
          <FaFacebook className="text-white" />
        </a>
      </Tooltip>
      <Tooltip content="Share on Twitter" placement="top">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative rounded-full w-[40px] h-[40px] cursor-pointer bg-blue-400 flex items-center justify-center"
        >
          <FaTwitter className="text-white" />
        </a>
      </Tooltip>
      <Tooltip content="Share on LinkedIn" placement="top">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative rounded-full w-[40px] h-[40px] cursor-pointer bg-blue-700 flex items-center justify-center"
        >
          <FaLinkedin className="text-white" />
        </a>
      </Tooltip>
      <Tooltip content="Share on WhatsApp" placement="top">
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative rounded-full w-[40px] h-[40px] cursor-pointer bg-green-500 flex items-center justify-center"
        >
          <FaWhatsapp className="text-white" />
        </a>
      </Tooltip>
      <UniversalShare currentUrl={currentUrl} />
    </div>
  );
};

export default ShareButtons;
