"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteJournalAction } from "./delete/action";
import moment from "moment";
import Image from "next/image";
import Avatar from "boring-avatars";
import ReadDetail from "./read-quill";
import Link from "next/link";

export default function JournalDetail({ journal, isLogin }) {
  // ✅ Terima isLogin sebagai props
  const router = useRouter();
  const [pending, setPending] = useState(false);

  console.log("isLogin:", isLogin); // ✅ Cek apakah isLogin benar-benar ada

  // ✅ Cek apakah user yang login adalah pemilik jurnal
  const isOwner = isLogin?.user?.id === journal.authorId;

  const handleDelete = async () => {
    setPending(true);

    const formData = new FormData();
    formData.append("id", journal.id);

    const result = await deleteJournalAction(formData);

    if (result.success) {
      router.push("/journal"); // ✅ Redirect setelah berhasil delete
    } else {
      alert(result.message);
      setPending(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-[10px] text-black">
      <div className="flex flex-col space-y-2">
        <section className="space-y-4">
          <div className="text-[50px] font-gt-display font-bold tracking-tight text-gray-900 leading-tight">
            {journal.title}
          </div>

          <div className="flex space-x-4 mb-5">
            <div className="border-[1.5px] border-black text-black px-5 py-2 rounded-full font-medium text-lg">
              {journal.country}, {journal.city}
            </div>

            <div className="border-[1.5px] border-black text-black px-5 py-2 rounded-full font-medium text-lg">
              {moment(journal.startDate).format("DD MMM YY")} -{" "}
              {moment(journal.endDate).format("DD MMM YY")}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar name={journal.author.name} variant="beam" size={30} />
            <span className="font-medium">
              {journal.author.name
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </span>

            <span className="ml-auto font-medium">
              Created at: {moment(journal.createdAt).format("DD MMM YYYY")}
            </span>
          </div>
        </section>

        <hr className="border-[0.3px] border-black mt-4 mb-8" />

        <div className="space-y-2 mb-7">
          <Image
            src={`https://pub-af8be0bea17b4d2c8b04929ebf16bac7.r2.dev/travel-memo/${journal.id}/${journal.image}`}
            alt={journal.title}
            width={400}
            height={400}
            className="relative w-full rounded-[50px]"
            unoptimized={true}
            priority
          />
        </div>

        <ReadDetail content={journal.content} />

        <div className="border-[1.5px] border-black text-black px-5 py-2 rounded-full font-medium text-lg w-fit mt-6 mx-auto">
          Total Expense for this trip is: {journal.totalExpense.toString()} USD
        </div>

        <hr className="border-[0.3px] border-black mt-4 mb-8" />

        {isOwner && (
          <div className="flex justify-center gap-4 mb-5">
            <Link href={`/journal/${journal.id}/edit`}>
              <div className="normalButton !rounded-[20px] !py-3 !px-6 font-medium text-center cursor-pointer">
                Edit Journal
              </div>
            </Link>

            <button
              onClick={handleDelete}
              className={`normalButton !rounded-[20px] !py-3 !bg-red-500 max-w-40 font-medium text-center transition-opacity ${
                pending ? "opacity-80 cursor-not-allowed" : "opacity-100"
              }`}
              disabled={pending}
            >
              {pending ? "Deleting..." : "Delete Journal"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
