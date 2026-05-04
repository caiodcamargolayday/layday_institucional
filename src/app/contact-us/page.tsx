"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const CONTACT_INFO = [
  {
    location: "LAY DAY CANGGU",
    email: "hello@staylayday.com",
    whatsapp: "+62 812 3456 7890",
    address: "Jl. Batu Mejan No.4, Canggu, Bali"
  },
  {
    location: "LAY DAY ULUWATU",
    email: "uluwatu@staylayday.com",
    whatsapp: "+62 812 3456 7891",
    address: "Jl. Labuan Sait No.10, Uluwatu, Bali"
  },
  {
    location: "LAY DAY GILI T",
    email: "gilit@staylayday.com",
    whatsapp: "+62 812 3456 7892",
    address: "Gili Trawangan, Lombok"
  }
];

export default function ContactUsPage() {
  return (
    <div className="bg-[#EBE7E0] text-[#004A61] font-sans selection:bg-[#EE5B2B] selection:text-white min-h-screen">
      
      {/* High-Contrast Header Section */}
      <section className="bg-[#004A61] pt-32 pb-16 md:pt-40 md:pb-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <span className="font-bold tracking-[4px] md:tracking-[6px] uppercase text-[10px] mb-4 block text-[#EE5B2B]">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-heading tracking-widest leading-none mb-6 text-white">
            CONTACT US
          </h1>
          <div className="w-10 h-[2px] bg-white/20 mx-auto mt-6" />
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="space-y-6 md:space-y-8">
              <div className="space-y-4 md:space-y-6">
                <div className="relative border-b border-[#004A61]/10 focus-within:border-[#EE5B2B] transition-colors">
                  <label className="text-[9px] font-bold tracking-widest uppercase opacity-60">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent py-1.5 text-base outline-none placeholder:text-[#004A61]/10"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="relative border-b border-[#004A61]/10 focus-within:border-[#EE5B2B] transition-colors">
                  <label className="text-[9px] font-bold tracking-widest uppercase opacity-60">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent py-1.5 text-base outline-none placeholder:text-[#004A61]/10"
                    placeholder="hello@example.com"
                  />
                </div>
                <div className="relative border-b border-[#004A61]/10 focus-within:border-[#EE5B2B] transition-colors">
                  <label className="text-[9px] font-bold tracking-widest uppercase opacity-60">Message</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-transparent py-1.5 text-base outline-none placeholder:text-[#004A61]/10 resize-none"
                    placeholder="How can we help?"
                  />
                </div>
              </div>
              <Button className="w-full bg-[#004A61] text-white hover:bg-[#EE5B2B] rounded-none h-12 font-bold uppercase tracking-[2px] text-[10px] transition-all duration-300 group">
                SEND MESSAGE <Send className="w-3 h-3 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8 md:space-y-12"
          >
            {CONTACT_INFO.map((info, i) => (
              <div key={i} className="space-y-3">
                <h3 className="font-heading text-xl md:text-2xl tracking-widest text-[#EE5B2B]">{info.location}</h3>
                <div className="space-y-1.5 text-xs font-medium opacity-80 uppercase tracking-wider">
                  <div className="flex items-center gap-3">
                    <Mail className="w-3.5 h-3.5 text-[#004A61]/30" />
                    <a href={`mailto:${info.email}`} className="hover:text-[#EE5B2B] transition-colors">{info.email}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-3.5 h-3.5 text-[#004A61]/30" />
                    <a href={`https://wa.me/${info.whatsapp.replace(/\D/g, '')}`} className="hover:text-[#EE5B2B] transition-colors">{info.whatsapp}</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-3.5 h-3.5 text-[#004A61]/30 mt-0.5" />
                    <span className="leading-relaxed">{info.address}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-6 border-t border-[#004A61]/10 flex gap-4">
              <a href="#" className="w-9 h-9 border border-[#004A61]/10 flex items-center justify-center hover:bg-[#004A61] hover:text-white transition-all">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 border border-[#004A61]/10 flex items-center justify-center hover:bg-[#004A61] hover:text-white transition-all">
                <FaFacebookF className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
