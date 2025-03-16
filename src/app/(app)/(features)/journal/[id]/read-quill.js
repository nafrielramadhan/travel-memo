"use client"; // Tambahkan ini agar jadi Client Component

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const ReadDetail = ({ content }) => {
  return (
    <div className="prose prose-lg prose-stone max-w-none text-xl">
      <ReactQuill value={content} readOnly={true} theme="bubble" />
    </div>
  );
};

export default ReadDetail;
