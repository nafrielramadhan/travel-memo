import { notFound } from "next/navigation";
import { countries } from "@/data/countries";
import { blogs } from "@/data/blogs"; 
import Image from "next/image";
import Link from "next/link";

export default function JournalDetailPage({ params }) {
  const country = countries.find((c) => c.id === params.id);

  if (!country) {
    return notFound();
  }

  const countryBlogs = blogs.filter((blog) => blog.countryId === params.id);

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-regular mb-6">{country.name} Travel Journals</h1>

      <div className="grid grid-cols-3 gap-6 px-[20px]">
        {countryBlogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/journal/${country.id}/${blog.id}`}
            className="block h-[400px] rounded-[40px] overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <div className="relative w-full h-[270px]">
              <Image src={blog.image} alt={blog.title} layout="fill" objectFit="cover" className="hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="p-4 bg-white">
              <h2 className="text-lg font-bold">{blog.title}</h2>
              <p className="text-gray-500 text-sm">{blog.excerpt}</p>
              <div className="flex items-center gap-2 mt-2">
                <Image src={blog.authorImage} alt={blog.author} width={24} height={24} className="rounded-full" />
                <span className="text-sm">{blog.author}</span>
                <span className="text-gray-400 text-sm ml-auto">{blog.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
