"use client";

import { usePathname } from "next/navigation";
import { useActionState } from "react";
import logoutAction from "../action/logout";
import Link from "next/link";
import Avatar from "boring-avatars";
import { Button } from "@heroui/react";

export default function Navbar({ isLogin }) {
  const [state, formAction, pending] = useActionState(logoutAction, null);
  const pathname = usePathname();
  console.log(pathname);
  return (
    <main className="flex items-center justify-between bg-gray-50 px-6 py-4 sticky top-0 z-50 border-b-[1.5px] border-black h-[98px]">
      <h1 className="text-3xl font-normal text-black ml-12">
        {isLogin ? (
          <Link
            href="/journal"
            className="font-reddit-mono text-slate-900 font-light hover:text-blue-500"
          >
            Travel Memo
          </Link>
        ) : (
          <div className="font-reddit-mono text-slate-900 font-light">
            Travel Memo
          </div>
        )}
      </h1>
      {!isLogin ? (
        <div className="flex space-x-6 mr-12">
          <Link
            href="/login"
            className="border-[1.5px] border-black text-black px-6 py-3 rounded-[20px] font-medium hover:bg-blue-100"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="border-[1.5px] bg-black text-white px-6 py-3 rounded-[20px] font-medium hover:opacity-80"
          >
            Get Started
          </Link>
        </div>
      ) : (
        <div className="solid flex items-center space-x-6 mr-12">
          <Link
            href="/journal/create"
            className="border-[1.5px] border-black text-black px-6 py-3 rounded-[20px] font-medium hover:bg-blue-100"
          >
            Write Journal
          </Link>
          {/* <Link
            href="/itinerary"
            className="border-[1.5px] border-black text-black px-6 py-3 rounded-[20px] font-medium hover:bg-blue-100"
          >
            Plan a Trip
          </Link> */}
          <form action={formAction}>
            <Button
              type="submit"
              className="normalButton !rounded-[20px] !px-6 !py-3"
            >
              Logout
            </Button>
          </form>
          <div className="flex items-center gap-3">
            <div className="text-xl font-normal text-black pl-6 pr-1">
              {isLogin.data.user.name
                .split(" ") // Pisah berdasarkan spasi
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi setiap kata
                .join(" ")}{" "}
            </div>
            <Avatar name={isLogin.data.user.name} variant="beam" size={41} />
          </div>
        </div>
      )}
    </main>
  );
}
