'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function ConfirmationLogic() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const reservationId = searchParams.get('reservationId') || searchParams.get('reservation_id');
    const total = searchParams.get('total') || searchParams.get('amount');
    const email = searchParams.get('email');
    const firstName = searchParams.get('firstName') || searchParams.get('first_name');
    const lastName = searchParams.get('lastName') || searchParams.get('last_name');
    const phone = searchParams.get('phone');

    // Only fire if we have a reservation ID (real booking)
    if (!reservationId) return;

    // Only fire if the booking originated from Canggu
    const origin = sessionStorage.getItem("booking_origin") || localStorage.getItem("booking_origin");
    if (origin !== "canggu") {
      console.log("[CAPI] Ignored: Booking did not originate from Canggu page.");
      return;
    }

    // Prevent double-firing on re-renders (use sessionStorage)
    const firedKey = `capi_fired_${reservationId}`;
    if (sessionStorage.getItem(firedKey)) return;
    sessionStorage.setItem(firedKey, '1');

    // Collect Meta cookies from browser
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');

    // Send to our API route
    fetch('/api/meta-capi/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: reservationId,         // Use reservation ID as event_id
        eventSourceUrl: window.location.href,
        fbp,
        fbc,
        email,
        phone,
        firstName,
        lastName,
        country: 'id',                  // Indonesia
        value: parseFloat(total || '0') || 0,
        orderId: reservationId,
        // testEventCode: 'TEST12345',  // Uncomment during testing only
      }),
    })
      .then((r) => r.json())
      .then((data) => console.log('[CAPI] Purchase sent:', data))
      .catch((err) => console.error('[CAPI] Error:', err));
  }, [searchParams]);

  return null;
}

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <h1 className="text-4xl md:text-5xl font-heading text-[#004A61] tracking-widest uppercase">
        Booking Confirmed! 🎉
      </h1>
      <p className="text-[#004A61]/70 font-medium max-w-md">
        Thank you for booking with Lay Day Surf Hostel. We can't wait to see you!
      </p>
      
      <Suspense fallback={null}>
        <ConfirmationLogic />
      </Suspense>
    </div>
  );
}
