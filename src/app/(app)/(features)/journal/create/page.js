"use client";

import { Button, Input, Textarea } from "@heroui/react";
import { useActionState, useState } from "react";
import { createJournalAction } from "./action.js";
import { redirect } from "next/navigation";

// Import styles
import styles from "./createJournal.module.css";
import "react-quill-new/dist/quill.bubble.css";

// Dynamically import ReactQuill (only runs on the client)
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Page() {
  const [state, formAction, pending] = useActionState(
    createJournalAction,
    null
  );

  // ✅ Tambahkan state untuk menyimpan isi ReactQuill
  const [content, setContent] = useState("");

  // Preview Gambar
  const [imagePreview, setImagePreview] = useState(null);

  if (state?.success) {
    redirect("/journal");
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-[10px] text-black">
      <form className="flex flex-col space-y-4" action={formAction}>
        <div className={`${styles.container} space-y-4`}>
          {/* Title */}
          <Input
            type="text"
            name="title"
            placeholder="Title"
            className={`${styles.input}`}
          />

          {/* Destinations */}
          <div className="space-y-2">
            <div className="font-bold">Destinations</div>
            <div className="flex space-x-4">
              <Input
                type="text"
                name="country"
                placeholder="Country"
                className="normalInput"
              />
              <Input
                type="text"
                name="city"
                placeholder="City"
                className="normalInput"
              />
            </div>
          </div>

          {/* Trip Date */}
          <div className="space-y-2">
            <div className="font-bold ">Trip Date</div>
            <div className="flex space-x-4">
              <Input
                type="date"
                name="startDate"
                placeholder="Start Date"
                className="normalInput"
              />
              <Input
                type="date"
                name="endDate"
                placeholder="End Date"
                className="normalInput"
              />
            </div>
          </div>

          <hr className="border-t border-gray-300 my-4" />

          {/* Journal Cover */}
          {/* <div>
            <div className="font-bold">Journal Cover</div>
            <label className="normalButton cursor-pointer !bg-gray-300 p-2 rounded-lg inline-block">
              <span>Upload File</span>
              <Input type="file" name="image" className="hidden" />
            </label>
          </div> */}

          {/* Journal Cover */}
          <div className="space-y-2">
            <div className="font-bold">Journal Cover</div>
            <label className="normalButton !rounded-[20px]  !px-4 !py-3 text-white inline-block cursor-pointer !w-fit">
              <span>Upload File</span>
              <Input
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImagePreview(URL.createObjectURL(file)); // ✅ Buat URL gambar
                  }
                }}
              />
            </label>

            {/* ✅ Tampilkan preview gambar setelah upload */}
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Journal Cover Preview"
                  className="w-full max-w-xs h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* ✅ ReactQuill untuk Content */}
          <div>
            <div className="font-bold">Write your trip journal</div>
            <ReactQuill
              className=""
              theme="bubble"
              value={content}
              onChange={setContent}
              placeholder="Tell your story..."
            />
            {/* ✅ Input hidden untuk mengirim data ReactQuill ke form */}
            <input type="hidden" name="content" value={content} />
          </div>

          <hr className="border-t border-gray-300 my-4" />

          {/* Expense */}
          <div className="space-y-2">
            <div className="font-bold">Total Expense for this trip?</div>
            <Input
              type="number"
              name="totalExpense"
              placeholder="US Dollars"
              className="normalInput"
            />
          </div>

          <hr className="border-t border-gray-300 my-4" />
        </div>
        {/* Button Publish */}
        <Button
          type="submit"
          className="normalButton !rounded-[20px] !bg-green-700 !py-3 text-white max-w-48 mx-auto"
          isDisabled={pending}
        >
          Publish Journal
        </Button>
      </form>

      {state?.success === false && (
        <p className="text-xs text-red-500 text-center my-2">
          {state?.message}
        </p>
      )}
    </main>
  );
}

// BATAS----------------------------------------------------------------------

// "use client";

// import React, { useState } from "react";
// // import ReactQuill from "react-quill-new";
// import dynamic from "next/dynamic";

// // Dynamically import ReactQuill (only runs on the client)
// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
// import "react-quill-new/dist/quill.bubble.css";
// import styles from "./createJournal.module.css";
// import Image from "next/image";

// import { useActionState } from "react";
// import { createJournalAction } from "./action";
// import { redirect } from "next/navigation";

