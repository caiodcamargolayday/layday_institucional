"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Users, Music, Star, ChevronDown, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const ASSETS = {
  hero: "/layday_gilit/layday_gilit_picture 1.jpg",
  pool: "/layday_gilit/layday_gilit_picture 2.jpg",
  social: "/layday_gilit/layday_gilit_picture 3.jpg",
  rooms: "/layday_gilit/layday_gilit_picture 4.jpg",
  vibes: "/layday_gilit/layday_gilit_picture 5.jpg"
};

const FEATURES = [
  { icon: Music, title: "ISLAND VIBES", text: "Gili T energy." },
  { icon: Users, title: "SOCIAL HUB", text: "Meet the global tribe." },
  { icon: ShieldCheck, title: "CLEAN & SAFE", text: "Professional hospitality." }
];

export function GiliTClient() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  if (!hasMounted) return <div className="min-h-screen bg-[#EBE7E0]" />;

  return (
    <div ref={containerRef} className="bg-[#EBE7E0] text-[#004A61] font-sans selection:bg-[#EE5B2B] selection:text-white">
      
      {/* 1. Hero */}
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src={ASSETS.hero} 
            alt="Gili T Hero" 
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
            <span className="text-white font-bold tracking-[4px] uppercase text-[9px] mb-2 block drop-shadow-lg">Island Sanctuary • Gili T</span>
            <h1 className="text-5xl md:text-7xl font-heading text-white tracking-widest leading-none mb-6 drop-shadow-2xl">
              LAY DAY <span className="text-[#EE5B2B]">GILI T</span>
            </h1>
            <p className="max-w-xl mx-auto text-white/90 font-medium tracking-wide text-lg md:text-xl leading-relaxed">
              Experience the legendary island life. Pure vibes and the best pool parties in Gili Trawangan.
            </p>
            <div className="mt-10 md:mt-12 flex flex-col items-center">
              <Button className="bg-[#EE5B2B] text-white hover:bg-white hover:text-[#004A61] rounded-none h-12 px-10 font-bold uppercase tracking-[3px] text-xs transition-all duration-300 shadow-xl mb-12">
                BOOK NOW
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

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        
        {/* 2. Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-10"
          >
            <h2 className="text-2xl md:text-5xl font-heading tracking-widest leading-tight uppercase">
              THE <span className="text-[#EE5B2B]">UNFILTERED</span> GILI LIFE
            </h2>
            <p className="text-sm md:text-base leading-relaxed font-medium opacity-70 uppercase tracking-tight">
              Welcome to the island that never sleeps. Our Gili Trawangan location is a sanctuary for the social traveler.
            </p>
            <div className="flex gap-4 pt-2">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <f.icon className="w-4 h-4 text-[#EE5B2B] mb-1" />
                  <h4 className="text-[7px] font-bold tracking-widest uppercase">{f.title}</h4>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square border-[4px] md:border-[8px] border-white shadow-lg overflow-hidden"
          >
            <Image src={ASSETS.pool} alt="Pool" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
          </motion.div>
        </div>

        {/* 3. Video */}
        <section className="mb-10 md:mb-16">
          <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-3xl font-heading tracking-widest uppercase mb-6">SEE THE <span className="text-[#EE5B2B]">VIBE</span></h2>
            <div className="w-full max-w-[280px] aspect-[9/16] border-[4px] border-white shadow-xl relative overflow-hidden bg-white">
              <AnimatePresence mode="wait">
                {!isVideoPlaying ? (
                  <motion.div 
                    key="thumbnail"
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 cursor-pointer z-10"
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    <Image src={ASSETS.vibes} alt="Vibe" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#EE5B2B] flex items-center justify-center shadow-2xl">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/6fdKjRXdurw?autoplay=1&mute=0&loop=1&playlist=6fdKjRXdurw&controls=1&rel=0&modestbranding=1&playsinline=1`} 
                    title="Vibe" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 4. Carousel */}
        <section className="mb-10 md:mb-16 overflow-hidden">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-4xl font-heading tracking-widest uppercase">THE <span className="text-[#EE5B2B]">TRIBE</span> SCENES</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-4">
            {[ASSETS.pool, ASSETS.social, ASSETS.rooms, ASSETS.vibes].map((img, i) => (
              <div key={i} className="relative min-w-[75vw] md:min-w-[350px] aspect-[4/5] border-[4px] border-white shadow-md flex-shrink-0">
                <Image src={img} alt="Scene" fill className="object-cover" sizes="(max-width: 768px) 80vw, 30vw" />
              </div>
            ))}
          </div>
        </section>

        {/* 5. CTA */}
        <section className="text-center bg-[#004A61] text-white p-6 md:p-10 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl md:text-4xl font-heading tracking-widest uppercase leading-none">
              READY FOR THE <span className="text-[#EE5B2B]">ISLAND?</span>
            </h2>
            <Button className="bg-[#EE5B2B] text-white hover:bg-white hover:text-[#004A61] rounded-none h-12 px-12 font-bold uppercase tracking-[3px] text-[10px] transition-all duration-500 shadow-xl">
              BOOK NOW
            </Button>
          </div>
          <div className="absolute inset-0 z-0 opacity-10">
            <Image src={ASSETS.vibes} alt="BG" fill className="object-cover grayscale" />
          </div>
        </section>

      </div>
    </div>
  );
}
