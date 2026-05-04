import fs from "fs";
import path from "path";
import { Hero } from "@/components/home/Hero";
import { HostelList } from "@/components/home/HostelList";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { DealsSection } from "@/components/home/DealsSection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lay Day Hostels | The World's Best Social & Surf Hostels in Bali",
  description: "Experience the legendary social vibe at Lay Day Hostels in Canggu, Uluwatu, and Gili T. Join the global tribe for surf, party, and island living.",
  keywords: "Bali Hostels, Canggu Hostel, Uluwatu Hostel, Gili T Hostel, Surf Hostel, Party Hostel Bali",
};

export default function Home() {
  let instagramImages: string[] = [];
  try {
    const publicDir = path.join(process.cwd(), "public", "Lay Day Hostels");
    if (fs.existsSync(publicDir)) {
      const files = fs.readdirSync(publicDir);
      instagramImages = files
        .filter(file => file.match(/\.(png|jpe?g|webp|gif)$/i))
        .map(file => encodeURI(`/Lay Day Hostels/${file}`));
    }
  } catch (error) {
    console.error("Failed to read instagram images directory", error);
  }

  // Fallbacks if no images are found
  if (instagramImages.length === 0) {
    instagramImages = [
      encodeURI("/Lay Day Hostels/lay day canggu.jpeg"),
      encodeURI("/Lay Day Hostels/lay day uluwatu.jpeg"),
      encodeURI("/Lay Day Hostels/lay day gili t.jpeg"),
      encodeURI("/Lay Day Hostels/home_section_2.jpeg"),
      encodeURI("/Lay Day Hostels/home_section_3.jpeg"),
      encodeURI("/Lay Day Hostels/home_section_4.jpeg"),
      encodeURI("/Lay Day Hostels/home_section_5.jpeg"),
      encodeURI("/Lay Day Hostels/party,surf and relaxation.jpeg")
    ];
  }

  return (
    <>
      <Hero />
      <HostelList />
      <InstagramFeed images={instagramImages} />
      <DealsSection />
    </>
  );
}
