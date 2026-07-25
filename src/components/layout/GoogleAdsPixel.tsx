"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function GoogleAdsPixel() {
  const pathname = usePathname();
  const [loadedPixels, setLoadedPixels] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!pathname) return;

    let pixelId: string | undefined;

    if (pathname.includes("coday-uluwatu")) {
      pixelId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID_CODAY_ULUWATU;
    } else if (pathname.includes("layday-uluwatu")) {
      pixelId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID_LAYDAY_ULUWATU;
    } else if (pathname.includes("gilit")) {
      pixelId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID_GILIT;
    } else if (pathname.includes("canggu")) {
      pixelId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID_CANGGU;
    }

    if (!pixelId) return;

    if (!loadedPixels.has(pixelId)) {
      setLoadedPixels((prev) => new Set(prev).add(pixelId!));

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${pixelId}`;
      document.head.appendChild(script);

      const scriptInline = document.createElement("script");
      scriptInline.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${pixelId}');
      `;
      document.head.appendChild(scriptInline);
    }
  }, [pathname, loadedPixels]);

  return null;
}
