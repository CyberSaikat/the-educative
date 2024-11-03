import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json({message: "User logged out"}, {status: 200});
}
