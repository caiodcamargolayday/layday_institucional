"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar, Music, Sparkles, Zap, Trophy, ChevronDown } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

const HERO_IMAGE = "/experiences/saturdays by the pool.jpg";

const EXPERIENCES_DATA = [
  {
    title: "SATURDAY POOL PARTIES",
    location: "Canggu & Uluwatu",
    image: "/experiences/saturdays by the pool.jpg",
    description: "The biggest pool parties in Bali. We bring the DJs, the floaties, and the electric energy. It's not just a party; it's the legendary Saturday ritual where the whole tribe comes together.",
    icon: Music,
    tag: "Weekly Event"
  },
  {
    title: "GOLDEN HOUR RITUALS",
    location: "All Locations",
    images: [
      "/experiences/golden hour 1.jpg",
      "/experiences/golden hour 2.jpg",
      "/experiences/golden hour 3.jpg",
      "/experiences/golden hour 4.jpg",
      "/experiences/golden hour 5.jpg"
    ],
    description: "2-for-1 cocktails and ice-cold Bintangs as the sun dips below the horizon. The perfect bridge between a day of surf and a night of legendary Canggu vibes.",
    icon: Sparkles,
    tag: "Daily ritual",
    isCarousel: true
  },
  {
    title: "SURF & ADVENTURE",
    location: "Bali Coastline",
    image: "/Lay Day Hostels/home_section.png",
    description: "From dawn patrol sessions at Echo Beach to secret reef breaks in Uluwatu. We organize daily surf trips for all levels, led by local legends who know every peak.",
    icon: Zap,
    tag: "Daily Trip"
  },
  {
    title: "COMMUNITY EVENTS",
    location: "The Common Room",
    image: "/experiences/snapinsta.com.br-69f7b8b060982.jpg",
    description: "BBQ nights, beer pong tournaments, and live acoustic sessions. Our spaces are designed to turn strangers into a global family within minutes.",
    icon: Trophy,
    tag: "Social"
  }
];

export default function ExperiencesPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [goldenHourIndex, setGoldenHourIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  if (!hasMounted) return <div className="min-h-screen bg-[#EBE7E0]" />;

  return (
    <div ref={containerRef} className="bg-[#EBE7E0] text-[#004A61] font-sans selection:bg-[#EE5B2B] selection:text-white">
      
      {/* Cinematic Parallax Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src={encodeURI(HERO_IMAGE)} 
            alt="Experiences Hero" 
            fill 
            priority
            className="object-cover scale-105 brightness-90 saturate-[0.9]"
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
            <span className="text-white font-bold tracking-[6px] uppercase text-xs mb-6 block">Party • Surf • Community</span>
            <h1 className="text-5xl md:text-[7rem] font-heading text-white tracking-widest leading-none mb-6 drop-shadow-2xl">
              EXPERIENCES
            </h1>
            <p className="max-w-xl mx-auto text-white/90 font-medium tracking-wide text-base md:text-lg leading-relaxed mb-12">
              More than just a stay. It's a high-vibration lifestyle designed for those who work hard and play harder.
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="opacity-60 flex justify-center"
            >
              <ChevronDown className="w-8 h-8 text-white" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        
        {/* Intro Section */}
        <div className="flex flex-col items-center mb-8 md:mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-1 bg-[#EE5B2B] mb-8"
          />
          <h2 className="text-3xl md:text-5xl font-heading tracking-widest leading-tight mb-8 max-w-3xl">
            FOR THE <span className="text-[#EE5B2B]">WILD AT HEART</span> & THE HIGH PERFORMERS
          </h2>
          <p className="max-w-xl mx-auto text-base md:text-lg font-medium opacity-80 leading-relaxed uppercase tracking-wide">
            Peak productivity meets peak enjoyment. Every experience is designed to connect you with the tribe.
          </p>
        </div>

        {/* Experiences Grid - Alternating Editorial Style */}
        <div className="space-y-12 md:space-y-16">
          {EXPERIENCES_DATA.map((exp, i) => (
            <div key={i} className={`grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`lg:col-span-7 relative aspect-[4/3] group ${i % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className={`absolute -inset-3 border border-[#004A61] -z-10 translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1 group-hover:translate-y-1`} />
                <div className="relative h-full w-full overflow-hidden border border-[#004A61]">
                  {exp.isCarousel ? (
                    <div className="relative h-full w-full">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={goldenHourIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0"
                        >
                          <Image 
                            src={encodeURI(exp.images?.[goldenHourIndex] ?? "")} 
                            alt={`${exp.title} ${goldenHourIndex + 1}`} 
                            fill 
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                          />
                        </motion.div>
                      </AnimatePresence>
                      {/* Carousel Controls */}
                      <div className="absolute bottom-4 right-4 flex gap-2 z-30">
                        {exp.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setGoldenHourIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${goldenHourIndex === idx ? 'bg-[#EE5B2B] w-6' : 'bg-white/50 hover:bg-white'}`}
                          />
                        ))}
                      </div>
                      <button 
                        onClick={() => setGoldenHourIndex(prev => (prev - 1 + exp.images.length) % exp.images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#EE5B2B] transition-colors z-30"
                      >
                        ←
                      </button>
                      <button 
                        onClick={() => setGoldenHourIndex(prev => (prev + 1) % exp.images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#EE5B2B] transition-colors z-30"
                      >
                        →
                      </button>
                    </div>
                  ) : (
                    <Image 
                      src={encodeURI(exp.image ?? "")} 
                      alt={exp.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[#EE5B2B] font-bold text-[9px] uppercase tracking-widest shadow-sm">
                    {exp.tag}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`lg:col-span-5 space-y-4 md:space-y-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <exp.icon className="w-8 h-8 text-[#EE5B2B]" />
                <p className="text-[10px] font-bold tracking-[3px] uppercase opacity-70 flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </p>
                <h3 className="text-3xl md:text-4xl font-heading tracking-widest leading-tight">
                  {exp.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed font-medium opacity-90">
                  {exp.description}
                </p>
                <div className="pt-4">
                  <button className="border-b border-[#EE5B2B] pb-1 font-bold tracking-widest text-[10px] uppercase hover:text-[#EE5B2B] transition-colors">
                    Explore Experience
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
