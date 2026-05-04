"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Tag, Sparkles, Zap, ShieldCheck, Clock, Percent, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEALS = [
  {
    title: "HAPPY HOUR - CANGGU",
    image: "/Lay Day Hostels/happy hour canggu.jpeg",
    text: "Get your night started right with 2-for-1 cocktails and ice-cold Bintangs from 5 PM to 7 PM every day at our main bar. The perfect bridge between surf and party.",
    tag: "DRINKS",
    color: "#EE5B2B"
  },
  {
    title: "DAILY HAPPY HOUR - ULUWATU",
    image: "/Lay Day Hostels/home_section_2.jpeg",
    text: "Join us by the pool for epic sunset views, half-price drinks, and live DJ sets. The best pre-party in Uluwatu starts right here at our cliffside sanctuary.",
    tag: "DRINKS",
    color: "#EE5B2B"
  },
  {
    title: "EXCLUSIVE BREAKFAST",
    image: "/Lay Day Hostels/exclusive breakfast.jpeg",
    text: "Book direct and get our legendary surfer's breakfast included for free. Fuel up with fresh fruit, eggs, and strong coffee before you hit the waves.",
    tag: "BOOK DIRECT",
    color: "#004A61"
  },
  {
    title: "LONG STAY NOMAD",
    image: "/Lay Day Hostels/home_section_3.jpeg",
    text: "Planning to stay for 14+ days? Unlock our special nomad rates with high-speed fiber and coworking access included. The ultimate work-from-paradise deal.",
    tag: "STAY",
    color: "#004A61"
  },
  {
    title: "GROUP SURF CAMP",
    image: "/Lay Day Hostels/home_section_4.jpeg",
    text: "Traveling with a crew? Book 5+ beds and get 15% off plus a free private surf guide for your first session. Group dynamics, amplified.",
    tag: "GROUP",
    color: "#EE5B2B"
  }
];

export default function DealsPage() {
  const [hasMounted, setHasMounted] = useState(false);
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
      
      {/* Editorial Hero */}
      <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center pt-20">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src={encodeURI("/Lay Day Hostels/home_section_5.jpeg")} 
            alt="Deals Hero" 
            fill 
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        
        {/* Dark overlay to fix "too white" issue */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        <div className="relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="font-bold tracking-[6px] uppercase text-xs mb-6 block text-[#EE5B2B]">Exclusive Offers</span>
            <h1 className="text-6xl md:text-[8rem] font-heading tracking-widest leading-none mb-8 text-white">
              DEALS & <span className="text-[#EE5B2B]">PACKAGES</span>
            </h1>
            <p className="max-w-2xl mx-auto font-medium tracking-wide text-lg md:text-xl leading-relaxed text-white/90 mb-12">
              The best way to experience Bali is with a direct booking. Unlock exclusive perks, better rates, and guaranteed legendary vibes.
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

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Why Book Direct - "Press Style" Benefits */}
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-[#004A61]/20 py-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <ShieldCheck className="w-8 h-8 text-[#EE5B2B]" />
              <h3 className="font-heading text-xl tracking-widest">BEST RATE GUARANTEE</h3>
              <p className="text-sm font-medium opacity-70">Found it cheaper elsewhere? We'll match it and throw in a free drink.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 border-y md:border-y-0 md:border-x border-[#004A61]/20 py-10 md:py-0 md:px-12">
              <Clock className="w-8 h-8 text-[#EE5B2B]" />
              <h3 className="font-heading text-xl tracking-widest">FLEXIBLE CANCELLATION</h3>
              <p className="text-sm font-medium opacity-70">Plans change. We get it. Enjoy more flexible terms when you book directly with us.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <Percent className="w-8 h-8 text-[#EE5B2B]" />
              <h3 className="font-heading text-xl tracking-widest">EXCLUSIVE PERKS</h3>
              <p className="text-sm font-medium opacity-70">Free breakfast, late checkouts, and priority surf trip bookings.</p>
            </div>
          </div>
        </section>

        {/* Deals Grid - "Press Gallery" Inspiration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {DEALS.map((deal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex flex-col space-y-6 group"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#004A61]">
                <Image 
                  src={encodeURI(deal.image)} 
                  alt={deal.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 text-[#004A61] font-bold text-[9px] uppercase tracking-widest shadow-lg">
                  {deal.tag}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-heading tracking-widest leading-tight group-hover:text-[#EE5B2B] transition-colors">
                  {deal.title}
                </h3>
                <p className="text-base leading-relaxed font-medium opacity-80">
                  {deal.text}
                </p>
                <div className="pt-2">
                  <Button className="bg-[#004A61] text-white hover:bg-[#EE5B2B] rounded-none h-10 px-8 font-bold uppercase tracking-widest text-[10px] transition-all duration-300">
                    CLAIM OFFER
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter / CTA */}
        <section className="mt-10 bg-[#004A61] text-white p-6 md:p-10 text-center border-4 border-white/10">
          <div className="relative w-24 h-12 mx-auto mb-8 opacity-90 invert brightness-0">
            <Image 
              src="/logo-layday.png" 
              alt="Lay Day Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading tracking-[4px] md:tracking-[8px] uppercase mb-6">
            STAY IN THE <span className="text-[#EE5B2B]">KNOW</span>
          </h2>
          <p className="max-w-lg mx-auto text-base md:text-lg font-medium opacity-80 mb-10">
            Our best deals never hit the public sites. Join our inner circle for flash sales and secret packages.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="bg-transparent border border-white/30 px-5 py-3 font-bold tracking-widest text-[10px] uppercase focus:outline-none focus:border-[#EE5B2B] transition-colors flex-grow"
            />
            <Button className="bg-[#EE5B2B] text-white hover:bg-white hover:text-[#004A61] rounded-none h-auto px-8 font-bold uppercase tracking-widest text-[10px] transition-all duration-300 py-3">
              SUBSCRIBE
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
}
