"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, MapPin, Camera, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

const ASSETS = {
  hero: "/lay_day_canggu/beach 2.jpeg",
  ribbon: [
    "/lay_day_canggu/bar 1.jpeg",
    "/lay_day_canggu/bar 2.jpeg",
    "/lay_day_canggu/bar 4.jpeg",
    "/lay_day_canggu/bar 5.jpeg",
    "/lay_day_canggu/bar 6.jpeg",
    "/lay_day_canggu/bar 7.jpeg",
    "/lay_day_canggu/bar 8.jpeg",
    "/lay_day_canggu/party.jpeg",
    "/lay_day_canggu/pool.jpeg",
    "/lay_day_canggu/beach 1.jpeg"
  ],
  masonry: [
    { src: "/lay_day_canggu/room 6.png", size: "large", title: "THE VILLA" },
    { src: "/lay_day_canggu/pool.jpeg", size: "small", title: "POOL SESSIONS" },
    { src: "/lay_day_canggu/meals 1.jpeg", size: "small", title: "ISLAND FLAVORS" },
    { src: "/lay_day_canggu/bar 7.jpeg", size: "medium", title: "SOCIAL BAR" },
    { src: "/lay_day_canggu/surf.jpeg", size: "small", title: "SURF VIBES" },
    { src: "/lay_day_canggu/room 5.jpeg", size: "medium", title: "DORM LIFE" }
  ],
  lifestyle: "/lay_day_canggu/room 2.png",
  floating: [
    "/lay_day_canggu/location 1.png",
    "/lay_day_canggu/location 3.png",
    "/lay_day_canggu/location 5.png"
  ]
};

export function CangguClient() {
  const [hasMounted, setHasMounted] = useState(false);
  const containerRef = useRef(null);
  const [currentStoryImg, setCurrentStoryImg] = useState(0);
  
  const storyImages = [
    "/lay_day_canggu/party.jpeg",
    "/lay_day_canggu/bar 1.jpeg",
    "/lay_day_canggu/pool.jpeg",
    "/lay_day_canggu/bar 6.jpeg"
  ];

  useEffect(() => {
    setHasMounted(true);
    const timer = setInterval(() => {
      setCurrentStoryImg((prev) => (prev + 1) % storyImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [storyImages.length]);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);
  const ribbonX = useTransform(scrollYProgress, [0, 1], [0, -2500]);

  if (!hasMounted) return <div className="min-h-screen bg-[#EBE7E0]" />;

  return (
    <div ref={containerRef} className="bg-[#EBE7E0] text-[#004A61] font-sans selection:bg-[#EE5B2B] selection:text-white overflow-x-hidden">
      
      {/* 1. Hero */}
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src={ASSETS.hero} 
            alt="Canggu Hero" 
            fill 
            priority
            className="object-cover scale-105 brightness-90 saturate-[0.8]"
            sizes="100vw"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-black/30 z-10" />
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-white font-bold tracking-[4px] uppercase text-[9px] mb-2 block drop-shadow-lg">The OG Sanctuary • Canggu</span>
            <h1 className="text-5xl md:text-7xl font-heading text-white tracking-widest leading-none mb-6 drop-shadow-2xl">
              LAY DAY <span className="text-[#EE5B2B]">CANGGU</span>
            </h1>
            <div className="flex flex-col items-center">
              <Button 
                onClick={() => {
                  localStorage.setItem("booking_origin", "canggu");
                  window.open("https://hotels.cloudbeds.com/en/reservation/idPO4I?currency=idr", "_blank");
                }}
                className="bg-[#EE5B2B] text-white hover:bg-white hover:text-[#004A61] rounded-none h-12 px-10 font-bold uppercase tracking-[3px] text-xs transition-all duration-500 shadow-xl mb-6">
                BOOK THE LEGEND
              </Button>
              
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="opacity-40"
              >
                <ChevronDown className="w-5 h-5 text-white" strokeWidth={1.5} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Ribbon */}
      <div className="py-4 md:py-6 overflow-hidden bg-white/5">
        <motion.div 
          style={{ x: ribbonX }}
          className="flex gap-4 md:gap-6 whitespace-nowrap"
        >
          {[...ASSETS.ribbon, ...ASSETS.ribbon].map((img, i) => (
            <div key={i} className="relative w-[240px] md:w-[400px] aspect-video flex-shrink-0 grayscale-[0.3] hover:grayscale-0 transition-all duration-700 overflow-hidden">
              <Image src={img} alt="Vibe" fill className="object-cover" sizes="(max-width: 768px) 50vw, 30vw" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        
        {/* 3. Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-3 py-1 border border-[#EE5B2B]/20 rounded-full">
              <Waves className="w-3.5 h-3.5 text-[#EE5B2B]" />
              <span className="text-[10px] font-bold tracking-[2px] uppercase">Surf & Party</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-heading tracking-widest leading-tight uppercase">
              WHERE THE <span className="text-[#EE5B2B]">STORY</span> BEGAN
            </h2>
            <p className="text-sm md:text-base leading-relaxed font-medium opacity-70 max-w-lg uppercase tracking-tight">
              Born from a love of surf and social chaos. epicenter of the Batu Bolong tribe.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[4/5] relative border-[4px] md:border-[8px] border-white shadow-lg overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStoryImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image src={storyImages[currentStoryImg]} alt="Story" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 4. Gallery */}
        <section className="mb-12 md:mb-20">
          <div className="text-center mb-8">
            <Camera className="w-5 h-5 text-[#EE5B2B] mx-auto mb-4" />
            <h2 className="text-xl md:text-4xl font-heading tracking-widest uppercase">THE <span className="text-[#EE5B2B]">UNFILTERED</span> GALLERY</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
            {ASSETS.masonry.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden group ${
                  item.size === 'large' ? 'md:col-span-8 md:row-span-2 aspect-[16/10]' : 
                  item.size === 'medium' ? 'md:col-span-6 aspect-square' : 
                  'md:col-span-4 aspect-[4/5]'
                }`}
              >
                <Image src={item.src} alt={item.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 30vw" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-4 text-center">
                  <h4 className="text-white font-heading text-lg tracking-widest">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. Final CTA */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative h-[40vh] md:h-[50vh] flex items-center justify-center text-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <Image src="/lay_day_canggu/bar 6.jpeg" alt="Vibe" fill className="object-cover grayscale brightness-50" sizes="100vw" />
          </div>
          <div className="relative z-10 px-4 space-y-4">
            <h2 className="text-3xl md:text-6xl font-heading text-white tracking-[6px] md:tracking-[12px] uppercase leading-none">
              LIVE THE <span className="text-[#EE5B2B]">VIBE</span>
            </h2>
            <Button 
              onClick={() => {
                localStorage.setItem("booking_origin", "canggu");
                window.open("https://hotels.cloudbeds.com/en/reservation/idPO4I?currency=idr", "_blank");
              }}
              className="bg-[#EE5B2B] text-white hover:bg-white hover:text-[#004A61] rounded-none h-12 px-12 font-bold uppercase tracking-[4px] text-[10px] transition-all duration-500">
              BOOK NOW
            </Button>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
