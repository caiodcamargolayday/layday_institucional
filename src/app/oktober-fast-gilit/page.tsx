import { Metadata } from "next";
import { OktoberfestGilitClient } from "./OktoberfestGilitClient";

export const metadata: Metadata = {
  title: "Oktoberfest at Lay Day Gili T | DJs, Free BBQ & Beer Games (Oct 2, 2026)",
  description:
    "Beer. Games. Free BBQ. DJs. Party. Join the guest list for Free Entry to Oktoberfest at Lay Day Gili T! Enjoy all-day Bintang buckets, island beer games, free barbecue, and poolside DJ sets.",
  openGraph: {
    title: "Oktoberfest at Lay Day Gili T | Island Edition",
    description:
      "Friday Oct 2, 2026 @ 2 PM. Free Entry with Guest List! Free BBQ, DJs, Special Games & Happy Hour Buckets All Day.",
    images: [
      {
        url: "/oktober_fest_ld_gilit/IGF.png",
        width: 1080,
        height: 1350,
        alt: "Oktoberfest Lay Day Gili T",
      },
    ],
  },
};

export default function Page() {
  return <OktoberfestGilitClient />;
}
