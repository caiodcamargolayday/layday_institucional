import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lay Day Experiences | Surf, Party, and Social Rituals",
  description: "More than just a stay. Discover the unique experiences that define the Lay Day lifestyle. From pool parties to dawn patrol surf sessions.",
  openGraph: {
    title: "Lay Day Experiences | Surf, Party, and Social Rituals",
    description: "Discover the unique experiences that define the Lay Day lifestyle.",
    images: ["/experiences/saturdays by the pool.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
