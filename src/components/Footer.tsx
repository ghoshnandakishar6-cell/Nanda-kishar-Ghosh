import { Phone, Mail, MapPin, Clock, ArrowUp, ExternalLink } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

interface FooterProps {
  onSelectService: (serviceSlug: string) => void;
  onOpenConsultation: () => void;
}

export function Footer({ onSelectService, onOpenConsultation }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Credibility (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 flex items-center justify-center font-bold text-lg">
                N
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">
                  NANDA TAX SOLUTION
                </h3>
                <div className="text-xs font-semibold text-emerald-400">
                  & ACADEMY
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Your Trusted Partner for Business & Tax Solutions. Delivering end-to-end GST, Income Tax (ITR), Corporate Compliances, Accounting, and practical training in Debagram, Nadia & throughout West Bengal.
            </p>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                Academy Motto
              </div>
              <div className="font-serif-title italic text-emerald-400 text-sm font-semibold">
                Learn • Practice • Succeed
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Practical job-oriented taxation training with live portal filing and comprehensive Class 11, 12 & B.Com home tuition.
              </p>
            </div>
          </div>

          {/* Column 2: 20 Core Services (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Our 20 Professional Services
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              {SERVICES_DATA.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => onSelectService(srv.slug)}
                  className="text-left text-slate-400 hover:text-emerald-400 transition-colors truncate"
                  title={srv.title}
                >
                  <span className="text-slate-600 mr-1.5">{srv.id}.</span>
                  {srv.title.split('–')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Contact & Debagram Office (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Debagram Office & Contacts
            </h4>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Office Address:</span>
                  <span>Debagram, Shiber Dalan Para</span>
                  <br />
                  <span>Nadia, West Bengal – 741137</span>
                  <a
                    href="https://maps.google.com/?q=Debagram+Nadia+West+Bengal+741137"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline mt-1"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Direct Mobile / WhatsApp:</span>
                  <a href="tel:7908355886" className="text-emerald-400 font-bold hover:underline">
                    +91 7908355886
                  </a>
                  <span className="text-slate-500 block text-[11px]">(Call or WhatsApp for immediate consultation)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Email:</span>
                  <a href="mailto:ghoshnandakishar6@gmail.com" className="hover:underline text-slate-300">
                    ghoshnandakishar6@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Consultation Hours:</span>
                  <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
                  <br />
                  <span>Sunday: 10:00 AM – 2:00 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                <span>Request Quotation or Callback</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Nanda Tax Solution & Academy. All Rights Reserved.
            <span className="block sm:inline sm:ml-2 text-slate-600">
              Debagram, Nadia, West Bengal – 741137
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">
              Founder: Shri Nandakishor Ghosh
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Scroll to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
