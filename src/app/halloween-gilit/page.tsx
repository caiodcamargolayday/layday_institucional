import { Metadata } from "next";
import { HalloweenGiliTClient } from "./HalloweenGiliTClient";

export const metadata: Metadata = {
  title: "Lay Day of the Dead | Halloween Party at Lay Day Gili T (Oct 30, 2026)",
  description:
    "Join the guest list for Free Entry & a FREE Welcome Shot at Lay Day of the Dead Gili T! Pool Party, Fear Pong Tournament, Face Painting, Drink Specials, and Island Pub Crawl.",
  openGraph: {
    title: "Lay Day of the Dead | Halloween Party at Lay Day Gili T",
    description:
      "Friday Oct 30, 2026 @ 4 PM until late. Free Entry + Free Welcome Shot with Guest List! Pool Party, Face Painting, Fear Pong Tournament, Drink Specials & DJs.",
    images: [
      {
        url: "/halloween_ld_gilit/LDGT-Halloween-IGF.jpg",
        width: 1080,
        height: 1350,
        alt: "Lay Day of the Dead - Halloween Party at Lay Day Gili T",
      },
    ],
  },
};

export default function Page() {
  return <HalloweenGiliTClient />;
}
