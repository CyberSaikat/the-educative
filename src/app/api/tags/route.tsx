import Tag from "@/models/Tags";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { CustomUser } from "@/abstract/type";

export async function GET(req: NextRequest) {
  try {
    const tags = await Tag.find();
    return NextResponse.json({ tags: tags }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, slug, action } = body;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = session.user as CustomUser;

  if (action === "add") {
    if (!name || !slug) {
      return NextResponse.json(
        { message: "Name and slug are required" },
        { status: 400 }
      );
    } else {
      const existingTag = await Tag.findOne({ slug });
      if (existingTag) {
        return NextResponse.json(
          { message: "Tag already exists" },
          { status: 400 }
        );
      } else {
        const tag = new Tag({
          name,
          slug,
          added_by: user._id,
        });
        await tag.save();
        return NextResponse.json(
          { message: "Tag added successfully" },
          { status: 201 }
        );
      }
    }
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = session.user as CustomUser;

  try {
    const tag = await Tag.findById(id);
    if (!tag) {
      return NextResponse.json({ message: "Tag not found" }, { status: 404 });
    } else {
      await tag.delete();
      return NextResponse.json(
        { message: "Tag deleted successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, name, slug, action } = body;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = session.user as CustomUser;

  if (action === "update") {
    if (!name || !slug) {
      return NextResponse.json(
        { message: "Name and slug are required" },
        { status: 400 }
      );
    } else {
      const tag = await Tag.findById(id);
      if (!tag) {
        return NextResponse.json({ message: "Tag not found" }, { status: 404 });
      } else {
        tag.name = name;
        tag.slug = slug;
        tag.updated_by = user._id;
        await tag.save();
        return NextResponse.json(
          { message: "Tag updated successfully" },
          { status: 200 }
        );
      }
    }
  }
}
