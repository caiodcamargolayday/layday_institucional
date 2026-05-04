"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const DEALS = [
  {
    title: "HAPPY HOUR - CANGGU",
    image: encodeURI("/Lay Day Hostels/happy hour canggu.jpeg"),
    text: "Get your night started right with 2-for-1 cocktails and ice-cold Bintangs from 5 PM to 7 PM every day at our main bar."
  },
  {
    title: "DAILY HAPPY HOUR - ULUWATU",
    image: encodeURI("/Lay Day Hostels/home_section_2.jpeg"),
    text: "Join us by the pool for epic sunset views, half-price drinks, and live DJ sets to get you in the mood for the night."
  },
  {
    title: "EXCLUSIVE BREAKFAST PACKAGE - ULUWATU",
    image: encodeURI("/Lay Day Hostels/exclusive breakfast.jpeg"),
    text: "Book direct and get our legendary surfer's breakfast included for free. Fuel up before you paddle out to the break."
  }
];

export function DealsSection() {
  return (
    <section className="py-12 bg-[#EBE6D8]">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row w-full mb-16 md:mb-20 min-h-[350px]">
          <div className="w-full md:w-1/3 bg-white p-10 flex flex-col justify-center border-l-4 border-y-4 border-[#EBE6D8] md:border-y-0">
            <h2 className="text-3xl font-heading text-[#004A61] tracking-wider mb-4 leading-tight">
              SATURDAYS BY THE POOL - CANGGU
            </h2>
            <p className="text-sm font-bold text-[#004A61] tracking-widest uppercase mb-8">
              EVERY SATURDAY | 1 PM ONWARDS | LAY DAY CANGGU
            </p>
            <button className="bg-[#EE5B2B] text-white px-8 py-3 w-fit font-bold tracking-widest text-sm hover:bg-[#d64e22] transition-colors">
              READ MORE
            </button>
          </div>
          <div className="w-full md:w-2/3 relative min-h-[300px]">
            <Image 
              src={encodeURI("/Lay Day Hostels/home_section_5.jpeg")}
              alt="Saturdays by the pool"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
        </div>

        {/* Deals Grid */}
        <div className="mb-16 md:mb-20">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-heading text-[#004A61] tracking-wide">DEALS</h2>
            <Link href="/deals" className="text-xs font-bold text-[#004A61] hover:text-[#EE5B2B] uppercase tracking-wider transition-colors">
              Show All Deals
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEALS.map((deal, i) => (
              <div key={i} className="flex flex-col bg-white">
                <div className="relative aspect-[4/3] w-full">
                  <Image src={deal.image} alt={deal.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-[#EE5B2B] text-xs font-bold uppercase tracking-widest mb-2">Offer / Promo</p>
                  <h3 className="text-xl font-heading text-[#004A61] tracking-wide mb-4 leading-tight">{deal.title}</h3>
                  <p className="text-[#004A61] text-sm font-medium leading-relaxed mb-6 flex-grow">{deal.text}</p>
                  <Link href="#" className="text-[#EE5B2B] text-xs font-bold uppercase tracking-widest hover:underline">
                    READ MORE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Our Hostels Logos */}
        <div className="pt-12 pb-12 border-t border-[#004A61]/20 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-heading text-[#004A61] tracking-wide mb-12 text-center"
          >
            EXPLORE OUR HOSTELS
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-5xl">
            {[
              { src: "/logo_coday_black.jpeg", alt: "CoDay", link: "/coday-uluwatu" },
              { src: "/logo_layday_canggu.png", alt: "Lay Day Canggu", link: "/layday-canggu" },
              { src: "/logo_layday_gilit.png", alt: "Lay Day Gili T", link: "/layday-gilit" },
              { src: "/logo_layday_uluwatu.png", alt: "Lay Day Uluwatu", link: "/layday-uluwatu" }
            ].map((hostel, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link 
                  href={hostel.link} 
                  className="block relative aspect-square group grayscale hover:grayscale-0 transition-all duration-500"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full h-full"
                  >
                    <Image 
                      src={hostel.src} 
                      alt={hostel.alt} 
                      fill 
                      className="object-contain" 
                      sizes="(max-width: 768px) 50vw, 25vw" 
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
