import React from "react";
import { JournalSection } from "./components/journal-section";
import { JournalCountrySection } from "./components/journal-section";

export default function Page() {
  return (
    <main>
      {/* ALL Journals */}
      <section className="px-6 py-6">
        <JournalSection />
      </section>
    </main>
  );
}
