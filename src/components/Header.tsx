import { useState } from 'react';
import { Phone, MessageSquare, Menu, X, Shield, MapPin, Award } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
  activeSection: string;
}

export function Header({ onOpenConsultation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'All Services (20)', href: '#services' },
    { label: 'Academy Courses', href: '#academy' },
    { label: 'Home Tuition', href: '#tuition' },
    { label: 'Tax & GST Tools', href: '#calculators' },
    { label: 'Document Checklist', href: '#checklist' },
    { label: 'About & Office', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top emergency / quick contact ticker */}
      <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span>Certified Tax Consultancy & Practical Academy</span>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>Debagram, Shiber Dalan Para, Nadia, West Bengal – 741137</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-slate-300 font-serif-title italic">
              "Learn • Practice • Succeed"
            </span>
            <a
              href="tel:7908355886"
              className="flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>+91 7908355886</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center font-bold text-xl shadow-md border border-slate-700 group-hover:border-emerald-500 transition-all">
              <span className="text-emerald-400 font-black">N</span>
              <span className="text-white text-xs ml-0.5">TAX</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                  NANDA TAX SOLUTION
                </span>
                <span className="text-slate-400 font-normal text-sm">&</span>
                <span className="font-bold text-base sm:text-lg text-emerald-700">
                  ACADEMY
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium tracking-wide">
                Your Trusted Partner for Business & Tax Solutions
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 text-xs xl:text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-slate-900 transition-colors py-1 relative hover:underline decoration-emerald-600 underline-offset-8"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/917908355886?text=Hello%20Nanda%20Tax%20Solution%2C%20I%20would%20like%20to%20consult%20regarding%20taxation%20and%20business%20services."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:7908355886"
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg bg-slate-100"
              aria-label="Call Mobile"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Book Appointment / Consultation</span>
            </button>

            <a
              href="https://wa.me/917908355886?text=Hello%20Nanda%20Tax%20Solution%2C%20I%20would%20like%20to%20consult%20regarding%20taxation%20and%20business%20services."
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp (+91 7908355886)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
