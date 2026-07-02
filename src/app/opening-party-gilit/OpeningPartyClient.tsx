"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const ASSETS = {
  hero: "/gilit_opening_party/hero_section.png",
  heroMobile: "/gilit_opening_party/mobile_version.png",
  video: "/gilit_opening_party/LDGT-Grand Opening.mp4",
  flyer: "/gilit_opening_party/LDGT-Grand Opening Flyer-IGF.png"
};

const COLORS = {
  lightPink: "#FFC2E2", // Soft light pink
  darkPink: "#E6007E",  // Vibrant dark pink
  white: "#FFFFFF",
  dark: "#4A002A",
};

export function OpeningPartyClient() {
  const [hasMounted, setHasMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  if (!hasMounted) return <div className="min-h-screen" style={{ backgroundColor: COLORS.lightPink }} />;

  return (
    <div ref={containerRef} className="font-sans" style={{ backgroundColor: COLORS.lightPink, color: COLORS.darkPink }}>
      
      {/* 1. Hero Image */}
      <section className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center text-center bg-black">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src={ASSETS.hero}
            alt="Lay Day Gili T Grand Opening Hero Desktop"
            fill
            className="object-cover opacity-90 hidden md:block"
            priority
          />
          <Image 
            src={ASSETS.heroMobile}
            alt="Lay Day Gili T Grand Opening Hero Mobile"
            fill
            className="object-cover opacity-90 block md:hidden"
            priority
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
        
        <div className="relative z-20 px-4 flex flex-col items-center w-full mt-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            <div className="flex flex-col items-center">
              <Button 
                onClick={() => {
                  if (typeof window !== "undefined" && (window as any).fbq) {
                    (window as any).fbq('track', 'InitiateCheckout');
                  }
                  localStorage.setItem("booking_origin", "gilit-opening");
                  window.open("https://hotels.cloudbeds.com/en/reservation/4fbPDV?currency=idr", "_blank");
                }}
                className="text-white hover:bg-white rounded-none h-14 md:h-16 px-12 md:px-16 font-bold uppercase tracking-[4px] md:tracking-[6px] text-xs md:text-sm transition-all duration-300 shadow-2xl mb-8 border-none"
                style={{ backgroundColor: COLORS.darkPink }}
                onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.darkPink; e.currentTarget.style.backgroundColor = COLORS.white; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = COLORS.white; e.currentTarget.style.backgroundColor = COLORS.darkPink; }}
              >
                SECURE THE SPOT
              </Button>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="opacity-80"
              >
                <ChevronDown className="w-8 h-8 text-white" strokeWidth={1.5} />
             </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Content */}
      <section className="py-20 md:py-32 px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading tracking-widest leading-tight uppercase mb-8" style={{ color: COLORS.darkPink }}>
              IT’S FINALLY TIME
            </h2>
            <div className="space-y-6 text-base md:text-2xl font-medium leading-relaxed" style={{ color: COLORS.dark }}>
              <p>
                Join us for the Lay Day Gili T Grand Opening on Friday, 10th of July.
              </p>
              <p>
                The party kicks off at 2pm, with DJs, drink specials, free BBQ & finger food, and an afterparty keeping things going until 3AM.
              </p>
              <p className="font-bold pt-6 text-xl md:text-3xl uppercase tracking-widest" style={{ color: COLORS.darkPink }}>
                Grab your crew and come celebrate with us. See you there.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Video Below Content */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-xs md:max-w-md mx-auto">
          <div className="relative aspect-[9/16] shadow-2xl border-[4px] md:border-[8px] rounded-xl overflow-hidden" style={{ borderColor: COLORS.white }}>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              controls
              className="w-full h-full object-cover"
            >
              <source src={ASSETS.video} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* 4. Flyers */}
      <section className="py-16 md:py-24 px-4" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-heading tracking-widest uppercase" style={{ color: COLORS.darkPink }}>
              THE DETAILS
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] border-[4px] md:border-[8px] overflow-hidden shadow-2xl mx-auto"
            style={{ borderColor: COLORS.white }}
          >
            <Image 
              src={ASSETS.flyer} 
              alt="Grand Opening Flyer" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </motion.div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-32 px-4 relative overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <Image src={ASSETS.hero} alt="BG" fill className="object-cover opacity-10 blur-md scale-110 grayscale" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(255, 194, 226, 0.9)' }} />
        </div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-5xl md:text-7xl font-heading tracking-widest uppercase leading-none" style={{ color: COLORS.darkPink }}>
            DON'T MISS OUT
          </h2>
          <Button 
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).fbq) {
                (window as any).fbq('track', 'InitiateCheckout');
              }
              localStorage.setItem("booking_origin", "gilit-opening");
              window.open("https://hotels.cloudbeds.com/en/reservation/4fbPDV?currency=idr", "_blank");
            }}
            className="text-white hover:bg-white rounded-none h-16 md:h-20 px-10 md:px-24 font-bold uppercase tracking-[4px] md:tracking-[10px] text-sm md:text-lg transition-all duration-500 shadow-xl border-none"
            style={{ backgroundColor: COLORS.darkPink }}
            onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.darkPink; e.currentTarget.style.backgroundColor = COLORS.white; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = COLORS.white; e.currentTarget.style.backgroundColor = COLORS.darkPink; }}
          >
            SECURE THE SPOT
          </Button>
          <div className="pt-4 opacity-70 tracking-[4px] uppercase text-[10px] md:text-xs font-bold flex flex-wrap items-center justify-center gap-3" style={{ color: COLORS.dark }}>
            <span>#party #dontmissout</span>
            <a 
              href="https://www.instagram.com/laydaygilit/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:opacity-80 transition-opacity text-[#E6007E]"
            >
              <FaInstagram className="w-3 h-3 md:w-4 md:h-4" />
              @laydaygilit
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
