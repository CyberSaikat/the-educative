"use client";

import {
  Feature,
  ResourcesContents,
  ResourcesInterface,
} from "@/abstract/interface";
import Breadcrumb from "@/components/custom-ui/Breadcrumb";
import LazyImage from "@/components/custom-ui/LazyImage";
import ResourcesContent from "./NewContent";
import { TitleComponent } from "@/components/custom-ui/TitleComponents";
import ShareButtons from "@/components/custom-ui/ShareButtons";
import ResourcesContent2 from "./ResourcesContent";

export default function MainResource({
  data,
  breadcrumbItems,
  contents,
}: {
  data: ResourcesInterface;
  breadcrumbItems: { label: string; href: string }[];
  contents: ResourcesContents;
}) {
  return (
    <div className="container py-8 px-4 max-w-6xl mx-auto">
      <div className="relative">
        <div className="relative rounded-lg overflow-hidden ">
          <div className="aspect-w-16 aspect-h-9 relative">
            <LazyImage
              src={data.image}
              alt={data.name}
              layout="fill"
              objectFit="cover"
              className="w-full object-center"
              loading="lazy"
              width={6000}
              height={3000}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-0 right-0 p-1 text-white rounded-tl-lg">
              {data.credit && (
                <div className="mt-0 sm:mt-1 text-[8px] sm:text-[12px] text-white">
                  {data.credit}
                </div>
              )}
            </div>
          </div>
          <div className="relative sm:absolute inset-0 flex flex-col justify-end items-center p-2 sm:p-6 md:p-8 z-10">
            <TitleComponent title={data.name} />
            <span className="inline-block p-1 mt-2 text-sm sm:text-lg">
              {data.description}
            </span>
          </div>
        </div>

        <Breadcrumb items={breadcrumbItems} className="hidden sm:inline-flex" />
        <ShareButtons />
        {data.content && (
          <div className="relative z-10">
            <ResourcesContent
              title={data.content.title}
              description={data.content.description}
              callToAction={data.content.callToAction}
              features={data.content.features}
              imageSrc={data.content.imageSrc}
              imageCredit={data.content.imageCredit}
            />
          </div>
        )}
        {data.contents && <ResourcesContent2 contents={data.contents} />}
      </div>
    </div>
  );
}
