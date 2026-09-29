import { Metadata } from "next";
import { OktoberfestCangguClient } from "../oktober-fast-canggu/OktoberfestCangguClient";

export const metadata: Metadata = {
  title: "Oktoberfest at Lay Day Canggu | Prost in Paradise (Oct 2, 2026)",
  description:
    "Beer. Games. Pool. Music. Party. Join the guest list for Free Entry to Oktoberfest at Lay Day Canggu!",
  openGraph: {
    title: "Oktoberfest at Lay Day Canggu | Prost in Paradise",
    description:
      "Friday Oct 2, 2026 @ 2 PM. Free Entry with Guest List! Beer Olympics, Bintang Buckets All Day, German Snacks & Pool Party.",
    images: [
      {
        url: "/october_fast_ld_canggu/IGF.png",
        width: 1080,
        height: 1350,
        alt: "Oktoberfest Lay Day Canggu - Prost in Paradise",
      },
    ],
  },
};

export default function Page() {
  return <OktoberfestCangguClient />;
}
