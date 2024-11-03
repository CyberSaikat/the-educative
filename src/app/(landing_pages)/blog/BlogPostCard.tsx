import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IPost } from "@/abstract/interface";
import { FaRegCircleUser, FaRegClock } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import LazyImage from "@/components/custom-ui/LazyImage";

interface BlogPostCardProps {
  post: IPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const {
    title,
    slug,
    excerpt,
    author,
    publish_date,
    category,
    tags,
    featuredImage,
  } = post;

  // Function to calculate read time (assuming 200 words per minute)
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <Link href={`/blog/${slug}`}>
        <div className="relative w-full overflow-hidden">
          <LazyImage
            src={(featuredImage as string) || "/images/default-blog-image.jpg"}
            alt={title || "Blog post"}
            className="transition-transform duration-300 hover:scale-110 group-hover:scale-110"
            width={600}
            height={300}
          />
          {category && (
            <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-md">
              {category}
            </span>
          )}
        </div>
      </Link>
      <div className="p-6">
        <Link href={`/blog/${slug}`}>
          <h3 className="text-lg sm:text-2xl font-bold mb-3 text-gray-800 hover:text-primary transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between flex-wrap gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center text-nowrap">
            <FaRegCircleUser size={16} className="mr-2" />
            <span>{author}</span>
          </div>
          <div className="flex items-center text-nowrap">
            <SlCalender size={16} className="mr-2" />
            <span>{publish_date?.toString().slice(0, 10) || "No date"}</span>
          </div>
          <div className="-center text-nowrap hidden sm:flex">
            <FaRegClock size={16} className="mr-2" />
            <span>{calculateReadTime(excerpt || "")}</span>
          </div>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-primary hover:text-white transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostCard;
