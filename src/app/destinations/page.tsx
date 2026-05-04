"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const DESTINATIONS = [
  {
    id: 1,
    name: "LAY DAY CANGGU",
    image: encodeURI("/lay_day_home/lay day canggu.jpeg"),
    link: "/hotel/view/1/lay-day-canggu"
  },
  {
    id: 17,
    name: "LAY DAY ULUWATU",
    image: encodeURI("/lay_day_home/lay day uluwatu.jpeg"),
    link: "/hotel/view/17/lay-day-uluwatu"
  },
  {
    id: 18,
    name: "LAY DAY GILI TRAWANGAN",
    image: encodeURI("/lay_day_home/lay day gili t.jpeg"),
    link: "/hotel/view/18/lay-day-gili-t"
  },
  {
    id: 20,
    name: "CODAY ULUWATU",
    image: encodeURI("/lay_day_home/coday uluwatu.jpeg"),
    link: "/coday-uluwatu"
  }
];

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-[#EBE7E0] pt-[80px]">
      
      {/* Interactive Map Hero */}
      <section className="w-full h-[500px] bg-gray-200 relative overflow-hidden">
        {/* Using a high-quality Google Maps Embed for the initial layout */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d413344.372565187!2d115.34685121285093!3d-8.629235773245084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1709490000000!5m2!1sen!2sid" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(10%) contrast(90%)' }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-[20%]"
        ></iframe>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-heading text-[#004A61] tracking-widest mb-4">OUR DESTINATIONS</h1>
          </motion.div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.map((dest, index) => (
              <motion.div 
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={dest.link} className="group relative block aspect-[4/3] w-full overflow-hidden border-2 border-[#004A61] bg-gray-100">
                  <Image 
                    src={dest.image}
                    alt={dest.name}
                    fill
                    priority={index === 0}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Gradient Overlay for Title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-100 transition-opacity" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl md:text-4xl font-heading text-white tracking-widest drop-shadow-lg uppercase">
                      {dest.name}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
