import { CangguClient } from "./CangguClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lay Day Canggu | The OG Surf & Social Hub in Bali",
  description: "Join the legendary Batu Bolong tribe at Lay Day Canggu. Experience the epicenter of Bali's social surf scene with poolside parties and world-class vibes.",
  openGraph: {
    title: "Lay Day Canggu | The OG Sanctuary",
    description: "Born from a love of surf and social chaos.",
    images: ["/lay_day_canggu/beach 2.jpeg"],
  },
};

export default function Page() {
  return <CangguClient />;
}
