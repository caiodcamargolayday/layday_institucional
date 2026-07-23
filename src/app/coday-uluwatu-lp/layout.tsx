import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Coday Uluwatu | Premium Coliving & Wellness",
  description: "A high-performance sanctuary for the digital generation. Luxury boutique aesthetics with coworking infrastructure, recovery labs, and the raw spirit of the Balinese coast.",
  openGraph: {
    title: "Coday Uluwatu | Premium Coliving & Wellness",
    description: "A high-performance sanctuary for the digital generation.",
    images: ["/coday_uluwatu/uluwatu_surfers_hero.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="cloudbeds-tracking" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `
(function() {
  var incoming = new URLSearchParams(window.location.search);
  var keep = ['gclid','gbraid','wbraid','utm_source','utm_medium','utm_campaign','utm_term','utm_content','fbclid'];
  var toPass = new URLSearchParams();
  keep.forEach(function(k){ if (incoming.has(k)) toPass.set(k, incoming.get(k)); });
  if (!toPass.toString()) return;
  function decorate() {
    document.querySelectorAll('a[href*="cloudbeds.com"]').forEach(function(a){
      try {
        var url = new URL(a.href);
        toPass.forEach(function(v,k){ url.searchParams.set(k,v); });
        a.href = url.toString();
      } catch(e){}
    });
  }
  decorate();
  document.addEventListener('DOMContentLoaded', decorate);
  setTimeout(decorate, 1500); // catches buttons rendered late by the builder
})();
        `
      }} />
    </>
  );
}
