import { Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import {
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaLink,
  FaMobileAlt,
} from "react-icons/fa";

export default function UniversalShare({ currentUrl }: { currentUrl: string }) {
  return null;
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    alert("Link copied to clipboard!");
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check this out",
          text: "Here's something interesting I found:",
          url: currentUrl,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Native sharing is not supported on your device.");
    }
  };

  return (
    <div className="relative">
      <Tooltip content="Share" placement="top">
        <div
          onClick={handleNativeShare}
          className="relative rounded-full w-[40px] h-[40px] cursor-pointer bg-gray-600 flex items-center justify-center"
        >
          <FaShareAlt className="text-white" />
        </div>
      </Tooltip>

      {showOptions && (
        <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-lg p-2 flex flex-col space-y-2 z-10">
          <Tooltip content="Native Share" placement="top">
            <button
              onClick={handleNativeShare}
              className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <FaMobileAlt className="text-gray-600" />
              <span>Share via...</span>
            </button>
          </Tooltip>
          <Tooltip content="Share via Email" placement="top">
            <a
              href={`mailto:?subject=Check this out&body=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <FaEnvelope className="text-gray-600" />
              <span>Email</span>
            </a>
          </Tooltip>
          <Tooltip content="Share on Facebook" placement="top">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <FaFacebook className="text-gray-600" />
              <span>Facebook</span>
            </a>
          </Tooltip>
          <Tooltip content="Share on Twitter" placement="top">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <FaTwitter className="text-gray-600" />
              <span>Twitter</span>
            </a>
          </Tooltip>
          <Tooltip content="Share on LinkedIn" placement="top">
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <FaLinkedin className="text-gray-600" />
              <span>LinkedIn</span>
            </a>
          </Tooltip>
          <Tooltip content="Copy Link" placement="top">
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <FaLink className="text-gray-600" />
              <span>Copy Link</span>
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
