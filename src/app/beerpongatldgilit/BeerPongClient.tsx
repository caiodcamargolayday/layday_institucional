"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Trophy, 
  Users, 
  Clock, 
  Wine, 
  Disc3, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  X
} from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";

// ─── Contact & WhatsApp Link ──────────────────────────────────────────────────
const WA_RAW_NUMBER = "+62 895-1763-7461";
const WA_PHONE = "6289517637461";

function buildWALink() {
  const msg = encodeURIComponent(
    `Hey Lay Day Gili T! 🏆🍻\n\nI want to register our team for the INTERNATIONAL BEERPONG CHAMPIONSHIP (5M Cash Prize) this Sunday!\n\nPlease lock in our spot. 🔥`
  );
  return `https://wa.me/${WA_PHONE}?text=${msg}`;
}

// ─── Assets ──────────────────────────────────────────────────────────────────
const ASSETS = {
  logo: "/logo_layday_gilit.png",
  poster: "/beerpong_ldgilit/LDBC-Beerpong Tournament-IGF (1).png",
  actionCelebrate: "/beerpong_ldgilit/IGF.png",
  actionAim: "/beerpong_ldgilit/IGF 2.png",
  actionThrow: "/beerpong_ldgilit/IGF 3.png",
};

const GALLERY_PHOTOS = [
  {
    src: ASSETS.actionAim,
    alt: "Beerpong player aiming at table",
  },
  {
    src: ASSETS.actionThrow,
    alt: "Beerpong match action with crowd",
  },
  {
    src: ASSETS.actionCelebrate,
    alt: "Beerpong winner celebration",
  },
];

