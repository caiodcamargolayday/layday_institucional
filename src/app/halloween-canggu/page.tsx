import { Metadata } from "next";
import { HalloweenCangguClient } from "./HalloweenCangguClient";

export const metadata: Metadata = {
  title: "Lay Day of the Dead | Halloween Party at Lay Day Canggu (Oct 30, 2026)",
  description:
    "Join the guest list for Free Entry & a FREE Welcome Shot at Lay Day of the Dead! Experience Face Painting, Fear Pong Tournament, Drink Specials, Costume Contest, and a themed Halloween Pub Crawl at Lay Day Canggu.",
  openGraph: {
    title: "Lay Day of the Dead | Halloween Party at Lay Day Canggu",
    description:
      "Friday Oct 30, 2026 @ 4 PM until late. Free Entry + Free Welcome Shot with Guest List! Face Painting, Fear Pong Tournament, Drink Specials, Pub Crawl & Best Dressed Contest.",
    images: [
      {
        url: "/halloween_ld_canggu/LDC-Halloween-IGF.jpg",
        width: 1080,
        height: 1350,
        alt: "Lay Day of the Dead - Halloween Party at Lay Day Canggu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lay Day of the Dead | Halloween Party at Lay Day Canggu",
    description:
      "Friday Oct 30, 2026 @ 4 PM until late. Free Entry + Free Welcome Shot with Guest List!",
    images: ["/halloween_ld_canggu/LDC-Halloween-IGF.jpg"],
  },
};

export default function Page() {
  return <HalloweenCangguClient />;
}
