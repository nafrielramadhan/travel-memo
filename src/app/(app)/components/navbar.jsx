"use client";

import { usePathname } from "next/navigation";
import { useActionState } from "react";
import logoutAction from "../action/logout";
import Link from "next/link";
import Avatar from "boring-avatars";

export default function Navbar({ isLogin }) {
  const [state, formAction, pending] = useActionState(logoutAction, null);
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex items-center justify-between bg-gray-50 px-6 py-4 sticky top-0 z-50 border-b-2 border-black h-[118px]">
      <h1 className="text-4xl font-normal text-black ml-28">
        {isLogin ? (
          <Link href="/journal" className="hover:text-blue-500">
            Travel Memo
          </Link>
        ) : (
          <div className="">Travel Memo</div>
        )}
      </h1>
      {!isLogin ? (
        <div className="flex gap-16">
          <Link
            href="/login"
            className="w-56 h-14 flex items-center justify-center border-2 border-black rounded-full text-2xl text-black bg-white hover:bg-black hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="w-56 h-14 flex items-center justify-center border-2 border-black rounded-full text-2xl text-white bg-black hover:bg-white hover:text-black"
          >
            Get Started
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-6">
          <Link href="/journal" className="hover:underline">
            Journal
          </Link>
          <Link href="/itinerary" className="hover:underline">
            Itinerary
          </Link>
          <form action={formAction}>
            <button type="submit" className="hover:underline">
              Logout
            </button>
          </form>
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-black">
              {isLogin.data.user.name}
            </p>
            <Avatar name={isLogin.data.user.name} variant="beam" size={40} />
          </div>
        </div>
      )}
    </div>
  );
}
