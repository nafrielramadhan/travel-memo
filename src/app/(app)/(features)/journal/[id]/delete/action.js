"use server";

import { auth } from "@/libs/auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export async function deleteJournalAction(formData) {
  const id = formData.get("id");

  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  try {
    // Hapus jurnal dari database
    await prisma.journal.delete({
      where: { id },
    });

    return { success: true, message: "Journal successfully deleted!" };
  } catch (error) {
    console.error("Error deleting journal:", error);
    return { success: false, message: "Failed to delete journal!" };
  }
}
