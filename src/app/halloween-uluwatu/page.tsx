import { Metadata } from "next";
import { HalloweenUluwatuClient } from "./HalloweenUluwatuClient";

export const metadata: Metadata = {
  title: "Lay Day of the Dead | Halloween Party at Lay Day Uluwatu (Oct 30, 2026)",
  description:
    "Join the guest list for Free Entry & a FREE Welcome Shot at Lay Day of the Dead Uluwatu! DJ Glando, DJ Essar, Beer Pong Tournament, Face Painting, Challenges & Cocktails starting at 2 PM.",
  openGraph: {
    title: "Lay Day of the Dead | Halloween Party at Lay Day Uluwatu",
    description:
      "Friday Oct 30, 2026 @ 2 PM until late. Free Entry + Free Welcome Shot with Guest List! DJ Glando, DJ Essar, Beer Pong Tournament & Costume Prizes.",
    images: [
      {
        url: "/halloween_ld_uluwatu/LDU-Halloween-IGF.jpg",
        width: 1080,
        height: 1350,
        alt: "Lay Day of the Dead - Halloween Party at Lay Day Uluwatu",
      },
    ],
  },
};

export default function Page() {
  return <HalloweenUluwatuClient />;
}
