import conn from "@/database/config";
import { Resources } from "@/models/resources";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { CustomUser } from "@/abstract/type";
import path from "path";
import fs from "fs";
import { NewResourcesContent } from "@/abstract/interface";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = session.user as CustomUser;
  const user_id = user?._id;
  const formData = await req.formData();
  const url = formData.get("url")?.toString() ?? "";
  const title = formData.get("title")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";
  const features = JSON.parse(formData.get("features")?.toString() as string);
  const callToAction = formData.get("callToAction")?.toString() ?? "";
  const image = formData.get("image") ?? "";
  const imageCredit = formData.get("imageCredit")?.toString() ?? "";

  try {
    await conn();

    const resource = await Resources.findOne({ url });

    if (!user || !resource) {
      return NextResponse.json(
        {
          status: "error",
          message: resource ? "Unauthorized" : "Resource not found",
        },
        { status: resource ? 401 : 404 }
      );
    } else {
      const newContent: NewResourcesContent = {
        title,
        description,
        features: features.map((feature: any) => ({
          icon: feature.icon,
          title: feature.title,
          description: feature.description,
          link: feature.link,
        })),
        callToAction,
        imageSrc: "",
        imageCredit,
      };

      if (image instanceof File) {
        const uploadDir = path.join(
          process.cwd(),
          "public",
          "images",
          "resources",
          url
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const file = image;

        const ext = file.type.split("/").pop();

        const fileName = `resources-${url}.${ext}`;

        const filePath = path.join(uploadDir, fileName);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        fs.writeFileSync(filePath, buffer);

        const imagePath = `/images/resources/${url}/${fileName}`;
        newContent.imageSrc = imagePath;
      }else{
        newContent.imageSrc = resource.content.imageSrc;
      }


      const res = await Resources.findOneAndUpdate(
        { url },
        {
          $set: {
            content: newContent,
            updated_by: user_id,
            updated_at: new Date(),
          },
        },
        { new: true }
      );

      if (res) {
        return NextResponse.json(
          { status: "success", message: "Content added successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { status: "error", message: "Resource update failed" },
          { status: 500 }
        );
      }
    }
  } catch (e) {
    console.error("Error updating resource:", e);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
