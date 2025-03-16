import { prisma } from "@/utils/prisma";
import { EditJournalForm } from "./edit-journal-form";

export default async function Page({ params }) {
  const { id } = await params;

  const journal = await prisma.journal.findUnique({
    where: {
      id,
    },
    // include: {
    //   author: true, // Include data author untuk mendapatkan name
    // },
  });

  const safeJournal = {
    ...journal,
    totalExpense: journal.totalExpense ? Number(journal.totalExpense) : 0, // Pastikan jadi Number
  };

  if (!journal) {
    return <div className="text-red-500">Journal not found!</div>;
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-[10px] text-black">
      <EditJournalForm journal={safeJournal} />
    </main>
  );
}
