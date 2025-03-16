import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
