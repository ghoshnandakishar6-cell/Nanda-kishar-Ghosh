export interface CourseItem {
  id: string;
  title: string;
  level: string;
  duration: string;
  mode: string;
  badgeText: string;
  description: string;
  modules: {
    title: string;
    topics: string[];
  }[];
  keyHighlights: string[];
  targetAudience: string;
}

export const COURSES_DATA: CourseItem[] = [
  {
    id: 'practical-taxation-accounting-pro',
    title: 'Professional Taxation & Computerized Accounting Master Program',
    level: 'Comprehensive Professional',
    duration: '3 - 4 Months (Weekend / Weekday Batches)',
    mode: 'Classroom at Debagram Center + Live Practical Portal Work',
    badgeText: 'Flagship Job-Oriented Program',
    description: 'The complete practical blueprint to become an independent Tax Practitioner or Senior Corporate Accountant. Work on live GST, Income Tax, and TDS portals using actual client data.',
    modules: [
      {
        title: 'Module 1: Computerized Accounting with Tally Prime',
        topics: [
          'Company setup, Chart of Accounts & advanced Ledger grouping',
          'Voucher Entry (Sales, Purchase, Payment, Receipt, Contra, Journal)',
          'Inventory management, Batches, Godowns & Price levels',
          'Bank Reconciliation Statement (BRS) with automated ledger sync',
          'Trial Balance, Final Accounts, Trading, P&L, and Balance Sheet finalization'
        ]
      },
      {
        title: 'Module 2: Practical GST & E-Way Bill Mastery',
        topics: [
          'GST Registration process, verification & amendment on GST Portal',
          'Invoicing rules, HSN/SAC codes, reverse charge mechanism (RCM)',
          'Monthly GSTR-1 outward supplies return filing with B2B/B2C breakup',
          'GSTR-3B summary return filing, tax payment challan (PMT-06)',
          'GSTR-2B Input Tax Credit (ITC) reconciliation & matching',
          'E-Way Bill generation, vehicle update & cancellation'
        ]
      },
      {
        title: 'Module 3: Income Tax (ITR) & TDS E-Filing',
        topics: [
          'Overview of 5 heads of income, deductions (80C, 80D, 80TTA, 80CCD)',
          'Old Regime vs New Regime (Section 115BAC) comparative evaluation',
          'ITR-1 (Sahaj) filing for salaried individuals and pensioners',
          'ITR-4 (Sugam) presumptive taxation under Section 44AD/44ADA',
          'Form 26AS, AIS, TIS verification & Annual Tax Statement scrutiny',
          'TDS Challan 281 payment, TRACES login & Form 16/16A generation'
        ]
      },
      {
        title: 'Module 4: West Bengal Commercial Registrations & Compliances',
        topics: [
          'MSME / Udyam registration on official government portal',
          'West Bengal Professional Tax (P-Tax) Enrolment & Return filing',
          'Trade License application on Silpasathi portal',
          'Client interview handling, pricing your services & setting up freelance practice'
        ]
      }
    ],
    keyHighlights: [
      '100% Practical Portal Training — not just theory on blackboard',
      'Real-world business vouchers, invoices, and bank statements',
      'Certificate of Practical Training by Nanda Tax Solution & Academy',
      'Lifetime query support & guidance for setting up your own tax consultancy'
    ],
    targetAudience: 'B.Com / M.Com students, job seekers, junior accountants, and business owners wanting hands-on control'
  },
  {
    id: 'tally-prime-gst-express',
    title: 'Tally Prime & GST Billing Fast-Track Course',
    level: 'Beginner to Intermediate',
    duration: '6 - 8 Weeks',
    mode: 'Classroom at Debagram',
    badgeText: 'Most Popular for Quick Employment',
    description: 'Learn modern business bookkeeping, GST tax invoices, bill-wise debtor/creditor control, and automated financial reports in Tally Prime.',
    modules: [
      {
        title: 'Fundamentals of Accounting in Tally Prime',
        topics: [
          'Golden rules of accounting applied to software ledgers',
          'Creating companies with security, passwords & backups',
          'Managing Customers (Sundry Debtors) and Vendors (Sundry Creditors)'
        ]
      },
      {
        title: 'GST Transactions & Invoicing',
        topics: [
          'Enabling GST, CGST, SGST, IGST tax ledgers',
          'Creating multi-rate tax invoices with company logo and QR codes',
          'Credit Notes for sales returns, Debit Notes for purchase adjustments'
        ]
      },
      {
        title: 'Reporting & Month-End Finalization',
        topics: [
          'Cash book, Day book, and Bank book inspection',
          'Bank reconciliation & pending cheque tracking',
          'Profit & Loss Account and Balance Sheet extraction for loan & tax purposes'
        ]
      }
    ],
    keyHighlights: [
      'Fast-track practical assignments with real shop bills',
      'Keyboard shortcut mastery for lightning-fast billing',
      'Direct interview prep for local shop/office accountant vacancies'
    ],
    targetAudience: 'Class 12 pass-outs, undergraduates, and staff working in shops, petrol pumps, or distributors'
  },
  {
    id: 'hs-commerce-tuition',
    title: 'Class XI & XII Commerce Home Tuition (WBCHSE / CBSE)',
    level: 'Higher Secondary Academic',
    duration: 'Academic Year Academic Session',
    mode: 'Home Tuition / Small Batch at Debagram Center',
    badgeText: 'Academic Board Toppers Mentorship',
    description: 'Dedicated mentoring in Accountancy, Costing & Taxation for Class 11 and 12 students. Building solid numerical foundations to score 90%+ in board exams.',
    modules: [
      {
        title: 'Class XI Foundation',
        topics: [
          'Accounting principles, Journal, Ledger, Cash Book (Triple Column)',
          'Bank Reconciliation Statement, Trial Balance, Rectification of Errors',
          'Depreciation accounting (Straight Line & Written Down Value)',
          'Final Accounts of Sole Proprietorship (with comprehensive adjustments)'
        ]
      },
      {
        title: 'Class XII Board Mastery',
        topics: [
          'Partnership Accounts (Admission, Retirement, Death, Dissolution)',
          'Company Accounts (Issue of Shares, Forfeiture, Re-issue, Debentures)',
          'Analysis of Financial Statements & Cash Flow Statement (AS-3)',
          'Costing & Taxation (Materials, Labor, Overheads, Heads of Income for WBCHSE)'
        ]
      }
    ],
    keyHighlights: [
      'Chapter-wise conceptual notes in clear Bengali & English medium',
      'Solving previous 10 years ABTA / WBCHSE / CBSE board papers',
      'Weekly unit tests with strict evaluation & parent feedback meetings',
      'Doubt-clearing sessions before board exams and pre-boards'
    ],
    targetAudience: 'Class 11 & Class 12 Commerce students aiming for top marks in Higher Secondary'
  },
  {
    id: 'bcom-degree-tuition',
    title: 'B.Com (Honours & General) Costing & Taxation Mentorship',
    level: 'University Degree Coaching',
    duration: 'Semester-wise (Sem 1 through Sem 6)',
    mode: 'Coaching Center / Mentorship Batches',
    badgeText: 'University Specialization',
    description: 'In-depth university curriculum coaching covering Financial Accounting, Cost Accounting, Management Accounting, Direct Tax, and Indirect Tax (GST).',
    modules: [
      {
        title: 'Financial Accounting & Advanced Corporate Accounting',
        topics: [
          'Branch & Departmental Accounts, Hire Purchase & Installment',
          'Company Final Accounts as per Schedule III, Valuation of Goodwill & Shares',
          'Internal Reconstruction and Amalgamation of Companies'
        ]
      },
      {
        title: 'Cost & Management Accounting',
        topics: [
          'Cost Sheet preparation, Material & Labor variances',
          'Marginal Costing, CVP Analysis, Break-Even Charts, Decision Making',
          'Budgetary Control, Standard Costing & Process Costing'
        ]
      },
      {
        title: 'Direct & Indirect Taxation Papers',
        topics: [
          'Residential Status & Scope of Total Income computation',
          'Income from Salaries, House Property, Profits and Gains of Business (PGBP)',
          'Capital Gains, Other Sources, Clubbing & Deductions under Chapter VI-A',
          'GST structure, Supply, Levy, ITC, and Customs basics'
        ]
      }
    ],
    keyHighlights: [
      'Strict university syllabus coverage with standard reference book problems',
      'Numerical mastery for high CGPA / 1st Class degree performance',
      'Conceptual link between degree theory and practical market practice'
    ],
    targetAudience: 'B.Com Semester 1 - 6 students (Kalyani University, CU, Netaji Subhas Open University, etc.)'
  }
];
