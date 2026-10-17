"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import {
  MapPin,
  CheckCircle2,
  UploadCloud,
  FileText,
  Trash2,
  Send,
  AlertCircle,
  Briefcase,
  ExternalLink,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Brand Assets ─────────────────────────────────────────────────────────────
const ASSETS = {
  laydayLogo: "/logo-layday.png",
  laydayPool: "/lay_day_uluwatu/hero_layday_pool.jpg",
  tuskInterior: "/lay_day_uluwatu/hero_tusk_interior.jpg",
};

// ─── The 9 Role Requirements (Directly from official flyer) ────────────────────
const FLYER_REQUIREMENTS = [
  "Proven marketing management experience, ideally in Hospitality, F&B, Nightlife, or Lifestyle.",
  "Strong experience in Paid Social: Meta Ads & Google Ads.",
  "Strong knowledge of TikTok, Instagram & YouTube, including trends & best practices.",
  "Experience coordinating photo/video shoots and working with external creators, photographers & videographers.",
  "Experience managing influencer & content creator relationships and visits.",
  "Excellent organization & project management, managing multiple campaigns/priorities across 2 business units simultaneously.",
  "Strong communication & interpersonal skills, with close collaboration with operational teams.",
  "Creative eye for content & brand storytelling, with the ability to adapt tone across different brand identities.",
  "Fluent English required; additional languages are a plus.",
];

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  experienceYears: string;
  baliAvailability: string;
  startDate: string;
  digitalAds: string;
  hospitalityExp: string;
  portfolio: string;
  cvFileName: string;
  cvFileType: string;
  cvBase64: string;
  cvFileSize: number;
}

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  experienceYears: "3-5 years",
  baliAvailability: "Currently based in Bali",
  startDate: "Immediately",
  digitalAds: "Meta & Google Ads mastery",
  hospitalityExp: "Extensive Hospitality & F&B",
  portfolio: "",
  cvFileName: "",
  cvFileType: "",
  cvBase64: "",
  cvFileSize: 0,
};

