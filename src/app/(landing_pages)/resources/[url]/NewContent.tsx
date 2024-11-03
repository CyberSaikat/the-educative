import { Feature } from "@/abstract/interface";
import { IconPreview } from "@/components/custom-ui/IconPicker";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import "@/assets/scss/tiptap.scss";
import { FaCaretRight } from "react-icons/fa6";
import Link from "next/link";
import LazyImage from "@/components/custom-ui/LazyImage";

const FeatureCard = ({
  icon,
  title,
  description,
  link,
}: {
  icon: string;
  title: string;
  description: string;
  link: string;
}) => (
  <Link
    href={link}
    className="block text-current no-underline group perspective h-full"
  >
    <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden transform group-hover:rotate-y-12 h-full">
      <CardContent className="p-0">
        <div className="relative">
          <div className="absolute top-0 left-0 w-48 h-48 bg-yellow-300 opacity-20 rounded-full -translate-x-24 -translate-y-24 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-300 opacity-20 rounded-full translate-x-24 translate-y-24 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative z-10 p-4">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-grow">
                <div className="flex gap-4 items-center justify-start mb-2">
                  <div className="flex-shrink-0 transform group-hover:rotate-12 transition-transform duration-300">
                    <IconPreview
                      icon={icon}
                      className="text-yellow-300 text-5xl bg-white bg-opacity-20 rounded-2xl p-4 shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:underline">
                    {title}
                  </h3>
                </div>
                <div
                  className="text-purple-100 text-sm"
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
              </div>
              <div className="flex-shrink-0 self-center transform group-hover:translate-x-2 transition-transform duration-300 hidden sm:block">
                <div className="bg-white text-purple-600 rounded-full p-2 shadow-lg">
                  <FaCaretRight className="text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

const ResourcesContent = ({
  title = "",
  description = "",
  features = [],
  callToAction = "",
  imageSrc = "",
  imageCredit = "",
}: {
  title: string;
  description: string;
  features: Feature[];
  callToAction: string;
  imageSrc: string;
  imageCredit: string;
}) => {
  return (
    <div className="max-w-6xl mx-auto sm:px-4 py-12">
      <div className="text-center mb-12">
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="text-sm md:text-lg text-justify"
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {features.map((feature: Feature, index) => (
          <div
            key={index}
            className={`${
              features.length % 2 !== 0 && index == features.length - 1
                ? "col-span-full h-full"
                : "col-span-1 h-full"
            }`}
          >
            <FeatureCard key={index} {...feature} />
          </div>
        ))}
      </div>
      <div className="relative group overflow-hidden rounded-lg ">
        <div className="relative overflow-hidden">
          <LazyImage
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 origin-top"
            loading="lazy"
            width={6000}
            height={3000}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-0 right-0 p-1 text-white rounded-tl-lg">
            {imageCredit && (
              <div className="mt-0 sm:mt-1 text-[8px] sm:text-[12px] text-white">
                {imageCredit}
              </div>
            )}
          </div>
        </div>
        <div className="sm:absolute bottom-0 left-0 pt-3 sm:p-6 text-white">
          <p className="text-sm sm:text-2xl font-bold mb-2">{callToAction}</p>
          <a
            href="/get-started"
            className="inline-block bg-accent hover:bg-primary text-white font-bold py-2 px-4 rounded transition duration-300 no-underline"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourcesContent;
