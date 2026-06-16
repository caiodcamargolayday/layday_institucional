"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function RedirectLogic() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const reservationId = searchParams.get("reservationId") || searchParams.get("reservation_id");
    
    if (reservationId) {
      // Since Cloudbeds is used for Canggu, Gili T, and Coday, we use local storage as a backup to determine the origin
      const origin = typeof window !== "undefined" ? (sessionStorage.getItem("booking_origin") || localStorage.getItem("booking_origin") || "canggu") : "canggu";
      router.replace(`/booking-confirmation/${origin}?${searchParams.toString()}`);
    }
  }, [searchParams, router]);

  return null;
}

export function CloudbedsRedirect() {
  return (
    <Suspense fallback={null}>
      <RedirectLogic />
    </Suspense>
  );
}
