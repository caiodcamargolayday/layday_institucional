"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Users, Music, ShieldCheck, ChevronDown, 
  Utensils, Coffee, Waves, Wifi, Dumbbell, Map as MapIcon, Umbrella, Languages, Luggage, Beer, DoorClosed, Wind, Plug, Lock, Lightbulb, PartyPopper, Bath, Bed, LockKeyhole, ChevronLeft, ChevronRight, X, Sparkles, Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAttributionParams } from "@/lib/tracking";

// Red Spider Web SVG Decoration matching the flyer's corner web artwork
function SpiderWeb({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      stroke="#D71920"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0" y1="0" x2="100" y2="100" />
      <line x1="0" y1="0" x2="100" y2="50" />
      <line x1="0" y1="0" x2="100" y2="0" />
      <line x1="0" y1="0" x2="50" y2="100" />
      <line x1="0" y1="0" x2="0" y2="100" />
      <line x1="0" y1="0" x2="100" y2="25" />
      <line x1="0" y1="0" x2="25" y2="100" />
      <line x1="0" y1="0" x2="100" y2="75" />
      <line x1="0" y1="0" x2="75" y2="100" />
      <path d="M 0,20 Q 10,18 19,19 Q 20,10 20,0" />
      <path d="M 0,40 Q 20,36 38,38 Q 36,20 40,0" />
      <path d="M 0,60 Q 30,55 57,57 Q 55,30 60,0" />
      <path d="M 0,80 Q 40,73 76,76 Q 73,40 80,0" />
      <path d="M 0,100 Q 50,91 95,95 Q 91,50 100,0" />
    </svg>
  );
}


// Red Jagged Banner matching the flyer's date tape
function JaggedDateBanner({ text = "*VALID FOR CHECK-INS FROM OCT 28TH, 29TH & 30TH*" }: { text?: string }) {
  return (
    <div className="relative inline-block bg-[#D71920] text-white px-4 py-1.5 md:px-6 md:py-2 font-heading tracking-widest uppercase text-xs md:text-sm font-bold shadow-lg border-y border-dashed border-red-300/40">
      <span className="relative z-10 drop-shadow-sm">{text}</span>
    </div>
  );
}

const ASSETS = {
  hero: "/layday_gilit/hero_gilit_oficial.jpeg",
  pool: "/layday_gilit/layday_gilit_picture 2.jpg",
  social: "/layday_gilit/layday_gilit_picture 3.jpg",
  rooms: "/layday_gilit/layday_gilit_picture 4.jpg",
  vibes: "/layday_gilit/layday_gilit_picture 5.jpg",
  flyerBlonde: "/halloween_ld_gilit/gilit-halloween-promo-blonde-feed.jpg",
  flyerTrio: "/halloween_ld_gilit/gilit-halloween-promo-trio-feed.jpg",
};

const FEATURES = [
  { icon: Music, title: "HALLOWEEN ISLAND VIBES", text: "Costumes, DJs & parties." },
  { icon: Users, title: "GLOBAL SOCIAL HUB", text: "Meet travelers worldwide." },
  { icon: ShieldCheck, title: "CLEAN & SAFE", text: "Professional hospitality." }
];

const FACILITIES = [
  { icon: Utensils, label: "Restaurant" },
  { icon: Coffee, label: "Coffee Shop" },
  { icon: Waves, label: "Swimming Pool" },
  { icon: Wifi, label: "Wifi Area" },
  { icon: Dumbbell, label: "Gym/Fitness Center" },
  { icon: MapIcon, label: "Outdoor Activity" },
  { icon: Umbrella, label: "Beachfront" },
  { icon: Languages, label: "Multilingual Staff" },
  { icon: Luggage, label: "Luggage Storage" },
  { icon: MapIcon, label: "Tours & Activities" },
  { icon: Umbrella, label: "Private Beachfront" },
  { icon: Wifi, label: "Free WiFi" },
  { icon: Beer, label: "Bar" },
  { icon: DoorClosed, label: "Private Rooms" },
  { icon: Bed, label: "Shared Dorm Rooms" },
  { icon: Wind, label: "Air Conditioning" },
  { icon: Plug, label: "Personal International Power Sockets" },
  { icon: Lock, label: "Individual Lockers" },
  { icon: Lightbulb, label: "Bed Lights" },
  { icon: PartyPopper, label: "Nightly Events" },
  { icon: Bath, label: "Towels" },
  { icon: Bed, label: "Capsule Beds" },
  { icon: Beer, label: "Poolside Bar" },
  { icon: Beer, label: "Beer Pong Tables" },
  { icon: Waves, label: "Pool Toys" },
  { icon: LockKeyhole, label: "Padlock Rental" },
  { icon: Waves, label: "Surf Lesson" }
];

