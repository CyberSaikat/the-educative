import { Resources } from "@/models/resources";
import ResourcesPage from "./resources";
import conn from "@/database/config";
import { Metadata } from "next";
import Post from "@/models/Post";

export function generateMetadata(): Metadata {
  return {
    title: "Resources | The Educative",
    description:
      "The Educative is the best place to learn. We provide the best courses for you to learn and grow. We have the best teachers and the best courses for you to learn.",
    icons: [
      {
        href: "/favicon.ico",
        sizes: "16x16",
        type: "image/x-icon",
        url: "/favicon.ico",
      },
    ],
  };
}

export default async function Page() {
  conn();
  const mockResources = await Resources.find().select("-__v").exec();

  const posts = await Post.find().select("title slug -_id").exec();

  const plainResources = mockResources
    .map((resource) => JSON.parse(JSON.stringify(resource)))
    .reverse();

  const plainBlogs = posts.map((post) => JSON.parse(JSON.stringify(post))).reverse();
  return (
    <>
      <ResourcesPage mockResources={plainResources} blogs={plainBlogs} />
    </>
  );
}
