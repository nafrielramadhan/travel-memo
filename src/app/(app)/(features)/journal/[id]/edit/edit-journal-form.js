"use client";

import { Button, Input } from "@heroui/react";
import { useActionState, useState, useEffect } from "react";
import { editJournalAction } from "./action.js";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import moment from "moment";
import Image from "next/image";

// Import styles
import styles from "./editJournal.module.css";
import { Plus } from "lucide-react";

// import react quill
import "react-quill-new/dist/quill.bubble.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

//  ------------------------------------batas import------------------------------

export const EditJournalForm = ({ journal }) => {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(editJournalAction, null);

  // ✅ Tambahkan state untuk menyimpan isi ReactQuill
  const [content, setContent] = useState(journal.content);

  const startDate = moment(journal.startDate).format("YYYY-MM-DD");
  const endDate = moment(journal.endDate).format("YYYY-MM-DD");

  // module untuk reactquill
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ header: 1 }],
      [{ header: 2 }],
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  // Preview Gambar
  const [imagePreview, setImagePreview] = useState(
    journal.image
      ? `https://pub-af8be0bea17b4d2c8b04929ebf16bac7.r2.dev/travel-memo/${journal.id}/${journal.image}`
      : null
  );

  useEffect(() => {
    if (journal.image) {
      setImagePreview((prev) => prev + `?t=${new Date().getTime()}`);
    }
  }, [journal.image, journal.id]); // baru ditambahin

  const [newImage, setNewImage] = useState(null); // BARU

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file); // Simpan file baru yang dipilih
      setImagePreview(URL.createObjectURL(file)); // Perbarui preview gambar
    }
  };

  // ---------------CODE UNTUK API Country & City----------------------------------

  const [countries, setCountries] = useState([]); // Negara dari API
  const [cities, setCities] = useState([]); // Kota berdasarkan negara
  const [selectedCountry, setSelectedCountry] = useState(journal.country || ""); // Negara yang dipilih
  const [selectedCity, setSelectedCity] = useState(journal.city || ""); // Kota yang dipilih

  useEffect(() => {
    if (journal.country) {
      setSelectedCountry(journal.country);
    }
    if (journal.city) {
      setSelectedCity(journal.city);
    }
  }, [journal.country, journal.city]);

  // API Config
  const API_KEY = "RGoxckpSOE1YNUx3d0NMTk9JTVl5MUJxUzhjU1c2M1RLbUJvOGZ1ag==";
  const API_URL = "https://api.countrystatecity.in/v1/countries";

  // Fetch daftar negara saat komponen dimuat
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: { "X-CSCAPI-KEY": API_KEY },
        });
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch daftar kota saat negara berubah
  useEffect(() => {
    if (!selectedCountry) return;

    const fetchCities = async () => {
      try {
        const response = await fetch(`${API_URL}/${selectedCountry}/cities`, {
          headers: { "X-CSCAPI-KEY": API_KEY },
        });
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [selectedCountry]);

  // -------------------------------------------------

  useEffect(() => {
    if (state?.success) {
      router.push(`/journal/${journal.id}`); // ✅ Redirect ke halaman jurnal
    }
  }, [state, router, journal.id]);
  // ------------------------------------------------- RETURN
  return (
    <>
      <form className="flex flex-col space-y-4" action={formAction}>
        <input name="id" defaultValue={journal.id} hidden readOnly />
        <div className={`${styles.container} space-y-5`}>
          {/* Title */}
          <input
            defaultValue={journal.title}
            type="text"
            name="title"
            placeholder="Title"
            className={`${styles.input} text-[50px] font-gt-display font-semibold tracking-normal text-gray-900 leading-tight md-2`}
          />

          {/* Destinations */}
          <div className="space-y-2">
            <div className="font-bold">Destinations</div>
            <div className="flex space-x-4">
              {/* Select Country */}
              <select
                value={selectedCountry}
                name="country"
                className=""
                onChange={(e) => setSelectedCountry(e.target.value)}
                required
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.iso2} value={country.iso2}>
                    {country.name}
                  </option>
                ))}
              </select>

              {/* Select City */}
              <select
                value={selectedCity}
                name="city"
                className=""
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedCountry}
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Start & End Trip Date */}
          <div className="space-y-2">
            <div className="font-bold ">Start and End Date of Your Trip</div>
            <div className="flex space-x-4">
              <input
                type="date"
                name="startDate"
                defaultValue={startDate}
                placeholder="Start Date"
                className="normalInput"
              />
              <input
                type="date"
                name="endDate"
                defaultValue={endDate}
                placeholder="End Date"
                className="normalInput"
              />
            </div>
          </div>

          <hr className="border-t border-gray-300 my-4" />

          {/* Journal Cover */}
          <input type="hidden" name="oldImage" value={journal.image} />
          <div className="space-y-2">
            <div className="font-bold">Journal Cover</div>
            <label className="normalButton  !rounded-lg text-white text-[15px] inline-block cursor-pointer !w-fit">
              <Plus size={20} />
              <input
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            {/* ✅ Tampilkan preview gambar setelah upload */}
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt={journal.title}
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
              modules={modules}
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
            <input
              defaultValue={journal.totalExpense}
              type="number"
              name="totalExpense"
              placeholder="US Dollars"
              className="normalInput !max-w-[205px]"
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
          Edit Journal
        </Button>
      </form>
      {state?.success === false && (
        <p className="text-xs text-red-500 text-center my-2">
          {state?.message}
        </p>
      )}
    </>
  );
};
