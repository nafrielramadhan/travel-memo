import Link from "next/link";
import Image from "next/image";
import TypedComponent from "./components/typed";

export default function Page() {
  return (
    <main className="flex items-center justify-center h-fit px-10">
      {/* Left: Text Content */}
      <section className="w-1/2 space-y-6 ml-[100px] ">
        <h1 className="text-[65px] font-bold text-gray-900 leading-tight mt-[50px]">
          Capture, Plan, <br /> and Share Your <br /> Adventures!
        </h1>
        <div className="text-[27px] text-gray-700 flex items-center ">
          <span className="font-semibold">Your travel buddy&nbsp;</span>
          <TypedComponent />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link
            href="/journal"
            className="bg-black text-white px-6 py-3 rounded-[25px] font-semibold hover:bg-gray-900"
          >
            Explore Journals
          </Link>
          <Link
            href="/itinerary/create"
            className="border-[2px] border-black text-black px-6 py-3 rounded-[25px] font-semibold hover:bg-gray-100"
          >
            Create Itinerary
          </Link>
        </div>
      </section>

      {/* Right: Image */}
      <section className="w-1/2 flex justify-center">
        <Image
          src="/travel-stamps.png"
          alt="Travel Stamps"
          width={700}
          height={500}
          className="max-w-none -mr-[250px] mt-[100px]"
        />
      </section>
    </main>
  );
}
