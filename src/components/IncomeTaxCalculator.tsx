import { useState, useMemo } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, MessageSquare } from 'lucide-react';

interface TaxResult {
  grossIncome: number;
  totalDeductions: number;
  netTaxableIncome: number;
  baseTax: number;
  rebate87A: number;
  taxAfterRebate: number;
  cess: number;
  totalTaxPayable: number;
}

export function IncomeTaxCalculator({ onSelectConsultation }: { onSelectConsultation?: (service: string, note: string) => void }) {
  // Inputs
  const [incomeType, setIncomeType] = useState<'salaried' | 'business'>('salaried');
  const [grossSalary, setGrossSalary] = useState<number>(850000);
  const [sec80C, setSec80C] = useState<number>(150000);
  const [sec80D, setSec80D] = useState<number>(25000);
  const [hraExemption, setHraExemption] = useState<number>(60000);
  const [homeLoanInterest24b, setHomeLoanInterest24b] = useState<number>(0);
  const [otherDeductions, setOtherDeductions] = useState<number>(0);

  // New Regime Calculation (FY 2024-25 / FY 2025-26 under Budget Sec 115BAC)
  // Slabs:
  // Up to 3,00,000: Nil
  // 3,00,001 - 7,00,000: 5%
  // 7,00,001 - 10,00,000: 10%
  // 10,00,001 - 12,00,000: 15%
  // 12,00,001 - 15,00,000: 20%
  // Above 15,00,000: 30%
  // Standard Deduction: Rs 75,000 (for salaried)
  // Rebate u/s 87A: If net taxable <= 7,00,000, tax is NIL (rebate up to 25,000)
  const newRegimeResult: TaxResult = useMemo(() => {
    const stdDeduction = incomeType === 'salaried' ? 75000 : 0;
    const netTaxable = Math.max(0, grossSalary - stdDeduction);

    let baseTax = 0;
    if (netTaxable <= 300000) {
      baseTax = 0;
    } else if (netTaxable <= 700000) {
      baseTax = (netTaxable - 300000) * 0.05;
    } else if (netTaxable <= 1000000) {
      baseTax = 20000 + (netTaxable - 700000) * 0.10;
    } else if (netTaxable <= 1200000) {
      baseTax = 20000 + 30000 + (netTaxable - 1000000) * 0.15;
    } else if (netTaxable <= 1500000) {
      baseTax = 20000 + 30000 + 30000 + (netTaxable - 1200000) * 0.20;
    } else {
      baseTax = 20000 + 30000 + 30000 + 60000 + (netTaxable - 1500000) * 0.30;
    }

    let rebate87A = 0;
    if (netTaxable <= 700000) {
      rebate87A = baseTax;
    }

    const taxAfterRebate = Math.max(0, baseTax - rebate87A);
    const cess = Math.round(taxAfterRebate * 0.04);
    const totalTaxPayable = Math.round(taxAfterRebate + cess);

    return {
      grossIncome: grossSalary,
      totalDeductions: stdDeduction,
      netTaxableIncome: netTaxable,
      baseTax: Math.round(baseTax),
      rebate87A: Math.round(rebate87A),
      taxAfterRebate: Math.round(taxAfterRebate),
      cess,
      totalTaxPayable
    };
  }, [grossSalary, incomeType]);

  // Old Regime Calculation
  // Standard Deduction: Rs 50,000 (for salaried)
  // Deductions: 80C (max 1.5L), 80D (max 1L), HRA, Home loan 24b (max 2L)
  // Slabs:
  // Up to 2,50,000: Nil
  // 2,50,001 - 5,00,000: 5%
  // 5,00,001 - 10,00,000: 20%
  // Above 10,00,000: 30%
  // Rebate u/s 87A: If net taxable <= 5,00,000, rebate up to 12,500 (NIL tax)
  const oldRegimeResult: TaxResult = useMemo(() => {
    const stdDeduction = incomeType === 'salaried' ? 50000 : 0;
    const capped80C = Math.min(150000, Math.max(0, sec80C));
    const capped80D = Math.min(75000, Math.max(0, sec80D));
    const capped24b = Math.min(200000, Math.max(0, homeLoanInterest24b));
    const totalDeductions = stdDeduction + capped80C + capped80D + hraExemption + capped24b + otherDeductions;
    const netTaxable = Math.max(0, grossSalary - totalDeductions);

    let baseTax = 0;
    if (netTaxable <= 250000) {
      baseTax = 0;
    } else if (netTaxable <= 500000) {
      baseTax = (netTaxable - 250000) * 0.05;
    } else if (netTaxable <= 1000000) {
      baseTax = 12500 + (netTaxable - 500000) * 0.20;
    } else {
      baseTax = 12500 + 100000 + (netTaxable - 1000000) * 0.30;
    }

    let rebate87A = 0;
    if (netTaxable <= 500000) {
      rebate87A = baseTax;
    }

    const taxAfterRebate = Math.max(0, baseTax - rebate87A);
    const cess = Math.round(taxAfterRebate * 0.04);
    const totalTaxPayable = Math.round(taxAfterRebate + cess);

    return {
      grossIncome: grossSalary,
      totalDeductions,
      netTaxableIncome: netTaxable,
      baseTax: Math.round(baseTax),
      rebate87A: Math.round(rebate87A),
      taxAfterRebate: Math.round(taxAfterRebate),
      cess,
      totalTaxPayable
    };
  }, [grossSalary, incomeType, sec80C, sec80D, hraExemption, homeLoanInterest24b, otherDeductions]);

  const diff = oldRegimeResult.totalTaxPayable - newRegimeResult.totalTaxPayable;
  const isNewBetter = diff >= 0;
  const savingsAmount = Math.abs(diff);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleReset = () => {
    setGrossSalary(850000);
    setSec80C(150000);
    setSec80D(25000);
    setHraExemption(60000);
    setHomeLoanInterest24b(0);
    setOtherDeductions(0);
  };

  const handleRequestFiling = () => {
    const summary = `Tax Estimate: Gross Income ${formatINR(grossSalary)}, Best regime: ${isNewBetter ? 'New Tax Regime' : 'Old Tax Regime'} (Estimated tax: ${formatINR(isNewBetter ? newRegimeResult.totalTaxPayable : oldRegimeResult.totalTaxPayable)}). Please assist me with filing my ITR.`;
    if (onSelectConsultation) {
      onSelectConsultation('Income Tax Services – ITR Filing (ITR-1 to ITR-7)', summary);
    } else {
      const waUrl = `https://wa.me/917908355886?text=${encodeURIComponent('Hello Nanda Tax Solution & Academy, I calculated my tax liability online:\n' + summary)}`;
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-900 text-white px-6 py-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Interactive Client Tool</span>
          <h3 className="text-xl font-bold mt-1">Income Tax Calculator: Old vs New Regime</h3>
          <p className="text-sm text-slate-300 mt-1">Updated for FY 2024-25 & FY 2025-26 (Standard Deduction ₹75,000 in New Regime)</p>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors"
          title="Reset defaults"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sample</span>
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs: 7 Columns */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg max-w-xs">
            <button
              onClick={() => setIncomeType('salaried')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                incomeType === 'salaried'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Salaried Employee
            </button>
            <button
              onClick={() => setIncomeType('business')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                incomeType === 'business'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Business / Self-Employed
            </button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Annual Gross Income (₹)
              </label>
              <span className="text-sm font-bold text-slate-900">{formatINR(grossSalary)}</span>
            </div>
            <input
              type="range"
              min="200000"
              max="3500000"
              step="25000"
              value={grossSalary}
              onChange={(e) => setGrossSalary(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>₹2 Lakh</span>
              <span>₹10 Lakh</span>
              <span>₹20 Lakh</span>
              <span>₹35 Lakh</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Deductions (For Old Regime Evaluation)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Section 80C (PPF, EPF, LIC, ELSS, School Fee)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500">₹</span>
                  <input
                    type="number"
                    max="150000"
                    value={sec80C}
                    onChange={(e) => setSec80C(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="Max 1,50,000"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Max cap: ₹1,50,000</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Section 80D (Health Insurance Mediclaim)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500">₹</span>
                  <input
                    type="number"
                    max="100000"
                    value={sec80D}
                    onChange={(e) => setSec80D(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="e.g. 25,000"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Self, family & parents</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  HRA Exemption (House Rent Allowance)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500">₹</span>
                  <input
                    type="number"
                    value={hraExemption}
                    onChange={(e) => setHraExemption(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="e.g. 60,000"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Applicable if living on rent</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Home Loan Interest (Section 24b)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500">₹</span>
                  <input
                    type="number"
                    max="200000"
                    value={homeLoanInterest24b}
                    onChange={(e) => setHomeLoanInterest24b(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="Max 2,00,000"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Self-occupied property cap: ₹2L</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output: 5 Columns Comparison */}
        <div className="lg:col-span-5 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Regime Comparison</span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isNewBetter ? 'New Regime Saves More' : 'Old Regime Saves More'}
              </span>
            </div>

            {/* Banner recommendation */}
            <div className={`mt-3 p-3.5 rounded-lg border text-sm ${
              isNewBetter
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}>
              <div className="font-semibold text-xs uppercase tracking-wide">
                Recommendation: Choose {isNewBetter ? 'NEW REGIME' : 'OLD REGIME'}
              </div>
              <div className="mt-1 text-xs">
                {savingsAmount > 0 ? (
                  <span>
                    You can save <strong className="font-bold underline decoration-2">{formatINR(savingsAmount)}</strong> in tax by opting for the {isNewBetter ? 'New Tax Regime' : 'Old Tax Regime'}.
                  </span>
                ) : (
                  <span>Both tax regimes yield the exact same tax liability of ₹0.</span>
                )}
              </div>
            </div>

            {/* Side by side cards */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
              {/* New Regime */}
              <div className={`p-3 rounded-lg border ${
                isNewBetter ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20' : 'bg-slate-100 border-slate-200'
              }`}>
                <div className="flex items-center justify-between font-bold text-slate-800 mb-2">
                  <span>New Regime</span>
                  {isNewBetter && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Recommended</span>}
                </div>
                <div className="space-y-1.5 text-slate-600">
                  <div className="flex justify-between">
                    <span>Gross:</span>
                    <span className="font-medium text-slate-800">{formatINR(newRegimeResult.grossIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Std. Deduction:</span>
                    <span className="text-emerald-700 font-medium">-{formatINR(newRegimeResult.totalDeductions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxable Income:</span>
                    <span className="font-medium text-slate-800">{formatINR(newRegimeResult.netTaxableIncome)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span>Rebate 87A:</span>
                    <span className="text-emerald-700">-{formatINR(newRegimeResult.rebate87A)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cess (4%):</span>
                    <span>{formatINR(newRegimeResult.cess)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm text-slate-900">
                    <span>Total Tax:</span>
                    <span className={isNewBetter ? 'text-emerald-700' : 'text-slate-900'}>
                      {formatINR(newRegimeResult.totalTaxPayable)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Old Regime */}
              <div className={`p-3 rounded-lg border ${
                !isNewBetter ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20' : 'bg-slate-100 border-slate-200'
              }`}>
                <div className="flex items-center justify-between font-bold text-slate-800 mb-2">
                  <span>Old Regime</span>
                  {!isNewBetter && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Recommended</span>}
                </div>
                <div className="space-y-1.5 text-slate-600">
                  <div className="flex justify-between">
                    <span>Gross:</span>
                    <span className="font-medium text-slate-800">{formatINR(oldRegimeResult.grossIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>All Deductions:</span>
                    <span className="text-emerald-700 font-medium">-{formatINR(oldRegimeResult.totalDeductions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxable Income:</span>
                    <span className="font-medium text-slate-800">{formatINR(oldRegimeResult.netTaxableIncome)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span>Rebate 87A:</span>
                    <span className="text-emerald-700">-{formatINR(oldRegimeResult.rebate87A)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cess (4%):</span>
                    <span>{formatINR(oldRegimeResult.cess)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm text-slate-900">
                    <span>Total Tax:</span>
                    <span className={!isNewBetter ? 'text-emerald-700' : 'text-slate-900'}>
                      {formatINR(oldRegimeResult.totalTaxPayable)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200">
            <button
              onClick={handleRequestFiling}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get Your ITR Filed by Nanda Tax</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <p className="text-[11px] text-center text-slate-500 mt-2">
              Expert review of AIS, 26AS, Form 16, & zero mismatch filing guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
