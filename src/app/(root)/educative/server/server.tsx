"use server";

import { CustomUser } from "@/abstract/type";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import conn from "@/database/config";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getUserdata() {
  await conn();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = session?.user as CustomUser;

  const login_key = user?.login_key;
  const user_id = user?._id;

  if (!login_key || !user_id) {
    redirect("/login");
  }

  const res = {
    loggedIn: true,
    user: user,
  };

  return res;
}

export async function getUsersServer() {
  await conn();

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = session?.user as CustomUser;

  const login_key = user?.login_key;
  const user_id = user?._id;

  const users = await User.find()
    .where("_id")
    .ne(user_id)
    .select("-login_key -password -reset_key -reset_key_expires");

  return users.map((user) => {
    const plainUser = user.toObject();
    plainUser._id = plainUser._id.toString();

    return plainUser;
  });
}

export async function getUser() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = session?.user as CustomUser;

  const login_key = user?.login_key;
  const user_id = user?._id;

  return user;
}
