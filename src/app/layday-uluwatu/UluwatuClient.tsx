"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, MapPin, Camera, Zap, ShoppingBag, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const ASSETS = {
  hero: "/lay_day_uluwatu/place 2.jpeg",
  showcase: [
    "/lay_day_uluwatu/place 1.jpeg",
    "/lay_day_uluwatu/place.jpeg",
    "/lay_day_uluwatu/place 2.jpeg",
    "/lay_day_uluwatu/palce 3.jpeg",
    "/lay_day_uluwatu/place 4.jpeg",
    "/lay_day_uluwatu/place 5.jpeg",
    "/lay_day_uluwatu/place 6.jpeg"
  ],
  meals: [
    "/lay_day_uluwatu/bowl.jpeg",
    "/lay_day_uluwatu/meal 1.jpeg",
    "/lay_day_uluwatu/meal.jpeg"
  ],
  zoom: [
    "/lay_day_uluwatu/palce_zoom 6.jpeg",
    "/lay_day_uluwatu/palce_zoom 7.jpeg",
    "/lay_day_uluwatu/place_zoom 1.jpeg",
    "/lay_day_uluwatu/place_zoom 2.jpeg",
    "/lay_day_uluwatu/place_zoom 3.jpeg",
    "/lay_day_uluwatu/place_zoom 4.jpeg"
  ],
  future: [
    "/lay_day_uluwatu/tusk.jpeg",
    "/lay_day_uluwatu/black_betty.jpeg"
  ],
  shop: "/lay_day_uluwatu/models.jpeg"
};

const sportsImages = [
  "/lay_day_uluwatu/surf 1.jpeg",
  "/lay_day_uluwatu/surf 3.jpeg",
  "/lay_day_uluwatu/sport.jpeg",
  "/lay_day_uluwatu/sport 3.jpeg",
  "/lay_day_uluwatu/surf 2.jpeg"
];

function StoryCarousel({ images, title, subtitle, aspect = "aspect-[16/10]" }: { images: string[], title?: string, subtitle?: string, aspect?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`relative group bg-[#D8D2C5] ${aspect} overflow-hidden`}>
      <div 
        ref={scrollRef}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing"
      >
        {images.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-full h-full snap-center relative">
            <Image 
              src={src} 
              alt={`${title || "Slide"} ${i}`} 
              fill 
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 80vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
      
      {(title || subtitle) && (
        <div className="absolute bottom-6 left-6 z-20 space-y-2 pointer-events-none">
          {subtitle && (
            <p className="text-[#EE5B2B] font-bold tracking-[3px] uppercase text-[10px]">
              {subtitle}
            </p>
          )}
          {title && (
            <h3 className="text-white font-heading text-2xl md:text-4xl tracking-widest uppercase">
              {title}
            </h3>
          )}
        </div>
      )}

      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 text-white/50 text-[8px] font-bold tracking-[2px] uppercase pointer-events-none">
        <span className="animate-pulse">Swipe</span>
        <div className="w-4 h-[1px] bg-white/30" />
      </div>
    </div>
  );
}

