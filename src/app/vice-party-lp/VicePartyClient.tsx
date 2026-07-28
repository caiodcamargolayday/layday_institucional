"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ASSETS = {
  hero: "/vice_party_pictures/Lay Day Vice-Newsletter.png",
  images: [
    "/vice_party_pictures/01.jpeg",
    "/vice_party_pictures/02.jpeg",
    "/vice_party_pictures/03.jpeg",
    "/vice_party_pictures/04.jpeg",
    "/vice_party_pictures/05.jpeg",
    "/vice_party_pictures/06.jpeg",
    "/vice_party_pictures/07.jpeg",
    "/vice_party_pictures/08.jpeg",
    "/vice_party_pictures/09.jpeg",
    "/vice_party_pictures/10.jpeg",
    "/vice_party_pictures/11.jpeg",
    "/vice_party_pictures/12.jpeg",
    "/vice_party_pictures/13.jpeg",
  ]
};

export function VicePartyClient() {
  const containerRef = useRef(null);
  const [currentImg, setCurrentImg] = useState(0);

  const handleBooking = () => {
    if (typeof window !== "undefined") {
      window.open("https://megatix.com.au/events/vice-party", "_blank");
    }
  };

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const ribbonX = useTransform(scrollYProgress, [0, 1], [0, -2500]);

  const scrollGallery = (dir: 'left' | 'right') => {
    const newIdx = dir === 'right'
      ? (currentImg + 1) % ASSETS.images.length
      : (currentImg - 1 + ASSETS.images.length) % ASSETS.images.length;
    setCurrentImg(newIdx);
  };

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] text-white font-sans selection:bg-[#FF1493] selection:text-white overflow-x-hidden min-h-screen">
      {/* 1. Hero */}
      <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-[#111] flex items-center justify-center">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src={ASSETS.hero}
            alt="Vice Party Hero"
            fill
            priority
            className="object-cover md:object-contain opacity-80"
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent z-10" />

        <div className="relative z-20 h-full w-full flex flex-col items-center justify-end pb-16 md:pb-24 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <h1 className="text-5xl md:text-8xl font-heading text-white tracking-widest leading-none drop-shadow-[0_0_15px_rgba(255,20,147,0.5)]">
              VICE <span className="text-[#FF1493]">PARTY</span>
            </h1>
            <Button
              onClick={handleBooking}
              className="bg-[#FF1493] text-white hover:bg-white hover:text-[#FF1493] rounded-none h-14 md:h-16 px-12 md:px-16 font-bold uppercase tracking-[4px] text-sm md:text-base transition-all duration-500 shadow-[0_0_30px_rgba(255,20,147,0.6)] hover:scale-105">
              GET TICKETS
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Ribbon */}
      <div className="py-8 md:py-16 overflow-hidden bg-white/5 border-y border-[#FF1493]/20">
        <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-heading tracking-widest uppercase text-white/90">FEEL THE <span className="text-[#FF1493]">VIBE</span></h2>
        </div>
        <motion.div
          style={{ x: ribbonX }}
          className="flex gap-4 md:gap-6 whitespace-nowrap pt-4"
        >
          {[...ASSETS.images, ...ASSETS.images, ...ASSETS.images].map((img, i) => (
            <div key={i} className="relative w-[260px] md:w-[400px] aspect-[4/5] md:aspect-video flex-shrink-0 grayscale-[0.2] hover:grayscale-0 transition-all duration-700 overflow-hidden border border-[#FF1493]/20 rounded-sm">
              <Image src={img} alt="Vibe" fill className="object-cover" sizes="(max-width: 768px) 80vw, 40vw" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        {/* 3. Interactive Gallery */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-heading tracking-widest uppercase text-white/90">PARTY <span className="text-[#FF1493]">GALLERY</span></h2>
          </div>
          <div className="relative">
            {/* Main Image */}
            <div className="relative aspect-[4/5] md:aspect-[21/9] overflow-hidden border-[2px] md:border-[4px] border-[#FF1493]/50 shadow-[0_0_30px_rgba(255,20,147,0.15)] bg-[#111] rounded-sm group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImg}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={ASSETS.images[currentImg]}
                    alt="Party"
                    fill
                    className="object-cover md:object-contain"
                    sizes="100vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Side preview strips - Hidden on mobile */}
              <div className="hidden md:block absolute left-0 top-0 w-[15%] h-full z-10 overflow-hidden opacity-20 hover:opacity-80 transition-opacity cursor-pointer border-r border-[#FF1493]/30 bg-black/50" onClick={() => scrollGallery('left')}>
                <Image
                  src={ASSETS.images[(currentImg - 1 + ASSETS.images.length) % ASSETS.images.length]}
                  alt="prev"
                  fill
                  className="object-cover blur-sm hover:blur-none transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <ChevronLeft className="w-12 h-12 text-white drop-shadow-md" />
                </div>
              </div>
              <div className="hidden md:block absolute right-0 top-0 w-[15%] h-full z-10 overflow-hidden opacity-20 hover:opacity-80 transition-opacity cursor-pointer border-l border-[#FF1493]/30 bg-black/50" onClick={() => scrollGallery('right')}>
                <Image
                  src={ASSETS.images[(currentImg + 1) % ASSETS.images.length]}
                  alt="next"
                  fill
                  className="object-cover blur-sm hover:blur-none transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <ChevronRight className="w-12 h-12 text-white drop-shadow-md" />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 md:gap-8 mt-8">
              <button
                onClick={() => scrollGallery('left')}
                className="w-12 h-12 rounded-full border-2 border-[#FF1493] text-[#FF1493] flex items-center justify-center hover:bg-[#FF1493] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2 flex-wrap justify-center max-w-[60vw]">
                {ASSETS.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === currentImg ? 'bg-[#FF1493] w-8' : 'bg-white/30 w-2 hover:bg-white/50'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => scrollGallery('right')}
                className="w-12 h-12 rounded-full border-2 border-[#FF1493] text-[#FF1493] flex items-center justify-center hover:bg-[#FF1493] hover:text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* 4. Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-center overflow-hidden border border-[#FF1493]/30 rounded-lg shadow-[0_0_50px_rgba(255,20,147,0.1)]"
        >
          <div className="absolute inset-0 z-0">
            <Image src={ASSETS.images[0]} alt="Vibe" fill className="object-cover grayscale brightness-[0.15]" sizes="100vw" />
          </div>
          <div className="relative z-10 px-4 space-y-8">
            <h2 className="text-4xl md:text-7xl font-heading text-white tracking-[6px] md:tracking-[12px] uppercase leading-none drop-shadow-[0_0_15px_rgba(255,20,147,0.3)]">
              JOIN THE <span className="text-[#FF1493]">MADNESS</span>
            </h2>
            <Button
              onClick={handleBooking}
              className="bg-[#FF1493] text-white hover:bg-white hover:text-[#FF1493] rounded-none h-14 md:h-16 px-12 md:px-16 font-bold uppercase tracking-[4px] text-sm md:text-base transition-all duration-500 shadow-[0_0_40px_rgba(255,20,147,0.5)] hover:scale-105">
              GET TICKETS
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