export function BeerPongClient() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRegisterWhatsApp = () => {
    window.open(buildWALink(), "_blank");
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#091A22] text-[#FAF1D6] font-sans selection:bg-[#E13838] selection:text-white relative overflow-x-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="fixed top-0 left-1/4 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-[#1E5B70]/30 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-1/4 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-[#E13838]/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-72 sm:w-[550px] h-72 sm:h-[550px] bg-[#F7C948]/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Clean Logo Header */}
        <div className="flex justify-center md:justify-start mb-6 sm:mb-8">
          <div className="relative w-40 sm:w-48 md:w-52 h-11 sm:h-13 md:h-14">
            <Image
              src={ASSETS.logo}
              alt="Lay Day Gili T"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 bg-[#174453] border border-[#F7C948]/40 px-3.5 py-1.5 rounded-full mb-4 sm:mb-5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F7C948]" />
              <span className="font-heading text-xs sm:text-sm tracking-[2px] uppercase text-[#F7C948]">
                Every Sunday at Lay Day Beach Club
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-white uppercase leading-[0.95] mb-4">
              5M CASH PRIZE. <br />
              <span className="text-[#F7C948] drop-shadow-[0_0_25px_rgba(247,201,72,0.4)]">
                ONE CHAMPION. 🏆🍻
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl md:text-2xl font-sans font-medium text-[#FAF1D6]/90 leading-relaxed max-w-2xl mb-6 sm:mb-8">
              The <strong className="text-white font-bold">INTERNATIONAL BEERPONG CHAMPIONSHIP</strong> is here, every Sunday at <strong className="text-[#F7C948]">Lay Day Beach Club</strong>.
            </p>

            {/* Quick Specs Pill Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-xl mb-6">
              <div className="bg-[#123340]/90 border border-white/10 rounded-xl p-3 sm:p-3.5 flex flex-col items-center md:items-start">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Grand Prize</span>
                <span className="font-heading text-xl sm:text-2xl text-[#F7C948] tracking-wide">5M CASH 💰</span>
              </div>
              <div className="bg-[#123340]/90 border border-white/10 rounded-xl p-3 sm:p-3.5 flex flex-col items-center md:items-start">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Team Fee</span>
                <span className="font-heading text-xl sm:text-2xl text-white tracking-wide">150K / TEAM 👥</span>
              </div>
              <div className="bg-[#123340]/90 border border-white/10 rounded-xl p-3 sm:p-3.5 flex flex-col items-center md:items-start col-span-2 sm:col-span-1">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Kickoff Time</span>
                <span className="font-heading text-xl sm:text-2xl text-[#E13838] tracking-wide">STARTS 8PM ⏰</span>
              </div>
            </div>

            {/* DJ & Happy Hour Banner */}
            <div className="w-full max-w-xl bg-gradient-to-r from-[#1E5B70]/80 via-[#16495A]/80 to-[#123340]/80 border-l-4 border-[#F7C948] p-3.5 sm:p-4 rounded-r-xl mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F7C948]/20 flex items-center justify-center text-[#F7C948] shrink-0">
                  <Disc3 className="w-5 h-5 animate-spin text-[#F7C948]" style={{ animationDuration: "6s" }} />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-slate-300 uppercase font-bold tracking-wider">Live DJ Sets</div>
                  <div className="font-heading text-base sm:text-lg text-white tracking-wide">Arman & Sabil</div>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:border-l sm:border-white/20 sm:pl-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E13838]/20 flex items-center justify-center text-[#E13838] shrink-0">
                  <Wine className="w-5 h-5 text-[#E13838]" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-slate-300 uppercase font-bold tracking-wider">Happy Hour</div>
                  <div className="font-heading text-base sm:text-lg text-[#F7C948] tracking-wide">10PM – 12AM</div>
                </div>
              </div>
            </div>

            {/* 🎯 BUTTON 1 (HERO CTA) */}
            <div className="w-full max-w-xl">
              <Button
                onClick={handleRegisterWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-black font-extrabold uppercase tracking-[2px] sm:tracking-[3px] text-sm sm:text-base h-14 sm:h-16 rounded-xl shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.7)] flex items-center justify-center gap-2.5 sm:gap-3 transition-all cursor-pointer"
              >
                <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" />
                <span>REGISTER ON WHATSAPP</span>
              </Button>
            </div>

            <p className="text-xs text-slate-400 mt-3 sm:mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span>🔥 Grab your friends and make your mark on GiliT!</span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="text-slate-300">{WA_RAW_NUMBER}</span>
            </p>
          </motion.div>

          {/* Right Hero Poster (Clean - No overlays) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div
              className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden border-[4px] sm:border-[6px] border-[#F7C948] shadow-[0_0_40px_rgba(247,201,72,0.25)] cursor-pointer group"
              onClick={() => setSelectedImage(ASSETS.poster)}
            >
              <Image
                src={ASSETS.poster}
                alt="International Beerpong Championship Official Flyer"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                sizes="(max-width: 768px) 90vw, 400px"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 2. TOURNAMENT HIGHLIGHTS GRID ── */}
      <section className="py-12 sm:py-16 bg-[#06141B] border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-[3px] text-[#F7C948] mb-1.5 block">
              Tournament Breakdown
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white">
              EVERYTHING YOU NEED TO KNOW
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#0E2833] border border-white/10 p-5 sm:p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#F7C948]/10 text-[#F7C948] flex items-center justify-center mb-3.5">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F7C948] mb-1">Grand Champion</div>
              <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide mb-1.5">5M CASH PRIZE</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                5,000,000 IDR in real cash awarded directly to the champions right when the final cup goes down.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0E2833] border border-white/10 p-5 sm:p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#E13838]/10 text-[#E13838] flex items-center justify-center mb-3.5">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#E13838] mb-1">Affordable Entry</div>
              <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide mb-1.5">150K / TEAM OF 2</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Team up with your best shot. Just 150K per duo gives you entry to the tournament bracket and game beers.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0E2833] border border-white/10 p-5 sm:p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-3.5">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#25D366] mb-1">Kickoff Time</div>
              <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide mb-1.5">STARTS 8:00 PM</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every Sunday night! Arrive around 7:30 PM for warm-up practice, bracket seeding, and team pairings.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#0E2833] border border-white/10 p-5 sm:p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#F7C948]/10 text-[#F7C948] flex items-center justify-center mb-3.5">
                <Disc3 className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F7C948] mb-1">Island Beats</div>
              <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide mb-1.5">DJ ARMAN & SABIL</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                High-energy soundtrack from start to finish. DJ Arman & Sabil keep the tables electric all night.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-[#0E2833] border border-white/10 p-5 sm:p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#E13838]/10 text-[#E13838] flex items-center justify-center mb-3.5">
                <Wine className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#E13838] mb-1">Drink Specials</div>
              <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide mb-1.5">HAPPY HOUR 10PM–12AM</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Special party prices on cocktails, beers, and shooters during the crucial knockout rounds!
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-[#0E2833] border border-white/10 p-5 sm:p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#F7C948]/10 text-[#F7C948] flex items-center justify-center mb-3.5">
                <Flame className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F7C948] mb-1">Island Legend</div>
              <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide mb-1.5">ONE CHAMPION</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Grab your friends, step up to the table, and make your mark on Gili T.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. CLEAN PHOTO GALLERY ── */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {GALLERY_PHOTOS.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(img.src)}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/10 hover:border-[#F7C948] shadow-xl group cursor-pointer bg-[#0D2631]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. SUNDAY TIMELINE & HOUSE RULES ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Sunday Night Schedule */}
          <div className="lg:col-span-6 bg-[#0E2833] border border-white/10 rounded-2xl p-5 sm:p-7">
            <div className="flex items-center gap-2 text-[#F7C948] font-bold text-xs uppercase tracking-[2px] mb-3">
              <Calendar className="w-4 h-4" />
              <span>Sunday Running Order</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-4xl uppercase tracking-wider text-white mb-5">
              EVENT SCHEDULE
            </h3>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3 border-l-2 border-[#F7C948] pl-3.5">
                <span className="font-heading text-lg text-[#F7C948] shrink-0 w-20">07:30 PM</span>
                <div>
                  <h4 className="font-bold text-white">Check-in & Table Practice</h4>
                  <p className="text-xs text-slate-300">Team pairings, warm-up throws, and bracket seeds.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-l-2 border-[#E13838] pl-3.5">
                <span className="font-heading text-lg text-[#E13838] shrink-0 w-20">08:00 PM</span>
                <div>
                  <h4 className="font-bold text-white">Tournament Kickoff ⏰</h4>
                  <p className="text-xs text-slate-300">First round knockout clashes begin across all tables.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-l-2 border-[#25D366] pl-3.5">
                <span className="font-heading text-lg text-[#25D366] shrink-0 w-20">10:00 PM</span>
                <div>
                  <h4 className="font-bold text-white">Happy Hour & DJ Sets 🍹🎧</h4>
                  <p className="text-xs text-slate-300">Drink specials (10PM–12AM) as DJ Arman & Sabil turn up the hype.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-l-2 border-[#F7C948] pl-3.5 bg-[#F7C948]/10 py-1.5 rounded-r-lg">
                <span className="font-heading text-lg text-[#F7C948] shrink-0 w-20">11:30 PM</span>
                <div>
                  <h4 className="font-bold text-white">The Grand Final & 5M Cash Ceremony 💰</h4>
                  <p className="text-xs text-slate-300">Final match for 5,000,000 IDR and champion bragging rights!</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-l-2 border-white/30 pl-3.5">
                <span className="font-heading text-lg text-slate-300 shrink-0 w-20">12:00 AM+</span>
                <div>
                  <h4 className="font-bold text-white">Lay Day Afterparty 🔥</h4>
                  <p className="text-xs text-slate-300">Keep the party rolling late into the Gili night.</p>
                </div>
              </div>
            </div>
          </div>

          {/* House Rules & Fair Play */}
          <div className="lg:col-span-6 bg-[#0E2833] border border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#E13838] font-bold text-xs uppercase tracking-[2px] mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Table Rules</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-4xl uppercase tracking-wider text-white mb-5">
                RULES OF THE GAME
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-3 bg-[#081B23] p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#F7C948] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-heading text-sm tracking-wide uppercase">Standard 6 / 10 Cup Pyramid</strong>
                    <span className="text-xs text-slate-300">Classic rack setup with water rinse cups.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#081B23] p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#F7C948] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-heading text-sm tracking-wide uppercase">2 Shots Per Turn</strong>
                    <span className="text-xs text-slate-300">Both teammates throw each round. Double hits roll back!</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#081B23] p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#F7C948] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-heading text-sm tracking-wide uppercase">Elbows Behind Table Line</strong>
                    <span className="text-xs text-slate-300">Keep elbows behind the back edge during the throw.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#081B23] p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#F7C948] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-heading text-sm tracking-wide uppercase">Redemption Round</strong>
                    <span className="text-xs text-slate-300">Trailing team receives one final chance to force overtime.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. FINAL CTA & WHATSAPP CONFIRMATION (BUTTON 2) ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden text-center bg-gradient-to-b from-[#091A22] via-[#0D2631] to-[#06141B] border-t border-white/10">
        <div className="relative z-10 max-w-3xl mx-auto space-y-5 sm:space-y-6">
          <span className="inline-block bg-[#E13838] text-white font-heading text-xs sm:text-sm tracking-[3px] uppercase px-3.5 py-1 rounded-full shadow-md">
            EVERY SUNDAY AT 8PM
          </span>

          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl tracking-wider text-white uppercase leading-none">
            GRAB YOUR FRIENDS & <br />
            <span className="text-[#F7C948] drop-shadow-[0_0_25px_rgba(247,201,72,0.4)]">
              MAKE YOUR MARK ON GILIT 🔥
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-slate-200 font-medium max-w-xl mx-auto">
            150K per duo • 5,000,000 IDR grand prize • DJ sets by Arman & Sabil • Happy hour 10PM–12AM • Starts 8PM at Lay Day Beach Club.
          </p>

          {/* 🎯 BUTTON 2 (BOTTOM CTA) */}
          <div className="pt-2 flex justify-center">
            <Button
              onClick={handleRegisterWhatsApp}
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1EBE5D] text-black font-extrabold uppercase tracking-[2px] sm:tracking-[3px] text-sm sm:text-base h-14 sm:h-16 px-8 sm:px-12 rounded-xl shadow-[0_0_35px_rgba(37,211,102,0.5)] hover:shadow-[0_0_45px_rgba(37,211,102,0.8)] flex items-center justify-center gap-2.5 sm:gap-3 transition-all cursor-pointer"
            >
              <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" />
              <span>REGISTER ON WHATSAPP</span>
            </Button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest">
            <a
              href="https://www.instagram.com/laydaygilit/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#F7C948] hover:underline"
            >
              <FaInstagram className="w-3.5 h-3.5" />
              @laydaygilit
            </a>
            <span>•</span>
            <span>WhatsApp: {WA_RAW_NUMBER}</span>
            <span>•</span>
            <span>Lay Day Beach Club Gili T</span>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX (FOR ENLARGING FULL RESOLUTION IMAGES) ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="relative max-w-4xl max-h-[85vh] w-full h-[75vh] sm:h-[80vh]">
              <Image
                src={selectedImage}
                alt="Enlarged Image"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
