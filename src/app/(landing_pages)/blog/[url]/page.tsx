import conn from "@/database/config";
import { NotFoundPage } from "@/app/not-found";
import { Metadata } from "next";
import { AnimatedTitle } from "@/components/custom-ui/TitleComponents";
import Post from "@/models/Post";
import CommentS from "@/models/Comment"; // Add Comment import
import { IPost, IComment } from "@/abstract/interface";
import Breadcrumb from "@/components/custom-ui/Breadcrumb";
import ShareButtons from "@/components/custom-ui/ShareButtons";
import { FaCalendarDays, FaTag } from "react-icons/fa6";
import Image from "next/image";
import { DateFormat } from "@/utils/DateFormat";
import { BlogContent } from "./ViewContent";
import BlogPostCard from "../BlogPostCard";
import CommentSection from "./CommentSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { CustomUser } from "@/abstract/type";
import mongoose from "mongoose";

interface PageProps {
  params: {
    url: string;
  };
}

// Function to generate dynamic metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { url } = params;

  await conn();
  const data = JSON.parse(
    JSON.stringify(await Post.findOne({ slug: url }))
  ) as IPost;

  if (!data) {
    return {
      title: "Not Found",
      description: "Blog not found",
    };
  }

  const host = process.env.NEXT_PUBLIC_HOST || "localhost:3000"; // Fallback to a default value
  const baseUrl = `https://${host}`;
  const metaUrl = new URL(`/resource/${data.slug}`, baseUrl);
  const metaTitle = `${data.metaTitle} - Blog`;
  const metaDescription = data.metaDescription || "Blog page";
  const metaImage =
    (data.featuredImage as string) ||
    ("public/images/resources/placeholder.png" as string);

  return {
    metadataBase: new URL(baseUrl), // Set the metadataBase here
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      images: [
        {
          url: new URL(metaImage, baseUrl).toString(), // Ensure the image URL is absolute
          alt: data.title || "Blog Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [new URL(metaImage, baseUrl).toString()], // Ensure the image URL is absolute
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { url } = params;

  await conn();
  mongoose.set('bufferCommands', false);
  mongoose.connection.set('serverSelectionTimeoutMS', 30000);

  const session = await getServerSession(authOptions);
  const user = session?.user as CustomUser;

  const res = await Post.aggregate([
    { $match: { slug: url, status: "published" } },
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
        publish_date: 1,
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
  ]).exec();

  if (!res.length) {
    return <NotFoundPage />;
  }

  const data = JSON.parse(JSON.stringify(res[0])) as IPost;

  if (!data) {
    return <NotFoundPage />;
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: data.title || "", href: `/blog/${data.slug}` },
  ];

  const otherBlogs = await Post.aggregate([
    {
      $match: { visible: true, slug: { $ne: url } },
    },
    {
      $sample: { size: 3 },
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
        publish_date: 1,
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
  const otherBlogsData = JSON.parse(JSON.stringify(otherBlogs)) as IPost[];

  // Fetch comments for the current post
  const comments = await CommentS.find({ postId: data._id })
    .populate({
      path: "replies",
      model: "Comment",
      populate: {
        path: "userId",
        model: "User",
        select: "name",
      },
    })
    .populate({
      path: "userId",
      model: "User",
      select: "name",
    })
    .sort({ timestamp: -1 })
    .exec();

  const commentsData = JSON.parse(JSON.stringify(comments)) as any[];

  return (
    <>
      <div className="relative container overflow-hidden">
        <div className="mx-auto">
          <div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl mb-8">
              <div className="aspect-w-16 aspect-h-9">
                {typeof data.featuredImage === "string" ? (
                  <Image
                    src={data.featuredImage}
                    alt={data.title}
                    className="w-full object-center"
                    width={1800}
                    height={900}
                    priority={true}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              </div>
              {data.imageCredit && (
                <div className="absolute bottom-2 right-2 text-xs text-gray-300 bg-black bg-opacity-50 px-2 py-1 rounded">
                  {data.imageCredit}
                </div>
              )}
            </div>
            <Breadcrumb
              items={breadcrumbItems}
              className="hidden sm:inline-flex"
            />
            <div className="mb-3">
              <ShareButtons />
            </div>
            <div className="text-center">
              <AnimatedTitle
                title={data.title!}
                className="!text-xl sm:!text-2xl"
              />
            </div>
            {data.excerpt && (
              <p className="mt-3 text-sm sm:text-lg text-gray-300 md:mt-5">
                {data.excerpt}
              </p>
            )}
            <div className="mt-4 flex gap-x-5 gap-y-2 justify-between items-center flex-wrap">
              <div className="flex items-center justify-center gap-2">
                <FaCalendarDays />
                <span className="text-gray-300 font-semibold">
                  {DateFormat(data.publish_date.toString(), "dd-mm-yyyy")}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-300 font-semibold">By</span>
                <span className="text-gray-300 font-semibold">
                  {data.author || "Admin"}
                </span>
              </div>
            </div>
            {data.tags && (
              <div className="mt-5 flex justify-center gap-3 flex-wrap">
                {data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    <FaTag size={14} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {data.content && <BlogContent content={data} />}
          </div>
        </div>
        {commentsData.length > 0 || true ? ( // Always render comment section
          <CommentSection
            comments={commentsData}
            postId={data._id}
            currentUserId={user?._id}
          />
        ) : null}
        {otherBlogsData.length > 0 && (
          <div className="mx-auto mt-8">
            <div className="text-center">
              <AnimatedTitle title="You may also like" className="" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {otherBlogsData.map((post) => (
                <BlogPostCard post={post} key={post._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
