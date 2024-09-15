import conn from "@/database/config";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const resetKey = url.pathname.split("/").pop();
  if (!resetKey) {
    return NextResponse.json({ message: "Invalid reset key" }, { status: 400 });
  }

  try {
    conn();
    const user = await User.findOne({ reset_key: resetKey });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.reset_key_expires < Date.now()) {
      return NextResponse.json(
        { message: "Reset key has expired" },
        { status: 400 }
      );
    }

    return NextResponse.json({ email: user.email }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
    NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}