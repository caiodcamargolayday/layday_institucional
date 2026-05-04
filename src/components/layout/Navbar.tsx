"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 font-sans ${isScrolled ? 'bg-[#004A61] py-3 shadow-md' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo-layday.png" 
            alt="Lay Day Logo" 
            width={120} 
            height={40} 
            className="h-12 w-auto object-contain brightness-0 invert transition-transform duration-300 hover:scale-105" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/experiences" className="text-white text-[14px] font-bold uppercase tracking-[2px] hover:text-[#EE5B2B] transition-colors relative group">
            Experiences
          </Link>
          <Link href="/destinations" className="text-white text-[14px] font-bold uppercase tracking-[2px] hover:text-[#EE5B2B] transition-colors relative group">
            Destinations
          </Link>
          <Link href="/deals" className="text-white text-[14px] font-bold uppercase tracking-[2px] hover:text-[#EE5B2B] transition-colors relative group">
            Deals
          </Link>
          <Link href="/careers" className="text-white text-[14px] font-bold uppercase tracking-[2px] hover:text-[#EE5B2B] transition-colors relative group">
            Careers
          </Link>
          <Link href="/contact-us" className="text-white text-[14px] font-bold uppercase tracking-[2px] hover:text-[#EE5B2B] transition-colors relative group">
            Contact Us
          </Link>
          
          <Button className="bg-[#EE5B2B] text-white hover:bg-[#d64e22] font-bold uppercase tracking-[2px] text-[13px] px-[25px] py-[10px] h-auto rounded-none transition-transform hover:scale-105 shadow-lg">
            Book Now
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="text-white hover:bg-white/20 transition-colors" />}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#EBE6D8] border-l-[#083248]/10 text-[#083248]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col space-y-6 mt-12">
                <Link href="/experiences" className="text-sm font-bold uppercase tracking-widest hover:text-[#EE5B2B] transition-colors">Experiences</Link>
                <Link href="/destinations" className="text-sm font-bold uppercase tracking-widest hover:text-[#EE5B2B] transition-colors">Destinations</Link>
                <Link href="/deals" className="text-sm font-bold uppercase tracking-widest hover:text-[#EE5B2B] transition-colors">Deals</Link>
                <Link href="/careers" className="text-sm font-bold uppercase tracking-widest hover:text-[#EE5B2B] transition-colors">Careers</Link>
                <Link href="/contact-us" className="text-sm font-bold uppercase tracking-widest hover:text-[#EE5B2B] transition-colors">Contact Us</Link>
                <Button className="bg-[#EE5B2B] text-white hover:bg-[#d64e22] font-bold uppercase tracking-widest mt-4 rounded-none transition-transform hover:scale-105">
                  Book Now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
