"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Users, Star, Zap, Coffee, Globe, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const POSITIONS = [
  {
    title: "BARTENDER",
    location: "LAY DAY CANGGU",
    type: "FULL-TIME",
    description: "Looking for high-energy legends who can handle the busiest bar in Canggu while maintaining legendary vibes."
  },
  {
    title: "SURF INSTRUCTOR",
    location: "LAY DAY ULUWATU",
    type: "FULL-TIME",
    description: "Certified instructors with deep knowledge of Bukit reef breaks. Must be able to lead group sessions with passion."
  },
  {
    title: "RECEPTION & HOST",
    location: "LAY DAY GILI T",
    type: "FULL-TIME",
    description: "The face of our Gili T sanctuary. Must be a social catalyst who loves connecting people from all over the world."
  },
  {
    title: "HOSPITALITY MANAGER",
    location: "GROUP OPERATIONS",
    type: "FULL-TIME",
    description: "Experienced manager to oversee quality and community standards across all our Indonesian locations."
  }
];

const VALUES = [
  { icon: Heart, title: "COMMUNITY FIRST", text: "We don't just sell beds; we build tribes. Every staff member is a social catalyst." },
  { icon: Zap, title: "HIGH PERFORMANCE", text: "We work hard and play harder. We expect excellence in every shift." },
  { icon: Globe, title: "GLOBAL FAMILY", text: "Our team comes from all over the world, bringing diverse energy to the coast." }
];

export default function CareersPage() {
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
      
      {/* Cinematic Parallax Hero */}
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src={encodeURI("/Lay Day Hostels/careers_hero.jpeg")} 
            alt="Careers Hero" 
            fill 
            priority
            className="object-cover scale-105 brightness-90 saturate-[0.8]"
            sizes="100vw"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-white font-bold tracking-[4px] md:tracking-[6px] uppercase text-[10px] mb-4 block">Join the Tribe</span>
            <h1 className="text-5xl md:text-[6.5rem] font-heading text-white tracking-widest leading-none mb-6 drop-shadow-2xl">
              CAREERS
            </h1>
            <p className="max-w-xl mx-auto text-white/90 font-medium tracking-wide text-sm md:text-base leading-relaxed mb-10">
              We're looking for legends, social catalysts, and high-performers to join our global family in Indonesia.
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

      <div className="max-w-5xl mx-auto px-4 py-4 md:py-6">
        
        {/* Intro Section */}
        <div className="flex flex-col items-center mb-6 md:mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-[2px] bg-[#EE5B2B] mb-8"
          />
          <h2 className="text-3xl md:text-5xl font-heading tracking-widest leading-tight mb-8 max-w-3xl">
            WORK IN <span className="text-[#EE5B2B]">PARADISE</span>
          </h2>
          <p className="max-w-xl mx-auto text-xs md:text-sm font-bold opacity-80 leading-relaxed uppercase tracking-[3px]">
            Lay Day isn't just a hostel—it's a lifestyle movement. We've built a culture where passion for hospitality, surf, and community thrives.
          </p>
        </div>

        {/* Why Join Section */}
        <section className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {VALUES.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-12 h-12 border border-[#004A61] flex items-center justify-center text-[#EE5B2B]">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl tracking-widest">{value.title}</h3>
                <p className="text-[10px] font-bold opacity-70 leading-relaxed uppercase tracking-wider">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Open Positions - High End List */}
        <section className="mb-6 md:mb-10">
          <h2 className="text-xl font-heading tracking-widest mb-6 border-b border-[#004A61]/10 pb-4">OPEN POSITIONS</h2>
          <div className="space-y-0">
            {POSITIONS.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group border-b border-[#004A61]/10 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white transition-all duration-500 px-4 -mx-4 cursor-pointer"
              >
                <div className="space-y-1">
                  <p className="text-[#EE5B2B] text-[10px] font-bold tracking-[2px] uppercase">{job.location}</p>
                  <h4 className="text-2xl font-heading tracking-widest group-hover:translate-x-1 transition-transform duration-500">{job.title}</h4>
                </div>
                <div className="max-w-xs md:text-right">
                  <p className="text-[11px] font-medium opacity-70 mb-3 leading-relaxed">{job.description}</p>
                  <div className="flex items-center md:justify-end gap-3">
                    <span className="text-[9px] font-bold border border-[#004A61]/20 px-2 py-0.5 rounded-full uppercase tracking-widest">{job.type}</span>
                    <button className="text-[9px] font-bold text-[#EE5B2B] uppercase tracking-[1px] hover:underline">Apply Now →</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Talent Pool CTA */}
        <section className="bg-white border border-[#004A61]/20 p-10 md:p-16 text-center">
          <Star className="w-10 h-10 text-[#EE5B2B] mx-auto mb-6" />
          <h2 className="text-2xl md:text-4xl font-heading tracking-[3px] md:tracking-[6px] uppercase mb-6">
            GENERAL <span className="text-[#EE5B2B]">APPLICATIONS</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base font-medium opacity-80 mb-10">
            Don't see a role that fits? Join our talent pool. We're always looking for legends to join the tribe.
          </p>
          <Button className="bg-[#004A61] text-white hover:bg-[#EE5B2B] rounded-none h-12 px-10 font-bold uppercase tracking-[2px] text-xs transition-all duration-300">
            SEND YOUR CV
          </Button>
        </section>

      </div>
    </div>
  );
}
