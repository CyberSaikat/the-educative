import { Metadata } from "next";
import { AnimatedUserCard } from "./card";
import User from "@/models/user";
import conn from "@/database/config";
import Category from "@/models/Category";
import Tags from "@/models/Tags";
import { Resources } from "@/models/resources";
import Post from "@/models/Post";

export function generateMetadata(): Metadata {
  return {
    title: "Dashboard | The Educative",
    description:
      "The Educative is the best place to learn. We provide the best courses for you to learn and grow. We have the best teachers and the best courses for you to learn.",
  };
}

export default async function Dashboard() {
  await conn();
  const users = await User.find();
  const totalUsers = users.length;
  const totalCategories = (await Category.find()).length;
  const totalTags = (await Tags.find()).length;
  const resources = (await Resources.find()).length;
  const totalPosts = (await Post.find()).length;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-0 sm:p-4">
        <AnimatedUserCard
          variant="green"
          mainNumber={totalUsers}
          title={"Users"}
          CardIcon={"FaUsers"}
        />
        <AnimatedUserCard
          variant="orange"
          mainNumber={resources}
          title={"Resources"}
          CardIcon={"GoZap"}
        />
        <AnimatedUserCard
          variant="pink"
          mainNumber={totalPosts}
          title={"Posts"}
          CardIcon={"TbSquareRoundedChevronsUpFilled"}
        />
        <AnimatedUserCard
          variant="blue"
          mainNumber={totalCategories}
          title={"Categories"}
          CardIcon={"FaThumbsUp"}
        />
        <AnimatedUserCard
          variant="purple"
          mainNumber={totalTags}
          title={"Tags"}
          CardIcon={"GoArrowUpRight"}
        />
      </div>
    </>
  );
}
