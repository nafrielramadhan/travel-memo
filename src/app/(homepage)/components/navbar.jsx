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
    <div className="flex bg-gray-50 py-2 px-4 justify-between sticky top-0 z-50 border-b-2 border-slate-200">
      <h1 className="font-semibold text-black text-2xl ml-1">
        <Link href={"/"} className="hover:text-blue-500">
          Travel Memo
        </Link>
      </h1>
      {!isLogin && (
        <Link
          href="/register"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold  hover:bg-blue-50"
        >
          Sign Up
        </Link>
      )}
      {isLogin && (
        <div className="flex flex-row space-x-4 items-center">
          <Link href="/journal" className="hover:underline">
            Journal
          </Link>
          <Link href="/itinerary" className="hover:underline">
            Itinerary
          </Link>
          <div className="text-sm flex gap-2 items-center">
            <p className="font-semibold text-black text-sm">
              {isLogin.data.user.name}
            </p>
            <Avatar name={isLogin.data.user.name} variant="beam" />
            <form action={formAction}>
              <button type="submit" className="hover:underline">
                Logout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
