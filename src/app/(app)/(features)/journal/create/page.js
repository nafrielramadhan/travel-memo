"use client";

import React, { useState } from "react";
// import ReactQuill from "react-quill-new";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill (only runs on the client)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.bubble.css";
import styles from "./createJournal.module.css";
import Image from "next/image";

import { useActionState } from "react";
import { createJournalAction } from "./action";
import { redirect } from "next/navigation";

export default function Page() {
  const [state, formAction, pending] = useActionState(
    createJournalAction,
    null
  );

  const [content, setContent] = useState(""); // ✅ Simpan isi teks dari ReactQuill
  const [isPublic, setIsPublic] = useState(false); // ✅ Simpan status publikasi

  if (state?.success) {
    redirect("/journal");
  }

  return (
    <div className="">
      <form className="" action={formAction}>
        <div className={styles.container}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className={styles.input}
            required
          />
          <select
            type="form-select"
            name="country"
            placeholder="Country Destination"
            className=""
            required
          />
          <select
            type="select"
            name="state"
            placeholder="State Destination"
            className=""
            required
          />
          <select
            type="select"
            name="city"
            placeholder="City Destination"
            className=""
            required
          />
          <input type="date" name="startDate" className="" required />
          <input type="date" name="endDate" className="" required />
        </div>

        {/* Button Image & ReactQuill untuk input content */}
        <div className="">
          {/* {open && (
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
          )} */}
          <ReactQuill
            className={styles.textArea}
            theme="bubble"
            value={content}
            onChange={setContent}
            placeholder="Tell your story..."
          />
          {/* Input hidden agar nilai dari ReactQuill dikirim ke form */}
          <input type="hidden" name="content" value={content} />
        </div>

        {/* Upload Gambar */}
        {/* <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>

        <div>
          <input type="file" name="image" />
        </div> */}

        {/* Checkbox untuk menentukan publikasi */}
        {/* <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <span>Make this journal public</span>
        </label> */}

        <button type="submit" className="" disabled={pending}>
          Publish
        </button>
      </form>

      {state?.success === false && (
        <p className="text-xs text-red-500 text-center my-2">
          {state?.message}
        </p>
      )}
    </div>
  );
}

// BATAS----------------------------------------------------------------------

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
