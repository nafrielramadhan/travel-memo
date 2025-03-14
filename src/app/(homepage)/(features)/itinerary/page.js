"use client";

import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartItinerary = () => {
    router.push("/features/itinerary/action/create");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-none mt-4">
        <h1 className="text-4xl font-bold text-center mb-6">
          Plan your new trip
        </h1>
        <label className="block text-gray-800 mb-2">
          Where you are planning to visit?
        </label>
        <input
          type="text"
          placeholder="Enter destination"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <label className="block text-gray-700 mt-4 mb-2">Dates</label>
        <div className="flex space-x-4">
          <div className="relative w-1/2">
            <Calendar
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="date"
              className="w-full pl-12 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="relative w-1/2">
            <Calendar
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="date"
              className="w-full pl-12 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleStartItinerary}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Start creating itinerary
        </button>
      </div>
    </div>
  );
}
