import conn from "@/database/config";
import CommentS from "@/models/Comment";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { CustomUser } from "@/abstract/type";

export async function GET(req: NextRequest) {
  try {
    await conn();

    // Get all top-level comments (comments without parent comments)
    const comments = await CommentS.aggregate([
      {
        $match: {
          replies: { $exists: true },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "posts",
          localField: "postId",
          foreignField: "_id",
          as: "post",
        },
      },
      {
        $unwind: "$post",
      },
      {
        $graphLookup: {
          from: "comments", 
          startWith: "$replies",
          connectFromField: "replies",
          connectToField: "_id",
          as: "replies",
          depthField: "replyDepth",
        },
      },
      {
        $project: {
          _id: 1,
          postId: "$post.title",
          postSlug: "$post.slug",
          text: 1,
          userId: "$user._id",
          username: "$user.name",
          likes: 1,
          likedBy: 1,
          replies: 1,
          timestamp: 1,
        },
      },
      {
        $sort: { timestamp: -1 },
      },
    ]);

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { message: "Failed to fetch comments." },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    await conn();
    const { postId, text, parentId, action, commentId } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in to comment." },
        { status: 401 }
      );
    }

    const user = session.user as CustomUser;

    if (!user) {
      return NextResponse.json(
        { message: "You must be logged in to comment." },
        { status: 401 }
      );
    }

    if (action === "like") {
      const comment = await CommentS.findById(commentId);
      if (!comment) {
        return NextResponse.json(
          { message: "Comment not found." },
          { status: 404 }
        );
      }

      if (comment.likedBy.includes(user._id)) {
        comment.likes -= 1;
        comment.likedBy.map((id: string, index: number) => {
          console.log(id.toString(), user._id);
          if (id.toString() === user._id) {
            comment.likedBy.splice(index, 1);
          }
        });
        await comment.save();
        return NextResponse.json(comment, { status: 200 });
      }

      comment.likes += 1;
      comment.likedBy.push(user._id);
      await comment.save();
      return NextResponse.json(comment, { status: 200 });
    }

    // Validate input
    if (!postId || !text) {
      return NextResponse.json(
        { message: "Post ID and content are required." },
        { status: 400 }
      );
    }

    const newCommentData = {
      postId,
      text,
      userId: user._id,
      username: user.name,
    };

    const comment = await CommentS.create(newCommentData);

    if(parentId) {
      const parentComment = await CommentS.findById(parentId);
      if (!parentComment) {
        return NextResponse.json(
          { message: "Parent comment not found." },
          { status: 404 }
        );
      }

      parentComment.replies.push(comment._id);
      await parentComment.save();
    }

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { message: "Failed to create comment." },
      { status: 500 }
    );
  }
}
