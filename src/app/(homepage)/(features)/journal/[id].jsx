import { useRouter } from "next/router";
import { countries } from "@/data/countries";

export default function JournalDetailPage() {
  const { query } = useRouter();
  const country = countries.find((c) => c.id === query.id);

  if (!country) return <p>Journal not found!</p>;

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold">{country.name}</h1>
      <p className="text-gray-600">Read {country.posts} travel journals about {country.name}!</p>
    </main>
  );
}
