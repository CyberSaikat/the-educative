import Subcategory from "@/models/SubCategory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const category = req.nextUrl.pathname.split("/").pop();
    if(!category) {
        return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
    }else{
        const subCategories = await Subcategory.find({ category });
        return NextResponse.json({ subcategories: subCategories }, { status: 200 });
    }
}