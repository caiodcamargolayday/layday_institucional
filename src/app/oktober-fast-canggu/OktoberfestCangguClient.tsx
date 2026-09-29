"use client";

import { useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Beer,
  Utensils,
  Music,
  Users,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const POSTER_IMAGE = "/october_fast_ld_canggu/IGF.png";

const VIBE_IMAGES = [
  "/lay_day_canggu/swimming_pools.jpeg",
  "/lay_day_canggu/bar 1.jpeg",
  "/lay_day_canggu/bar 6.jpeg",
  "/lay_day_canggu/bar 2.jpeg",
  "/lay_day_canggu/bar 4.jpeg",
  "/lay_day_canggu/the_bar.jpg",
  "/vice_party_pictures/01.jpeg",
  "/vice_party_pictures/05.jpeg",
];

const BEER_GAMES = [
  {
    title: "Bintang Beer Pong",
    desc: "Tournament-style beer pong with teams competing for the grand title.",
    badge: "Tournament",
  },
  {
    title: "Flip Cup Championship",
    desc: "Fast-paced team showdown that gets the whole crowd screaming and cheering.",
    badge: "Team Battle",
  },
  {
    title: "Pool Beer Relay",
    desc: "Epic poolside obstacle race packed with hilarious team challenges.",
    badge: "Poolside",
  },
  {
    title: "Spin the Bintang Wheel",
    desc: "Spin to win free drinks, wild challenges, instant prizes, and Lay Day merch!",
    badge: "Instant Prizes",
  },
];

const COUNTRY_CODES = [
  { code: "+62", country: "Indonesia", flag: "🇮🇩", iso: "ID" },
  { code: "+61", country: "Australia", flag: "🇦🇺", iso: "AU" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧", iso: "GB" },
  { code: "+49", country: "Germany", flag: "🇩🇪", iso: "DE" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱", iso: "NL" },
  { code: "+1", country: "United States", flag: "🇺🇸", iso: "US" },
  { code: "+1", country: "Canada", flag: "🇨🇦", iso: "CA" },
  { code: "+33", country: "France", flag: "🇫🇷", iso: "FR" },
  { code: "+55", country: "Brazil", flag: "🇧🇷", iso: "BR" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿", iso: "NZ" },
  { code: "+353", country: "Ireland", flag: "🇮🇪", iso: "IE" },
  { code: "+34", country: "Spain", flag: "🇪🇸", iso: "ES" },
  { code: "+39", country: "Italy", flag: "🇮🇹", iso: "IT" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭", iso: "CH" },
  { code: "+43", country: "Austria", flag: "🇦🇹", iso: "AT" },
  { code: "+46", country: "Sweden", flag: "🇸🇪", iso: "SE" },
  { code: "+47", country: "Norway", flag: "🇳🇴", iso: "NO" },
  { code: "+45", country: "Denmark", flag: "🇩🇰", iso: "DK" },
  { code: "+358", country: "Finland", flag: "🇫🇮", iso: "FI" },
  { code: "+32", country: "Belgium", flag: "🇧🇪", iso: "BE" },
  { code: "+351", country: "Portugal", flag: "🇵🇹", iso: "PT" },
  { code: "+48", country: "Poland", flag: "🇵🇱", iso: "PL" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿", iso: "CZ" },
  { code: "+65", country: "Singapore", flag: "🇸🇬", iso: "SG" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾", iso: "MY" },
  { code: "+66", country: "Thailand", flag: "🇹🇭", iso: "TH" },
  { code: "+63", country: "Philippines", flag: "🇵🇭", iso: "PH" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳", iso: "VN" },
  { code: "+81", country: "Japan", flag: "🇯🇵", iso: "JP" },
  { code: "+82", country: "South Korea", flag: "🇰🇷", iso: "KR" },
  { code: "+91", country: "India", flag: "🇮🇳", iso: "IN" },
  { code: "+27", country: "South Africa", flag: "🇿🇦", iso: "ZA" },
  { code: "+52", country: "Mexico", flag: "🇲🇽", iso: "MX" },
  { code: "+54", country: "Argentina", flag: "🇦🇷", iso: "AR" },
  { code: "+56", country: "Chile", flag: "🇨🇱", iso: "CL" },
  { code: "+57", country: "Colombia", flag: "🇨🇴", iso: "CO" },
  { code: "+971", country: "United Arab Emirates", flag: "🇦🇪", iso: "AE" },
  { code: "+972", country: "Israel", flag: "🇮🇱", iso: "IL" },
  { code: "+7", country: "Russia / Kazakhstan", flag: "🇷🇺", iso: "RU" },
];

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export function OktoberfestCangguClient() {
  const containerRef = useRef(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  // Country Code Selector State
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]); // default Indonesia (+62)
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRY_CODES;
    const q = countrySearch.toLowerCase();
    return COUNTRY_CODES.filter(
      (c) =>
        c.country.toLowerCase().includes(q) ||
        c.code.includes(q) ||
        c.iso.toLowerCase().includes(q)
    );
  }, [countrySearch]);

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = (formData.get("name") as string) || "";
      const email = (formData.get("email") as string) || "";
      const people = (formData.get("people") as string) || "1";

      // Combine country code + local number
      const cleanPhoneDigits = phoneNumber.replace(/\D/g, "").replace(/^0+/, "");
      const fullPhone = `${selectedCountry.code}${cleanPhoneDigits}`;

      setSubmittedName(name);

      const payload = {
        name,
        phone: fullPhone,
        email,
        people,
        event: "Oktoberfest Lay Day Canggu",
        date: "02/10/2026",
        location: "Lay Day Canggu",
        source: "oktober-fast-canggu-lp",
        timestamp: new Date().toISOString(),
      };

      // 1. Submit to Google Sheets via API proxy
      try {
        await fetch("/api/oktoberfest-canggu-apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn("API proxy error:", err);
      }

      // 2. Meta Conversions API (Server-Side)
      try {
        const fbp = getCookie("_fbp");
        const fbc = getCookie("_fbc");
        await fetch("/api/meta-capi/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            origin: "oktoberfest-canggu",
            eventSourceUrl: window.location.href,
            fbp,
            fbc,
            email,
            phone: fullPhone,
            firstName: name.split(" ")[0] || name,
            lastName: name.split(" ").slice(1).join(" ") || undefined,
          }),
        });
      } catch (err) {
        console.warn("Meta CAPI error:", err);
      }

      // 3. Meta Pixel Browser Contact & Lead Events
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Contact", {
          content_name: "Oktoberfest Lay Day Canggu Guest List",
          status: "registered",
        });
        (window as any).fbq("track", "Lead", {
          content_name: "Oktoberfest Lay Day Canggu Guest List",
          status: "registered",
        });
      }

      // 4. Google Tag Manager / Analytics dataLayer
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "contact",
          form_name: "oktoberfest_canggu_guestlist",
          event_name: "Oktoberfest Lay Day Canggu",
          event_date: "02/10/2026",
          people_count: people,
        });
      }

      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
      setPhoneNumber("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  const ribbonX = useTransform(scrollYProgress, [0, 1], [0, -1800]);

  const scrollGallery = (dir: "left" | "right") => {
    const newIdx =
      dir === "right"
        ? (currentImg + 1) % VIBE_IMAGES.length
        : (currentImg - 1 + VIBE_IMAGES.length) % VIBE_IMAGES.length;
    setCurrentImg(newIdx);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-[#0A1A24] text-[#F4EFE6] font-sans selection:bg-[#E59819] selection:text-[#0A1A24] overflow-x-hidden min-h-screen"
    >
      {/* Bavarian diamond pattern subtle watermark */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#E59819_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#E59819]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#16435C]/40 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="relative z-30 w-full py-4 px-6 flex items-center justify-between border-b border-[#E59819]/20 bg-[#0A1A24]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#E59819]/40 bg-[#004A61] flex items-center justify-center">
            <Beer className="w-4 h-4 text-[#E59819]" />
          </div>
          <span className="font-heading tracking-widest text-lg text-white">
            LAY DAY <span className="text-[#E59819]">CANGGU</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest bg-[#E59819]/10 border border-[#E59819]/30 text-[#E59819] px-3 py-1 rounded-full font-bold">
          <span className="w-2 h-2 rounded-full bg-[#E59819] animate-pulse" />
          Oct 2 • Starts 2 PM
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] w-full flex flex-col items-center justify-center pt-8 pb-16 md:pb-24 px-4">
        {/* Event Poster Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] mx-auto aspect-[4/5] mb-8 overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(229,152,25,0.25)] border-2 border-[#E59819]/50 bg-[#F4EFE6]"
        >
          <Image
            src={POSTER_IMAGE}
            alt="Oktoberfest at Lay Day Canggu - Prost in Paradise"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 440px"
          />
        </motion.div>

        {/* Hero Copy & BUTTON 1 OF 2 */}
        <div className="relative z-20 w-full flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full flex flex-col items-center gap-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16435C]/80 border border-[#E59819]/40 text-[#E59819] text-xs sm:text-sm font-bold tracking-widest uppercase shadow-md">
              <Sparkles className="w-4 h-4 text-[#E59819]" />
              Prost in Paradise • Lay Day Canggu
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading text-white tracking-widest leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
              OKTOBER<span className="text-[#E59819]">FEST</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl font-bold text-[#E59819] tracking-[3px] uppercase">
              BEER • GAMES • POOL • MUSIC • PARTY
            </p>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl font-medium">
              Join the guest list for <span className="text-white font-bold">Free Entry</span> &amp; guarantee your spot for the ultimate Beer Olympics pool party!
            </p>

            {/* BUTTON 1 OF 2 */}
            <div className="mt-2">
              <Button
                id="hero-guestlist-btn"
                onClick={() => {
                  setIsSuccess(false);
                  setIsModalOpen(true);
                }}
                className="bg-gradient-to-r from-[#E59819] via-[#F59E0B] to-[#D97706] hover:from-[#16435C] hover:to-[#004A61] text-[#0A1A24] hover:text-white rounded-none h-14 md:h-16 px-8 sm:px-12 md:px-16 font-extrabold uppercase tracking-[3px] text-sm sm:text-base transition-all duration-300 shadow-[0_0_35px_rgba(229,152,25,0.6)] hover:shadow-[0_0_40px_rgba(22,67,92,0.8)] hover:scale-105 border border-[#E59819] cursor-pointer"
              >
                ENTRY IN THE GUEST LIST
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. EVENT OFFERS & HIGHLIGHTS */}
      <section className="py-14 md:py-20 bg-[#08151D] border-y border-[#E59819]/20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[4px] text-[#E59819] font-bold">
              Prost In Paradise
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading tracking-widest uppercase text-white mt-1">
              THE <span className="text-[#E59819]">OFFERS &amp; HIGHLIGHTS</span>
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base mt-2">
              Oktoberfest fun meets the legendary Lay Day Friday pool party. Here&apos;s what&apos;s waiting for you:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-[#0C2330]/90 border border-[#E59819]/30 rounded-xl p-6 flex flex-col items-center text-center hover:border-[#E59819] transition-all duration-300 group hover:-translate-y-1 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-[#E59819]/20 border border-[#E59819] flex items-center justify-center text-[#E59819] mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl text-white tracking-wide uppercase mb-2">
                Beer Olympics
              </h3>
              <p className="text-sm text-gray-300">
                Sign up in teams of 4–6 to battle across Bintang Beer Pong, Flip Cup, and Pool Relays for big prizes!
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0C2330]/90 border border-[#E59819]/30 rounded-xl p-6 flex flex-col items-center text-center hover:border-[#E59819] transition-all duration-300 group hover:-translate-y-1 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-[#E59819]/20 border border-[#E59819] flex items-center justify-center text-[#E59819] mb-4 group-hover:scale-110 transition-transform">
                <Beer className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl text-white tracking-wide uppercase mb-2">
                Bintang Buckets
              </h3>
              <p className="text-sm text-gray-300">
                Happy Hour Bintang buckets all day long! Cold, refreshing, and specially priced for Oktoberfest legends.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0C2330]/90 border border-[#E59819]/30 rounded-xl p-6 flex flex-col items-center text-center hover:border-[#E59819] transition-all duration-300 group hover:-translate-y-1 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-[#E59819]/20 border border-[#E59819] flex items-center justify-center text-[#E59819] mb-4 group-hover:scale-110 transition-transform">
                <Utensils className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl text-white tracking-wide uppercase mb-2">
                German Snacks
              </h3>
              <p className="text-sm text-gray-300">
                Roaming German snacks curated by Chef Nick — authentic pretzels, bites &amp; hearty pool party treats.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#0C2330]/90 border border-[#E59819]/30 rounded-xl p-6 flex flex-col items-center text-center hover:border-[#E59819] transition-all duration-300 group hover:-translate-y-1 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-[#E59819]/20 border border-[#E59819] flex items-center justify-center text-[#E59819] mb-4 group-hover:scale-110 transition-transform">
                <Music className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl text-white tracking-wide uppercase mb-2">
                DJs &amp; Pool Party
              </h3>
              <p className="text-sm text-gray-300">
                Reggaeton + commercial party anthems + epic Oktoberfest celebration moments poolside all day!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BEER OLYMPICS BREAKDOWN */}
      <section className="py-14 md:py-20 relative">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-[#0C2330] border-2 border-[#E59819]/40 rounded-2xl p-6 sm:p-10 shadow-[0_0_40px_rgba(229,152,25,0.15)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-[#E59819]/20">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E59819] font-bold">
                  <Users className="w-4 h-4" /> The Main Event
                </div>
                <h3 className="text-2xl sm:text-4xl font-heading tracking-wider uppercase text-white mt-1">
                  BEER OLYMPICS <span className="text-[#E59819]">CHAMPIONSHIP</span>
                </h3>
              </div>
              <div className="text-left md:text-right">
                <span className="text-xs uppercase tracking-widest text-gray-300 block">Prizes on the line</span>
                <span className="text-sm sm:text-base font-bold text-[#E59819]">
                  Free Drinks • Merch • Grand Trophy
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              {BEER_GAMES.map((game, i) => (
                <div
                  key={i}
                  className="bg-black/40 border border-[#E59819]/20 rounded-xl p-5 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-heading text-lg sm:text-xl text-white tracking-wide">
                      {game.title}
                    </h4>
                    <span className="text-[11px] uppercase tracking-wider bg-[#E59819]/15 text-[#E59819] font-bold px-2 py-0.5 rounded border border-[#E59819]/30">
                      {game.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300">{game.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E59819]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-300">
              <p>⚡ Register solo or in groups of 4–6 to represent your crew in the tournament.</p>
              <span className="text-[#E59819] font-bold uppercase tracking-wider">Free To Enter With Guestlist</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEEL THE VIBE (PHOTO SCROLL / CAROUSEL) */}
      <section className="py-12 md:py-20 bg-black/40 border-y border-[#E59819]/20">
        <div className="text-center mb-8 px-4">
          <h2 className="text-3xl md:text-5xl font-heading tracking-widest uppercase text-white/90">
            FEEL THE <span className="text-[#E59819]">VIBE</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mt-1">
            Lay Day Canggu Poolside Experience
          </p>
        </div>

        {/* Continuous Horizontal Strip */}
        <div className="overflow-hidden pb-8">
          <motion.div style={{ x: ribbonX }} className="flex gap-4 sm:gap-6 whitespace-nowrap px-4">
            {[...VIBE_IMAGES, ...VIBE_IMAGES].map((img, i) => (
              <div
                key={i}
                className="relative w-[260px] sm:w-[320px] md:w-[380px] aspect-[4/3] flex-shrink-0 overflow-hidden border border-[#E59819]/30 rounded-xl shadow-md group hover:border-[#E59819] transition-all"
              >
                <Image
                  src={img}
                  alt="Lay Day Canggu Vibe"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 80vw, 380px"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Featured Slider */}
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl border-2 border-[#E59819]/40 shadow-[0_0_30px_rgba(229,152,25,0.2)] bg-[#111]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={VIBE_IMAGES[currentImg]}
                  alt="Lay Day Canggu Experience"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </motion.div>
            </AnimatePresence>

            {/* Left/Right Buttons */}
            <button
              onClick={() => scrollGallery("left")}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-[#E59819] text-[#E59819] flex items-center justify-center hover:bg-[#E59819] hover:text-black transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollGallery("right")}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-[#E59819] text-[#E59819] flex items-center justify-center hover:bg-[#E59819] hover:text-black transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {VIBE_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImg(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentImg
                    ? "bg-[#E59819] w-8 shadow-[0_0_10px_rgba(229,152,25,0.8)]"
                    : "bg-white/30 w-2 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION (BUTTON 2 OF 2) */}
      <section className="relative py-20 md:py-28 px-4 flex items-center justify-center text-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={VIBE_IMAGES[0]}
            alt="Oktoberfest Backdrop"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A24] via-[#0A1A24]/90 to-[#0A1A24]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl mx-auto space-y-6"
        >
          <div className="inline-block border border-[#E59819]/40 bg-[#E59819]/10 text-[#E59819] px-4 py-1 rounded-full text-xs uppercase tracking-widest font-bold">
            Limited Guest List Capacity
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading text-white tracking-widest uppercase leading-none drop-shadow-[0_0_25px_rgba(229,152,25,0.4)]">
            PROST IN <span className="text-[#E59819]">PARADISE</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl font-bold text-gray-200 tracking-[2px] uppercase">
            FRIDAY OCTOBER 2ND • START 2 PM • LAY DAY CANGGU
          </p>

          <p className="text-sm text-gray-400 max-w-lg mx-auto">
            Get your name on the list now to ensure entry, compete in the Beer Olympics &amp; enjoy happy hour all day.
          </p>

          {/* BUTTON 2 OF 2 */}
          <div className="pt-2">
            <Button
              id="footer-guestlist-btn"
              onClick={() => {
                setIsSuccess(false);
                setIsModalOpen(true);
              }}
              className="bg-gradient-to-r from-[#E59819] via-[#F59E0B] to-[#D97706] hover:from-[#16435C] hover:to-[#004A61] text-[#0A1A24] hover:text-white rounded-none h-14 md:h-16 px-10 sm:px-14 md:px-18 font-extrabold uppercase tracking-[3px] text-sm sm:text-base transition-all duration-300 shadow-[0_0_40px_rgba(229,152,25,0.6)] hover:shadow-[0_0_45px_rgba(22,67,92,0.8)] hover:scale-105 border border-[#E59819] cursor-pointer"
            >
              ENTRY IN THE GUEST LIST
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer info bar */}
      <footer className="py-6 border-t border-[#E59819]/20 text-center text-xs text-gray-400 bg-[#061219]">
        <p>© 2026 Lay Day Canggu. All rights reserved. Prost in Paradise!</p>
      </footer>

      {/* ─── UNIFIED GUEST LIST MODAL WITH COUNTRY CODE TOGGLE ─── */}
      <Dialog open={isModalOpen} onOpenChange={(open) => setIsModalOpen(open)}>
        <DialogContent className="sm:max-w-[440px] bg-[#0C2330] border-2 border-[#E59819]/50 text-white rounded-xl shadow-[0_0_50px_rgba(229,152,25,0.3)] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading tracking-widest text-[#E59819] uppercase">
              {isSuccess ? "You're On The List!" : "Oktoberfest Guest List"}
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-sm">
              {isSuccess
                ? "We've registered you for Oktoberfest at Lay Day Canggu."
                : "Enter your details below to claim free entry & register for the guest list."}
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E59819]/20 border-2 border-[#E59819] flex items-center justify-center text-[#E59819]">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <p className="text-white text-lg font-bold">
                  Prost, {submittedName || "Legend"}! 🍻
                </p>
                <p className="text-gray-300 text-sm">
                  Your spot on the guest list is locked in for{" "}
                  <span className="text-[#E59819] font-semibold">Friday, October 2nd @ 2 PM</span>.
                </p>
              </div>
              <div className="p-3 bg-black/40 border border-[#E59819]/30 rounded-lg text-xs text-gray-300 w-full text-left space-y-1">
                <p className="text-[#E59819] font-bold uppercase tracking-wider">Party Checklist:</p>
                <p>📍 Location: Lay Day Canggu (The OG)</p>
                <p>⏰ Start Time: 2:00 PM</p>
                <p>🏆 Activities: Beer Olympics, Bucket Deals, Roaming Snacks &amp; Poolside DJs</p>
              </div>
              <p className="text-white/80 text-sm pt-2">
                Follow{" "}
                <a
                  href="https://www.instagram.com/laydaycanggu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E59819] underline font-bold hover:text-white transition-colors"
                >
                  @laydaycanggu
                </a>{" "}
                on Instagram to stay updated!
              </p>
            </div>
          ) : (
            <form className="grid gap-4 py-2" onSubmit={handleBooking}>
              {/* 1. Name */}
              <div className="grid gap-1.5">
                <Label htmlFor="gl-name" className="text-white/90 uppercase tracking-widest text-xs font-bold">
                  1. Name
                </Label>
                <Input
                  id="gl-name"
                  name="name"
                  required
                  className="bg-[#08151D] border-[#E59819]/40 text-white placeholder:text-gray-400 focus-visible:ring-[#E59819] rounded-md h-11"
                  placeholder="Your full name"
                />
              </div>

              {/* 2. Phone (WhatsApp) with Country Code Toggle */}
              <div className="grid gap-1.5">
                <Label htmlFor="gl-phone" className="text-white/90 uppercase tracking-widest text-xs font-bold">
                  2. Phone (WhatsApp)
                </Label>
                <div className="relative flex gap-2 items-center">
                  {/* Country Code Toggle Button */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="h-11 px-3 bg-[#08151D] border border-[#E59819]/40 hover:border-[#E59819] rounded-md flex items-center gap-1.5 text-white font-medium text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#E59819] cursor-pointer whitespace-nowrap"
                    >
                      <span className="text-lg leading-none">{selectedCountry.flag}</span>
                      <span className="text-xs font-bold text-[#E59819]">{selectedCountry.code}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                          isCountryDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Country Code Dropdown Menu */}
                    {isCountryDropdownOpen && (
                      <div className="absolute top-12 left-0 z-50 w-64 bg-[#0A1A24] border-2 border-[#E59819]/60 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] p-2 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                        {/* Search Input */}
                        <div className="relative mb-2">
                          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Search country or code..."
                            className="w-full pl-8 pr-2 py-1.5 bg-[#0C2330] border border-[#E59819]/30 rounded-md text-xs text-white placeholder:text-gray-400 focus:outline-none focus:border-[#E59819]"
                          />
                        </div>

                        {/* List of Countries */}
                        <div className="max-h-48 overflow-y-auto space-y-0.5 custom-scrollbar pr-1">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((item, idx) => (
                              <button
                                key={`${item.iso}-${idx}`}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(item);
                                  setIsCountryDropdownOpen(false);
                                  setCountrySearch("");
                                }}
                                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs text-left transition-colors cursor-pointer ${
                                  selectedCountry.iso === item.iso && selectedCountry.code === item.code
                                    ? "bg-[#E59819] text-[#0A1A24] font-bold"
                                    : "text-gray-200 hover:bg-[#16435C]/60 hover:text-white"
                                }`}
                              >
                                <span className="flex items-center gap-2 truncate">
                                  <span className="text-base">{item.flag}</span>
                                  <span className="truncate">{item.country}</span>
                                </span>
                                <span className="font-mono font-semibold ml-2 text-[11px] opacity-90">
                                  {item.code}
                                </span>
                              </button>
                            ))
                          ) : (
                            <p className="text-xs text-gray-400 text-center py-2">No country found</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Number Input */}
                  <Input
                    id="gl-phone"
                    name="phone"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 bg-[#08151D] border-[#E59819]/40 text-white placeholder:text-gray-400 focus-visible:ring-[#E59819] rounded-md h-11"
                    placeholder="812 3456 7890"
                  />
                </div>
                <span className="text-[11px] text-gray-400">
                  Selected code: <strong className="text-[#E59819]">{selectedCountry.flag} {selectedCountry.country} ({selectedCountry.code})</strong>
                </span>
              </div>

              {/* 3. Email */}
              <div className="grid gap-1.5">
                <Label htmlFor="gl-email" className="text-white/90 uppercase tracking-widest text-xs font-bold">
                  3. Email
                </Label>
                <Input
                  id="gl-email"
                  name="email"
                  type="email"
                  required
                  className="bg-[#08151D] border-[#E59819]/40 text-white placeholder:text-gray-400 focus-visible:ring-[#E59819] rounded-md h-11"
                  placeholder="you@example.com"
                />
              </div>

              {/* 4. How many people */}
              <div className="grid gap-1.5">
                <Label htmlFor="gl-people" className="text-white/90 uppercase tracking-widest text-xs font-bold">
                  4. How many people?
                </Label>
                <Input
                  id="gl-people"
                  name="people"
                  type="number"
                  min="1"
                  max="20"
                  required
                  defaultValue="1"
                  className="bg-[#08151D] border-[#E59819]/40 text-white placeholder:text-gray-400 focus-visible:ring-[#E59819] rounded-md h-11"
                />
                <span className="text-[11px] text-gray-400">
                  Bring your crew or sign up your Beer Olympics team (4-6 people)!
                </span>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#E59819] via-[#F59E0B] to-[#D97706] hover:from-[#16435C] hover:to-[#004A61] text-[#0A1A24] hover:text-white font-extrabold uppercase tracking-[3px] h-12 mt-2 transition-all duration-300 shadow-[0_0_25px_rgba(229,152,25,0.5)] disabled:opacity-50 rounded-md cursor-pointer"
              >
                {isLoading ? "Saving Your Spot..." : "Claim Free Entry"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
