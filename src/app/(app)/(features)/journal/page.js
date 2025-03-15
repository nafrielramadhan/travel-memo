import React from "react";
import { JournalSection } from "./components/journal-section";
import { JournalCountrySection } from "./components/journal-section";

export default function Page() {
  return (
    <main>
      <h1>Travel memo keeps all jour journals!</h1>

      {/* By Country */}
      {/* <section>
        <h1>Explore journals by country</h1>
        <journal-country-section />
      </section> */}

      {/* ALL Journals */}
      <section className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-regular mb-6">All journals</h1>
        <JournalSection />
      </section>
    </main>
  );
}
