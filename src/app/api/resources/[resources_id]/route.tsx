import { NextRequest, NextResponse } from "next/server";
import { Resources } from "@/models/resources";
import vine from "@vinejs/vine";
import { resourceValidatorSchema } from "@/validator/resourcesValidator";
import JSONAPIErrorReporter from "@/validator/errorReporter";
import path from "path";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { CustomUser } from "@/abstract/type";
import conn from "@/database/config";

export function GET() {
  return NextResponse.json(
    { status: "success", message: "GET request successful" },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  await conn();
  const formData = await req.formData();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = session.user as CustomUser;
  const user_id = user?._id;

  try {
    const request = {
      resourceName: formData.get("resource_name"),
      description: formData.get("description"),
      image: formData.get("image"),
      url: formData.get("url"),
      imageCredit: formData.get("image_credit"),
      _id: formData.get("_id"),
      _method: formData.get("_method"),
    };
    if (request._method == "INSERT") {
      const validator = vine.compile(resourceValidatorSchema);
      validator.errorReporter = () => new JSONAPIErrorReporter();
      const validated = await validator.validate(request);

      const response = await Resources.findOne({
        resourceName: request.resourceName,
      });

      if (response) {
        return NextResponse.json(
          {
            errors: { resourceName: "Resource name already exists" },
            status: 400,
          },
          { status: 200 }
        );
      } else {
        if (validated.image instanceof File) {
          const uploadDir = path.join(
            process.cwd(),
            "public",
            "images",
            "resources"
          );
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

          const file = validated.image;

          const ext = file.type.split("/").pop();

          const fileName = `resources-${validated.url}.${ext}`;

          const filePath = path.join(uploadDir, fileName);

          const buffer = Buffer.from(await file.arrayBuffer());

          fs.writeFileSync(filePath, buffer);

          validated.image = `/images/resources/${fileName}`;
        } else {
          validated.image = "/images/resources/placeholder.jpg";
        }

        const resource = new Resources({
          name: validated.resourceName,
          description: validated.description,
          image: validated.image,
          url: validated.url,
          credit: validated.imageCredit,
          created_at: new Date(),
          updated_at: new Date(),
          user_id: user_id,
        });

        await resource.save();

        return NextResponse.json(
          { message: "Resource added successfully", status: "success" },
          { status: 200 }
        );
      }
    } else if (request._method === "UPDATE") {
      if (request._id) {
        const updatedResource = await Resources.findOne({ _id: request._id });

        updatedResource.name = request.resourceName;
        updatedResource.description = request.description;
        updatedResource.url = request.url;
        updatedResource.credit = request.imageCredit;
        updatedResource.updated_at = new Date();
        updatedResource.updated_by = user_id;

        if (request.image instanceof File) {
          const uploadDir = path.join(
            process.cwd(),
            "public",
            "images",
            "resources"
          );
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

          const file = request.image;

          const ext = file.type.split("/").pop();

          const fileName = `resources-${request.url}.${ext}`;

          const filePath = path.join(uploadDir, fileName);

          if(fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

          const buffer = Buffer.from(await file.arrayBuffer());

          fs.writeFileSync(filePath, buffer);

          updatedResource.image = `/images/resources/${fileName}`;
        }

        await Resources.findOneAndUpdate({ _id: request._id }, updatedResource);

        if (updatedResource) {
          return NextResponse.json(
            {
              status: "success",
              message: "Resource updated successfully"
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { status: "error", message: "Resource not found" },
            { status: 404 }
          );
        }
      } else {
        return NextResponse.json(
          { status: "error", message: "Invalid request: Missing _id" },
          { status: 400 }
        );
      }
    } else if (request._method == "DELETE") {
      if (request._id) {
        const response = await Resources.findOne({
          _id: request._id,
        });

        if (response) {
          await Resources.findOneAndDelete({ _id: request._id });

          return NextResponse.json(
            {
              status: "success",
              message: "Resource deleted successfully",
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { status: "error", message: "Resource not found" },
            { status: 404 }
          );
        }
      } else {
        return NextResponse.json(
          { status: "error", message: "Invalid request" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { status: "error", message: "Invalid request method" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error },
      { status: 500 }
    );
  }
}


export async function PATCH(req: NextRequest) {
  await conn();
  const formData = await req.formData();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
    );
  }

  const user = session.user as CustomUser;
  const user_id = user?._id;

  try {
    const request = {
      _id: formData.get("_id"),
      visibility: formData.get("visible") === "1",
    };

    if (!request._id) {
      return NextResponse.json(
          { status: "error", message: "Invalid request: Missing id" },
          { status: 400 }
      );
    }

    const resource = await Resources.findOneAndUpdate({ _id: request._id }, { visible: request.visibility, updated_at: new Date(), updated_by: user_id });

    if (!resource) {
      return NextResponse.json(
          { status: "error", message: "Resource not found" },
          { status: 404 }
      );
    }

    return NextResponse.json(
        { status: "success", message: "Resource visibility updated successfully" },
        { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
        { status: "error", message: "An error occurred" },
        { status: 500 }
    );
  }
}
