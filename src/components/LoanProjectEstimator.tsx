import { useState } from 'react';
import { ArrowRight, Calculator, FileText, CheckCircle2 } from 'lucide-react';

export function LoanProjectEstimator({ onSelectConsultation }: { onSelectConsultation?: (service: string, note: string) => void }) {
  const [scheme, setScheme] = useState<'mudra' | 'pmegp' | 'commercial'>('mudra');
  const [category, setCategory] = useState<'manufacturing' | 'service' | 'trading'>('service');
  const [machineryCost, setMachineryCost] = useState<number>(300000);
  const [workingCapital, setWorkingCapital] = useState<number>(200000);
  const [otherCapex, setOtherCapex] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  const totalProjectCost = machineryCost + workingCapital + otherCapex;

  // Margin calculation: typically 10% for Mudra/General, 5-10% for PMEGP special, 25% for Commercial
  const marginPercent = scheme === 'pmegp' ? 10 : scheme === 'mudra' ? 10 : 20;
  const promoterMargin = (totalProjectCost * marginPercent) / 100;
  const bankLoanAmount = totalProjectCost - promoterMargin;

  // Potential PMEGP Subsidy: 25% for urban general, 35% for rural special (Nadia is largely rural/semi-urban)
  const subsidyPercent = scheme === 'pmegp' ? 35 : 0;
  const estimatedSubsidy = (totalProjectCost * subsidyPercent) / 100;

  // Approximate Monthly EMI for term loan portion
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const emi =
    monthlyRate > 0 && totalMonths > 0
      ? Math.round(
          (bankLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleRequestReport = () => {
    const summary = `Project Report Request: Scheme: ${scheme.toUpperCase()}, Project Cost: ${formatINR(totalProjectCost)}, Required Bank Finance: ${formatINR(bankLoanAmount)}, Own Margin: ${formatINR(promoterMargin)}. Please prepare bankable DPR & CMA Data.`;
    if (onSelectConsultation) {
      onSelectConsultation('Bank Loan Project Reports', summary);
    } else {
      const waUrl = `https://wa.me/917908355886?text=${encodeURIComponent('Hello Nanda Tax Solution & Academy,\n' + summary)}`;
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-900 text-white px-6 py-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Financial Advisory Tool</span>
          <h3 className="text-xl font-bold mt-1">Bank Loan & Project Cost Estimator</h3>
          <p className="text-sm text-slate-300 mt-1">Calculate your Project Cost, Promoter Margin, Bank Loan & PMEGP / Mudra feasibility</p>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-5">
          {/* Scheme selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2">
              Target Loan Scheme
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setScheme('mudra')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                  scheme === 'mudra'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Mudra Loan (Up to 10L)
              </button>
              <button
                onClick={() => setScheme('pmegp')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                  scheme === 'pmegp'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                PMEGP (Up to 50L + Subsidy)
              </button>
              <button
                onClick={() => setScheme('commercial')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                  scheme === 'commercial'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                CC Limit / Term Loan
              </button>
            </div>
          </div>

          {/* Project Cost Breakdown */}
          <div className="space-y-4 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Project Cost Components (₹)
            </h4>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Plant, Machinery & Equipment Cost</span>
                <span className="font-bold text-slate-900">{formatINR(machineryCost)}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="2500000"
                step="25000"
                value={machineryCost}
                onChange={(e) => setMachineryCost(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Working Capital (Stock / Raw Material / Cash flow)</span>
                <span className="font-bold text-slate-900">{formatINR(workingCapital)}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="1500000"
                step="25000"
                value={workingCapital}
                onChange={(e) => setWorkingCapital(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Furniture, Renovation & Other Civil / Tech Capex</span>
                <span className="font-bold text-slate-900">{formatINR(otherCapex)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000000"
                step="25000"
                value={otherCapex}
                onChange={(e) => setOtherCapex(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Loan assumptions */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Expected Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Repayment Tenure (Years)
              </label>
              <select
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              >
                <option value={3}>3 Years (36 Months)</option>
                <option value={5}>5 Years (60 Months)</option>
                <option value={7}>7 Years (84 Months)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-5 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Financial Feasibility Summary</span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Bank Viable
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500 uppercase tracking-wider block text-[11px]">Total Project Outlay</span>
                <span className="text-xl font-black text-slate-900">{formatINR(totalProjectCost)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Your Own Contribution (Margin {marginPercent}%):</span>
                <span className="font-semibold text-slate-900">{formatINR(promoterMargin)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Required Bank Loan Finance:</span>
                <span className="font-bold text-emerald-700 text-sm">{formatINR(bankLoanAmount)}</span>
              </div>

              {scheme === 'pmegp' && (
                <div className="flex justify-between py-1 border-b border-slate-200 bg-amber-50 p-2 rounded">
                  <span className="text-amber-900 font-medium">Govt PMEGP Subsidy Grant (~35%):</span>
                  <span className="font-bold text-amber-900">{formatINR(estimatedSubsidy)}</span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Estimated Monthly EMI:</span>
                <span className="font-bold text-slate-900">{formatINR(emi)} / month</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50/70 rounded-lg border border-blue-200 text-[11px] text-blue-900 space-y-1">
              <div className="font-bold">What Bankers Require in the DPR:</div>
              <div>• 5-Year Projected Balance Sheet & Profit & Loss Statement</div>
              <div>• Debt Service Coverage Ratio (DSCR &gt; 1.5)</div>
              <div>• CMA Data & Break-Even Analysis chart</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={handleRequestReport}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Get Bank-Approved Project Report</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-2">
              Prepared strictly conforming to State Bank of India, PNB, UBI & Private Bank criteria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
