import React, { useState } from "react";
import { icons } from "@/utils/icons";
import { FaCheckSquare } from "react-icons/fa";

export default function IconPicker({
  selectedIcon,
  setSelectedIcon,
}: {
  selectedIcon: string;
  setSelectedIcon: (icon: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter icons based on the search query
  const filteredIcons = icons.filter(
    (iconItem) =>
      iconItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      iconItem.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search icons..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="grid grid-cols-4 sm:grid-cols-7 gap-4">
        {filteredIcons.length > 0 ? (
          filteredIcons.map((iconItem, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer col-auto`}
              onClick={() => setSelectedIcon(iconItem.code)}
            >
              <div
                className={`aspect-square flex flex-col items-center justify-center rounded-lg transition-all duration-300 ${
                  selectedIcon === iconItem.code
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <iconItem.icon className="text-3xl mb-2" />
                <span className="text-xs font-medium text-center">
                  {iconItem.name}
                </span>
              </div>
              {selectedIcon === iconItem.code && (
                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                  <FaCheckSquare className="text-white text-xs" />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No icons found
          </div>
        )}
      </div>
    </div>
  );
}

export function IconPreview({
  icon,
  className = "text-3xl",
}: {
  icon: string;
  className?: string;
}) {
  const Icon = icons.find((iconItem) => iconItem.code === icon)?.icon;
  return Icon ? <Icon className={className} /> : null;
}
