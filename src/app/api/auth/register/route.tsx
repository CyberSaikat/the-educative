import { NextRequest, NextResponse } from "next/server";
import conn from "@/database/config";
import user from "@/models/user";

export function GET() {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(request: NextRequest) {
  try {
    await conn();
    const body = await request.json();
    const { name, email, password } = body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usertype = "user";
    const created_at = new Date();
    const updated_at = new Date();

    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = new user({
      name,
      email,
      password,
      usertype,
      created_at,
      updated_at,
    });

    const createUser = await newUser.save();

    if (!createUser) {
      return NextResponse.json(
        { message: "Error creating user 1" },
        { status: 500 }
      );
    }

    if (createUser) {
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