export function UluwatuClient() {
  const [hasMounted, setHasMounted] = useState(false);
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
    <div ref={containerRef} className="bg-[#EBE7E0] text-[#004A61] font-sans selection:bg-[#EE5B2B] selection:text-white overflow-x-hidden">
      
      {/* 1. Cinematic Hero */}
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src={ASSETS.hero} 
            alt="Uluwatu Hero" 
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
            <span className="text-white font-bold tracking-[4px] uppercase text-[11px] mb-3 block drop-shadow-lg">Uluwatu • Sanctuary</span>
            <h1 className="text-5xl md:text-7xl font-heading text-white tracking-widest leading-none mb-6 drop-shadow-2xl">
              LAY DAY <span className="text-[#EE5B2B]">ULUWATU</span>
            </h1>
            <div className="flex flex-col items-center">
              <Button className="bg-[#EE5B2B] text-white hover:bg-white hover:text-[#004A61] rounded-none h-12 px-10 font-bold uppercase tracking-[3px] text-xs transition-all duration-500 shadow-xl mb-6">
                SECURE YOUR SPOT
              </Button>
              
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="opacity-40"
              >
                <ChevronDown className="w-6 h-6 text-white" strokeWidth={1.5} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 space-y-12 md:space-y-20">
        
        {/* 2. The Place */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#EE5B2B]/20 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-[#EE5B2B]" />
                <span className="text-[10px] font-bold tracking-[2px] uppercase">The Landmark</span>
              </div>
              <h2 className="text-2xl md:text-5xl font-heading tracking-widest uppercase leading-[0.9]">
                THE <span className="text-[#EE5B2B]">CLIFFSIDE</span> SANCTUARY
              </h2>
            </div>
            <p className="max-w-xs text-[10px] font-bold uppercase tracking-[2px] opacity-60 leading-relaxed">
              Industrial luxury meets raw energy. Minimalist. Precise.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-[4px] md:border-[8px] border-white shadow-lg"
          >
            <StoryCarousel 
              images={ASSETS.showcase} 
              aspect="aspect-[16/9]"
            />
          </motion.div>
        </section>

        {/* 3. Ritual */}
        <section className="relative py-6 md:py-10 overflow-hidden">
          <div className="mb-6">
            <h2 className="text-3xl md:text-5xl font-heading tracking-tighter uppercase mb-2">
              SURF, <span className="text-[#EE5B2B]">SWEAT</span>, LEGEND.
            </h2>
            <p className="text-[#004A61] text-xs font-bold uppercase tracking-wider opacity-50">
              No filters. Just pure ritual.
            </p>
          </div>

          <div className="relative w-full overflow-x-auto no-scrollbar pb-4">
            <div className="flex items-center gap-3 md:gap-6 px-[5vw] w-max">
              {[...sportsImages, ...sportsImages].map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`relative flex-shrink-0 ${
                    i % 3 === 0 ? 'w-[220px] md:w-[350px] aspect-[4/5]' : 
                    i % 3 === 1 ? 'w-[200px] md:w-[320px] aspect-square' : 
                    'w-[260px] md:w-[450px] aspect-[16/9]'
                  } border-[1px] border-[#004A61]/5 shadow-sm group overflow-hidden bg-white`}
                >
                  <Image 
                    src={src} 
                    alt="Ritual" 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    sizes="(max-width: 768px) 50vw, 30vw"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Meals */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-2xl md:text-5xl font-heading tracking-widest uppercase">
              ISLAND <span className="text-[#EE5B2B]">FLAVORS</span>
            </h2>
            <p className="text-xs leading-relaxed font-medium opacity-80 uppercase tracking-tight">
              Fuel for the waves. Pure. Fresh.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 border-[4px] md:border-[8px] border-white shadow-lg"
          >
            <StoryCarousel 
              images={ASSETS.meals} 
              aspect="aspect-[4/3]"
            />
          </motion.div>
        </section>

        {/* 5. Shop & Future */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] overflow-hidden group"
          >
            <Image src={ASSETS.shop} alt="Shop" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 45vw" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-6 h-6 text-white mb-4" />
              <h3 className="text-white font-heading text-3xl tracking-widest uppercase mb-2">THE <span className="text-[#EE5B2B]">SHOP</span></h3>
              <Button className="bg-[#EE5B2B] text-white hover:bg-white hover:text-[#004A61] rounded-none px-6 h-10 text-[10px] tracking-[2px]">SHOP NOW</Button>
            </div>
          </motion.div>

          <div className="flex flex-col h-full">
            <div className="flex-grow mb-4 overflow-hidden border-[4px] border-white shadow-md">
              <StoryCarousel 
                images={ASSETS.future} 
                aspect="h-full min-h-[350px]"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl md:text-3xl font-heading tracking-widest uppercase leading-none">THE <span className="text-[#EE5B2B]">FUTURE</span> IS COMING</h3>
              <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Tusk • Black Betty</p>
            </div>
          </div>

        </div>

        {/* 6. Final CTA */}
        <section className="text-center bg-[#004A61] text-white p-8 md:p-16 relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-heading tracking-widest uppercase leading-none">
              ULU <span className="text-[#EE5B2B]">WAITING</span>
            </h2>
            <Button className="bg-[#EE5B2B] text-white hover:bg-white hover:text-[#004A61] rounded-none h-12 px-12 font-bold uppercase tracking-[3px] text-xs transition-all duration-500 shadow-xl">
              CLAIM YOUR SPOT
            </Button>
          </div>
          <div className="absolute inset-0 z-0 opacity-10">
            <Image src="/lay_day_uluwatu/surf 1.jpeg" alt="BG" fill className="object-cover grayscale" />
          </div>
        </section>

      </div>
    </div>
  );
}
