"use server";

// import { avatarBaseURL } from "@/constants/avatar-url";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerAction(_, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return {
      success: false,
      message: "Please fill in all the fields!",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "Email already used!",
    };
  }

  //   const avatarUrl = `${avatarBaseURL}/${(Math.random() * 100 + 1).toFixed(0)}`;
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      avatarUrl,
    },
  });

  redirect("/login");
}
