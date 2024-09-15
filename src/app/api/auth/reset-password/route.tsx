import conn from "@/database/config";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const email = body.email;
    const password = body.password;
    const resetKey = body.resetKey;
    if (!email || !password || !resetKey) {
      return NextResponse.json(
        { message: "Please fill in all fields" },
        { status: 400 }
      );
    }
  
    try {
      conn();
      const user = await User.findOne({ email, reset_key: resetKey });
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      if (user.reset_key_expires < Date.now()) {
        return NextResponse.json(
          { message: "Reset key has expired" },
          { status: 400 }
        );
      }
  
      user.password = password;
      user.reset_key = null;
      user.reset_key_expires = null;
  
      const res = await user.save();
  
      if (res) {
        return NextResponse.json(
          { message: "Password reset successfully" },
          { status: 200 }
        );
      }
  
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
  