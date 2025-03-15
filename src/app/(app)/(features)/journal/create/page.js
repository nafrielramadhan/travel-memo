"use client";

import { Button, Input, Textarea } from "@heroui/react";
import { useActionState, useState, useEffect } from "react";
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

  // ---------------CODE UNTUK API Country & City----------------------------------

  const [countries, setCountries] = useState([]); // Negara dari API
  const [cities, setCities] = useState([]); // Kota berdasarkan negara
  const [selectedCountry, setSelectedCountry] = useState(""); // Negara yang dipilih
  const [selectedCity, setSelectedCity] = useState(""); // Kota yang dipilih

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

  // ---------------CODE UNTUK API Country & City----------------------------------

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
          {/* <div className="space-y-2">
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
          </div> */}

          {/* Destinations */}
          <div className="space-y-2">
            <div className="font-bold">Destinations</div>
            <div className="flex space-x-4">
              {/* Select Country */}
              <select
                name="country"
                className="normalInput"
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
                name="city"
                className="normalInput"
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
