import { Metadata } from "next";
import { HalloweenGiliTLpClient } from "./HalloweenGiliTLpClient";

export const metadata: Metadata = {
  title: "Halloween in Gili T | Stay 3 Nights, Get 30% Off Direct Booking | Lay Day Gili T",
  description:
    "Exclusive Halloween Promo: Book 3 nights and get 30% off your direct booking at Lay Day Gili T. Valid for check-ins from Oct 28th, 29th & 30th. Pool parties, social vibes, and epic island adventures.",
  openGraph: {
    title: "Halloween in Gili T | Stay 3 Nights Get 30% Off | Lay Day Gili T",
    description:
      "Valid for check-ins from Oct 28th, 29th & 30th. Book 3 nights and get 30% off direct bookings at Lay Day Gili T.",
    images: [
      {
        url: "/halloween_ld_gilit/gilit-halloween-promo-blonde-feed.jpg",
        width: 819,
        height: 1024,
        alt: "Halloween in Gili T - Stay 3 Nights Get 30% Off at Lay Day Gili T",
      },
    ],
  },
};

export default function Page() {
  return <HalloweenGiliTLpClient />;
}
