"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone =
    pathname.startsWith("/opening-party-gilit") ||
    pathname.startsWith("/beerpongatldgilit") ||
    pathname.startsWith("/oktober-fast-canggu") ||
    pathname.startsWith("/oktoberfest-canggu") ||
    pathname.startsWith("/oktober-fast-gilit") ||
    pathname.startsWith("/oktoberfest-gilit") ||
    pathname.startsWith("/oktober-fest-gilit") ||
    pathname.endsWith("-lp");

  if (isStandalone) {
    return <div className="flex-grow flex flex-col">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="flex-grow flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