const ROOMS = [
  {
    image: "/layday_gilit/room_160k.jpeg",
    title: "STANDARD 1 BED MIXED DORM",
    originalPrice: "IDR 160,000",
    discountPrice: "IDR 112,000",
    savings: "SAVE 30%",
    details: "Sleeps 1 | Single Bed | Ensuite Bathroom",
    cloudbedsId: "672818"
  },
  {
    image: "/layday_gilit/room_200k.jpeg",
    title: "STANDARD 2 BED MIXED DORM",
    originalPrice: "IDR 200,000",
    discountPrice: "IDR 140,000",
    savings: "SAVE 30%",
    details: "Sleeps 1 | Single Bed | Ensuite Bathroom",
    cloudbedsId: "672820"
  },
  {
    image: "/layday_gilit/room_800k.jpeg",
    title: "PRIVATE ROOM",
    originalPrice: "IDR 800,000",
    discountPrice: "IDR 560,000",
    savings: "SAVE 30%",
    details: "Sleeps 2 | Double Bed | Ensuite Bathroom",
    cloudbedsId: "672822"
  },
  {
    image: "/layday_gilit/room_900k.jpeg",
    title: "PREMIUM PRIVATE ROOM",
    originalPrice: "IDR 900,000",
    discountPrice: "IDR 630,000",
    savings: "SAVE 30%",
    details: "Sleeps 2 | Double Bed | Ensuite Bathroom",
    cloudbedsId: "672821"
  }
];

const DESTINATIONS = [
  { image: "/lay_day_gilit/Trawangan_Night_Market.jpeg", title: "Trawangan Night Market", type: "attraction" },
  { image: "/lay_day_gilit/Malibu_Island_Padel.jpeg", title: "Malibu Island Padel", type: "activities" },
  { image: "/lay_day_gilit/Bongkas_Surf_Spot.jpeg", title: "Bongkas Surf Spot", type: "activities" },
  { image: "/lay_day_gilit/Turtle_Point_Snorkelling.jpeg", title: "Turtle Point Snorkelling", type: "beach" },
  { image: "/lay_day_gilit/Horse_Riding.jpeg", title: "Horse Riding", type: "activities" },
  { image: "/lay_day_gilit/Gili_Meno_Island.jpeg", title: "Gili Meno Island", type: "monument" }
];

