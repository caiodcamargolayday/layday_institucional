import { Metadata } from "next";
import { HiringMarketingManagerClient } from "./HiringMarketingManagerClient";

export const metadata: Metadata = {
  title: "We Are Hiring: Marketing Manager | Lay Day Hostel & Tusk Bali",
  description:
    "Join the tribe in Uluwatu, Bali! We are hiring an experienced Marketing Manager to lead brand growth, paid social (Meta & Google Ads), content creation, and influencer relations across Lay Day Hostel and Tusk Restaurant & Lounge.",
  openGraph: {
    title: "We Are Hiring: Marketing Manager | Lay Day & Tusk Uluwatu",
    description:
      "Full-Time Marketing Manager position in Uluwatu, Bali. Lead marketing across Lay Day Hostel and Tusk. Proven hospitality/lifestyle marketing experience, paid ads, content creation & influencer relations.",
    images: [
      {
        url: "/lay_day_uluwatu/hero_tusk_interior.jpg",
        width: 1200,
        height: 630,
        alt: "Lay Day & Tusk Uluwatu Marketing Manager Hiring",
      },
    ],
  },
};

export default function Page() {
  return <HiringMarketingManagerClient />;
}

export { Page };
