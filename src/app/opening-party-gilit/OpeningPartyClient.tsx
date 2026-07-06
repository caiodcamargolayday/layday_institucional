"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown, X, Check, ArrowRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";

// ─── Form questions ───────────────────────────────────────────────────────────
type Question =
  | { type: "text";  q: string; placeholder: string };

const QUESTIONS: Question[] = [
  { type: "text", q: "What's your name?", placeholder: "Your full name" },
  { type: "text", q: "Your email address:", placeholder: "hello@email.com" },
  { type: "text", q: "Your phone number (with country code):", placeholder: "+61 400 000 000" },
  { type: "text", q: "How many people in your group?", placeholder: "e.g., 2, 4, just me" },
];

const WA_NUMBER = "6281138111183";
function buildWALink(answers: Record<number, string>) {
  const name = answers[0] || "there";
  const groupSize = answers[3] || "1";
  const email = answers[1] || "";
  const phone = answers[2] || "";
  const msg = encodeURIComponent(
    `Hey! 👋 My name is ${name}. I just filled out the form for the Lay Day Gili T Grand Opening Party! We are a group of ${groupSize}. My email is ${email} and phone is ${phone}.`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

// ─── Form Modal ───────────────────────────────────────────────────────────────
function FormModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const total = QUESTIONS.length;
  const current = QUESTIONS[step];
  const progress = Math.round((step / total) * 100);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => {
        window.location.href = buildWALink(answers);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [done, answers]);

  const submitToSheets = async (finalAnswers: Record<number, string>) => {
    try {
      const payload = {
        timestamp: new Date().toISOString(),
        name: finalAnswers[0] ?? "",
        email: finalAnswers[1] ?? "",
        phone: finalAnswers[2] ?? "",
        group_size: finalAnswers[3] ?? "",
      };
      await fetch("/api/opening-party-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.error("Sheet submission failed:", e);
    }
  };

  const finishForm = async (finalAnswers: Record<number, string>) => {
    if (submitting || done) return;
    setSubmitting(true);
    await submitToSheets(finalAnswers);
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'Contact');
    }
    setSubmitting(false);
    setDone(true);
  };

  const next = () => {
    if (submitting || done) return;
    if (step < total - 1) setStep((s) => s + 1);
    else finishForm(answers);
  };

  const canContinue = answers[step] !== undefined && answers[step].trim() !== "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-[#FFC2E2] text-[#4A002A] overflow-y-auto h-[100dvh]"
    >
      {/* Progress bar */}
      <div className="w-full h-1 bg-[#4A002A]/10">
        <motion.div
          className="h-full bg-[#E6007E]"
          animate={{ width: `${done ? 100 : progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#4A002A]/10">
        <span className="font-heading tracking-widest text-sm uppercase text-[#4A002A]/50">
          Grand Opening — Guestlist
        </span>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center hover:bg-[#4A002A]/10 rounded-full transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* ── SUCCESS SCREEN ── */}
        {done && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 gap-6 max-w-lg mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-[#E6007E] flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-heading text-3xl md:text-5xl tracking-widest uppercase leading-tight">
              You're on the list!
            </h2>
            <p className="text-sm font-medium opacity-70 leading-relaxed max-w-sm">
              We've got your details. Redirecting you to WhatsApp to finalize your spot...
            </p>
            <a
              href={buildWALink(answers)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white font-bold uppercase tracking-[3px] text-xs px-10 h-14 shadow-xl hover:bg-[#1ebe5d] transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              MESSAGE US ON WHATSAPP
            </a>
            <button
              onClick={onClose}
              className="text-xs text-[#4A002A]/40 hover:text-[#4A002A]/70 uppercase tracking-widest font-bold transition"
            >
              Close
            </button>
          </motion.div>
        )}

        {/* ── QUESTIONS ── */}
        {!done && (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center justify-center px-6 py-12 pb-32 max-w-xl mx-auto w-full gap-8"
          >
            <span className="self-start text-[10px] font-bold tracking-[3px] uppercase text-[#E6007E]">
              {step + 1} / {total}
            </span>

            <h3 className="self-start font-heading text-2xl md:text-3xl tracking-wide leading-snug uppercase">
              {current.q}
            </h3>

            {current.type === "text" && (
              <div className="w-full flex flex-col gap-4">
                <input
                  type="text"
                  placeholder={current.placeholder}
                  value={answers[step] ?? ""}
                  onChange={(e) => setAnswers((a) => ({ ...a, [step]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && canContinue && next()}
                  className="w-full border-b-2 border-[#4A002A]/30 focus:border-[#E6007E] bg-transparent py-3 text-lg font-medium outline-none placeholder:text-[#4A002A]/30 transition-colors"
                  autoFocus
                />
                <button
                  onClick={next}
                  disabled={!canContinue || submitting}
                  className="self-start flex items-center gap-2 bg-[#E6007E] text-white font-bold uppercase tracking-[3px] text-xs px-8 h-11 disabled:opacity-30 hover:bg-[#4A002A] transition-colors duration-300 mt-2"
                >
                  OK <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
const ASSETS = {
  hero: "/gilit_opening_party/hero_section_v2.png",
  heroMobile: "/gilit_opening_party/mobile_version_v2.png",
  video: "/gilit_opening_party/LDGT-Grand Opening.mp4",
  flyer: "/gilit_opening_party/LDGT-Grand Opening Flyer-IGF.png"
};

const COLORS = {
  lightPink: "#FFC2E2", // Soft light pink
  darkPink: "#E6007E",  // Vibrant dark pink
  white: "#FFFFFF",
  dark: "#4A002A",
};

export function OpeningPartyClient() {
  const [hasMounted, setHasMounted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  if (!hasMounted) return <div className="min-h-screen" style={{ backgroundColor: COLORS.lightPink }} />;

  return (
    <div ref={containerRef} className="font-sans" style={{ backgroundColor: COLORS.lightPink, color: COLORS.darkPink }}>
      
      <AnimatePresence>
        {formOpen && <FormModal onClose={() => setFormOpen(false)} />}
      </AnimatePresence>
      {/* 1. Hero Image */}
      <section className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center text-center bg-black">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src={ASSETS.hero}
            alt="Lay Day Gili T Grand Opening Hero Desktop"
            fill
            className="object-cover opacity-90 hidden md:block"
            priority
          />
          <Image 
            src={ASSETS.heroMobile}
            alt="Lay Day Gili T Grand Opening Hero Mobile"
            fill
            className="object-cover opacity-90 block md:hidden"
            priority
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
        
        <div className="relative z-20 px-4 flex flex-col items-center w-full mt-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            <div className="flex flex-col items-center">
              <Button 
                onClick={() => {
                  setFormOpen(true);
                }}
                className="text-white hover:bg-white rounded-none h-14 md:h-16 px-12 md:px-16 font-bold uppercase tracking-[4px] md:tracking-[6px] text-xs md:text-sm transition-all duration-300 shadow-2xl mb-8 border-none"
                style={{ backgroundColor: COLORS.darkPink }}
                onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.darkPink; e.currentTarget.style.backgroundColor = COLORS.white; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = COLORS.white; e.currentTarget.style.backgroundColor = COLORS.darkPink; }}
              >
                SECURE THE SPOT
              </Button>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="opacity-80"
              >
                <ChevronDown className="w-8 h-8 text-white" strokeWidth={1.5} />
             </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Content */}
      <section className="py-20 md:py-32 px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading tracking-widest leading-tight uppercase mb-8" style={{ color: COLORS.darkPink }}>
              IT’S FINALLY TIME
            </h2>
            <div className="space-y-6 text-base md:text-2xl font-medium leading-relaxed" style={{ color: COLORS.dark }}>
              <p>
                Join us for the Lay Day Gili T Grand Opening on Friday, 10th of July.
              </p>
              <p>
                The party kicks off at 2pm, with DJs, drink specials, free BBQ & finger food, and an afterparty keeping things going until 3AM.
              </p>
              <p>
                Join the exclusive guestlist and secure your spot. Guests who sign up through this page will unlock special opening-night perks and exclusive benefits available only to the guestlist.
              </p>
              <p className="font-bold pt-6 text-xl md:text-3xl uppercase tracking-widest" style={{ color: COLORS.darkPink }}>
                Grab your crew and come celebrate with us. See you there.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Video Below Content */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-xs md:max-w-md mx-auto">
          <div className="relative aspect-[9/16] shadow-2xl border-[4px] md:border-[8px] rounded-xl overflow-hidden" style={{ borderColor: COLORS.white }}>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              controls
              className="w-full h-full object-cover"
            >
              <source src={ASSETS.video} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* 4. Flyers */}
      <section className="py-16 md:py-24 px-4" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-heading tracking-widest uppercase" style={{ color: COLORS.darkPink }}>
              THE DETAILS
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] border-[4px] md:border-[8px] overflow-hidden shadow-2xl mx-auto"
            style={{ borderColor: COLORS.white }}
          >
            <Image 
              src={ASSETS.flyer} 
              alt="Grand Opening Flyer" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </motion.div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-32 px-4 relative overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <Image src={ASSETS.hero} alt="BG" fill className="object-cover opacity-10 blur-md scale-110 grayscale" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(255, 194, 226, 0.9)' }} />
        </div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-5xl md:text-7xl font-heading tracking-widest uppercase leading-none" style={{ color: COLORS.darkPink }}>
            DON'T MISS OUT
          </h2>
          <Button 
            onClick={() => {
              setFormOpen(true);
            }}
            className="text-white hover:bg-white rounded-none h-16 md:h-20 px-10 md:px-24 font-bold uppercase tracking-[4px] md:tracking-[10px] text-sm md:text-lg transition-all duration-500 shadow-xl border-none"
            style={{ backgroundColor: COLORS.darkPink }}
            onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.darkPink; e.currentTarget.style.backgroundColor = COLORS.white; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = COLORS.white; e.currentTarget.style.backgroundColor = COLORS.darkPink; }}
          >
            SECURE THE SPOT
          </Button>
          <div className="pt-4 opacity-70 tracking-[4px] uppercase text-[10px] md:text-xs font-bold flex flex-wrap items-center justify-center gap-3" style={{ color: COLORS.dark }}>
            <span>#party #dontmissout</span>
            <a 
              href="https://www.instagram.com/laydaygilit/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:opacity-80 transition-opacity text-[#E6007E]"
            >
              <FaInstagram className="w-3 h-3 md:w-4 md:h-4" />
              @laydaygilit
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
