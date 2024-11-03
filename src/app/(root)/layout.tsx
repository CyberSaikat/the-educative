import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import React from "react";
import RootLayoutCode from "./layout_";
import { CustomUser } from "@/abstract/type";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  const userdata = session?.user as CustomUser;

  if (!userdata) {
    redirect("/login");
  }

  if(userdata.usertype !== "admin") {
    redirect("/");
  }

  return <RootLayoutCode userdata={userdata}>{children}</RootLayoutCode>;
}
