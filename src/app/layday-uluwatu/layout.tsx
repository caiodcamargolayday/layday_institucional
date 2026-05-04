import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lay Day Uluwatu | Cliffside Luxury & Raw Surf Rituals",
  description: "A minimalist sanctuary on the edge of the world. Experience industrial luxury and high-energy surf rituals in Uluwatu.",
  openGraph: {
    title: "Lay Day Uluwatu | Cliffside Luxury & Raw Surf Rituals",
    description: "A minimalist sanctuary on the edge of the world. Experience industrial luxury and high-energy surf rituals in Uluwatu.",
    images: ["/lay_day_uluwatu/place 2.jpeg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
