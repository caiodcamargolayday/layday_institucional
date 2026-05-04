import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Lay Day | Join the Global Family",
  description: "Build your career in paradise. We're looking for legends, social catalysts, and high-performers to join our team in Indonesia.",
  openGraph: {
    title: "Careers at Lay Day | Join the Global Family",
    description: "Build your career in paradise. Join the professional team behind the world's best social hostels.",
    images: ["/Lay Day Hostels/careers_hero.jpeg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
