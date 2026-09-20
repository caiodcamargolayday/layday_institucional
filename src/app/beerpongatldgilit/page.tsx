import { Metadata } from "next";
import { BeerPongClient } from "./BeerPongClient";

export const metadata: Metadata = {
  title: "5M Beer Pong Championship | Lay Day Beach Club Gili T",
  description: "5M CASH PRIZE. ONE CHAMPION. 🏆🍻 The International Beerpong Championship is here, every Sunday at Lay Day Beach Club Gili T. Register your team now!",
  openGraph: {
    title: "5M Beer Pong Championship | Lay Day Gili T",
    description: "5M CASH PRIZE. ONE CHAMPION. 🏆🍻 Every Sunday at Lay Day Beach Club Gili T. Register your team of 2!",
    images: [
      {
        url: "/beerpong_ldgilit/LDBC-Beerpong Tournament-IGF (1).png",
        width: 1080,
        height: 1350,
        alt: "International Beerpong Championship at Lay Day Gili T",
      },
    ],
  },
};

export default function BeerPongPage() {
  return <BeerPongClient />;
}
