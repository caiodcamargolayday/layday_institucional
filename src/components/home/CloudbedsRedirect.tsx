"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function RedirectLogic() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Cloudbeds redirects to the homepage and appends parameters.
    // If we detect a reservation ID on the homepage, immediately redirect
    // the user to the dedicated booking confirmation page.
    const reservationId = searchParams.get("reservationId") || searchParams.get("reservation_id");
    
    if (reservationId) {
      router.replace(`/booking-confirmation?${searchParams.toString()}`);
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
