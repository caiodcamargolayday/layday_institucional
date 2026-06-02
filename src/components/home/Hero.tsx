"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const BACKGROUNDS = [
  { src: "/lay_day_home/home_section.png", alt: "Lay Day Hero 1" },
  { src: "/lay_day_home/home_section_2.jpeg", alt: "Lay Day Hero 2" },
  { src: "/lay_day_home/home_section_3.jpeg", alt: "Lay Day Hero 3" },
  { src: "/lay_day_home/home_section_4.jpeg", alt: "Lay Day Hero 4" },
  { src: "/lay_day_home/home_section_5.jpeg", alt: "Lay Day Hero 5" }
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[100vh] flex flex-col justify-center overflow-hidden pt-20 bg-[#004A61]">
      {/* Background Images Carousel */}
      <AnimatePresence>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={encodeURI(BACKGROUNDS[currentImageIndex].src)}
            alt={BACKGROUNDS[currentImageIndex].alt}
            fill
            priority={currentImageIndex === 0}
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 mt-16">
        <h1 className="text-5xl md:text-[5rem] leading-none text-white tracking-wider font-heading drop-shadow-md max-w-4xl">
          AWARD-WINNING PARTY AND SURF HOSTELS IN INDONESIA
        </h1>

        <div className="mt-12 w-full max-w-2xl flex flex-col items-center">


          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="opacity-60"
          >
            <ChevronDown className="w-8 h-8 text-white" strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
