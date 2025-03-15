import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs"; // Import blog data
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogDetailPage({ params }) {
  const blog = blogs.find(
    (b) => b.id === params.blogId && b.countryId === params.id
  );

  if (!blog) {
    return notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-[10px] text-black">
      <h1 className="text-[50px] font-bold">{blog.title}</h1>
      <p className="text-[30px] text-black mb-[16px] ">{blog.countryId}</p>

      <div className="flex items-center gap-3 mt-4">
        <Image
          src={blog.authorImage}
          alt={blog.author}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-gray-500">{blog.author}</span>
        <span className="text-gray-400 text-sm">{blog.date}</span>
      </div>

      <hr className="my-6 border-[#D9D9D9]" />

      <div className="relative w-full h-[400px] rounded-[60px] overflow-hidden shadow-md">
        <Image
          src={blog.image}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <article className="mt-6 leading-relaxed text-justify text-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
