"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";


const STANDALONE_ROUTES = ["/creator-week-gili-t", "/11-years-layday", "/2-years-layday-uluwatu"];

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_ROUTES.some((r) => pathname?.startsWith(r)) || Boolean(pathname?.endsWith("-lp"));
  const isCompletelyStandalone =
    Boolean(
      pathname?.startsWith("/opening-party-gilit") ||
      pathname?.startsWith("/beerpongatldgilit") ||
      pathname?.startsWith("/oktober-fast-canggu") ||
      pathname?.startsWith("/oktoberfest-canggu") ||
      pathname?.startsWith("/oktober-fast-gilit") ||
      pathname?.startsWith("/oktoberfest-gilit") ||
      pathname?.startsWith("/oktober-fest-gilit") ||
      pathname?.startsWith("/halloween-canggu") ||
      pathname?.startsWith("/halloween-gilit") ||
      pathname?.startsWith("/halloween-uluwatu")
    );

  if (isCompletelyStandalone) {
    return <>{children}</>;
  }

  if (isStandalone) {
    return (
      <>
        {children}

      </>
    );
  }

  return (
    <>
      <Navbar />
      {children}

      <Footer />
    </>
  );
}
