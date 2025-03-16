import { prisma } from "@/utils/prisma";
import JournalDetail from "./journal-detail";
import { auth } from "@/libs/auth"; // ✅ Ambil auth() langsung di halaman

export default async function Page({ params }) {
  // ❌ Jangan gunakan isLogin sebagai parameter kedua
  const { id } = await params;
  const session = await auth(); // ✅ Ambil session langsung di page

  const journal = await prisma.journal.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!journal) {
    return <div className="text-red-500">Journal not found!</div>;
  }

  const safeJournal = {
    ...journal,
    totalExpense: journal.totalExpense ? Number(journal.totalExpense) : 0,
  };

  return (
    <main>
      <JournalDetail journal={safeJournal} isLogin={session} />
    </main>
  ); // ✅ Kirim session ke JournalDetail sebagai isLogin
}
