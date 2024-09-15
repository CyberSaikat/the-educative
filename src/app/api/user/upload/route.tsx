import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { CustomUser } from "@/abstract/type";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  // Early return for invalid file
  if (!file || !file.name || !file.type || !file.size) {
    return NextResponse.json(
      { message: "Missing or invalid file", status: 400 },
      { status: 400 }
    );
  }

  // Enforce a file size limit of 2MB
  if (file.size > 1024 * 1024 * 2) {
    return NextResponse.json(
      { message: "File size too large", status: 400 },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);
  const user = session?.user as CustomUser;
  if (!user || !user.login_key || !user._id) {
    return NextResponse.json(
      { message: "Unauthorized", status: 401 },
      { status: 401 }
    );
  }

  try {
    const foundUser = (await User.findById(user._id).lean()) as CustomUser;
    if (!foundUser || foundUser.login_key !== user.login_key) {
      return NextResponse.json(
        { message: "Unauthorized or User not found", status: 401 },
        { status: 401 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");

    // Handle existing avatar file removal asynchronously
    if (foundUser.avatar?.filename) {
      const oldFilePath = path.join(uploadDir, foundUser.avatar.filename);
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      }); // Fire and forget
    }

    fs.mkdir(uploadDir, (err) => {
      if (err) {
        console.error("Error creating directory:", err);
      }
    });

    const ext = path.extname(file.name);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = `avatar-${uniqueSuffix}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    // Stream file data directly to disk
    const writeStream = fs.createWriteStream(filePath);
    const buffer = Buffer.from(await file.arrayBuffer());
    writeStream.write(buffer);
    writeStream.end();

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    // Update user avatar data
    foundUser.avatar = { filename: fileName, contentType: file.type } as {
      filename?: string | null | undefined;
      contentType?: string | null | undefined;
    };
    await User.updateOne({ _id: user._id }, { avatar: foundUser.avatar });

    return NextResponse.json(
      { message: "File uploaded", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}

export function GET(req: NextRequest) {
  return NextResponse.json(
    { message: "Method not allowed", status: 405 },
    { status: 405 }
  );
}
