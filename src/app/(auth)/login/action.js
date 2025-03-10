"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(_, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const cookieStore = await cookies();

  if (!email || !password) {
    return {
      success: false,
      message: "All fields are required!",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return {
      success: false,
      message: "User not found! Register your account first!",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Invalid password!",
    };
  }

  const newSession = await prisma.session.create({
    data: {
      userId: existingUser.id,
    },
  });

  cookieStore.set("sessionId", newSession.id, {
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/");
}
