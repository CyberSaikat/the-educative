import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { CustomUser } from "@/abstract/type";
import conn from "@/database/config";
import Category from "@/models/Category";
import User from "@/models/user";
import Subcategory from "@/models/SubCategory";

export async function GET(req: NextRequest) {
  await conn();
  const subcategories = await Subcategory.aggregate([
    {
      $lookup: {
        from: "categories", // The name of the category collection in MongoDB
        localField: "category", // Field from Subcategory
        foreignField: "_id", // Field from Category
        as: "categoryDetails", // Alias for the joined data
      },
    },
    {
      $unwind: "$categoryDetails", // Flatten the array
    },
    {
      $project: {
        name: 1,
        slug: 1,
        description: 1,
        categoryId: "$categoryDetails._id",
        categoryName: "$categoryDetails.name",
        _id: 1,
      },
    },
  ]);

  return NextResponse.json({ subcategories });
}


export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, slug, description, category, action } = body;
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

  if (!name || !slug) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  } else {
    if (name.length < 3) {
      errors["name"] = "Name must be at least 3 characters";
    }
    if (slug.length < 3) {
      errors["slug"] = "Slug must be at least 3 characters";
    }
    if (description && description.length < 3) {
      errors["description"] = "Description must be at least 3 characters";
    }
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { message: "Validation error", errors },
        { status: 400 }
      );
    }

    try {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        errors["category"] = "Category not found";

        return NextResponse.json(
          { message: "Category not found", errors },
          { status: 400 }
        );
      }

      if (action === "add") {
        const existingSubcategory = await Subcategory.findOne({ slug });
        if (existingSubcategory) {
          errors["slug"] = "Subcategory already exists";

          return NextResponse.json(
            { message: "Subcategory already exists", errors },
            { status: 400 }
          );
        }

        const newSubcategory = new Subcategory({
          name,
          slug,
          description,
          added_by: currentUser._id,
          category,
        });

        await newSubcategory.save();
        return NextResponse.json(
          { message: "Subcategory created successfully" },
          { status: 201 }
        );
      } else if (action === "update") {
        const { categoryId } = body;
        const subcategory = await Subcategory.findOne({ slug });
        if (!subcategory) {
          errors["subcategory"] = "Subcategory not found";

          return NextResponse.json(
            { message: "Subcategory not found", errors },
            { status: 400 }
          );
        }

        subcategory.name = name;
        subcategory.slug = slug;
        subcategory.description = description;
        subcategory.updated_by = currentUser._id;
        subcategory.updated_at = new Date();
        subcategory.category = categoryId;

        await subcategory.save();

        return NextResponse.json(
          { message: "Subcategory updated successfully" },
          { status: 200 }
        );
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



export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  const errors: { [key: string]: string } = {};
  await conn();
  try {
    const subcategory = await Subcategory.findByIdAndDelete(id);
    if (!subcategory) {
      errors["name"] = errors["slug"] = "Subcategory not found";

      return NextResponse.json(
        { message: "Subcategory not found", errors },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "Subcategory deleted successfully" },
        { status: 200 }
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
