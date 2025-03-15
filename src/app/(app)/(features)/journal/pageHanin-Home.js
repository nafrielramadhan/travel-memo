import Link from "next/link";
import Image from "next/image";
import { countries } from "@/data/countries";

export default function JournalPage() {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-3 gap-[68px] px-[150px]">
        {countries.map((country) => (
          <Link
            key={country.id}
            href={`/journal/${country.id}`}
            className="group block h-[400px] rounded-[40px] overflow-hidden shadow-md hover:shadow-lg transition-all"
          >
            <div className="relative w-full h-[300px]">
              <Image
                src={country.image}
                alt={country.name}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 bg-white">
              <h2 className="text-[24px] font-bold">{country.name}</h2>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-[5px]">
                <Image
                  src="/blogs.svg" 
                  alt="Blog icon"
                  width={16} 
                  height={16}
                />
                <p>{country.posts} Blogs</p>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