export function HalloweenGiliTLpClient() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);

  // Central booking function with direct Cloudbeds 30% off promo URL and attribution decoration
  const handleBooking = (roomParams?: Record<string, string | number | undefined>) => {
    if (typeof window === "undefined") return;

    localStorage.setItem("booking_origin", "gilit");
    sessionStorage.setItem("booking_origin", "gilit");

    // Meta Pixel InitiateCheckout
    if ((window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout", {
        content_name: "Lay Day Gili T - Halloween 30% Off Direct Booking",
        currency: "IDR",
        promo: "HALLOWEEN2026",
      });
    }

    // Google Analytics / Google Ads begin_checkout & conversion
    if ((window as any).gtag) {
      (window as any).gtag("event", "begin_checkout", {
        currency: "IDR",
        items: [{ item_name: "Lay Day Gili T - Halloween 30% Off Direct Booking" }],
      });

      const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID_GILIT || "AW-18224532346";
      const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_GILIT;
      if (adsId && adsLabel) {
        (window as any).gtag("event", "conversion", {
          send_to: `${adsId}/${adsLabel}`,
        });
      }
    }

    // GTM dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "begin_checkout",
      venue: "gilit",
      promo: "HALLOWEEN2026",
      discount: "30%",
      ecommerce: {
        currency: "IDR",
        items: [{ item_name: "Lay Day Gili T - Halloween 30% Off" }],
      },
    });

    // Build the direct booking URL with promo=HALLOWEEN2026 and attribution parameters
    try {
      const url = new URL("https://hotels.cloudbeds.com/en/reservation/4fbPDV?promo=HALLOWEEN2026&currency=idr");
      const attribution = getAttributionParams();
      Object.entries(attribution).forEach(([key, val]) => {
        if (val) url.searchParams.set(key, val);
      });
      if (roomParams) {
        Object.entries(roomParams).forEach(([k, v]) => {
          if (v !== undefined && v !== null && v !== "") {
            url.searchParams.set(k, String(v));
          }
        });
      }
      window.open(url.toString(), "_blank");
    } catch {
      window.open("https://hotels.cloudbeds.com/en/reservation/4fbPDV?promo=HALLOWEEN2026&currency=idr", "_blank");
    }
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 700;
      carouselRef.current.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  if (!hasMounted) return <div className="min-h-screen bg-[#F6F4EE]" />;

  return (
    <div ref={containerRef} className="bg-[#F6F4EE] text-[#141416] font-sans selection:bg-[#D71920] selection:text-white relative overflow-x-hidden">
      
      {/* Sticky Halloween Top Bar */}
      <aside aria-label="Halloween promotion banner" className="sticky top-0 z-50 bg-[#D71920] text-white py-2 px-3 text-center border-b border-black/20 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-[10px] md:text-xs font-heading tracking-widest uppercase font-bold flex-wrap">
          <span className="inline-flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            <span>HALLOWEEN PROMO:</span>
          </span>
          <span className="bg-white text-[#D71920] px-2 py-0.5 font-black">STAY 3 NIGHTS &amp; GET 30% OFF</span>
          <span className="hidden sm:inline">• CHECK-IN OCT 28, 29 &amp; 30 •</span>
          <button 
            onClick={() => handleBooking()}
            className="underline hover:text-black font-extrabold cursor-pointer ml-1 tracking-wider"
          >
            CLAIM NOW &rarr;
          </button>
        </div>
      </aside>

      {/* 1. Hero */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src={ASSETS.hero} 
            alt="Lay Day Gili T Hero" 
            fill 
            priority
            className="object-cover scale-105 brightness-[0.75] contrast-[1.05]"
            sizes="100vw"
          />
        </motion.div>
        
        {/* Dark Vignette / Red Halftone Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />

        {/* Spider Web Corner Graphic Overlay */}
        <div className="absolute top-2 right-2 w-32 h-32 md:w-56 md:h-56 z-20 pointer-events-none opacity-85">
          <SpiderWeb className="w-full h-full drop-shadow-[0_2px_8px_rgba(215,25,32,0.4)]" />
        </div>
        <div className="absolute bottom-4 left-2 w-28 h-28 md:w-44 md:h-44 z-20 pointer-events-none opacity-75 transform rotate-180">
          <SpiderWeb className="w-full h-full drop-shadow-[0_2px_8px_rgba(215,25,32,0.4)]" />
        </div>
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 py-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Top Red Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D71920] text-white text-[10px] md:text-xs font-heading tracking-[3px] uppercase font-bold shadow-lg mb-4">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>HALLOWEEN SPECIAL OFFER</span>
            </div>

            {/* Flyer Title Visual Identity */}
            <div className="relative my-2">
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-heading font-black text-[#D71920] tracking-wider leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                GILI T
              </h1>
            </div>

            {/* STAY 3 NIGHTS GET 30% OFF Display - Placed right below title */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-4 mb-4">
              <span className="text-white font-heading text-base sm:text-xl md:text-2xl font-black tracking-widest uppercase drop-shadow-md">
                STAY 3 NIGHTS
              </span>
              <span className="bg-[#D71920] text-white px-3 py-1 font-heading text-xl sm:text-2xl md:text-3xl font-black tracking-wider uppercase shadow-2xl border-2 border-white">
                GET 30% OFF
              </span>
            </div>

            {/* Subtitle */}
            <p className="max-w-xl mx-auto text-white/95 font-medium tracking-wide text-base md:text-lg leading-relaxed drop-shadow-md">
              Experience the legendary island life in Lay Day Gili T with an exclusive Halloween treat:
              <span className="block mt-1">
                <strong className="text-white font-bold whitespace-nowrap">get 30% off</strong> when you book 3 nights.
              </span>
            </p>

            {/* Additional info date note - smaller and without a frame */}
            <p className="text-white/80 text-xs md:text-sm font-medium tracking-wider uppercase mt-4 mb-6 drop-shadow">
              Valid for check-ins from Oct 28th, 29th &amp; 30th
            </p>

            {/* Hero CTA Button */}
            <div className="flex flex-col items-center">
              <Button 
                onClick={() => handleBooking()}
                className="bg-[#D71920] text-white hover:bg-white hover:text-[#D71920] rounded-none h-14 px-10 md:px-14 font-heading font-black uppercase tracking-[3px] text-xs md:text-sm transition-all duration-300 shadow-2xl border-2 border-white/20 hover:border-[#D71920] hover:scale-105">
                CLAIM 30% OFF • BOOK NOW
              </Button>
              
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="opacity-50 mt-8"
              >
                <ChevronDown className="w-5 h-5 text-white" strokeWidth={1.5} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        
        {/* 2. Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D71920]/10 border border-[#D71920]/30 text-[#D71920] text-[10px] font-bold tracking-[2px] uppercase">
              <span>Halloween Special</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-heading tracking-widest leading-tight uppercase text-[#0D0E11]">
              THE <span className="text-[#D71920]">UNFILTERED</span> GILI LIFE
            </h2>
            
            <p className="text-sm md:text-base leading-relaxed font-medium text-black/75">
              Welcome to the island that never sleeps — especially this Halloween. Our Gili Trawangan sanctuary transforms into the ultimate social playground. Experience epic pool parties, crystal-clear water adventures, and lively island nights with an exclusive <strong>30% direct booking discount</strong>.
            </p>

            {/* Jagged Promo Callout Box */}
            <div className="bg-[#D71920]/5 border-l-4 border-[#D71920] p-4 text-xs md:text-sm font-medium text-black/85 space-y-1">
              <p className="font-bold uppercase tracking-wider text-[#D71920]">
                🎃 Special Promo Conditions:
              </p>
              <p>
                Valid for check-ins from <strong>Oct 28th, 29th &amp; 30th</strong>. Stay 3 nights or more to activate 30% savings on all dorms and private rooms.
              </p>
            </div>

            <div className="flex gap-4 pt-2">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <f.icon className="w-5 h-5 text-[#D71920] mb-1" />
                  <h4 className="text-[8px] font-bold tracking-widest uppercase">{f.title}</h4>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square border-[4px] md:border-[8px] border-white shadow-xl overflow-hidden group"
          >
            <Image src={ASSETS.pool} alt="Lay Day Gili T Pool" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
            <div className="absolute top-3 right-3 w-20 h-20 pointer-events-none opacity-80">
              <SpiderWeb className="w-full h-full" />
            </div>
            <div className="absolute bottom-3 left-3 bg-[#D71920] text-white px-3 py-1 font-heading text-[10px] tracking-widest uppercase font-bold shadow-md">
              GILI T POOL PARTIES
            </div>
          </motion.div>
        </div>

        {/* 3. Destinations Section */}
        <section className="mb-16 md:mb-24">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[#D71920] text-[10px] font-bold tracking-[3px] uppercase block mb-1">Explore Gili Trawangan</span>
              <h2 className="text-2xl md:text-4xl font-heading tracking-widest uppercase text-[#0D0E11]">
                OUR <span className="text-[#D71920]">DESTINATIONS</span>
              </h2>
            </div>
            <p className="text-xs md:text-sm text-black/60 max-w-md">
              From secret turtle reefs to bustling night markets, island adventures await right outside our doors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-lg font-medium opacity-80 mb-4 border-b border-black/10 pb-4">Nearby Places</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {DESTINATIONS.map((dest, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-24 h-24 relative flex-shrink-0 overflow-hidden border-2 border-white shadow-sm">
                      <Image src={dest.image} alt={dest.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="font-heading tracking-wider uppercase text-base md:text-lg leading-tight text-[#0D0E11] group-hover:text-[#D71920] transition-colors mb-1">{dest.title}</h4>
                      <span className="text-xs text-[#D71920] lowercase font-bold tracking-widest">{dest.type}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-6">
                <Button onClick={() => setIsModalOpen(true)} variant="outline" className="border-[#D71920] text-[#D71920] rounded-none px-8 py-4 h-auto font-bold uppercase tracking-widest text-xs hover:bg-[#D71920] hover:text-white transition-colors">
                  SEE MORE
                </Button>
              </div>
            </div>

            <div className="relative min-h-[400px] w-full border-[4px] md:border-[8px] border-white shadow-lg overflow-hidden bg-[#A3CAE1]/20">
               <div className="absolute top-0 left-0 w-full h-[calc(100%+32px)]">
                 <iframe 
                   width="100%" 
                   height="100%" 
                   frameBorder="0" 
                   scrolling="no" 
                   marginHeight={0} 
                   marginWidth={0} 
                   src="https://www.openstreetmap.org/export/embed.html?bbox=116.0200%2C-8.3650%2C116.0550%2C-8.3400&amp;layer=mapnik&amp;marker=-8.3508%2C116.0383" 
                   style={{ border: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                   title="Gili Trawangan Map"
                 ></iframe>
               </div>
               <div className="absolute bottom-0 right-0 bg-white/80 backdrop-blur-sm px-2 py-0.5 text-[10px] text-[#004A61] z-10 pointer-events-none">
                 Leaflet | © OpenStreetMap contributors
               </div>
            </div>
          </div>
        </section>

        {/* 4. Facilities Section */}
        <section className="mb-16 md:mb-24 py-12 md:py-16 border-y border-black/10 relative">
          <div className="absolute top-2 left-2 w-20 h-20 opacity-30 pointer-events-none">
            <SpiderWeb className="w-full h-full" />
          </div>
          <div className="text-center mb-12">
            <span className="text-[#D71920] text-[10px] font-bold tracking-[3px] uppercase block mb-1">Everything You Need</span>
            <h2 className="text-2xl md:text-4xl font-heading tracking-widest uppercase text-[#0D0E11]">
              FACILITIES + <span className="text-[#D71920]">AMENITIES</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-10 md:gap-x-12 md:gap-y-12">
            {FACILITIES.map((fac, i) => (
              <div key={i} className="flex flex-col items-center text-center w-[80px] md:w-[100px] group">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:-translate-y-2 group-hover:bg-[#D71920] group-hover:text-white transition-all duration-300">
                  <fac.icon className="w-6 h-6 md:w-8 md:h-8 text-[#0D0E11] group-hover:text-white stroke-[1.5] transition-colors" />
                </div>
                <span className="text-[10px] md:text-xs font-medium leading-tight opacity-80">{fac.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Accommodation Options Section with 30% OFF DISCOUNT PRICING */}
        <section className="mb-16 md:mb-24 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D71920] text-white text-[10px] font-heading tracking-widest uppercase font-bold mb-2">
              <span>DIRECT BOOKING 30% DISCOUNT APPLIED</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-heading tracking-widest uppercase text-[#0D0E11]">
              ACCOMMODATION <span className="text-[#D71920]">OPTIONS</span>
            </h2>
            <p className="text-xs md:text-sm text-black/60 max-w-md mx-auto mt-2">
              Choose your stay for Halloween week. Book 3 nights to claim 30% off direct rates.
            </p>
          </div>
          
          <div className="relative">
            <div ref={carouselRef} className="flex overflow-x-auto gap-6 md:gap-10 pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth">
              {ROOMS.map((room, i) => (
                <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[800px] bg-white flex flex-col md:flex-row shadow-xl border-[4px] md:border-[8px] border-white relative overflow-hidden">
                  
                  {/* Corner Promo Ribbon */}
                  <div className="absolute top-3 left-3 z-20 bg-[#D71920] text-white px-3 py-1 font-heading text-[10px] tracking-widest uppercase font-black shadow-md border border-white">
                    {room.savings} • HALLOWEEN PROMO
                  </div>

                  <div className="relative w-full md:w-1/2 h-[300px] md:h-[450px]">
                    <Image src={room.image} alt={room.title} fill className="object-cover" />
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-center w-full md:w-1/2">
                    <h3 className="text-xl md:text-2xl font-heading tracking-widest text-[#0D0E11] mb-2 uppercase">{room.title}</h3>
                    
                    {/* Price display with 30% off comparison */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs md:text-sm line-through text-black/40 font-bold">{room.originalPrice}</span>
                        <span className="text-xs text-[#D71920] font-black uppercase tracking-wider bg-red-50 px-2 py-0.5 border border-red-200">
                          -30% OFF
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="font-heading font-black text-2xl md:text-3xl text-[#D71920]">{room.discountPrice}</span>
                        <span className="text-xs text-black/60 font-medium">/ night</span>
                      </div>
                      <span className="text-[10px] text-black/50 block mt-1">
                        *Valid for 3-night check-ins Oct 28th, 29th &amp; 30th
                      </span>
                    </div>

                    <p className="text-sm opacity-70 font-medium mb-8">{room.details}</p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                      <Button 
                        onClick={() => handleBooking()} 
                        className="bg-[#D71920] text-white hover:bg-black rounded-none h-12 px-8 font-bold uppercase text-xs tracking-widest transition-colors w-full sm:w-auto shadow-md">
                        BOOK WITH 30% OFF
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Arrows */}
            <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-16 -right-16 justify-between pointer-events-none">
              <button onClick={() => scrollCarousel("left")} className="pointer-events-auto text-[#D71920] opacity-50 hover:opacity-100 transition-opacity">
                <ChevronLeft className="w-12 h-12" strokeWidth={1} />
              </button>
              <button onClick={() => scrollCarousel("right")} className="pointer-events-auto text-[#D71920] opacity-50 hover:opacity-100 transition-opacity">
                <ChevronRight className="w-12 h-12" strokeWidth={1} />
              </button>
            </div>
          </div>
        </section>

        {/* 6. Video Section */}
        <section className="mb-10 md:mb-16">
          <div className="flex flex-col items-center">
            <span className="text-[#D71920] text-[10px] font-bold tracking-[3px] uppercase block mb-1">Gili T Experience</span>
            <h2 className="text-xl md:text-3xl font-heading tracking-widest uppercase mb-6 text-[#0D0E11]">
              SEE THE <span className="text-[#D71920]">VIBE</span>
            </h2>
            <div className="w-full max-w-[280px] aspect-[9/16] border-[4px] border-white shadow-xl relative overflow-hidden bg-white">
              <AnimatePresence mode="wait">
                {!isVideoPlaying ? (
                  <motion.div 
                    key="thumbnail"
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 cursor-pointer z-10"
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    <Image src={ASSETS.vibes} alt="Lay Day Gili T Vibe" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#D71920] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/6fdKjRXdurw?autoplay=1&mute=0&loop=1&playlist=6fdKjRXdurw&controls=1&rel=0&modestbranding=1&playsinline=1`} 
                    title="Lay Day Gili T Vibe Video" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 7. Carousel (The Tribe Scenes) */}
        <section className="mb-10 md:mb-16 overflow-hidden relative">
          <div className="text-center mb-6">
            <span className="text-[#D71920] text-[10px] font-bold tracking-[3px] uppercase block mb-1">Island Energy</span>
            <h2 className="text-xl md:text-4xl font-heading tracking-widest uppercase text-[#0D0E11]">
              THE <span className="text-[#D71920]">TRIBE</span> SCENES
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-4">
            {[ASSETS.pool, ASSETS.social, ASSETS.rooms, ASSETS.vibes].map((img, i) => (
              <div key={i} className="relative min-w-[75vw] md:min-w-[350px] aspect-[4/5] border-[4px] border-white shadow-md flex-shrink-0">
                <Image src={img} alt="Lay Day Gili T Scene" fill className="object-cover" sizes="(max-width: 768px) 80vw, 30vw" />
              </div>
            ))}
          </div>
        </section>

        {/* 8. Final CTA with Halloween Promo Identity */}
        <section className="text-center bg-[#0D0E11] text-white p-8 md:p-14 relative overflow-hidden border-4 border-[#D71920]">
          {/* Spider web corners */}
          <div className="absolute top-2 right-2 w-32 h-32 pointer-events-none opacity-40">
            <SpiderWeb className="w-full h-full" />
          </div>
          <div className="absolute bottom-2 left-2 w-32 h-32 pointer-events-none opacity-40 transform rotate-180">
            <SpiderWeb className="w-full h-full" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <p className="text-white/80 text-xs md:text-sm font-medium tracking-wider uppercase">
              Valid for check-ins from Oct 28th, 29th &amp; 30th
            </p>
            
            <h2 className="text-3xl md:text-6xl font-heading font-black tracking-widest uppercase leading-tight">
              STAY 3 NIGHTS <br />
              <span className="text-[#D71920]">GET 30% OFF</span>
            </h2>

            <p className="text-sm md:text-base opacity-80 max-w-lg mx-auto font-medium">
              Don't miss the biggest island Halloween in Bali &amp; Lombok. Direct booking discount is automatically applied when you book directly with this link.
            </p>

            <div className="pt-2">
              <Button 
                onClick={() => handleBooking()}
                className="bg-[#D71920] text-white hover:bg-white hover:text-[#D71920] rounded-none h-14 px-12 md:px-16 font-heading font-black uppercase tracking-[3px] text-xs md:text-sm transition-all duration-300 shadow-2xl border-2 border-white/20 hover:border-[#D71920] hover:scale-105">
                BOOK DIRECT WITH 30% OFF
              </Button>
            </div>
          </div>

          <div className="absolute inset-0 z-0 opacity-10">
            <Image src={ASSETS.vibes} alt="Lay Day Gili T Background" fill className="object-cover grayscale" />
          </div>
        </section>

      </div>
      
      {/* Destinations Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/75 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F6F4EE] w-full max-w-4xl max-h-full overflow-y-auto shadow-2xl flex flex-col custom-scrollbar border-2 border-[#D71920]"
            >
              <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background-color: rgba(215, 25, 32, 0.4);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background-color: #D71920;
                }
              `}</style>
              <div className="sticky top-0 bg-[#F6F4EE] z-10 p-6 flex justify-between items-center border-b border-black/10">
                <h2 className="text-xl font-heading tracking-widest uppercase text-[#0D0E11]">MORE PLACES TO VISIT IN GILI T</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-[#0D0E11] hover:text-[#D71920] transition-colors cursor-pointer">
                  <X className="w-8 h-8" />
                </button>
              </div>
              <div className="p-6 md:p-10 space-y-10">
                {DESTINATIONS.map((dest, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="w-full sm:w-[280px] aspect-[16/10] relative flex-shrink-0">
                      <Image src={dest.image} alt={dest.title} fill className="object-cover shadow-sm border-2 border-white" />
                    </div>
                    <div>
                      <span className="text-[#D71920] lowercase font-bold tracking-widest text-[10px] mb-2 block">{dest.type}</span>
                      <h3 className="text-2xl md:text-3xl font-heading tracking-widest text-[#0D0E11] uppercase leading-tight">{dest.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
