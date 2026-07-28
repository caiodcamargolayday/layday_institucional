import { VicePartyClient } from "./VicePartyClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vice Party | Lay Day",
  description: "Get your tickets for the Vice Party.",
};

export default function Page() {
  return <VicePartyClient />;
}
