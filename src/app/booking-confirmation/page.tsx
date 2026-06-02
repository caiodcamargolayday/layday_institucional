'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { CheckCircle2, Home } from 'lucide-react';
import Link from 'next/link';

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
    const testEventCode = searchParams.get('testEventCode') || searchParams.get('test_event_code');

    // Only fire if we have a reservation ID (real booking)
    if (!reservationId) return;

    // Only fire if the booking originated from Canggu or Gili T
    const origin = sessionStorage.getItem("booking_origin") || localStorage.getItem("booking_origin");
    if (origin !== "canggu" && origin !== "gilit") {
      console.log("[CAPI] Ignored: Booking origin unknown.");
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
        origin,
        testEventCode,
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
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden bg-[#EBE7E0]">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-[#EE5B2B]/5 blur-3xl rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto bg-white/50 p-10 md:p-16 rounded-[2rem] border border-white shadow-2xl backdrop-blur-sm">
        
        <div className="w-24 h-24 bg-[#EE5B2B]/10 rounded-full flex items-center justify-center mb-8 border-[6px] border-white shadow-inner">
          <CheckCircle2 className="w-12 h-12 text-[#EE5B2B]" strokeWidth={2.5} />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading text-[#004A61] tracking-widest uppercase leading-[1.1]">
            BOOKING <br className="md:hidden" /><span className="text-[#EE5B2B]">CONFIRMED</span>
          </h1>
          <p className="text-[#004A61]/70 font-bold text-xs md:text-sm leading-relaxed max-w-sm mx-auto uppercase tracking-[2px]">
            You're all set. We can't wait to see you at the legend.
          </p>
        </div>
        
        <Link 
          href="/"
          className="mt-10 inline-flex items-center gap-2 bg-[#004A61] text-white hover:bg-[#EE5B2B] px-8 py-4 text-[10px] font-bold uppercase tracking-[3px] transition-all duration-500 rounded-none shadow-xl"
        >
          <Home className="w-4 h-4 mb-[2px]" />
          BACK TO HOME
        </Link>
      </div>
      
      <Suspense fallback={null}>
        <ConfirmationLogic />
      </Suspense>
    </div>
  );
}
