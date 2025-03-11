import Link from "next/link";

import TypedComponent from "./components/typed";

// bingung deh, kalau belum login kan -> ke page yg landing page
// tp kalau udah login, ini harusnya langsung ke -> home page

export default async function Page() {
  return (
    <main className="flex flex-col items-center justify-center fixed inset-0 text-center space-y-8">
      {/* Section: judul di atas */}
      <section className="space-y-8">
        <h1 className="text-5xl font-light text-gray-900">
          <TypedComponent />
        </h1>
        <h4 className="text-3xl font-bold text-gray-900">
          Write down your travel journal & Prepare your itinerary!
        </h4>
        <p className="text-xl text-gray-600">
          Share and read our memorable travel experience.
        </p>
      </section>

      {/* Section: 2 button dibawah */}
      <section className="flex justify-center space-x-4">
        <div>
          <Link
            href="/journal"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Start Reading Journal
          </Link>
        </div>
        <div>
          <Link
            href="/itinerary/create"
            className="border-2 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100"
          >
            Prepare my itinerary
          </Link>
        </div>
      </section>
    </main>
  );
}
