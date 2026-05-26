import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lay Day Canggu | The OG Surf & Party Sanctuary",
  description: "The epicenter of the Batu Bolong tribe. Experience the original Lay Day vibe in the heart of Canggu.",
  openGraph: {
    title: "Lay Day Canggu | The OG Surf & Party Sanctuary",
    description: "The epicenter of the Batu Bolong tribe. Experience the original Lay Day vibe in the heart of Canggu.",
    images: ["/lay_day_canggu/beach 2.jpeg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
