import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lay Day Gili T | Legendary Island Life & Pool Parties",
  description: "The best social hub in Gili Trawangan. Legendary pool parties and the ultimate island sanctuary.",
  openGraph: {
    title: "Lay Day Gili T | Legendary Island Life & Pool Parties",
    description: "The best social hub in Gili Trawangan. Legendary pool parties and the ultimate island sanctuary.",
    images: ["/layday_gilit/layday_gilit_picture 1.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
