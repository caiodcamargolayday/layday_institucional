import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-[#EE5B2B] text-white pt-12 pb-6 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          
          {/* OFFICE INFO */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold tracking-widest mb-6">OFFICE</h3>
            <div className="text-sm font-medium leading-relaxed opacity-90 space-y-1">
              <p>Jl. Pantai Batu Mejan No.14B, Canggu,</p>
              <p>Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia</p>
              <p>+62 8123-8743-411</p>
              <p>canggu@staylayday.com</p>
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/laydayuluwatu/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.facebook.com/laydaysurfhostel" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              <FaFacebookF size={24} />
            </a>
            <a href="https://www.tiktok.com/@laydayhostels" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              <FaTiktok size={24} />
            </a>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="text-center pt-8 border-t border-white/20">
          <p className="text-xs font-bold tracking-widest opacity-90">
            Copyright 2026 © Lay Day Hostels
          </p>
        </div>
      </div>
    </footer>
  );
}
