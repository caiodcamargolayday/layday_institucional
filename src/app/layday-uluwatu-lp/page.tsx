import { UluwatuClient } from "./UluwatuClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lay Day Uluwatu | The Ultimate Surf & Party Sanctuary",
  description: "Experience industrial luxury at Lay Day Uluwatu. Cliffside views, legendary surf sessions, and the world's best social rituals in Bali's Bukit Peninsula.",
  openGraph: {
    title: "Lay Day Uluwatu | Cliffside Sanctuary",
    description: "Industrial luxury meets the raw energy of the Bukit Peninsula.",
    images: ["/lay_day_uluwatu/place 2.jpeg"],
  },
};

import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EBE7E0]" />}>
      <UluwatuClient />
    </Suspense>
  );
}
