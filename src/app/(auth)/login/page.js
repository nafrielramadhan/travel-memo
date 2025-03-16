"use client";

import { Button, Input } from "@heroui/react";
import React, { useActionState } from "react";
import { OauthGoogleButton } from "../_components/oauthGoogleButton";
import Link from "next/link";
import { loginAction } from "./action";

export default function Page() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-8 rounded-xl border ">
        <h1 className="font-bold text-lg text-slate-600">
          Welcome to{" "}
          <span className="font-reddit-mono text-slate-900 font-light">
            Travel Memo
          </span>
        </h1>
        <p className="text-sm text-slate-600 mt-4 mb-2">
          Please login first to continue!
        </p>
        <form className="space-y-4" action={formAction}>
          <Input
            label="Email"
            type="email"
            name="email"
            variant="underlined"
            placeholder="Enter your email"
            className="normalInput min-w-64"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            variant="underlined"
            placeholder="********"
            className="normalInput min-w-64"
          />
          <Button
            className="normalButton w-full bg-cyan-700 text-white font-semibold`"
            radius="lg"
            type="submit"
            isDisabled={pending}
          >
            Login
          </Button>
        </form>
        {state?.success === false && (
          <p className="text-xs text-red-500 text-center my-2">
            {state?.message}
          </p>
        )}
        <div className="space-y-4">
          <hr className="my-4" />
          <OauthGoogleButton />
          <p className="text-sm mt-8 text-center">
            Dont have an account?{" "}
            <Link href="/register" className="font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
