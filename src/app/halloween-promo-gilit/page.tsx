import { Metadata } from "next";
import { HalloweenGiliTLpClient } from "../halloween-gilit-lp/HalloweenGiliTLpClient";

export const metadata: Metadata = {
  title: "Halloween in Gili T | Stay 3 Nights, Get 30% Off Direct Booking | Lay Day Gili T",
  description:
    "Exclusive Halloween Promo: Stay 3 nights and get 30% off your direct booking at Lay Day Gili T. Valid for check-ins from Oct 28th, 29th & 30th with promo code HALLOWEEN2026.",
  openGraph: {
    title: "Halloween in Gili T | Stay 3 Nights Get 30% Off | Lay Day Gili T",
    description:
      "Valid for check-ins from Oct 28th, 29th & 30th. Stay 3 nights and get 30% off direct bookings at Lay Day Gili T with code HALLOWEEN2026.",
    images: ["/halloween_ld_gilit/gilit-halloween-promo-blonde-feed.jpg"],
  },
};

export default function Page() {
  return <HalloweenGiliTLpClient />;
}
