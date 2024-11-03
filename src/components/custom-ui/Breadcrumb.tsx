"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items , className}) => {

  return (
    <nav
      className={`mr-auto px-3 py-1 my-2 rounded-md ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index < items.length - 1 ? (
              <>
                <Link
                  href={item.href}
                  className="text-white hover:text-accent transition-all duration-300"
                >
                  {item.label}
                </Link>
                <svg
                  className="w-4 h-4 mx-2 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </>
            ) : (
              <span className="text-accent">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
