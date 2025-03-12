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
    <div className="flex bg-gray-50 py-2 px-4 justify-between sticky h-[118px] top-0 z-50 border-b-2 border-[#000000]">
      <h1 className="font-regular text-black text-[40px] ml-[118px] mt-[20px]">
        <Link href={"/"} className="hover:text-blue-500">
          Travel Memo
        </Link>
        <Avatar name="Nafriel ramadhan" variant="marble" />
      </h1>
      {!isLogin && (
        <div className="flex gap-x-[63px]">   
        <Link
          href="/login"
          className="bg-white rounded-[22px] w-[228px] h-[61px] border-[2px] border-black text-black font-regular text-[28px] pl-[38px] pt-[10px] mt-[20px] hover:bg-black hover:text-white"
        >
          Sign In
        </Link>

        <Link
          href="/register"
          className="bg-black rounded-[22px] w-[228px] h-[61px] text-white font-regular text-[28px] pl-[38px] pt-[10px] mr-[140px] mt-[20px] hover:bg-white hover:text-black hover:border-[2px] hover:border-black"
        >
          Get Started
        </Link>
      </div>
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