// export default function Page() {
//   const [state, formAction, pending] = useActionState(
//     createJournalAction,
//     null
//   );

//   const [content, setContent] = useState(""); // ✅ Simpan isi teks dari ReactQuill
//   const [isPublic, setIsPublic] = useState(false); // ✅ Simpan status publikasi

//   if (state?.success) {
//     redirect("/journal");
//   }

//   return (
//     <div className="">
//       <form className="" action={formAction}>
//         <div className={styles.container}>
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             className={styles.input}
//             required
//           />
//           <select
//             type="form-select"
//             name="country"
//             placeholder="Country Destination"
//             className=""
//             required
//           />
//           <select
//             type="select"
//             name="state"
//             placeholder="State Destination"
//             className=""
//             required
//           />
//           <select
//             type="select"
//             name="city"
//             placeholder="City Destination"
//             className=""
//             required
//           />
//           <input type="date" name="startDate" className="" required />
//           <input type="date" name="endDate" className="" required />
//         </div>

//         {/* Button Image & ReactQuill untuk input content */}
//         <div className="">
//           {/* {open && (
//             <div className={styles.add}>
//               <input
//                 type="file"
//                 id="image"
//                 onChange={(e) => setFile(e.target.files[0])}
//                 style={{ display: "none" }}
//               />
//               <button className={styles.addButton}>
//                 <label htmlFor="image">
//                   <Image src="/image.png" alt="" width={16} height={16} />
//                 </label>
//               </button>
//               <button className={styles.addButton}>
//                 <Image src="/external.png" alt="" width={16} height={16} />
//               </button>
//               <button className={styles.addButton}>
//                 <Image src="/video.png" alt="" width={16} height={16} />
//               </button>
//             </div>
//           )} */}
//           <ReactQuill
//             className={styles.textArea}
//             theme="bubble"
//             value={content}
//             onChange={setContent}
//             placeholder="Tell your story..."
//           />
//           {/* Input hidden agar nilai dari ReactQuill dikirim ke form */}
//           <input type="hidden" name="content" value={content} />
//         </div>

//         {/* Upload Gambar */}
//         {/* <button className={styles.button} onClick={() => setOpen(!open)}>
//           <Image src="/plus.png" alt="" width={16} height={16} />
//         </button>

//         <div>
//           <input type="file" name="image" />
//         </div> */}

//         {/* Checkbox untuk menentukan publikasi */}
//         {/* <label className="flex items-center gap-2 mb-4">
//           <input
//             type="checkbox"
//             name="isPublic"
//             checked={isPublic}
//             onChange={(e) => setIsPublic(e.target.checked)}
//           />
//           <span>Make this journal public</span>
//         </label> */}

//         <button type="submit" className="" disabled={pending}>
//           Publish
//         </button>
//       </form>

//       {state?.success === false && (
//         <p className="text-xs text-red-500 text-center my-2">
//           {state?.message}
//         </p>
//       )}
//     </div>
//   );
// }

// BATAS -------------

/* <div className={styles.container}>
  <input
    type="text"
    placeholder="Title"
    className={styles.input}
    onChange={(e) => setTitle(e.target.value)}
  />
  <select
    className={styles.select}
    onChange={(e) => setCatSlug(e.target.value)}
  >
    <option value="style">style</option>
    <option value="fashion">fashion</option>
    <option value="food">food</option>
    <option value="culture">culture</option>
    <option value="travel">travel</option>
    <option value="coding">coding</option>
  </select>
  <div className={styles.editor}>
    <button className={styles.button} onClick={() => setOpen(!open)}>
      <Image src="/plus.png" alt="" width={16} height={16} />
    </button>
    {open && (
      <div className={styles.add}>
        <input
          type="file"
          id="image"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
        />
        <button className={styles.addButton}>
          <label htmlFor="image">
            <Image src="/image.png" alt="" width={16} height={16} />
          </label>
        </button>
        <button className={styles.addButton}>
          <Image src="/external.png" alt="" width={16} height={16} />
        </button>
        <button className={styles.addButton}>
          <Image src="/video.png" alt="" width={16} height={16} />
        </button>
      </div>
    )}
    <ReactQuill
      className={styles.textArea}
      theme="bubble"
      value={value}
      onChange={setValue}
      placeholder="Tell your story..."
    />
  </div>
  <button className={styles.publish} onClick={handleSubmit}>
    Publish
  </button>
</div>; */
