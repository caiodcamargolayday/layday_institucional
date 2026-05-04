"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HOSTELS = [
  {
    id: 1,
    name: "Lay Day Canggu",
    location: "Canggu, Indonesia",
    image: encodeURI("/Lay Day Hostels/lay day canggu.jpeg"),
    link: "/layday-canggu"
  },
  {
    id: 17,
    name: "Lay Day Uluwatu",
    location: "Uluwatu, Indonesia",
    image: encodeURI("/Lay Day Hostels/lay day uluwatu.jpeg"),
    link: "/layday-uluwatu"
  },
  {
    id: 18,
    name: "Lay Day Gili T",
    location: "Gili Trawangan, Indonesia",
    image: encodeURI("/Lay Day Hostels/lay day gili t.jpeg"),
    link: "/layday-gilit"
  }
];

export function HostelList() {
  return (
    <section className="py-10 md:py-16 bg-[#EBE6D8]">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Intro Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <p className="text-lg md:text-xl font-bold text-[#004A61] uppercase tracking-widest leading-relaxed font-sans">
            LAY DAY EMBODIES THE PERFECT TRIFECTA OF PARTY, SURF, AND RELAXATION THAT YOU'D EXPECT IN ANY BUZZING SURFER'S HAVEN. WE INVITE OUR GUESTS TO DIVE HEADFIRST INTO THIS WAY OF LIFE AT ALL OF OUR STRATEGIC LOCATIONS IN PRIME SURFER BEACH TOWNS
          </p>
        </motion.div>

        {/* PARTY, SURF, AND RELAXATION Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row gap-12 items-center mb-16 md:mb-20"
        >
          <div className="w-full md:w-1/3 relative">
            <div className="absolute top-4 left-4 w-full h-full border-2 border-[#EE5B2B] z-0" />
            <div className="relative z-10 aspect-[3/4] w-full">
              <Image 
                src={encodeURI("/Lay Day Hostels/party,surf and relaxation.jpeg")}
                alt="Party Surf Relaxation"
                fill
                className="object-cover border-2 border-[#004A61]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-4xl font-heading text-[#004A61] mb-6 tracking-wide">PARTY, SURF, AND RELAXATION</h2>
            <p className="text-[#004A61] text-sm md:text-base leading-relaxed font-medium mb-4">
              Lay Day Hostels is at the forefront of the hostel scene in Indonesia, bringing the ultimate mix of fun, surf, and relaxation straight to our guests' fingertips. With 4 established spots in prime locations—and more on the horizon—we're all about creating unforgettable memories.
            </p>
            <p className="text-[#004A61] text-sm md:text-base leading-relaxed font-medium">
              We've created a space where you can kick back, hit the waves, and party till dawn with a crew of legends from all corners of the globe. Whether you want to catch a wave, sip a Bintang by the pool, or dance until sunrise, Lay Day Hostels is the place to do it all!
            </p>
          </div>
        </motion.div>

        {/* Featured Hostels */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-heading text-[#004A61] tracking-wide">FEATURED HOSTELS</h2>
            <Link href="/destinations" className="text-xs font-bold text-[#004A61] hover:text-[#EE5B2B] uppercase tracking-wider transition-colors">
              Show All Hostels
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOSTELS.map((hostel) => (
              <Link href={hostel.link} key={hostel.id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-[#004A61]">
                  <Image
                    src={hostel.image}
                    alt={hostel.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl font-heading text-white tracking-wide leading-tight">{hostel.name}</h3>
                      <p className="text-[10px] text-white/90 font-bold tracking-widest uppercase">{hostel.location}</p>
                    </div>
                    <div className="bg-[#EE5B2B] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 group-hover:bg-white group-hover:text-[#004A61]">
                      Explore
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Boutique Hotel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-heading text-[#004A61] tracking-wide mb-6">FEATURED BOUTIQUE HOTEL</h2>
          <div className="w-full md:w-[32%]">
            <Link href="/coday-uluwatu" className="group cursor-pointer">
              <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-[#004A61]">
                <Image
                  src={encodeURI("/Lay Day Hostels/coday uluwatu.jpeg")}
                  alt="CoDay Uluwatu"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-0 right-0 bg-white px-4 py-1 text-[#EE5B2B] font-bold text-xs uppercase tracking-wider translate-x-4 translate-y-4 rotate-45 transform origin-bottom-right">
                  Coming Soon
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-heading text-white tracking-wide leading-tight">CoDay Uluwatu</h3>
                    <p className="text-[10px] text-white/90 font-bold tracking-widest uppercase">Uluwatu, Indonesia</p>
                  </div>
                  <div className="bg-[#EE5B2B] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 group-hover:bg-white group-hover:text-[#004A61]">
                    Explore
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
