import React from "react";
import { StyleSix } from "@/components/custom-ui/CustomTitle";
import conn from "@/database/config";
import { Metadata } from "next";
import LazyImage from "@/components/custom-ui/LazyImage";
import Post from "@/models/Post";
import { IPost } from "@/abstract/interface";
import BlogPostCard from "./BlogPostCard";

export const metadata: Metadata = {
  title: "Blog | The Educative",
  description:
    "Explore our latest articles on technology, programming, and education. Stay updated with industry trends and expert insights.",
};

const BlogPage = async () => {
  await conn();
  const posts = await Post.aggregate([
    {
      $match: {
        status: "published",
      },
    },
    {
      $sort: { publish_date: -1 },
    },
    {
      $limit: 9,
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "subcategories",
        localField: "subcategory",
        foreignField: "_id",
        as: "subcategory",
      },
    },
    {
      $unwind: {
        path: "$subcategory",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        as: "tags",
      },
    },
    {
      $project: {
        title: 1,
        slug: 1,
        content: 1,
        excerpt: 1,
        author: 1,
        publish_date: {
          $dateToString: { format: "%d-%m-%Y", date: "$publish_date" },
        },
        category: { $ifNull: ["$category.name", null] },
        subcategory: { $ifNull: ["$subcategory.name", null] },
        tags: {
          $map: {
            input: "$tags",
            as: "tag",
            in: "$$tag.name",
          },
        },
        metaTitle: 1,
        metaDescription: 1,
        metaKeywords: 1,
        featuredImage: 1,
        imageCredit: 1,
        status: 1,
        updated_date: 1,
      },
    },
  ]);
  const blogPosts = JSON.parse(JSON.stringify(posts));
  return (
    <section className="relative">
      <div className="container py-5">
        <div className="relative bg-gradient-to-br from-accent to-primary text-white overflow-hidden rounded-t-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
                <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Explore the World of
                  <span className="block text-primary">Tech & Education</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-teal-50 max-w-2xl">
                  Dive into our latest articles covering cutting-edge technology
                  trends, expert programming tips, and transformative educational
                  insights.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#blog-posts"
                    className="bg-primary text-white hover:text-accent transition-colors duration-300 font-semibold py-2 px-6 rounded-full shadow-lg"
                  >
                    Latest Posts
                  </a>
                  <a
                    href="#categories"
                    className="bg-accent text-white hover:bg-white hover:text-primary transition-colors duration-300 font-semibold py-2 px-6 rounded-full"
                  >
                    Categories
                  </a>
                </div>
              </div>
              <div className="hidden sm:block lg:w-1/2 mt-8 lg:mt-0">
                <div className="relative rounded-lg overflow-hidden shadow-2xl">
                  <LazyImage
                    src="/images/posts/blog-hero.png"
                    alt="Blog Hero Image"
                    width={600}
                    height={400}
                    layout="responsive"
                    className="relative rounded-lg shadow-2xl transform hover:scale-110 origin-center transition-transform duration-500 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <svg
            className="absolute -bottom-1 left-0 right-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#070f2c"
              fillOpacity="1"
              d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,170.7C960,149,1056,107,1152,101.3C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-10"
          id="blog-posts"
        >
          <StyleSix title="Latest Posts" className="!text-4xl font-bold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 pt-5">
          {blogPosts.map((post: IPost) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
