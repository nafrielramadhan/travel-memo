"use server";

import { auth } from "@/libs/auth";
import { uploadFile } from "@/libs/file-ops";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export async function editJournalAction(_, formData) {
  const id = formData.get("id");
  const title = formData.get("title");
  const content = formData.get("content"); // ✅ Pastikan ini dari input hidden
  const country = formData.get("country");
  const city = formData.get("city");
  const startDate = new Date(formData.get("startDate"));
  const endDate = new Date(formData.get("endDate"));
  const totalExpense = formData.get("totalExpense"); // ini kan decimal, perlu diconvert kah?
  const image = formData.get("image");
  const oldImage = formData.get("oldImage"); // ✅ Ambil nama gambar lama

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

  // ✅ Jika user tidak upload gambar baru, gunakan gambar lama
  let imageName = oldImage;
  if (image && image.size !== 0) {
    imageName = image.name; // ✅ Gunakan nama file asli tanpa rename
  }

  const updatedJournal = await prisma.journal.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      country,
      city,
      startDate,
      endDate,
      totalExpense,
      image: imageName,
      authorId: session.userId,
    },
  });

  // ✅ Upload gambar baru ke folder sesuai ID jurnal jika ada file baru
  if (image && image.size !== 0) {
    await uploadFile({
      key: image.name,
      folder: updatedJournal.id,
      body: image,
    });
  }

  return { success: true, message: "Your journal successfully edite!" };
}
