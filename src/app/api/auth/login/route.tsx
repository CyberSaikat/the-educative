import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import conn from "@/database/config";
import "server-only";
import { cookies } from "next/headers";
import user from "@/models/user";

export function GET() {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(request: NextRequest) {
  try {
    await conn();
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }

    // Set cookie
    const login_key = bcrypt.hashSync(email, 10);
    const updated_at = new Date();
    existingUser.login_key = login_key;
    existingUser.updated_at = updated_at;
    await existingUser.save();

    cookies().set("login_key", login_key, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    cookies().set("user_id", existingUser._id, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    cookies().set('userdata', JSON.stringify({
      name: existingUser.name,
      email: existingUser.email,
      avatar: existingUser.avatar,
    }), {
      maxAge: 60 * 60 * 24,
      httpOnly: false,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
