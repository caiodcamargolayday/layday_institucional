import { Metadata } from "next";
import { HalloweenCangguLpClient } from "./HalloweenCangguLpClient";

export const metadata: Metadata = {
  title: "Halloween in Canggu | Stay 3 Nights, Get 30% Off Direct Booking | Lay Day Canggu",
  description:
    "Exclusive Halloween Promo: Book 3 nights and get 30% off your direct booking at Lay Day Canggu. Valid for check-ins from Oct 28th, 29th & 30th. Pool parties, surf & social vibes in Batu Bolong.",
  openGraph: {
    title: "Halloween in Canggu | Stay 3 Nights Get 30% Off | Lay Day Canggu",
    description:
      "Valid for check-ins from Oct 28th, 29th & 30th. Book 3 nights and get 30% off direct bookings at Lay Day Canggu.",
    images: [
      {
        url: "/halloween-direct-booking-canggu/LDC-Halloween Room Promo-IGF 2.jpg",
        width: 1080,
        height: 1350,
        alt: "Halloween in Canggu - Stay 3 Nights Get 30% Off at Lay Day Canggu",
      },
    ],
  },
};

export default function Page() {
  return <HalloweenCangguLpClient />;
}

