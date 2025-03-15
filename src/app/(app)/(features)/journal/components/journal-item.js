import { Button } from "@heroui/react";
import Avatar from "boring-avatars";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
// import { ButtonDeleteEvent } from "./button-delete-event";

// Fungsi untuk menghapus tag HTML dari content
const stripHtml = (html) => html.replace(/<[^>]+>/g, "");

export const JournalItem = ({ id, image, title, content, name, createdAt }) => {
  const maxLength = 100; // Batas panjang teks
  const cleanContent = stripHtml(content);
  const shortContent =
    cleanContent.length > maxLength
      ? cleanContent.slice(0, maxLength) + "..."
      : cleanContent; // Tambahkan "..." hanya jika terpotong

  return (
    <main>
      <Link href={`/journal/${id}`}>
        <div className="block h-[380px] rounded-[40px] overflow-hidden shadow-lg hover:shadow-xl transition">
          {/* Gambar cover harus pake VPN & Image kecil */}
          <Image
            src={`https://pub-af8be0bea17b4d2c8b04929ebf16bac7.r2.dev/travel-memo/${id}/${image}`}
            alt={title}
            width={400}
            height={400}
            className="relative w-full h-[270px]"
            unoptimized={true}
            priority
          />

          {/* Bagian bawah image */}
          <div className="p-4 bg-white">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-gray-500 text-sm">{shortContent}</p>

            {/* Harus diperpendek nih content nya! */}
            {/* Bagian publisher + tanggal */}
            <div className="flex items-center gap-2 mt-2">
              <Avatar name={name} variant="beam" size={20} />
              <span className="text-sm">
                {name
                  .split(" ") // Pisah berdasarkan spasi
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi setiap kata
                  .join(" ")}{" "}
              </span>

              <span className="text-gray-400 text-sm ml-auto">
                {moment(createdAt).format("DD MMM YYYY")}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </main>
  );
};
