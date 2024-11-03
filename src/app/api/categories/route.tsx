import Category from "@/models/Category";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { CustomUser } from "@/abstract/type";
import conn from "@/database/config";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, slug, description, action } = body;
  const errors: { [key: string]: string } = {};
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = session.user as CustomUser;
  await conn();
  const currentUser = await User.findOne({ _id: user._id });
  if (!currentUser) {
    return NextResponse.json(
      { status: "error", message: "User not found" },
      { status: 404 }
    );
  }

  if ((!name || !slug || !description) && action !== "delete") {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  } else {
    if (action !== "delete") {
      if (name.length < 3) {
        errors["name"] = "Name must be at least 3 characters";
      }
      if (slug.length < 3) {
        errors["slug"] = "Slug must be at least 3 characters";
      }
      if (description.length < 3) {
        errors["description"] = "Description must be at least 3 characters";
      }
      if (Object.keys(errors).length > 0) {
        return NextResponse.json(
          { message: "Validation error", errors },
          { status: 400 }
        );
      }
    }

    try {
      if (action === "add") {
        const category = await Category.findOne({ slug });
        if (category) {
          errors["name"] = errors["slug"] = "Category already exists";

          return NextResponse.json(
            { message: "Category already exists", errors },
            { status: 400 }
          );
        } else {
          const newCategory = new Category({
            name,
            slug,
            description,
            added_by: currentUser._id,
            added_at: new Date(),
          });
          await newCategory.save();
          return NextResponse.json(
            { message: "Category created successfully" },
            { status: 201 }
          );
        }
      } else if (action === "update") {
        const category = await Category.findOne({ slug });
        if (!category) {
          errors["name"] = errors["slug"] = "Category not found";

          return NextResponse.json(
            { message: "Category not found", errors },
            { status: 400 }
          );
        } else {
          category.name = name;
          category.slug = slug;
          category.description = description;
          category.updated_by = currentUser._id;
          category.updated_at = new Date();
          await category.save();
          return NextResponse.json(
            { message: "Category updated successfully" },
            { status: 200 }
          );
        }
      } else if (action === "delete") {
        const { id } = body;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
          errors["name"] = errors["slug"] = "Category not found";

          return NextResponse.json(
            { message: "Category not found", errors },
            { status: 400 }
          );
        } else {
          return NextResponse.json(
            { message: "Category deleted successfully" },
            { status: 200 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "Invalid action" },
          { status: 400 }
        );
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { status: "error", message: error || "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

export async function GET(req: NextRequest) {
  await conn();
  try {
    const categories = await Category.find({}).select(
      "name slug description _id"
    );

    return NextResponse.json({ categories });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: "error", message: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
