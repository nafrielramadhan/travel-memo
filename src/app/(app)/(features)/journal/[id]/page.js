import { prisma } from "@/utils/prisma";
import moment from "moment";
import React from "react";

export default async function Page({ params }) {
  const { id } = await params;

  const journal = await prisma.journal.findUnique({
    where: {
      id,
    },
  });

  if (!journal) {
    return <div>Event not found!</div>;
  }
}
