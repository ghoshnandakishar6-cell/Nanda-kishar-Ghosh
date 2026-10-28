import { useState } from 'react';
import { Copy, Check, MessageSquare, ArrowRight } from 'lucide-react';

export function GstCalculator({ onSelectConsultation }: { onSelectConsultation?: (service: string, note: string) => void }) {
  const [amount, setAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [calcType, setCalcType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [supplyType, setSupplyType] = useState<'intra' | 'inter'>('intra');
  const [copied, setCopied] = useState(false);

  const rates = [5, 12, 18, 28];

  // Calculations
  let netAmount = 0;
  let gstAmount = 0;
  let totalAmount = 0;

  if (calcType === 'exclusive') {
    // Add GST
    netAmount = amount;
    gstAmount = (amount * gstRate) / 100;
    totalAmount = netAmount + gstAmount;
  } else {
    // Reverse GST
    totalAmount = amount;
    netAmount = (amount * 100) / (100 + gstRate);
    gstAmount = totalAmount - netAmount;
  }

  const cgst = supplyType === 'intra' ? gstAmount / 2 : 0;
  const sgst = supplyType === 'intra' ? gstAmount / 2 : 0;
  const igst = supplyType === 'inter' ? gstAmount : 0;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(val);
  };

  const handleCopySummary = () => {
    const text = `--- GST Breakdown (Nanda Tax Solution) ---
Base Amount: ${formatINR(netAmount)}
GST Rate: ${gstRate}% (${supplyType === 'intra' ? `CGST: ${gstRate / 2}% + SGST: ${gstRate / 2}%` : `IGST: ${gstRate}%`})
${supplyType === 'intra' ? `CGST: ${formatINR(cgst)}\nSGST: ${formatINR(sgst)}` : `IGST: ${formatINR(igst)}`}
Total GST Amount: ${formatINR(gstAmount)}
Final Invoice Total: ${formatINR(totalAmount)}
Calculated via Nanda Tax Solution & Academy`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnquireGST = () => {
    const note = `GST Enquiry: Invoice Amount ${formatINR(totalAmount)} at ${gstRate}% GST. Please assist with GST Registration / Monthly GSTR-1 & 3B filing.`;
    if (onSelectConsultation) {
      onSelectConsultation('GST Services – Registration & Returns', note);
    } else {
      const waUrl = `https://wa.me/917908355886?text=${encodeURIComponent('Hello Nanda Tax Solution & Academy,\n' + note)}`;
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-900 text-white px-6 py-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Interactive Client Tool</span>
          <h3 className="text-xl font-bold mt-1">Instant GST & Invoice Calculator</h3>
          <p className="text-sm text-slate-300 mt-1">Calculate CGST, SGST & IGST breakdown for Exclusive and Inclusive billing</p>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-5">
          {/* Exclusive vs Inclusive */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2">
              Calculation Type
            </label>
            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg max-w-sm">
              <button
                onClick={() => setCalcType('exclusive')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  calcType === 'exclusive'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Exclusive (Add GST)
              </button>
              <button
                onClick={() => setCalcType('inclusive')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  calcType === 'inclusive'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Inclusive (Extract GST)
              </button>
            </div>
          </div>

          {/* Amount input */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
              {calcType === 'exclusive' ? 'Base Amount (Excluding GST)' : 'Total Amount (Including GST)'} (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-500 font-medium">₹</span>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-2 text-base font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Rate Selection */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2">
              GST Tax Slab Rate
            </label>
            <div className="grid grid-cols-4 gap-2">
              {rates.map((rate) => (
                <button
                  key={rate}
                  onClick={() => setGstRate(rate)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    gstRate === rate
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>

          {/* Supply Type */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2">
              Supply Location
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setSupplyType('intra')}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border text-left transition-colors ${
                  supplyType === 'intra'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div>Within West Bengal (Intra-State)</div>
                <div className="text-[10px] text-slate-500 font-normal">Split as CGST ({gstRate / 2}%) + SGST ({gstRate / 2}%)</div>
              </button>
              <button
                onClick={() => setSupplyType('inter')}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border text-left transition-colors ${
                  supplyType === 'inter'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div>Outside West Bengal (Inter-State)</div>
                <div className="text-[10px] text-slate-500 font-normal">Single IGST ({gstRate}%)</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Output: Invoice Breakdown */}
        <div className="lg:col-span-5 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Tax Breakdown Slip</span>
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Net (Base) Value:</span>
                <span className="font-semibold text-slate-900">{formatINR(netAmount)}</span>
              </div>

              {supplyType === 'intra' ? (
                <>
                  <div className="flex justify-between text-slate-600">
                    <span>CGST ({gstRate / 2}%):</span>
                    <span className="font-medium text-slate-800">{formatINR(cgst)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>SGST ({gstRate / 2}%):</span>
                    <span className="font-medium text-slate-800">{formatINR(sgst)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-slate-600">
                  <span>IGST ({gstRate}%):</span>
                  <span className="font-medium text-slate-800">{formatINR(igst)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200">
                <span className="font-medium">Total Tax (GST):</span>
                <span className="font-bold text-emerald-700">{formatINR(gstAmount)}</span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 mt-2">
                <div className="text-xs text-slate-500 uppercase tracking-wider">Total Invoice Value</div>
                <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{formatINR(totalAmount)}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={handleEnquireGST}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Consult on GST Filing & Registration</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <p className="text-[11px] text-center text-slate-500 mt-2">
              Monthly GSTR-1, GSTR-3B & Input Tax Credit (ITC) reconciliation service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
