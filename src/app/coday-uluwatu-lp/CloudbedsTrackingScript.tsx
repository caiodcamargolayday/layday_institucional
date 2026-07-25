"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function TrackingLogic() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const keep = [
      'gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 
      'utm_campaign', 'utm_term', 'utm_content', 'fbclid'
    ];
    const toPass = new URLSearchParams();

    keep.forEach(k => {
      if (searchParams.has(k)) {
        toPass.set(k, searchParams.get(k)!);
      }
    });

    if (!toPass.toString()) return;

    function decorate() {
      document.querySelectorAll('a[href*="cloudbeds.com"]').forEach(a => {
        try {
          const url = new URL((a as HTMLAnchorElement).href);
          toPass.forEach((v, k) => {
            url.searchParams.set(k, v);
          });
          (a as HTMLAnchorElement).href = url.toString();
        } catch (e) {
          // ignore invalid URLs
        }
      });
    }

    decorate();
    const timeoutId = setTimeout(decorate, 1500);

    return () => clearTimeout(timeoutId);
  }, [searchParams]);

  return null;
}

export function CloudbedsTrackingScript() {
  return (
    <Suspense fallback={null}>
      <TrackingLogic />
    </Suspense>
  );
}
