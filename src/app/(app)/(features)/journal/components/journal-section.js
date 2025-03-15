import React from "react";
import { prisma } from "@/utils/prisma";
import { JournalItem } from "./journal-item";

export const JournalSection = async () => {
  const journals = await prisma.journal.findMany({
    include: {
      author: true, // Include data author untuk mendapatkan name
    },
  });

  return (
    <div className="grid grid-cols-3 gap-6 px-[20px]">
      {journals.map((journal) => {
        return (
          <JournalItem
            key={journal.id}
            id={journal.id}
            image={journal.image}
            title={journal.title}
            content={journal.content}
            name={journal.author.name}
            createdAt={journal.date}
          />
        );
      })}
    </div>
  );
};
