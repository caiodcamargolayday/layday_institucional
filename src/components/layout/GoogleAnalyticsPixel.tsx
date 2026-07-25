"use client";

import { useEffect, useState } from "react";

export function GoogleAnalyticsPixel() {
  const [loaded, setLoaded] = useState(false);
  const gaId = "G-74E6CR98DD"; // Layday Hostels (Coday Uluwatu)

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      const scriptInline = document.createElement("script");
      scriptInline.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(scriptInline);
    }
  }, [loaded]);

  return null;
}
