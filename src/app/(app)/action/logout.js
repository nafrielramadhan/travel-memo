"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logoutAction(_, formData) {
  const cookiesStore = await cookies();
  const getCookies = cookiesStore.get("sessionId")?.value;
  await prisma.session.delete({
    where: {
      id: getCookies,
    },
  });
  cookiesStore.delete("sessionId");
  redirect("/");
}
