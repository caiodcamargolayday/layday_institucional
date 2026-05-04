import { GiliTClient } from "./GiliTClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lay Day Gili T | The Ultimate Island Sanctuary in Gili Trawangan",
  description: "Experience legendary island life at Lay Day Gili T. Join the global tribe for the best pool parties, social vibes, and crystal clear water adventures in Gili Trawangan.",
  openGraph: {
    title: "Lay Day Gili T | Island Sanctuary",
    description: "Pure vibes and the best pool parties in Gili Trawangan.",
    images: ["/layday_gilit/layday_gilit_picture 1.jpg"],
  },
};

export default function Page() {
  return <GiliTClient />;
}
