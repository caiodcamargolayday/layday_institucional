import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lay Day Deals | Exclusive Offers for the Tribe",
  description: "Unlock exclusive perks, better rates, and guaranteed legendary vibes. Book direct at Lay Day Hostels for the best deals in Bali.",
  openGraph: {
    title: "Lay Day Deals | Exclusive Offers for the Tribe",
    description: "Unlock exclusive perks and better rates by booking direct.",
    images: ["/Lay Day Hostels/home_section_5.jpeg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
