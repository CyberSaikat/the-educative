"use client";

import LazyImage from "@/components/custom-ui/LazyImage";
import Link from "next/link";
import {FaArrowRightLong} from "react-icons/fa6";
import {motion} from "framer-motion";
import {ResourcesInterface} from "@/abstract/interface";

export default function TheResources({resource, index}: { resource: ResourcesInterface, index: number }) {
    return resource.visible ? (
      <motion.div
        className="bg-white rounded-lg overflow-hidden shadow-lg group"
        key={resource.name}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
      >
        <div className="overflow-hidden relative">
          <motion.div
            className="w-full h-48 group-hover:scale-110 transition-all duration-300 ease-in-out"
            transition={{ duration: 0.3 }}
          >
            <LazyImage
              src={resource.image ?? "/images/resources/placeholder.png"}
              alt="Project Image"
              className="w-full h-full object-cover"
              width={600}
              height={300}
              blurDataURL={"/images/resources/placeholder.png"}
              credit={resource.credit}
            />
          </motion.div>
        </div>
        <div className="p-6 pt-4">
          <h3 className="text-xl font-semibold mb-1 text-accent">
            {resource.name}
          </h3>
          <p className="text-primary mb-2">{resource.description}</p>
          <Link
            href={`/resources/${resource.url ?? "#"}`}
            className="text-accent"
          >
            <p className="inline-flex items-center gap-2 hover:underline">
              Read More <FaArrowRightLong />
            </p>
          </Link>
        </div>
      </motion.div>
    ) : null;
}