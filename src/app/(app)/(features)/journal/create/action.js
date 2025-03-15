"use server";

import { auth } from "@/libs/auth";
import { uploadFile } from "@/libs/file-ops";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export async function createJournalAction(_, formData) {
  const title = formData.get("title");
  const content = formData.get("content"); // ✅ Pastikan ini dari input hidden
  const country = formData.get("country");
  const city = formData.get("city");
  const startDate = new Date(formData.get("startDate"));
  const endDate = new Date(formData.get("endDate"));
  const totalExpense = formData.get("totalExpense"); // ini kan decimal, perlu diconvert kah?
  const image = formData.get("image");

  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  if (
    !title ||
    !content ||
    !country ||
    !city ||
    !startDate ||
    !endDate ||
    !totalExpense ||
    !image
  ) {
    return {
      success: false,
      message: "All required fields must be filled!",
    };
  }

  const newJournal = await prisma.journal.create({
    data: {
      title,
      content,
      country,
      city,
      startDate,
      endDate,
      totalExpense,
      image: image.size !== 0 ? image.name : "",
      authorId: session.userId,
    },
  });
  console.log("Journal created:", newJournal);

  await uploadFile({ key: image.name, folder: newJournal.id, body: image });

  return { success: true, message: "Your journal successfully published!" };
}
