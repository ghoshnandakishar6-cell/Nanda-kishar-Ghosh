import { useState } from 'react';
import { CheckSquare, Square, Share2, Check, Download } from 'lucide-react';

interface ChecklistService {
  name: string;
  category: string;
  items: string[];
  tips: string;
}

const CHECKLISTS: ChecklistService[] = [
  {
    name: 'Income Tax Return (ITR) Filing',
    category: 'Taxation',
    items: [
      'PAN Card (mandatory)',
      'Aadhaar Card (linked with PAN)',
      'Form 16 / Salary Certificate (Part A & B from employer)',
      'Bank Statements of all active savings/current accounts (April 1 to March 31)',
      'Investment Proofs: LIC receipts, PPF passbook, ELSS Mutual Funds, NPS receipt (80C / 80CCD)',
      'Health Insurance (Mediclaim) premium receipt (Section 80D)',
      'Home Loan Interest & Principal repayment certificate (if applicable)',
      'Capital Gains Profit/Loss statement from Stock Broker (if invested in stocks/mutual funds)'
    ],
    tips: 'Ensure your Aadhaar is linked with PAN and phone number is active for quick OTP e-verification.'
  },
  {
    name: 'New GST Registration',
    category: 'Registrations',
    items: [
      'PAN Card of Business / Proprietor',
      'Aadhaar Card of Proprietor / Partners / Directors',
      'Passport size photograph of the applicant',
      'Cancelled Cheque / Bank Statement with business name and IFSC',
      'Electricity Bill / Property Tax receipt of the business premises',
      'Rent Agreement & Landlord NOC (if premise is rented)',
      'Partnership Deed / Certificate of Incorporation (for Firm or Company)'
    ],
    tips: 'Address on Electricity Bill must strictly match the address provided on the application portal.'
  },
  {
    name: 'MSME / Udyam Registration',
    category: 'Registrations',
    items: [
      'Aadhaar Card of the Proprietor / Managing Partner',
      'PAN Card of the Enterprise / Proprietor',
      'Bank Account Number and IFSC Code',
      'Complete Business Name and Official Address',
      'Date of Commencement of Business',
      'Number of Employees (Male / Female split)',
      'Major activity: Manufacturing or Service'
    ],
    tips: 'Udyam is 100% paperless; Aadhaar OTP authentication is required.'
  },
  {
    name: 'West Bengal Trade License',
    category: 'Licensing',
    items: [
      'Current Holding Tax / Panchayat Property Tax Receipt (Dakhila/Porcha)',
      'Rent Agreement & Landlord Consent / NOC (if operating from rented space)',
      'Aadhaar & PAN card of applicant',
      'Photograph of business place showing business signboard',
      'Electricity bill of the premises'
    ],
    tips: 'Processed via the West Bengal Silpasathi single-window portal.'
  },
  {
    name: 'FSSAI Food License / Registration',
    category: 'Licensing',
    items: [
      'Passport size photo of Food Business Operator (FBO)',
      'Government Photo ID (Aadhaar / Voter ID)',
      'Proof of premise address (Rent agreement / Municipal receipt)',
      'Food category declaration (e.g. Dairy, Snacks, Sweets, Grocery)',
      'Water testing report (for manufacturing/hotel units)'
    ],
    tips: 'Basic FSSAI registration is for turnover up to ₹12 Lakhs/year.'
  },
  {
    name: 'Bank Loan Detailed Project Report (DPR)',
    category: 'Banking',
    items: [
      'Last 3 years ITR with computation sheets & Balance Sheets',
      'Last 12 months Bank Account Statements (all bank accounts)',
      'Quotations / Proforma Invoices for proposed machinery / equipment',
      'Building estimation certificate (if constructing premises)',
      'KYC documents of Promoter & Guarantors (PAN, Aadhaar, Net Worth)',
      'Existing loan sanction letters and repayment track record (if any)'
    ],
    tips: 'Project report is prepared following Mudra / PMEGP / Nationalized Bank norms.'
  },
  {
    name: 'Private Limited Company Incorporation',
    category: 'Corporate',
    items: [
      'PAN Card & Aadhaar Card of minimum 2 Directors',
      'Bank Statement (less than 2 months old) showing current residential address',
      'Passport size photographs and active mobile & email IDs',
      'Registered Office electricity bill + Rent agreement + NOC from property owner',
      'Class 3 Digital Signature Certificate (DSC) for all directors'
    ],
    tips: 'Includes DIN, CIN, PAN, TAN, EPFO, ESIC, and Profession Tax bundle in SPICe+.'
  }
];

export function DocumentChecklistFinder() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [copied, setCopied] = useState(false);

  const activeChecklist = CHECKLISTS[selectedIdx];

  const toggleItem = (itemText: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemText]: !prev[itemText]
    }));
  };

  const completedCount = activeChecklist.items.filter(item => !!checkedItems[item]).length;
  const progressPercent = Math.round((completedCount / activeChecklist.items.length) * 100);

  const handleShareChecklist = () => {
    const listText = activeChecklist.items
      .map(item => `${checkedItems[item] ? '✅' : '⬜'} ${item}`)
      .join('\n');

    const message = `*Document Checklist for ${activeChecklist.name}*\n(Progress: ${completedCount}/${activeChecklist.items.length})\n\n${listText}\n\n*Important Tip:* ${activeChecklist.tips}\n\nContact: Nanda Tax Solution & Academy - 7908355886`;

    const waUrl = `https://wa.me/917908355886?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const handleCopyChecklist = () => {
    const listText = activeChecklist.items
      .map(item => `${checkedItems[item] ? '[DONE]' : '[PENDING]'} ${item}`)
      .join('\n');

    const message = `Document Checklist for ${activeChecklist.name}\n\n${listText}\n\nNanda Tax Solution & Academy - Debagram, Nadia (Mobile: 7908355886)`;

    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-900 text-white px-6 py-5 border-b border-slate-800">
        <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Self-Service Tool</span>
        <h3 className="text-xl font-bold mt-1">Smart Document Checklist Finder</h3>
        <p className="text-sm text-slate-300 mt-1">Check which documents you already have ready before consulting or submitting</p>
      </div>

      <div className="p-6">
        {/* Service Picker Buttons */}
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2">
          Select Your Service
        </label>
        <div className="flex flex-wrap gap-2 mb-6">
          {CHECKLISTS.map((item, idx) => (
            <button
              key={item.name}
              onClick={() => {
                setSelectedIdx(idx);
                setCheckedItems({});
              }}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                selectedIdx === idx
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-semibold text-slate-800">
              Your Readiness Progress: {completedCount} of {activeChecklist.items.length} Documents Ready
            </span>
            <span className="font-bold text-emerald-700">{progressPercent}% Ready</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Checklist items */}
        <div className="space-y-2.5 mb-6">
          {activeChecklist.items.map((item) => {
            const isChecked = !!checkedItems[item];
            return (
              <div
                key={item}
                onClick={() => toggleItem(item)}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-emerald-50/60 border-emerald-300 text-slate-900'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="mt-0.5 text-emerald-600">
                  {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                </div>
                <div className="text-xs sm:text-sm font-medium select-none">
                  <span className={isChecked ? 'line-through text-slate-500' : ''}>{item}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helpful Tip */}
        <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 mb-6">
          <span className="font-bold uppercase tracking-wider block text-[11px] text-amber-800 mb-1">Expert Advice:</span>
          {activeChecklist.tips}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <div className="flex gap-2">
            <button
              onClick={handleCopyChecklist}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Checklist'}</span>
            </button>
          </div>

          <button
            onClick={handleShareChecklist}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Send Checklist to Our Consultant on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
