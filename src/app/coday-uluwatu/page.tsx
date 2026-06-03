"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { MapPin, Wifi, Coffee, Zap, Droplets, Wind, Star } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const RECOVERY_CYCLE = [
  { src: "/coday_uluwatu/hangover 1.jpg", text: "THE HANGOVER" },
  { src: "/coday_uluwatu/over it 2.jpg", text: "OVER IT?" },
  { src: "/coday_uluwatu/we get it 3.jpg", text: "WE GET IT" },
  { src: "/coday_uluwatu/swap the party 4.jpg", text: "SWAP THE PARTY" },
  { src: "/coday_uluwatu/for this 5.jpg", text: "FOR THIS" },
  { src: "/coday_uluwatu/coday 6.jpg", text: "CODAY ULUWATU" }
];



const COLIVING_IMAGES = [
  "/coday_uluwatu/co living 1.jpg",
  "/coday_uluwatu/co living 2.jpg",
  "/coday_uluwatu/co living 3.jpg",
  "/coday_uluwatu/co living 4.jpg"
];

export default function CodayPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const containerRef = useRef(null);
  const [activeCycleIndex, setActiveCycleIndex] = useState(0);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  if (!hasMounted) {
    return <div className="min-h-screen bg-[#EBE7E0]" />;
  }

  return (
    <div ref={containerRef} className="bg-[#EBE7E0] text-[#004A61] font-sans selection:bg-[#EE5B2B] selection:text-white">
      
      {/* Premium Parallax Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src={encodeURI("/coday_uluwatu/uluwatu_surfers_hero.png")} 
            alt="CoDay Uluwatu Hero" 
            fill 
            priority
            className="object-cover scale-[1.2] md:scale-105 object-[50%_65%] md:object-center brightness-90 saturate-[0.8] sepia-[0.15]"
            sizes="100vw"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10" />
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-white font-bold tracking-[4px] uppercase text-sm mb-6 block">Boutique Stays • Coworking • Wellness</span>
            <h1 className="text-6xl md:text-[8rem] font-heading text-white tracking-widest leading-none mb-8 drop-shadow-2xl">
              CODAY ULUWATU
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/90 font-bold tracking-[2px] uppercase text-xs mb-10">
              <MapPin className="w-4 h-4 text-[#EE5B2B]" />
              <span>Uluwatu, Bali</span>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button 
                onClick={() => {
                  localStorage.setItem("booking_origin", "coday");
                  window.open("https://hotels.cloudbeds.com/en/reservation/WEE9oP?currency=idr", "_blank");
                }}
                className="bg-[#EE5B2B] text-white hover:bg-[#EE5B2B]/90 rounded-none h-14 px-12 font-bold uppercase tracking-[3px] text-sm shadow-xl transition-transform hover:scale-105 active:scale-95">
                Book Now
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-white/0 via-white to-white/0" />
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        
        {/* Instagram Cycle Section - The New "Reel" Animation */}
        <section className="mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-heading tracking-widest leading-tight">
                THE <span className="text-[#EE5B2B]">PIVOT</span>
              </h2>
              <p className="text-base md:text-lg font-medium opacity-80 max-w-md">
                We know the cycle. The wild nights in Canggu are legendary, but the pivot to productivity requires a different environment. 
              </p>
              <div className="flex gap-3">
                {RECOVERY_CYCLE.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveCycleIndex(i)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${activeCycleIndex === i ? 'bg-[#EE5B2B] w-6 md:w-8' : 'bg-[#004A61]/20'}`}
                  />
                ))}
              </div>
              <div className="pt-4 md:pt-8">
                <motion.div
                  key={activeCycleIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl md:text-4xl font-heading tracking-widest text-[#EE5B2B]"
                >
                  {RECOVERY_CYCLE[activeCycleIndex].text}
                </motion.div>
              </div>
            </div>

            <div className="relative aspect-[4/5] w-full max-w-sm md:max-w-md mx-auto group mt-8 lg:mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCycleIndex}
                  initial={{ opacity: 0, scale: 0.95, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.05, x: -50 }}
                  transition={{ duration: 0.6, ease: "anticipate" }}
                  className="absolute inset-0 shadow-2xl border-4 border-white"
                >
                  <Image 
                    src={encodeURI(RECOVERY_CYCLE[activeCycleIndex].src)}
                    alt={RECOVERY_CYCLE[activeCycleIndex].text}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  {/* Insta-style overlay label */}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 font-bold text-xs tracking-widest uppercase">
                    Slide {activeCycleIndex + 1} / {RECOVERY_CYCLE.length}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation arrows like Instagram */}
              <button 
                onClick={() => setActiveCycleIndex((prev) => (prev - 1 + RECOVERY_CYCLE.length) % RECOVERY_CYCLE.length)}
                className="absolute left-[-15px] md:left-[-20px] top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white border border-[#004A61] rounded-full flex items-center justify-center z-30 shadow-lg hover:bg-[#EE5B2B] hover:text-white transition-colors"
              >
                <span className="sr-only">Prev</span>
                ←
              </button>
              <button 
                onClick={() => setActiveCycleIndex((prev) => (prev + 1) % RECOVERY_CYCLE.length)}
                className="absolute right-[-15px] md:right-[-20px] top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white border border-[#004A61] rounded-full flex items-center justify-center z-30 shadow-lg hover:bg-[#EE5B2B] hover:text-white transition-colors"
              >
                <span className="sr-only">Next</span>
                →
              </button>
            </div>
          </div>
        </section>

        {/* Intro Section - Better Copy & Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-heading tracking-widest mb-6 md:mb-8 leading-tight">
              A NEW STANDARD FOR <span className="text-[#EE5B2B]">MODERN NOMADS</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-medium opacity-90 mb-6 md:mb-8">
              CoDay Uluwatu isn't just a place to sleep—it's a high-performance sanctuary designed for the digital generation. We've blended luxury boutique aesthetics with industrial coworking infrastructure to create a space where productivity meets the raw spirit of the Balinese coast.
            </p>
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <div className="flex flex-col gap-2">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-[#EE5B2B]" />
                <h4 className="font-bold tracking-widest text-xs md:text-sm uppercase">Ultra-Fast Fiber</h4>
                <p className="text-[10px] md:text-xs font-medium opacity-70">Dedicated 100Mbps lines for seamless calls.</p>
              </div>
              <div className="flex flex-col gap-2">
                <Droplets className="w-5 h-5 md:w-6 md:h-6 text-[#EE5B2B]" />
                <h4 className="font-bold tracking-widest text-xs md:text-sm uppercase">Recovery Lab</h4>
                <p className="text-[10px] md:text-xs font-medium opacity-70">Sauna & Cold Plunge for optimal performance.</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square border-2 border-[#004A61] p-3 md:p-4"
          >
            <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-[#EE5B2B] -z-10" />
            <Image 
              src={encodeURI("/coday_uluwatu/co living 3.jpg")} 
              alt="Co-living design" 
              fill 
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Wellness & Recovery - Focused on Sauna & Ice */}
        <section className="mb-24 md:mb-32">
          <div className="flex flex-col items-center mb-12 md:mb-16 text-center">
            <h3 className="text-3xl md:text-4xl font-heading tracking-widest mb-4">RECOVERY & RESET</h3>
            <div className="w-20 md:w-24 h-1 bg-[#EE5B2B] mb-6 md:mb-8" />
            <p className="max-w-2xl text-base md:text-lg font-medium opacity-80 uppercase tracking-wide">
              Cold Ice Therapy & Wood-Fired Sauna
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center mb-12 md:mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video lg:aspect-square border-2 border-[#004A61] overflow-hidden"
            >
              <Image 
                src={encodeURI("/coday_uluwatu/sauna 1.jpg")} 
                alt="Cold Plunge Therapy" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-105" 
                sizes="(max-width: 1024px) 100vw, 50vw" 
              />
            </motion.div>
            <div className="space-y-6 md:space-y-8">
              <h4 className="text-2xl md:text-3xl font-heading tracking-widest">MASTER THE <span className="text-[#EE5B2B]">CONTRAST</span></h4>
              <p className="text-base md:text-lg leading-relaxed font-medium opacity-90">
                Experience the ultimate biological reset. Our recovery circuit uses extreme temperature contrast to optimize your health. The deep heat of our traditional sauna flushes out toxins and relaxes muscles, while our sub-zero ice baths trigger a powerful anti-inflammatory response.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="border-l-2 border-[#EE5B2B] pl-4">
                  <h5 className="font-bold uppercase tracking-widest text-[10px] md:text-xs mb-1 md:mb-2">Sauna Therapy</h5>
                  <p className="text-xs md:text-sm opacity-70">Deep detoxification, improved circulation, and profound stress relief.</p>
                </div>
                <div className="border-l-2 border-[#EE5B2B] pl-4">
                  <h5 className="font-bold uppercase tracking-widest text-[10px] md:text-xs mb-1 md:mb-2">Ice Plunge</h5>
                  <p className="text-xs md:text-sm opacity-70">Instant inflammation reduction and a massive dopamine spike for focus.</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-[250px] md:h-[400px] border-2 border-[#004A61] overflow-hidden"
          >
            <Image 
              src={encodeURI("/coday_uluwatu/sauna 2.jpg")} 
              alt="Traditional Sauna" 
              fill 
              className="object-cover" 
              sizes="100vw" 
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-white font-heading text-2xl md:text-6xl tracking-[5px] md:tracking-[10px] uppercase drop-shadow-lg text-center">
                HEAL. RESET. PERFORM.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Rooms & Coworking Tabs - Refined UI */}
        <section className="mb-24 md:mb-32 bg-white border-2 border-[#004A61] p-6 md:p-12 relative">
          <div className="absolute top-0 right-0 bg-[#EE5B2B] text-white px-4 md:px-6 py-2 font-bold tracking-[2px] uppercase text-[10px] md:text-xs -translate-y-full">
            The Spaces
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
            <div className="lg:col-span-1">
              <h3 className="text-3xl md:text-4xl font-heading tracking-widest mb-6 md:mb-8">TAILORED FOR <span className="text-[#EE5B2B]">SUCCESS</span></h3>
              <ul className="space-y-4 md:space-y-6">
                {[
                  { icon: Wifi, text: "Business Grade WiFi" },
                  { icon: Coffee, text: "Specialty Coffee Bar" },
                  { icon: Wind, text: "Full Climate Control" },
                  { icon: Star, text: "Premium Linen" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 md:gap-4 font-bold tracking-widest text-[10px] md:text-xs uppercase">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-[#EE5B2B]" />
                    {item.text}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => {
                  localStorage.setItem("booking_origin", "coday");
                  window.open("https://hotels.cloudbeds.com/en/reservation/WEE9oP?currency=idr", "_blank");
                }}
                className="mt-8 md:mt-12 w-full bg-[#004A61] text-white hover:bg-[#004A61]/90 rounded-none h-12 md:h-14 font-bold uppercase tracking-widest transition-transform hover:scale-105">
                View Availability
              </Button>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-3 md:gap-4">
              <div className="relative aspect-[4/5] border border-[#004A61]">
                <Image src={encodeURI(COLIVING_IMAGES[0])} alt="Room 1" fill className="object-cover" sizes="33vw" />
              </div>
              <div className="relative aspect-[4/5] border border-[#004A61] translate-y-4 md:translate-y-8">
                <Image src={encodeURI(COLIVING_IMAGES[1])} alt="Room 2" fill className="object-cover" sizes="33vw" />
              </div>
            </div>
          </div>
        </section>

        {/* Instagram CTA */}
        <div className="flex flex-col items-center justify-center py-12 md:py-20 border-t border-[#004A61]/20">
          <h4 className="font-heading text-2xl md:text-3xl tracking-widest mb-6 md:mb-8 uppercase">JOIN THE TRIBE</h4>
          <a 
            href="https://www.instagram.com/coday.uluwatu/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 md:gap-4 bg-[#EE5B2B] text-white px-6 md:px-10 py-3 md:py-4 font-bold tracking-[2px] md:tracking-[3px] uppercase text-xs md:text-sm hover:bg-black transition-all group"
          >
            <FaInstagram size={20} className="transition-transform group-hover:rotate-12" />
            @coday.uluwatu
          </a>
        </div>

      </div>
    </div>
  );
}
