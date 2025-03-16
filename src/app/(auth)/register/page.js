"use client";

import { Button, Input } from "@heroui/react";
import React, { useActionState } from "react";
import { OauthGoogleButton } from "../_components/oauthGoogleButton";
import Link from "next/link";
import { registerAction } from "./action";

export default function Page() {
  const [state, formAction, pending] = useActionState(registerAction, null);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-8 rounded-xl border">
        <h1 className="font-bold text-lg">
          Hi! welcome to{" "}
          <span className="font-reddit-mono text-slate-900 font-light">
            Travel Memo
          </span>
        </h1>
        <p className="text-sm text-slate-600 mt-4 mb-2">Create an account!</p>
        <form className="space-y-2" action={formAction}>
          <div>Email</div>
          <Input
            type="email"
            name="email"
            variant="underlined"
            placeholder="Enter your email"
            className="normalInput min-w-64"
          />
          <div>Your name</div>
          <Input
            type="text"
            name="name"
            variant="underlined"
            placeholder="Enter your name"
            className="normalInput min-w-64"
          />
          <div>Password</div>
          <Input
            type="password"
            name="password"
            variant="underlined"
            placeholder="********"
            className="normalInput min-w-64"
          />
          <Button
            className="normalButton w-full bg-cyan-700 text-white font-semibold mt-1"
            radius="lg"
            type="submit"
            isDisabled={pending}
          >
            Sign up
          </Button>
        </form>
        {state?.success === false && (
          <p className="text-xs text-red-500 text-center my-2">
            {state?.message}
          </p>
        )}
        <hr className="my-4" />
        <OauthGoogleButton />
        <p className="text-sm mt-8 text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
