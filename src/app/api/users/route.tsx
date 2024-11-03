import conn from "@/database/config";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await conn();
  const users = await User.find({})
    .select({
      name: true,
      email: true,
      usertype: true,
      created_at: true,
      updated_at: true,
    })
    .where("usertype")
    .ne("admin");
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  await conn();
  const body = await request.json();
  const { action } = body;

  if (!action) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    if (action == "update") {
      const { _id, name, email, usertype } = body;
      const updated_at = new Date();
      const user = await User.findOneAndUpdate(
        { _id },
        { name: name, email: email, usertype: usertype, updated_at: updated_at }
      );
      if (!user) {
        return NextResponse.json(
          { message: "User not found", status: 404 },
          { status: 404 }
        );
      }
      if (user) {
        return NextResponse.json({
          message: "User updated successfully",
          status: 200,
        });
      }
    } else if (action == "delete") {
      const { _id } = body;
      const user = await User.findOneAndDelete({ _id });
      if (!user) {
        return NextResponse.json(
          { message: "User not found", status: 404 },
          { status: 404 }
        );
      }

      if (user) {
        return NextResponse.json({
          message: "User deleted successfully",
          status: 200,
        });
      }
    } else if (action == "add") {
      const { name, email, usertype } = body;
      if (name && email && usertype) {
        const user = await User.findOne({ email });
        if (user) {
          return NextResponse.json(
            { message: "Email already exists", status: 400 },
            { status: 400 }
          );
        }
        const created_at = new Date();
        const random_password = Math.random().toString(36).slice(-8);
        const newUser = new User({
          name,
          email,
          usertype,
          password: random_password,
          created_at,
          updated_at: created_at,
        });
        await newUser.save();
        return NextResponse.json(
          { message: "User added successfully", status: 201 },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: "Missing required fields", status: 400, body },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Invalid action", status: 400 },
        { status: 400 }
      );
    }
  } catch (error: any) {
    error = error.toString();
    if (error.includes("Invalid email address")) {
      return NextResponse.json(
        { message: "Invalid email address", status: 400 },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
