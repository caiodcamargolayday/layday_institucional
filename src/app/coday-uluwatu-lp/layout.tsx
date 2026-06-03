import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coday Uluwatu | Premium Coliving & Wellness",
  description: "A high-performance sanctuary for the digital generation. Luxury boutique aesthetics with coworking infrastructure, recovery labs, and the raw spirit of the Balinese coast.",
  openGraph: {
    title: "Coday Uluwatu | Premium Coliving & Wellness",
    description: "A high-performance sanctuary for the digital generation.",
    images: ["/coday_uluwatu/uluwatu_surfers_hero.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
