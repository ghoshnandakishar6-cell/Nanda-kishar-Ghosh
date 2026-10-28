import { useState, useEffect } from 'react';
import { X, Send, PhoneCall, Check, Calendar, User, Mail, MessageSquare } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  initialNote?: string;
}

export function ConsultationModal({ isOpen, onClose, preselectedService, initialNote }: ConsultationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(preselectedService || SERVICES_DATA[0].title);
  const [businessName, setBusinessName] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState(initialNote || '');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (initialNote) {
      setMessage(initialNote);
    }
  }, [initialNote]);

  if (!isOpen) return null;

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const formattedMessage = `*New Consultation Request - Nanda Tax Solution & Academy*
👤 *Client Name:* ${name}
📞 *Phone Number:* ${phone}
📧 *Email:* ${email || 'N/A'}
🏢 *Business / Entity:* ${businessName || 'Individual'}
📌 *Service Required:* ${service}
📅 *Preferred Date/Time:* ${date || 'Earliest available'}
📝 *Client Notes:*
${message || 'Please provide quotation and consultation.'}

_Sent via Nanda Tax Solution & Academy web portal_`;

    const waUrl = `https://wa.me/917908355886?text=${encodeURIComponent(formattedMessage)}`;
    
    // Save to local storage for user's history
    try {
      const existing = JSON.parse(localStorage.getItem('nanda_inquiries') || '[]');
      existing.unshift({
        id: Date.now(),
        name,
        phone,
        service,
        date: new Date().toLocaleDateString(),
        message
      });
      localStorage.setItem('nanda_inquiries', JSON.stringify(existing.slice(0, 10)));
    } catch {
      // ignore
    }

    setSubmitted(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setSubmitted(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">
            Fast Response Within 30 Minutes
          </div>
          <h2 className="text-xl font-bold">Book a Consultation or Inquiry</h2>
          <p className="text-xs text-slate-300 mt-1">
            Connect with Shri Nandakishor Ghosh & our tax experts at Debagram, Nadia.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Redirecting to WhatsApp...</h3>
            <p className="text-xs text-slate-600">
              Your inquiry has been compiled. You are now connecting directly with our Debagram office at +91 7908355886.
            </p>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Subrata Ghosh"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 7908355886"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business / Shop Name (Optional)
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Ghosh Enterprises"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Service / Course Required *
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              >
                {SERVICES_DATA.map((srv) => (
                  <option key={srv.id} value={srv.title}>
                    {srv.id}. {srv.title}
                  </option>
                ))}
                <option value="General Tax Consultation">General Tax Consultation & Advisory</option>
                <option value="Class 11-12 Accountancy Tuition">Class 11 & 12 Accountancy Tuition</option>
                <option value="B.Com Costing & Tax Tuition">B.Com Costing & Tax Tuition</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Consultation Date / Timings
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. Tomorrow afternoon (4:00 PM)"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Specific Requirements or Questions
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need help with (e.g. ITR-1 filing, new GST number, Tally training fee, etc.)"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Submit & Chat on WhatsApp (+91 7908355886)</span>
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-500">
              Direct consultation with our senior tax consultant. No spam guarantee.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
