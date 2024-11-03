import Img from "@/assets/images/2149126949.jpg";
import LazyImage from "@/components/custom-ui/LazyImage";
import { StyleSix } from "@/components/custom-ui/CustomTitle";
import { Resources } from "@/models/resources";
import { ResourcesInterface } from "@/abstract/interface";
import conn from "@/database/config";
import TheResources from "@/app/(landing_pages)/resources/TheResources";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | The Educative",
  description:
    "Explore a variety of resources tailored to help you on your learning journey. Whether you're looking for tutorials, guides, or project inspiration, we've got you covered.",
};

export default async function Page() {
  await conn();
  const res = (await Resources.find()) ?? [];
  const resources = JSON.parse(JSON.stringify(res));
  let index = 0;
  return (
    <>
      <div className="container py-5">
        <div className="flex md:justify-end relative">
          <LazyImage
            src={Img.src}
            alt={"Main Image"}
            width={1380}
            height={776}
            className="w-[80%] hidden md:block"
            data-credit="Image by freepik"
          />
          <div
            className={`relative md:absolute md:w-[40%] top-[50%] left-0 md:-translate-y-[50%] bg-gradient-to-br from-white/10 to-white/30 rounded-2xl shadow-xl shadow-primary/20 backdrop-filter backdrop-blur-xl border border-white/20  z-10`}
          >
            <div className="p-5 z-10">
              <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-accent">
                Discover Our Resources
              </h2>
              <p className="mb-3 md:mb-6 text-sm md:text-[16px]">
                Explore a variety of resources tailored to help you on your
                learning journey. Whether you&apos;re looking for tutorials,
                guides, or project inspiration, we&apos;ve got you covered.
              </p>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-10`}
        >
          <StyleSix title="Resources" className={`!text-5xl font-bold`} />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 pt-5"
          id="resources"
        >
          {resources.map((resource: ResourcesInterface) => {
            index++;
            return (
              <TheResources
                resource={resource}
                key={resource._id}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
