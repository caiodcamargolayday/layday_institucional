"use client";

import { useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Palette,
  Wine,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Search,
  Clock,
  Music,
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

const POSTER_FEED = "/halloween_ld_uluwatu/LDU-Halloween-IGF.webp";
const POSTER_STORY = "/halloween_ld_uluwatu/LDU-Free Shot-IGS.webp";

const VIBE_IMAGES = [
  "/lay_day_uluwatu/party 1.jpeg",
  "/lay_day_uluwatu/party 2.jpeg",
  "/lay_day_uluwatu/bar 1.jpeg",
  "/lay_day_uluwatu/bar.jpeg",
  "/lay_day_uluwatu/new_01.jpg",
  "/lay_day_uluwatu/new_02.JPG",
  "/lay_day_uluwatu/palce 3.jpeg",
  "/vice_party_pictures/01.jpeg",
  "/vice_party_pictures/05.jpeg",
];

const HIGHLIGHT_CARDS = [
  {
    title: "Free Shot & Drink Specials",
    desc: "Get a FREE welcome shot on entry with the guest list! Plus eerie cocktails, shooter boards & bucket deals from 2 PM.",
    badge: "Free Shot",
    icon: Wine,
  },
  {
    title: "Live DJs (Glando & Essar)",
    desc: "Headline sets by DJ Glando & DJ Essar dropping high-octane reggaeton, house & Halloween anthems poolside.",
    badge: "DJ Sets",
    icon: Music,
  },
  {
    title: "Beer Pong Tournament",
    desc: "High-energy Beer Pong championship! Sign up your squad for bracket battles, sudden death rounds & grand bar prizes.",
    badge: "Tournament",
    icon: Trophy,
  },
  {
    title: "Face Painter & Costumes",
    desc: "Professional Day of the Dead face painters on deck + big prizes awarded for the Best Individual & Group costumes.",
    badge: "Big Prizes",
    icon: Palette,
  },
];

const EVENT_SCHEDULE = [
  {
    time: "2:00 PM",
    title: "Doors Open & Drink Specials",
    desc: "Uluwatu pool party kicks off early with spooky drink specials, ice-cold beers & afternoon sun.",
    badge: "Kickoff 2 PM",
  },
  {
    time: "4:00 PM",
    title: "Professional Face Painting",
    desc: "Artists begin painting authentic Day of the Dead Calavera & Halloween looks.",
    badge: "Face Art",
  },
  {
    time: "Afternoon",
    title: "DJ Glando & DJ Essar Sets",
    desc: "Live DJ takeover keeping the poolside energy pumped with heavy beats and party tracks.",
    badge: "Live DJs",
  },
  {
    time: "Evening",
    title: "Beer Pong Championship",
    desc: "The tournament brackets begin alongside interactive games and special cocktail challenges.",
    badge: "Tournament",
  },
  {
    time: "Later Evening",
    title: "Best Dressed Costume Awards",
    desc: "Runway showdown with big prizes for the scariest, funniest & best group costumes.",
    badge: "Prizes",
  },
  {
    time: "Until Late",
    title: "Late Night Halloween Fiesta",
    desc: "Unstoppable Halloween party vibe continuing late into the night at Lay Day Uluwatu.",
    badge: "Late Night",
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

function CalaveraSkullSvg({ className = "", glowColor = "#E11D48" }: { className?: string; glowColor?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id={`eyeGlowUlu-${glowColor.replace('#', '')}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glowColor} stopOpacity="1" />
          <stop offset="70%" stopColor={glowColor} stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M100 20 C45 20 25 65 25 115 C25 145 42 165 52 178 C56 183 58 190 58 198 L60 215 C60 224 68 230 78 230 L122 230 C132 230 140 224 140 215 L142 198 C142 190 144 183 148 178 C158 165 175 145 175 115 C175 65 155 20 100 20 Z"
        fill="#0D070B"
        stroke={glowColor}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      <circle cx="100" cy="55" r="14" stroke={glowColor} strokeWidth="2.5" fill="#180A10" />
      <circle cx="100" cy="55" r="5" fill={glowColor} />
      <path d="M100 35 Q104 43 100 48 Q96 43 100 35 Z" fill={glowColor} />
      <path d="M100 75 Q104 67 100 62 Q96 67 100 75 Z" fill={glowColor} />
      <path d="M80 55 Q88 59 93 55 Q88 51 80 55 Z" fill={glowColor} />
      <path d="M120 55 Q112 59 107 55 Q112 51 120 55 Z" fill={glowColor} />
      <path d="M86 41 Q94 48 95 44 Q90 39 86 41 Z" fill={glowColor} />
      <path d="M114 41 Q106 48 105 44 Q110 39 114 41 Z" fill={glowColor} />
      <path d="M86 69 Q94 62 95 66 Q90 71 86 69 Z" fill={glowColor} />
      <path d="M114 69 Q106 62 105 66 Q110 71 114 69 Z" fill={glowColor} />

      <path
        d="M60 48 Q75 35 90 42 M140 48 Q125 35 110 42"
        stroke={glowColor}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      <g>
        <circle cx="68" cy="115" r="28" stroke={glowColor} strokeWidth="3" fill="#050204" />
        <circle cx="68" cy="115" r="16" fill={`url(#eyeGlowUlu-${glowColor.replace('#', '')})`} />
        <circle cx="68" cy="115" r="6" fill="#FFF" />
        <path
          d="M68 83 Q73 87 68 91 M68 139 Q73 143 68 147 M36 115 Q40 120 44 115 M92 115 Q96 120 100 115"
          stroke={glowColor}
          strokeWidth="2"
        />
      </g>

      <g>
        <circle cx="132" cy="115" r="28" stroke={glowColor} strokeWidth="3" fill="#050204" />
        <circle cx="132" cy="115" r="16" fill={`url(#eyeGlowUlu-${glowColor.replace('#', '')})`} />
        <circle cx="132" cy="115" r="6" fill="#FFF" />
        <path
          d="M132 83 Q137 87 132 91 M132 139 Q137 143 132 147 M100 115 Q104 120 108 115 M156 115 Q160 120 164 115"
          stroke={glowColor}
          strokeWidth="2"
        />
      </g>

      <path
        d="M100 142 C92 142 88 152 94 162 L100 170 L106 162 C112 152 108 142 100 142 Z"
        fill={glowColor}
      />

      <path
        d="M40 140 Q52 148 55 160 M160 140 Q148 148 145 160"
        stroke={glowColor}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="48" cy="152" r="2.5" fill={glowColor} />
      <circle cx="152" cy="152" r="2.5" fill={glowColor} />

      <path d="M68 200 L132 200" stroke={glowColor} strokeWidth="3" strokeLinecap="round" />
      <path d="M76 190 L76 210" stroke={glowColor} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M88 188 L88 212" stroke={glowColor} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M100 186 L100 214" stroke={glowColor} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M112 188 L112 212" stroke={glowColor} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M124 190 L124 210" stroke={glowColor} strokeWidth="2.5" strokeLinecap="round" />

      <path
        d="M86 220 Q100 226 114 220"
        stroke={glowColor}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function CalaveraMotionBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#E11D48_1px,transparent_1px)] [background-size:22px_22px]" />

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#E11D48] rounded-full blur-[170px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 right-10 w-[550px] h-[550px] bg-[#DC2626] rounded-full blur-[180px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-[#F59E0B] rounded-full blur-[160px]"
      />

      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 160, repeat: Infinity, ease: "linear" },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] opacity-[0.035]"
      >
        <CalaveraSkullSvg className="w-full h-full" glowColor="#E11D48" />
      </motion.div>

      <motion.div
        animate={{
          y: [-20, 25, -20],
          x: [-15, 20, -15],
          rotate: [-6, 8, -6],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[8%] left-[4%] w-32 sm:w-44 md:w-56 opacity-25 drop-shadow-[0_0_25px_rgba(225,29,72,0.4)]"
      >
        <CalaveraSkullSvg className="w-full h-full" glowColor="#E11D48" />
      </motion.div>

      <motion.div
        animate={{
          y: [25, -20, 25],
          x: [15, -15, 15],
          rotate: [8, -6, 8],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[18%] right-[4%] w-28 sm:w-40 md:w-48 opacity-25 drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]"
      >
        <CalaveraSkullSvg className="w-full h-full" glowColor="#F59E0B" />
      </motion.div>

      <motion.div
        animate={{
          y: [-30, 20, -30],
          x: [10, -20, 10],
          rotate: [-10, 6, -10],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[48%] left-[-2%] w-36 sm:w-52 opacity-20 drop-shadow-[0_0_30px_rgba(225,29,72,0.35)]"
      >
        <CalaveraSkullSvg className="w-full h-full" glowColor="#E11D48" />
      </motion.div>

      <motion.div
        animate={{
          y: [20, -35, 20],
          x: [-15, 15, -15],
          rotate: [6, -10, 6],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[12%] right-[2%] w-36 sm:w-52 md:w-64 opacity-25 drop-shadow-[0_0_30px_rgba(225,29,72,0.4)]"
      >
        <CalaveraSkullSvg className="w-full h-full" glowColor="#FF2A4D" />
      </motion.div>

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: ["110vh", "-10vh"],
            x: [
              `${(i * 9) % 100}vw`,
              `${((i * 9) % 100) + ((i % 2 === 0 ? 1 : -1) * 8)}vw`,
            ],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 10 + (i % 6) * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.2,
          }}
          className={`absolute bottom-0 w-2 h-2 rounded-full blur-[1px] ${
            i % 3 === 0
              ? "bg-[#E11D48] shadow-[0_0_10px_#E11D48]"
              : i % 3 === 1
              ? "bg-[#F59E0B] shadow-[0_0_10px_#F59E0B]"
              : "bg-[#FF2A4D] shadow-[0_0_10px_#FF2A4D]"
          }`}
        />
      ))}
    </div>
  );
}

export function HalloweenUluwatuClient() {
  const containerRef = useRef(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [activePosterTab, setActivePosterTab] = useState<"event" | "shot">("event");
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
      const nationality = (formData.get("nationality") as string) || "";

      const cleanPhoneDigits = phoneNumber.replace(/\D/g, "").replace(/^0+/, "");
      const fullPhone = `${selectedCountry.code}${cleanPhoneDigits}`;

      setSubmittedName(name);

      const payload = {
        name,
        phone: fullPhone,
        email,
        nationality,
        Nationality: nationality,
        // Backward compatibility
        "How many people": nationality,
        how_many_people: nationality,
        people: nationality,
        event: "Lay Day of the Dead - Halloween Uluwatu",
        date: "30/10/2026",
        location: "Lay Day Uluwatu",
        source: "halloween-uluwatu-lp",
        timestamp: new Date().toISOString(),
      };

      // 1. Submit to Google Sheets via API proxy
      try {
        await fetch("/api/halloween-uluwatu-apply", {
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
            origin: "halloween-uluwatu",
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
          content_name: "Lay Day of the Dead Halloween Uluwatu Guest List",
          status: "registered",
        });
        (window as any).fbq("track", "Lead", {
          content_name: "Lay Day of the Dead Halloween Uluwatu Guest List",
          status: "registered",
        });
      }

      // 4. Google Tag Manager / Analytics dataLayer
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "contact",
          form_name: "halloween_uluwatu_guestlist",
          event_name: "Lay Day of the Dead Halloween Uluwatu",
          event_date: "30/10/2026",
          nationality,
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
      className="relative bg-[#070509] text-[#FDFBF7] font-sans selection:bg-[#E11D48] selection:text-white overflow-x-hidden min-h-screen"
    >
      <CalaveraMotionBackground />

      {/* 1. HERO SECTION WITH CENTRALIZED LOGO */}
      <section className="relative z-10 min-h-[96vh] w-full flex flex-col items-center justify-center pt-8 pb-16 md:pb-24 px-4">
        {/* Centralized Lay Day Uluwatu Logo */}
        <div className="w-full flex flex-col items-center justify-center mb-6">
          <div className="relative w-44 sm:w-56 md:w-64 h-16 sm:h-20 drop-shadow-[0_0_25px_rgba(225,29,72,0.5)]">
            <Image
              src="/logo_layday_uluwatu.png"
              alt="Lay Day Uluwatu"
              fill
              priority
              quality={80}
              className="object-contain filter invert brightness-0 invert drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            />
          </div>
          <div className="flex items-center gap-2 mt-2 px-3.5 py-1 rounded-full bg-[#E11D48]/15 border border-[#E11D48]/40 text-[#FF2A4D] text-[11px] sm:text-xs font-bold uppercase tracking-[3px] shadow-[0_0_20px_rgba(225,29,72,0.3)]">
            <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-ping" />
            Friday Oct 30 • 2 PM Till Late
          </div>
        </div>

        {/* Poster Tabs & Poster Display */}
        <div className="relative z-10 flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 p-1 mb-4 rounded-full bg-[#180A12]/90 border border-[#E11D48]/50 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setActivePosterTab("event")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activePosterTab === "event"
                  ? "bg-[#E11D48] text-white shadow-[0_0_15px_rgba(225,29,72,0.7)]"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              💀 Event Poster
            </button>
            <button
              onClick={() => setActivePosterTab("shot")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activePosterTab === "shot"
                  ? "bg-[#E11D48] text-white shadow-[0_0_15px_rgba(225,29,72,0.7)]"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              🍹 Free Shot Perk
            </button>
          </div>

          <div className="relative w-full max-w-[290px] xs:max-w-[340px] sm:max-w-[390px] md:max-w-[430px] aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_0_60px_rgba(225,29,72,0.4)] border-2 border-[#E11D48]/70 bg-[#12060D] transition-all duration-500 hover:scale-[1.02] hover:border-[#FF2A4D]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePosterTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={activePosterTab === "event" ? POSTER_FEED : POSTER_STORY}
                  alt="Lay Day of the Dead - Halloween Party Uluwatu"
                  fill
                  priority
                  quality={80}
                  className="object-cover"
                  sizes="(max-width: 480px) 340px, (max-width: 768px) 390px, 430px"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md border border-[#E11D48] text-[#FF2A4D] text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-lg tracking-wider">
              Free Shot On List
            </div>
          </div>
        </div>

        {/* Hero Copy & BUTTON 1 OF 2 */}
        <div className="relative z-20 w-full flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="w-full flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0812]/90 border border-[#E11D48]/50 text-[#FF2A4D] text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(225,29,72,0.3)]">
              <Sparkles className="w-4 h-4 text-[#FF2A4D]" />
              Halloween 2026 • Lay Day Uluwatu
            </div>

            <h1 className="text-3xl sm:text-6xl md:text-7xl font-heading text-white tracking-wider sm:tracking-widest leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] font-black">
              LAY DAY OF THE <span className="text-[#E11D48] drop-shadow-[0_0_25px_rgba(225,29,72,0.8)]">DEAD</span>
            </h1>

            <p className="text-xs sm:text-lg md:text-xl font-extrabold text-[#FF2A4D] tracking-[1.5px] sm:tracking-[3px] uppercase drop-shadow-sm px-2">
              DJ GLANDO • DJ ESSAR • BEERPONG • FACE PAINTER • COCKTAIL SPECIALS
            </p>

            <p className="text-xs sm:text-base text-gray-300 max-w-xl font-medium leading-relaxed px-2">
              Join the guest list for <span className="text-white font-bold">Free Entry + A FREE WELCOME SHOT</span> on arrival &amp; lock in your spot for Uluwatu&apos;s biggest Halloween pool party starting at 2 PM!
            </p>

            {/* BUTTON 1 OF 2 */}
            <div className="mt-2 w-full flex justify-center px-3">
              <Button
                id="hero-guestlist-btn"
                onClick={() => {
                  setIsSuccess(false);
                  setIsModalOpen(true);
                }}
                className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] bg-gradient-to-r from-[#E11D48] via-[#DC2626] to-[#F59E0B] hover:from-[#BE123C] hover:to-[#B91C1C] text-white rounded-lg sm:rounded-none h-13 sm:h-14 md:h-16 px-3 sm:px-8 md:px-12 font-extrabold uppercase tracking-[1.5px] sm:tracking-[2.5px] text-xs sm:text-sm md:text-base transition-all duration-300 shadow-[0_0_35px_rgba(225,29,72,0.6)] hover:shadow-[0_0_45px_rgba(225,29,72,0.9)] hover:scale-105 border border-[#FF2A4D] cursor-pointer text-center"
              >
                JOIN THE GUEST LIST (FREE SHOT)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EVENT OFFERS & HIGHLIGHTS */}
      <section className="relative z-10 py-14 md:py-20 bg-[#0A070D]/90 border-y border-[#E11D48]/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[4px] text-[#FF2A4D] font-bold">
              Day Of The Dead Fiesta
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading tracking-widest uppercase text-white mt-1 font-black">
              THE <span className="text-[#E11D48]">OFFERS &amp; HIGHLIGHTS</span>
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base mt-2">
              High-energy Halloween madness meets legendary Lay Day Uluwatu poolside party vibes. Here&apos;s what&apos;s waiting for you:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHT_CARDS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#140810]/90 border border-[#E11D48]/30 rounded-xl p-6 flex flex-col items-center text-center hover:border-[#E11D48] transition-all duration-300 group hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(225,29,72,0.3)]"
                >
                  <div className="w-14 h-14 rounded-full bg-[#E11D48]/20 border border-[#E11D48] flex items-center justify-center text-[#FF2A4D] mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <div className="mb-2">
                    <span className="text-[10px] uppercase tracking-widest bg-[#E11D48]/20 text-[#FF2A4D] px-2.5 py-0.5 rounded font-bold border border-[#E11D48]/40">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl text-white tracking-wide uppercase mb-2 font-bold">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SCHEDULE & ATTRACTIONS BREAKDOWN */}
      <section className="relative z-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-[#10070E]/95 border-2 border-[#E11D48]/40 rounded-2xl p-6 sm:p-10 shadow-[0_0_40px_rgba(225,29,72,0.2)] backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-[#E11D48]/25">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FF2A4D] font-bold">
                  <Clock className="w-4 h-4" /> The Event Timeline
                </div>
                <h3 className="text-2xl sm:text-4xl font-heading tracking-wider uppercase text-white mt-1 font-black">
                  DAY OF THE DEAD <span className="text-[#E11D48]">SCHEDULE</span>
                </h3>
              </div>
              <div className="text-left md:text-right">
                <span className="text-xs uppercase tracking-widest text-gray-400 block">Prizes on the line</span>
                <span className="text-sm sm:text-base font-bold text-[#FF2A4D]">
                  Free Shots • Bar Tabs • Lay Day Merch • Best Dressed Trophy
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-8">
              {EVENT_SCHEDULE.map((sch, i) => (
                <div
                  key={i}
                  className="bg-black/50 border border-[#E11D48]/25 rounded-xl p-5 relative overflow-hidden group hover:border-[#E11D48] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-sm text-[#FF2A4D] bg-[#E11D48]/15 px-2 py-0.5 rounded border border-[#E11D48]/30">
                      {sch.time}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider bg-white/10 text-gray-300 font-semibold px-2 py-0.5 rounded">
                      {sch.badge}
                    </span>
                  </div>
                  <h4 className="font-heading text-base sm:text-lg text-white tracking-wide font-bold mb-1">
                    {sch.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{sch.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E11D48]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-300">
              <p className="flex items-center gap-2">
                <span className="text-base">💀</span> Costumes strongly encouraged! Arrive early from 2 PM to catch DJ Glando &amp; DJ Essar.
              </p>
              <span className="text-[#FF2A4D] font-bold uppercase tracking-wider whitespace-nowrap bg-[#E11D48]/10 px-3 py-1 rounded border border-[#E11D48]/30">
                Free Entry With Guestlist
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEEL THE VIBE (PHOTO SCROLL / CAROUSEL) */}
      <section className="relative z-10 py-12 md:py-20 bg-black/60 border-y border-[#E11D48]/30 backdrop-blur-sm">
        <div className="text-center mb-8 px-4">
          <h2 className="text-3xl md:text-5xl font-heading tracking-widest uppercase text-white font-black">
            FEEL THE <span className="text-[#E11D48]">VIBE</span>
          </h2>
        </div>

        <div className="overflow-hidden pb-8">
          <motion.div style={{ x: ribbonX }} className="flex gap-4 sm:gap-6 whitespace-nowrap px-4">
            {VIBE_IMAGES.map((img, i) => (
              <div
                key={i}
                className="relative w-[260px] sm:w-[320px] md:w-[380px] aspect-[4/3] flex-shrink-0 overflow-hidden border border-[#E11D48]/30 rounded-xl shadow-md group hover:border-[#E11D48] transition-all bg-[#12080E]"
              >
                <Image
                  src={img}
                  alt="Lay Day Uluwatu Vibe"
                  fill
                  loading="lazy"
                  quality={75}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 380px"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto px-4 mt-6">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl border-2 border-[#E11D48]/40 shadow-[0_0_35px_rgba(225,29,72,0.25)] bg-[#111]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={VIBE_IMAGES[currentImg]}
                  alt="Lay Day Uluwatu Experience"
                  fill
                  loading="lazy"
                  quality={75}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => scrollGallery("left")}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-[#E11D48] text-[#FF2A4D] flex items-center justify-center hover:bg-[#E11D48] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollGallery("right")}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-[#E11D48] text-[#FF2A4D] flex items-center justify-center hover:bg-[#E11D48] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 mt-4">
            {VIBE_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImg(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentImg
                    ? "bg-[#E11D48] w-8 shadow-[0_0_10px_rgba(225,29,72,0.8)]"
                    : "bg-white/30 w-2 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION (BUTTON 2 OF 2) */}
      <section className="relative z-10 py-20 md:py-28 px-4 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={VIBE_IMAGES[0]}
            alt="Lay Day of the Dead Backdrop"
            fill
            loading="lazy"
            quality={75}
            className="object-cover opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070509] via-[#070509]/90 to-[#070509]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl mx-auto space-y-6"
        >
          <div className="inline-block border border-[#E11D48]/50 bg-[#E11D48]/15 text-[#FF2A4D] px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(225,29,72,0.3)]">
            Limited Guest List Capacity
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-7xl font-heading text-white tracking-wider sm:tracking-widest uppercase leading-none drop-shadow-[0_0_25px_rgba(225,29,72,0.5)] font-black">
            LAY DAY OF THE <span className="text-[#E11D48]">DEAD</span>
          </h2>

          <p className="text-xs sm:text-lg md:text-xl font-bold text-gray-200 tracking-[1.5px] sm:tracking-[2px] uppercase px-2">
            FRIDAY OCTOBER 30TH • START 2 PM • LAY DAY ULUWATU
          </p>

          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto leading-relaxed px-2">
            Get your name on the list now to lock in Free Entry, your Free Welcome Shot on arrival, and entry for the Beer Pong &amp; Costume competitions.
          </p>

          <div className="pt-2 w-full flex justify-center px-3">
            <Button
              id="footer-guestlist-btn"
              onClick={() => {
                setIsSuccess(false);
                setIsModalOpen(true);
              }}
              className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] bg-gradient-to-r from-[#E11D48] via-[#DC2626] to-[#F59E0B] hover:from-[#BE123C] hover:to-[#B91C1C] text-white rounded-lg sm:rounded-none h-13 sm:h-14 md:h-16 px-3 sm:px-8 md:px-12 font-extrabold uppercase tracking-[1.5px] sm:tracking-[2.5px] text-xs sm:text-sm md:text-base transition-all duration-300 shadow-[0_0_40px_rgba(225,29,72,0.7)] hover:shadow-[0_0_50px_rgba(225,29,72,0.9)] hover:scale-105 border border-[#FF2A4D] cursor-pointer text-center"
            >
              JOIN THE GUEST LIST (FREE SHOT)
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ─── UNIFIED GUEST LIST MODAL WITH COUNTRY CODE TOGGLE ─── */}
      <Dialog open={isModalOpen} onOpenChange={(open) => setIsModalOpen(open)}>
        <DialogContent className="sm:max-w-[440px] bg-[#12080E] border-2 border-[#E11D48]/60 text-white rounded-xl shadow-[0_0_50px_rgba(225,29,72,0.4)] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading tracking-widest text-[#FF2A4D] uppercase font-black">
              {isSuccess ? "You're On The List!" : "Halloween Guest List"}
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-sm">
              {isSuccess
                ? "We've registered you for Lay Day of the Dead at Lay Day Uluwatu."
                : "Enter your details below to claim Free Entry + A Free Welcome Shot on arrival."}
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E11D48]/20 border-2 border-[#E11D48] flex items-center justify-center text-[#FF2A4D] shadow-[0_0_20px_rgba(225,29,72,0.5)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <p className="text-white text-lg font-bold">
                  You&apos;re locked in, {submittedName || "Legend"}! 💀🍹
                </p>
                <p className="text-gray-300 text-sm">
                  Your spot on the guest list &amp; <span className="text-[#FF2A4D] font-bold">Free Welcome Shot</span> are confirmed for{" "}
                  <span className="text-white font-semibold">Friday, October 30th @ 2:00 PM</span>.
                </p>
              </div>
              <div className="p-3.5 bg-black/60 border border-[#E11D48]/40 rounded-lg text-xs text-gray-300 w-full text-left space-y-1.5 shadow-inner">
                <p className="text-[#FF2A4D] font-bold uppercase tracking-wider">Party Checklist:</p>
                <p>📍 Location: Lay Day Uluwatu</p>
                <p>⏰ Start Time: 2:00 PM Till Late</p>
                <p>🎧 DJs: DJ Glando &amp; DJ Essar</p>
                <p>🏆 Contests: Beer Pong Tournament + Best Dressed Costume Awards</p>
                <p>🍹 Perk: Show your confirmation at the bar for your Free Shot!</p>
              </div>
              <p className="text-white/80 text-sm pt-2">
                Follow{" "}
                <a
                  href="https://www.instagram.com/laydayuluwatu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF2A4D] underline font-bold hover:text-white transition-colors"
                >
                  @laydayuluwatu
                </a>{" "}
                on Instagram to stay updated!
              </p>
            </div>
          ) : (
            <form className="grid gap-4 py-2" onSubmit={handleBooking}>
              <div className="grid gap-1.5">
                <Label htmlFor="gl-name" className="text-white/90 uppercase tracking-widest text-xs font-bold">
                  1. Name
                </Label>
                <Input
                  id="gl-name"
                  name="name"
                  required
                  className="bg-[#0A0407] border-[#E11D48]/40 text-white placeholder:text-gray-500 focus-visible:ring-[#E11D48] rounded-md h-11"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="gl-phone" className="text-white/90 uppercase tracking-widest text-xs font-bold">
                  2. Phone (WhatsApp)
                </Label>
                <div className="relative flex gap-2 items-center">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="h-11 px-3 bg-[#0A0407] border border-[#E11D48]/40 hover:border-[#E11D48] rounded-md flex items-center gap-1.5 text-white font-medium text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#E11D48] cursor-pointer whitespace-nowrap"
                    >
                      <span className="text-lg leading-none">{selectedCountry.flag}</span>
                      <span className="text-xs font-bold text-[#FF2A4D]">{selectedCountry.code}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                          isCountryDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isCountryDropdownOpen && (
                      <div className="absolute top-12 left-0 z-50 w-64 bg-[#12080E] border-2 border-[#E11D48]/70 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] p-2 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                        <div className="relative mb-2">
                          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Search country or code..."
                            className="w-full pl-8 pr-2 py-1.5 bg-[#090407] border border-[#E11D48]/40 rounded-md text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#E11D48]"
                          />
                        </div>

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
                                    ? "bg-[#E11D48] text-white font-bold"
                                    : "text-gray-200 hover:bg-[#1E0E17] hover:text-white"
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

                  <Input
                    id="gl-phone"
                    name="phone"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 bg-[#0A0407] border-[#E11D48]/40 text-white placeholder:text-gray-500 focus-visible:ring-[#E11D48] rounded-md h-11"
                    placeholder="812 3456 7890"
                  />
                </div>
                <span className="text-[11px] text-gray-400">
                  Selected code: <strong className="text-[#FF2A4D]">{selectedCountry.flag} {selectedCountry.country} ({selectedCountry.code})</strong>
                </span>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="gl-email" className="text-white/90 uppercase tracking-widest text-xs font-bold">
                  3. Email
                </Label>
                <Input
                  id="gl-email"
                  name="email"
                  type="email"
                  required
                  className="bg-[#0A0407] border-[#E11D48]/40 text-white placeholder:text-gray-500 focus-visible:ring-[#E11D48] rounded-md h-11"
                  placeholder="you@example.com"
                />
              </div>

              {/* 4. Nationality */}
              <div className="grid gap-1.5">
                <Label htmlFor="gl-nationality" className="text-white/90 uppercase tracking-widest text-xs font-bold">
                  4. Nationality
                </Label>
                <Input
                  id="gl-nationality"
                  name="nationality"
                  type="text"
                  required
                  placeholder="e.g. Australian, British, Indonesian, German..."
                  className="bg-[#0A0407] border-[#E11D48]/40 text-white placeholder:text-gray-500 focus-visible:ring-[#E11D48] rounded-md h-11"
                />
                <span className="text-[11px] text-gray-400">
                  Let us know where you&apos;re from!
                </span>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#E11D48] via-[#DC2626] to-[#F59E0B] hover:from-[#BE123C] hover:to-[#B91C1C] text-white font-extrabold uppercase tracking-[3px] h-12 mt-2 transition-all duration-300 shadow-[0_0_25px_rgba(225,29,72,0.5)] disabled:opacity-50 rounded-md cursor-pointer"
              >
                {isLoading ? "Saving Your Spot..." : "Claim Free Entry + Free Shot"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
