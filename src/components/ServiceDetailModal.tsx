import { X, CheckCircle, Clock, FileText, Briefcase, MessageSquare, PhoneCall } from 'lucide-react';
import { ServiceItem } from '../data/servicesData';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export function ServiceDetailModal({ service, onClose, onBookService }: ServiceDetailModalProps) {
  if (!service) return null;

  const handleWhatsAppInquiry = () => {
    const text = `Hello Nanda Tax Solution & Academy,\nI would like to inquire about your service:\n*${service.title}*\n\nPlease provide quotation and document submission details.`;
    const waUrl = `https://wa.me/917908355886?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">
            Service #{service.id} · {service.category}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold pr-8">{service.title}</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
            {service.shortDesc}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[68vh] overflow-y-auto space-y-6">
          {/* Detailed Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Service Overview
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Scope of Work */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Scope of Work Included</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {service.scopeOfWork.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents Needed */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-700" />
              <span>Required Documents</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {service.documentsNeeded.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-100/70 p-2.5 rounded-lg border border-slate-200/80">
                  <span className="text-slate-400 font-semibold">{idx + 1}.</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-3 border-t border-slate-200">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 block">Turnaround Time:</span>
                <span className="text-slate-600">{service.turnaroundTime}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Briefcase className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 block">Recommended For:</span>
                <span className="text-slate-600">{service.suitableFor}</span>
              </div>
            </div>
          </div>

          {/* Deliverables */}
          <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200 text-xs">
            <span className="font-bold text-emerald-950 block mb-1">Official Deliverables You Receive:</span>
            <div className="flex flex-wrap gap-1.5 text-emerald-900">
              {service.deliverables.map((deliv, idx) => (
                <span key={idx} className="inline-block bg-white px-2 py-1 rounded border border-emerald-200 font-medium">
                  ✓ {deliv}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            <span>Call directly: </span>
            <a href="tel:7908355886" className="font-bold text-slate-900 hover:underline">
              +91 7908355886
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:7908355886"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
            <button
              onClick={handleWhatsAppInquiry}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire on WhatsApp</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onBookService(service.title);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
            >
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