export function HiringMarketingManagerClient() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMessage(null);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Convert File to Base64
  const handleFile = (file: File) => {
    if (!file.name.match(/\.(pdf|doc|docx)$/i)) {
      setErrorMessage("Please upload a PDF or Word document (.pdf, .docx, .doc).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File exceeds 10MB limit. Please upload a smaller document.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] || result;
      setFormData((prev) => ({
        ...prev,
        cvFileName: file.name,
        cvFileType: file.type || "application/pdf",
        cvBase64: base64,
        cvFileSize: file.size,
      }));
      setErrorMessage(null);
    };
    reader.onerror = () => {
      setErrorMessage("Failed to read file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const removeCV = () => {
    setFormData((prev) => ({
      ...prev,
      cvFileName: "",
      cvFileType: "",
      cvBase64: "",
      cvFileSize: 0,
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your WhatsApp / phone number.");
      return;
    }
    if (!formData.cvBase64) {
      setErrorMessage("Please upload your CV / Resume before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const now = new Date();
    const formattedTimestamp = now.toLocaleString("en-GB", {
      timeZone: "Asia/Makassar",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).replace(",", "");

    let phoneStr = formData.phone.trim();
    if (!phoneStr.startsWith("'")) {
      phoneStr = "'" + phoneStr;
    }

    const payload = {
      "Date/Time": formattedTimestamp,
      "Full name": formData.fullName.trim(),
      "Email": formData.email.trim(),
      "Phone": phoneStr,
      "Years of marketing management experience": formData.experienceYears,
      "Availability in Bali/Uluwatu": formData.baliAvailability,
      "Available to Start by Oct 15th": formData.startDate,
      "Digital Ads Experience": formData.digitalAds,
      "Hospitality/F&B Marketing Experience": formData.hospitalityExp,
      "Team Leadership Experience": "Yes, managed creators & cross-functional teams",
      "Portfolio / Links": formData.portfolio.trim(),
      "CV File Name": formData.cvFileName,

      // Normalized keys
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: phoneStr,
      experienceYears: formData.experienceYears,
      baliAvailability: formData.baliAvailability,
      startDate: formData.startDate,
      digitalAds: formData.digitalAds,
      hospitalityExp: formData.hospitalityExp,
      portfolio: formData.portfolio.trim(),
      cvFileName: formData.cvFileName,
      cvFileType: formData.cvFileType,
      cvBase64: formData.cvBase64,
      cvFileSize: formData.cvFileSize,
      targetEmail: "uluwatuhrm@staylayday.com",
      emailSubject: `Marketing Manager - ${formData.fullName.trim()}`,
      position: "Marketing Manager - Lay Day & Tusk Uluwatu",
      source: "hiring-marketing-manager-lp",
    };

    try {
      // 1. Try Next.js API route first
      let sent = false;
      try {
        const apiRes = await fetch("/api/hiring-marketing-manager-apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (apiRes.ok) sent = true;
      } catch {
        // Fallback to direct Apps Script webhook if API route unavailable (e.g. static export)
      }

      // 2. Direct Webhook fallback
      const directWebhook =
        process.env.NEXT_PUBLIC_HIRING_MARKETING_MANAGER_SHEETS_URL ||
        "https://script.google.com/macros/s/AKfycbyK1weMDJ6SVOVt7aaliLRk7UAcTdo_WZ4dFFL00WFIBg3Ppev7Qu6WeLvD3lzD6MF9DA/exec";

      if (!sent && directWebhook) {
        await fetch(directWebhook, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
          mode: "no-cors",
        });
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMessage("Could not complete automatic upload. Please email your CV directly to uluwatuhrm@staylayday.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0A2417] text-[#F3F1EA] font-sans">
      {/* ─── Top Bar ──────────────────────────────────────────────────────── */}
      <nav className="w-full bg-[#0A2417] border-b border-white/10 px-4 md:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-20 h-9">
              <Image src={ASSETS.laydayLogo} alt="Lay Day Hostel" fill unoptimized className="object-contain" priority />
            </div>
            <span className="text-white/30 text-lg">/</span>
            <span className="font-serif tracking-[0.2em] text-lg font-bold uppercase text-white">TUSK</span>
          </div>
          <Button
            onClick={scrollToForm}
            className="bg-[#E5C07B] hover:bg-[#d4ad64] text-[#0A2417] font-bold text-xs uppercase tracking-[2px] px-5 py-2 rounded-full transition-transform active:scale-95"
          >
            Apply Now &darr;
          </Button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Address Tag */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-[#E5C07B] text-xs font-semibold tracking-[2px] uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#E5C07B]" />
            Jl. Pantai Bingin No.1, Pecatu, Uluwatu, Bali
          </div>
        </div>

        {/* ─── Split Visual Hero (Matching Campaign Flyer) ───────────────────── */}
        <div className="relative mb-10 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-900">
          <div className="grid grid-cols-1 md:grid-cols-2 h-[500px] md:h-[460px] relative">
            {/* Left: Lay Day Pool */}
            <div className="relative h-[250px] md:h-full w-full overflow-hidden">
              <Image
                src={ASSETS.laydayPool}
                alt="Lay Day Uluwatu Pool"
                fill
                priority
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 drop-shadow-md">
                <div className="relative w-24 h-10">
                  <Image src={ASSETS.laydayLogo} alt="Lay Day" fill unoptimized className="object-contain" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
                <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#E5C07B] block">Brand Unit 01</span>
                <p className="font-heading text-lg uppercase tracking-wide">Lay Day Hostel</p>
              </div>
            </div>

            {/* Right: Tusk Dining */}
            <div className="relative h-[250px] md:h-full w-full overflow-hidden border-t md:border-t-0 md:border-l border-white/20">
              <Image
                src={ASSETS.tuskInterior}
                alt="Tusk Restaurant & Lounge"
                fill
                priority
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 right-4 drop-shadow-md">
                <span className="font-serif tracking-[0.25em] text-2xl font-bold uppercase text-white">TUSK</span>
              </div>
              <div className="absolute bottom-4 right-4 text-right text-white drop-shadow-md">
                <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#E5C07B] block">Brand Unit 02</span>
                <p className="font-serif text-lg uppercase tracking-wide">Tusk Restaurant & Lounge</p>
              </div>
            </div>

            {/* Center Floating Badge */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none px-4 z-10">
              <div className="bg-[#0A2417]/95 backdrop-blur-md px-6 py-3 md:px-10 md:py-5 rounded-2xl border border-[#E5C07B]/40 shadow-2xl text-center">
                <span className="block font-serif tracking-[0.3em] text-xs font-semibold uppercase text-[#E5C07B] mb-0.5">We Are</span>
                <h1 className="font-serif text-3xl md:text-5xl font-extrabold uppercase tracking-[0.15em] text-white">HIRING</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Role Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-[0.1em] uppercase text-white mb-3">
            MARKETING MANAGER
          </h2>
          <p className="text-sm md:text-base text-white/80 leading-relaxed font-light">
            Full-time role in Uluwatu, Bali. Lead marketing, paid advertising, and creator partnerships across both <strong className="text-white font-medium">Lay Day Hostel</strong> and <strong className="text-white font-medium">Tusk Uluwatu</strong>.
          </p>
        </div>

        {/* ─── 9 Role Requirements (Directly from flyer) ─────────────────────── */}
        <section className="bg-[#0D2E1F] border border-white/15 rounded-2xl p-6 md:p-8 mb-10 shadow-xl">
          <h3 className="font-serif text-xl md:text-2xl font-bold uppercase tracking-wider text-[#E5C07B] mb-5 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#E5C07B]" />
            What We Are Looking For
          </h3>
          <ul className="space-y-3">
            {FLYER_REQUIREMENTS.map((req, i) => (
              <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-white/90 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#E5C07B] flex-shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Application Form ─────────────────────────────────────────────── */}
        <section ref={formRef} id="apply-form" className="bg-[#0D2E1F] border border-[#E5C07B]/30 rounded-2xl p-6 md:p-10 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#E5C07B] block mb-1">
              Direct Application
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold uppercase text-white mb-2">
              Apply For Marketing Manager
            </h3>
            <p className="text-xs text-white/70">
              Submit your details and CV below. Applications go directly to the founders & HR team.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center max-w-md mx-auto">
              <CheckCircle2 className="w-16 h-16 text-[#E5C07B] mx-auto mb-4" />
              <h4 className="font-serif text-2xl uppercase tracking-wide text-white mb-2">Application Received!</h4>
              <p className="text-xs text-white/80 leading-relaxed mb-6">
                Thank you for applying, <strong className="text-[#E5C07B]">{formData.fullName}</strong>. Your profile and CV have been forwarded to our HR team at <strong className="text-white">uluwatuhrm@staylayday.com</strong>.
              </p>
              <Button
                onClick={() => {
                  setFormData(INITIAL_FORM);
                  setIsSubmitted(false);
                }}
                className="bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-[2px] px-6 py-2.5 rounded-full"
              >
                Submit Another Application
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center gap-3 text-red-200 text-xs">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 font-semibold mb-2">
                    Full Name *
                  </label>
                  <Input
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="bg-black/30 border-white/20 text-white placeholder:text-white/30 h-11 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 font-semibold mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="e.g. alex@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-black/30 border-white/20 text-white placeholder:text-white/30 h-11 rounded-xl"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp & Portfolio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 font-semibold mb-2">
                    WhatsApp / Phone Number *
                  </label>
                  <Input
                    required
                    placeholder="+62 812-3456-7890"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-black/30 border-white/20 text-white placeholder:text-white/30 h-11 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 font-semibold mb-2">
                    Portfolio / LinkedIn URL
                  </label>
                  <Input
                    placeholder="linkedin.com/in/... or drive link"
                    value={formData.portfolio}
                    onChange={(e) => handleInputChange("portfolio", e.target.value)}
                    className="bg-black/30 border-white/20 text-white placeholder:text-white/30 h-11 rounded-xl"
                  />
                </div>
              </div>

              {/* Experience & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 font-semibold mb-2">
                    Marketing Experience
                  </label>
                  <select
                    value={formData.experienceYears}
                    onChange={(e) => handleInputChange("experienceYears", e.target.value)}
                    className="w-full bg-black/30 border border-white/20 text-white text-xs h-11 px-3 rounded-xl outline-none focus:border-[#E5C07B]"
                  >
                    <option value="1-2 years" className="bg-[#0A2417] text-white">1–2 years</option>
                    <option value="3-5 years" className="bg-[#0A2417] text-white">3–5 years</option>
                    <option value="5+ years" className="bg-[#0A2417] text-white">5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 font-semibold mb-2">
                    Bali Availability
                  </label>
                  <select
                    value={formData.baliAvailability}
                    onChange={(e) => handleInputChange("baliAvailability", e.target.value)}
                    className="w-full bg-black/30 border border-white/20 text-white text-xs h-11 px-3 rounded-xl outline-none focus:border-[#E5C07B]"
                  >
                    <option value="Currently based in Bali" className="bg-[#0A2417] text-white">Based in Bali</option>
                    <option value="Willing to relocate immediately" className="bg-[#0A2417] text-white">Ready to relocate</option>
                    <option value="KITAS / Work Permit ready" className="bg-[#0A2417] text-white">KITAS / Indonesian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 font-semibold mb-2">
                    Earliest Start Date
                  </label>
                  <select
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    className="w-full bg-black/30 border border-white/20 text-white text-xs h-11 px-3 rounded-xl outline-none focus:border-[#E5C07B]"
                  >
                    <option value="Immediately" className="bg-[#0A2417] text-white">Immediately</option>
                    <option value="Within 2 weeks" className="bg-[#0A2417] text-white">Within 2 weeks</option>
                    <option value="Within 1 month" className="bg-[#0A2417] text-white">Within 1 month</option>
                  </select>
                </div>
              </div>

              {/* Paid Ads & Hospitality background */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 font-semibold mb-2">
                    Paid Ads Competency (Meta/Google)
                  </label>
                  <select
                    value={formData.digitalAds}
                    onChange={(e) => handleInputChange("digitalAds", e.target.value)}
                    className="w-full bg-black/30 border border-white/20 text-white text-xs h-11 px-3 rounded-xl outline-none focus:border-[#E5C07B]"
                  >
                    <option value="Meta & Google Ads mastery" className="bg-[#0A2417] text-white">Advanced (Meta & Google scaling)</option>
                    <option value="Meta Ads experienced" className="bg-[#0A2417] text-white">Intermediate (Meta Ads focus)</option>
                    <option value="Basic knowledge" className="bg-[#0A2417] text-white">Basic (Organic + boosting)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 font-semibold mb-2">
                    Hospitality / F&B Background
                  </label>
                  <select
                    value={formData.hospitalityExp}
                    onChange={(e) => handleInputChange("hospitalityExp", e.target.value)}
                    className="w-full bg-black/30 border border-white/20 text-white text-xs h-11 px-3 rounded-xl outline-none focus:border-[#E5C07B]"
                  >
                    <option value="Extensive Hospitality & F&B" className="bg-[#0A2417] text-white">Yes, Hostels / F&B / Nightlife</option>
                    <option value="Agency / Brand experience" className="bg-[#0A2417] text-white">Lifestyle agency / Brands</option>
                    <option value="Other marketing background" className="bg-[#0A2417] text-white">Other industry</option>
                  </select>
                </div>
              </div>

              {/* ─── Mandatory CV / Resume Upload ────────────────────────────── */}
              <div className="pt-2">
                <label className="block text-xs uppercase tracking-wider text-[#E5C07B] font-bold mb-2">
                  Upload CV / Resume * (PDF or DOCX, max 10MB)
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={onFileInputChange}
                  className="hidden"
                />

                {!formData.cvBase64 ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-[#E5C07B] bg-[#E5C07B]/10 scale-[1.01]"
                        : "border-white/20 hover:border-[#E5C07B]/60 bg-black/20 hover:bg-black/30"
                    }`}
                  >
                    <UploadCloud className="w-8 h-8 text-[#E5C07B] mx-auto mb-2" />
                    <p className="text-sm font-semibold text-white mb-1">
                      Click to choose CV or drag and drop here
                    </p>
                    <p className="text-xs text-white/50">
                      PDF or Word document (Maximum 10MB)
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-[#E5C07B]/40">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText className="w-6 h-6 text-[#E5C07B] flex-shrink-0" />
                      <div className="truncate">
                        <p className="text-sm font-medium text-white truncate">{formData.cvFileName}</p>
                        <p className="text-[11px] text-white/50">
                          {(formData.cvFileSize / (1024 * 1024)).toFixed(2)} MB &bull; Ready to submit
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeCV}
                      className="p-2 text-white/50 hover:text-red-400 transition-colors"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#E5C07B] hover:bg-[#d4ad64] text-[#0A2417] font-bold text-sm uppercase tracking-[2px] h-13 rounded-xl shadow-xl transition-transform active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#0A2417] border-t-transparent rounded-full animate-spin" />
                      Submitting Application...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Submit Application
                    </span>
                  )}
                </Button>
              </div>

              {/* Direct email info */}
              <div className="text-center pt-2 text-xs text-white/60">
                You can also email your CV and portfolio directly to{" "}
                <a
                  href="mailto:uluwatuhrm@staylayday.com?subject=Marketing%20Manager%20Application"
                  className="text-[#E5C07B] underline font-medium hover:text-white"
                >
                  uluwatuhrm@staylayday.com
                </a>
              </div>
            </form>
          )}
        </section>
      </main>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} Lay Day Hostels & Tusk Bali &bull; Jl. Pantai Bingin No.1, Pecatu, Uluwatu
      </footer>
    </div>
  );
}

// Export both default and named export to guarantee compatibility with all bundlers & export tools
export default HiringMarketingManagerClient;
