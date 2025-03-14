"use server";

import { auth } from "@/libs/auth";
// import { uploadFile } from "@/libs/file-ops"; // BELUM BELAJAR
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export async function createJournalAction(_, formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const destination = formData.get("destination");
  const startDate = new Date(formData.get("startDate"));
  const endDate = new Date(formData.get("endDate"));
  // createdAt, updatedAt, isPublic, isDeleted? kayaknya yg perlu isPublic aja sih(jadi ada check mau private or public)
  const isPublic = formData.get("isPublic") === "true"; // BENER GA NIH
  const totalExpense = formData.get("totalExpense");
  const image = formData.get("image");

  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  if (!title || !content || !destination || !startDate || !endDate) {
    return {
      success: false,
      message: "Title, content, destination, and Dates need to be filled!",
    };
  }

  const newJournal = await prisma.journal.create({
    data: {
      title,
      content,
      destination,
      startDate,
      endDate,
      isPublic,
      totalExpense: totalExpense ? parseFloat(totalExpense) : null,
      image: image.size !== 0 ? image.name : "",
      authorId: session.userId,
    },
  });

  await uploadFile({ key: image.name, folder: newJournal.id, body: image });

  return {
    success: true,
    message: "Journal successfully created",
  };
}
