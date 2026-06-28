import fs from "fs";
import path from "path";
import { Hero } from "@/components/home/Hero";
import { HostelList } from "@/components/home/HostelList";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { DealsSection } from "@/components/home/DealsSection";
import { CloudbedsRedirect } from "@/components/home/CloudbedsRedirect";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lay Day Hostels",
  description: "Lay Day has been the trailblazer in Bali's hostel scene modest hostel in Canggu with just 30 beds, a small pool, and a cosy little bar grew to become a ...",
};

export default function Home() {
  let instagramImages: string[] = [];
  try {
    const publicDir = path.join(process.cwd(), "public", "lay_day_home");
    if (fs.existsSync(publicDir)) {
      const files = fs.readdirSync(publicDir);
      instagramImages = files
        .filter(file => file.match(/\.(png|jpe?g|webp|gif)$/i))
        .map(file => encodeURI(`/lay_day_home/${file}`));
    }
  } catch (error) {
    console.error("Failed to read instagram images directory", error);
  }

  // Fallbacks if no images are found
  if (instagramImages.length === 0) {
    instagramImages = [
      encodeURI("/lay_day_home/lay day canggu.jpeg"),
      encodeURI("/lay_day_home/lay day uluwatu.jpeg"),
      encodeURI("/lay_day_home/lay day gili t.jpeg"),
      encodeURI("/lay_day_home/home_section_2.jpeg"),
      encodeURI("/lay_day_home/home_section_3.jpeg"),
      encodeURI("/lay_day_home/home_section_4.jpeg"),
      encodeURI("/lay_day_home/home_section_5.jpeg"),
      encodeURI("/lay_day_home/party,surf and relaxation.jpeg")
    ];
  }

  return (
    <>
      <CloudbedsRedirect />
      <Hero />
      <HostelList />
      <InstagramFeed images={instagramImages} />
      <DealsSection />
    </>
  );
}
