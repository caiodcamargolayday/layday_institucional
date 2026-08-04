import { VicePartyClient } from "./VicePartyClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vice Party Guest List | Layday Uluwatu",
  description: "Register for the guest list to join the Vice Party at Layday Uluwatu.",
};

export default function Page() {
  return <VicePartyClient />;
}
