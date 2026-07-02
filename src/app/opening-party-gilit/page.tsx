import { OpeningPartyClient } from "./OpeningPartyClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lay Day Gili T - Grand Opening Party",
  description: "Join us for the Lay Day Gili T Grand Opening. Epic vibes, cold drinks, sick beats, and that classic Lay Day energy.",
};

export default function OpeningPartyGilit() {
  return <OpeningPartyClient />;
}
