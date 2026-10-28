export interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  category: 'Tax & Compliance' | 'Registrations & Licensing' | 'Accounting & Finance' | 'Academy & Tuition' | 'Business & Tech';
  shortDesc: string;
  fullDesc: string;
  scopeOfWork: string[];
  documentsNeeded: string[];
  turnaroundTime: string;
  suitableFor: string;
  deliverables: string[];
  iconName: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    slug: 'gst-services',
    title: 'GST Services – Registration & Returns',
    category: 'Tax & Compliance',
    shortDesc: 'New GST Registration, GSTR-1, GSTR-3B monthly/quarterly filing, Annual GSTR-9 returns, and GST amendment services.',
    fullDesc: 'Comprehensive Goods and Services Tax (GST) solutions covering fresh GSTIN application, QRMP scheme opt-in/opt-out, monthly GSTR-1 outward supplies filing, GSTR-3B summary return calculation with accurate Input Tax Credit (ITC) reconciliation with GSTR-2B, and department notice handling.',
    scopeOfWork: [
      'New GST Registration with Aadhaar authentication',
      'Monthly / Quarterly GSTR-1 & GSTR-3B return filing',
      'Input Tax Credit (ITC) matching and reconciliation with GSTR-2B',
      'Annual Return GSTR-9 & Reconciliation statement GSTR-9C',
      'GST Revocation of cancelled license & Core field amendment',
      'Handling of ASMT-10 scrutiny notices & DRC-01 demand responses'
    ],
    documentsNeeded: [
      'PAN Card of Business / Proprietor / Partners / Directors',
      'Aadhaar Card of authorized signatory',
      'Proof of business place (Electricity bill + Rent agreement / Tax receipt)',
      'Bank Account Proof (Cancelled cheque or Bank Statement)',
      'Passport size photograph & Digital Signature (if Company/LLP)'
    ],
    turnaroundTime: '2 - 3 business days for filing; 3 - 7 days for new registration approval',
    suitableFor: 'Traders, Manufacturers, Wholesalers, Service Providers, E-Commerce Sellers',
    deliverables: ['GST Certificate (Form REG-06)', 'ARN Acknowledgements', 'ITC Reconciliation Summary', 'Tax Challan & Payment Receipts'],
    iconName: 'Receipt'
  },
  {
    id: 2,
    slug: 'income-tax-services',
    title: 'Income Tax Services – ITR Filing (ITR-1 to 7)',
    category: 'Tax & Compliance',
    shortDesc: 'Expert e-filing of Income Tax Returns for salaried individuals, professionals, businesses, firms, and trusts with maximum refunds.',
    fullDesc: 'End-to-end Income Tax e-filing tailored for maximum legal tax savings and full statutory compliance. We examine AIS, TIS, and Form 26AS to prevent departmental mismatches and notices. Covering ITR-1 (Sahaj), ITR-2 (Capital Gains & Multiple Properties), ITR-3 (Business & Professional P&L), ITR-4 (Sugam - Presumptive 44AD/44ADA), ITR-5 (Partnership/LLP), ITR-6 (Companies), and ITR-7 (Trusts).',
    scopeOfWork: [
      'Form 16, 26AS, AIS, and TIS detailed reconciliation',
      'Comparative tax analysis under Old Regime vs New Regime (Sec 115BAC)',
      'Computation of Total Income & Tax Liability / Refund claim',
      'Preparation of Balance Sheet and Profit & Loss under 44AD / 44ADA',
      'Capital gains computation on share trading, mutual funds & real estate',
      'E-verification of ITR and tracking refund disbursement status'
    ],
    documentsNeeded: [
      'PAN Card & Aadhaar Card (linked)',
      'Form 16 / Salary slips (for salaried individuals)',
      'Bank statements of all active accounts for the financial year',
      'Investment proofs (80C, 80D Mediclaim, NPS, Home loan certificate)',
      'Capital gains statements from Zerodha/Groww/brokers (if applicable)'
    ],
    turnaroundTime: 'Same day to 2 business days',
    suitableFor: 'Salaried Employees, Doctors, Lawyers, Contractors, Retailers, NRIs, Companies',
    deliverables: ['ITR Acknowledgement (ITR-V)', 'Detailed Income Computation Sheet', 'Refund Tracking Support'],
    iconName: 'Calculator'
  },
  {
    id: 3,
    slug: 'pan-services',
    title: 'PAN Services – New Application & Correction',
    category: 'Registrations & Licensing',
    shortDesc: 'Instant New PAN card application (Form 49A), minor PAN, corrections in name, date of birth, photo, and Aadhaar-PAN linking.',
    fullDesc: 'Hassle-free Permanent Account Number (PAN) processing through authorized NSDL/UTIITSL portals. Whether you are applying for a first-time individual PAN, minor card, business PAN (Firm/Trust/Company), or updating clerical spelling errors in existing PAN.',
    scopeOfWork: [
      'Fresh Individual PAN Card application with e-KYC',
      'Non-individual PAN for Proprietorship, Partnership Firm, Trust & Private Ltd',
      'Correction in Name, Father’s Name, DOB, or mismatched signature',
      'Reprint of lost or damaged physical PAN card',
      'PAN-Aadhaar linking verification and penalty compliance advice'
    ],
    documentsNeeded: [
      'Aadhaar Card with mobile linked for instant OTP e-sign',
      'Voter Card / Passport / Driving License (for non-Aadhaar route)',
      'Proof of Date of Birth (Birth certificate / Matriculation admit card)',
      'Passport size photographs'
    ],
    turnaroundTime: 'Instant e-PAN in 24 hours; Physical card dispatched in 7 - 10 days',
    suitableFor: 'Individuals, Students, Minors, HUFs, Partnership Firms, Companies',
    deliverables: ['Instant e-PAN PDF copy', 'Physical Plastic PVC PAN Card delivered to doorstep', 'Acknowledgement Slip'],
    iconName: 'CreditCard'
  },
  {
    id: 4,
    slug: 'tds-services',
    title: 'TDS Services – Return Filing & Compliance',
    category: 'Tax & Compliance',
    shortDesc: 'Quarterly TDS return preparation (Form 24Q, 26Q, 27Q), TAN registration, challan generation, and Form 16/16A issuance.',
    fullDesc: 'Comprehensive Tax Deducted at Source (TDS) compliance service. We handle monthly tax deduction computations, online challan ITNS 281 payments, quarterly e-TDS return filing, correction statements for justification reports, and TRACES Form 16 / 16A generation.',
    scopeOfWork: [
      'Quarterly TDS Return filing: Form 24Q (Salary), Form 26Q (Non-Salary), Form 27Q',
      'Generation of Form 16 Part A & B for employees',
      'Generation of Form 16A for contractor, rent, professional fee deductees',
      'TRACES defaults resolution and demand notice rectifications',
      'TAN (Tax Deduction and Collection Account Number) registration'
    ],
    documentsNeeded: [
      'TAN of the Deductor',
      'Monthly TDS Challan receipts (BSR code, challan serial no., date, amount)',
      'Deductee PAN details and nature of payment breakdown',
      'Salary breakup sheet (for Form 24Q)'
    ],
    turnaroundTime: '2 - 3 business days per quarter',
    suitableFor: 'Employers, Contractors, Educational Institutions, Private Firms, NGOs',
    deliverables: ['TDS Return FVU Token Receipt', 'Form 16 / 16A PDF downloads', 'Deductee-wise TDS register'],
    iconName: 'Percent'
  },
  {
    id: 5,
    slug: 'msme-udyam-registration',
    title: 'MSME / Udyam Registration',
    category: 'Registrations & Licensing',
    shortDesc: 'Official Government Udyam Registration certificate for small businesses to unlock bank subsidies, collateral-free loans & tender priority.',
    fullDesc: 'Get your enterprise officially registered under the Ministry of Micro, Small and Medium Enterprises (MSME). Udyam certificate unlocks priority sector lending, lower interest on Mudra and PMEGP loans, 50% concession on trademark fees, and protection against delayed buyer payments.',
    scopeOfWork: [
      'Filing on official Udyam Registration portal with Aadhaar authentication',
      'Selection of exact NIC (National Industrial Classification) 2-digit & 5-digit codes',
      'Investment in Plant & Machinery and annual turnover categorization (Micro, Small, Medium)',
      'Addition of new branches, plant addresses or business activities to existing Udyam',
      'Guidance on MSME Samadhaan for delayed payment claims'
    ],
    documentsNeeded: [
      'Proprietor / Managing Partner / Director Aadhaar Card',
      'Business PAN Card (mandatory for partnership/company)',
      'Bank Account details (Account Number & IFSC)',
      'Enterprise name, office address, and exact nature of business'
    ],
    turnaroundTime: 'Same day to 24 hours',
    suitableFor: 'Small Retailers, Workshop Owners, Wholesalers, Freelancers, Manufacturing Units',
    deliverables: ['Official Government Udyam Registration Certificate with QR Code'],
    iconName: 'BadgeCheck'
  },
  {
    id: 6,
    slug: 'accounting-bookkeeping-services',
    title: 'Accounting Services – Bookkeeping & Tally',
    category: 'Accounting & Finance',
    shortDesc: 'Professional computerized accounting, day-to-day Tally Prime bookkeeping, bank reconciliation, and year-end Balance Sheet preparation.',
    fullDesc: 'Keep your business books pristine and audit-ready without hiring a high-cost in-house accountant. We provide monthly or quarterly bookkeeping using Tally Prime, Zoho Books, or Busy, reconciling purchase and sales ledgers, debtor/creditor aging reports, and finalizing Profit & Loss statements.',
    scopeOfWork: [
      'Daily / Monthly Purchase, Sales, Payment, and Receipt voucher entries in Tally',
      'Bank Reconciliation Statement (BRS) with monthly statements',
      'Debtors and Creditors outstanding tracking & ledger confirmations',
      'Depreciation calculation as per Companies Act and Income Tax Act',
      'Preparation of Trial Balance, Trading Account, P&L, and Balance Sheet'
    ],
    documentsNeeded: [
      'Monthly Sales & Purchase Invoices',
      'Bank Account statements for the period',
      'Expense bills, petty cash vouchers, loan interest certificates',
      'Previous year final balance sheet and inventory valuation summary'
    ],
    turnaroundTime: 'Ongoing monthly retainer or 3 - 5 days for annual finalization',
    suitableFor: 'Traders, Distributors, Builders, Supermarkets, Small Factories, Professionals',
    deliverables: ['Audited / Certified Financial Statements', 'Tally Data Backup File', 'Debtor/Creditor Summary'],
    iconName: 'BookOpen'
  },
  {
    id: 7,
    slug: 'pf-esi-services',
    title: 'PF & ESI Registration and Returns',
    category: 'Accounting & Finance',
    shortDesc: 'Employee Provident Fund (EPFO) and Employee State Insurance (ESIC) registration, monthly ECR filing, and employee UAN activation.',
    fullDesc: 'Maintain complete labor law compliance for your workforce. We assist with statutory EPF & ESIC employer code registration, monthly Electronic Challan cum Return (ECR) generation, challan payments, employee KYC updates, and exit settlement assistance.',
    scopeOfWork: [
      'New PF and ESI Employer Code registration via Shram Suvidha portal',
      'Monthly wage register computation and ECR preparation',
      'Online challan generation and receipt downloading',
      'Employee Universal Account Number (UAN) generation & Aadhaar seeding',
      'Assistance with PF withdrawal, transfer & death claim documentation'
    ],
    documentsNeeded: [
      'Company PAN, Certificate of Incorporation / Partnership Deed / Trade License',
      'Cancelled Cheque of Company Bank Account',
      'Electricity Bill / Rent Agreement of Establishment',
      'List of employees with basic salary, DOB, Aadhaar & Bank details'
    ],
    turnaroundTime: 'Monthly return within 24 hours of wage sheet submission',
    suitableFor: 'Offices, Factories, Security Agencies, Schools, Hospitals, Contractors',
    deliverables: ['Monthly ECR Challan Receipts', 'Employee UAN Allotment Sheets', 'Payment Proofs'],
    iconName: 'Users'
  },
  {
    id: 8,
    slug: 'trade-license-assistance',
    title: 'Trade License Assistance',
    category: 'Registrations & Licensing',
    shortDesc: 'Municipal Corporation and Gram Panchayat Trade License application, annual renewals, and commercial permissions in West Bengal.',
    fullDesc: 'A Trade License is mandatory to run any commercial establishment legally in West Bengal. We facilitate new trade permits and renewals across Gram Panchayats (Silpasathi portal), Municipalities, and Municipal Corporations without bureaucratic delays.',
    scopeOfWork: [
      'Application submission on West Bengal Silpasathi / UD&MA / Panchayat portal',
      'Site classification and municipal fee slab assessment',
      'Preparation of self-declaration affidavits and site plan attachments',
      'Liaison with local municipal or gram panchayat tax collectors',
      'Annual Trade License renewal processing'
    ],
    documentsNeeded: [
      'Occupancy proof: Holding tax receipt / Municipal rent bill / Land deed (Porcha)',
      'Rent Agreement & Landlord NOC (if rented property)',
      'Aadhaar & PAN card of applicant',
      'Business photograph showing signboard'
    ],
    turnaroundTime: '2 - 5 business days',
    suitableFor: 'Grocery Stores, Pharmacies, Restaurants, Coaching Centers, Service Workshops',
    deliverables: ['Official Trade Certificate / Municipal Trade License Copy'],
    iconName: 'FileCheck'
  },
  {
    id: 9,
    slug: 'fssai-food-license',
    title: 'FSSAI / Food License Assistance',
    category: 'Registrations & Licensing',
    shortDesc: 'FSSAI Basic Registration, State License, Food safety compliance, and annual return filing for all food-related businesses.',
    fullDesc: 'Legal compliance under the Food Safety and Standards Authority of India (FSSAI). Every food manufacturer, storage facility, distributor, restaurant, cloud kitchen, sweet shop, and tea stall must hold an active 14-digit FSSAI number.',
    scopeOfWork: [
      'FSSAI Basic Registration (turnover up to ₹12 Lakh/yr)',
      'FSSAI State License (turnover ₹12 Lakh to ₹20 Crore/yr)',
      'Selection of Food Product Categories (dairy, confectionery, spices, oils, etc.)',
      'Preparation of Form IX nomination, blueprint & equipment list',
      'Renewal of expiring FSSAI certificates & annual FoSCoS returns'
    ],
    documentsNeeded: [
      'Photo of Applicant & Aadhaar Card',
      'Proof of possession of premises (Electricity bill / Rent agreement)',
      'Partnership Deed / Company MoA-AoA (if non-proprietorship)',
      'Food safety management plan declaration'
    ],
    turnaroundTime: '3 - 7 business days for Basic Registration',
    suitableFor: 'Hotels, Sweet Shops, Grocery Stores, Canteens, Dairy Units, Packaged Food Sellers',
    deliverables: ['14-Digit FSSAI Registration / License Certificate with QR Code'],
    iconName: 'Utensils'
  },
  {
    id: 10,
    slug: 'digital-signature-certificate',
    title: 'Digital Signature Certificate (DSC)',
    category: 'Registrations & Licensing',
    shortDesc: 'Class-3 Digital Signature Certificates (Signing & Encryption) with USB crypto token for MCA, GST, Income Tax, and e-Tendering.',
    fullDesc: 'Paperless, paper-free Class 3 DSC issuance through verified Certifying Authorities (Capricorn, eMudhra, Vsign). DSC is required for e-tendering, company incorporation, Director DIN, EPFO returns, and signing GST/ITR documents.',
    scopeOfWork: [
      'Class 3 Combo (Signing + Encryption) or Signing-only DSC',
      'Assistance with rapid video verification & SMS OTP verification',
      'FIPS-compliant cryptographic USB Dongle token programming',
      'Installation of token drivers and browser certificate mapping',
      'DSC renewal upon token expiration'
    ],
    documentsNeeded: [
      'Aadhaar Card (active mobile for OTP)',
      'PAN Card copy',
      'Passport photo & Active Email ID',
      'Live 20-second video recording via smartphone'
    ],
    turnaroundTime: 'Issued within 30 minutes to 2 hours',
    suitableFor: 'Company Directors, Contractors bidding on government tenders, CAs, Advocates',
    deliverables: ['Programmed Class 3 USB Crypto Token', 'Password Protection Documentation'],
    iconName: 'Key'
  },
  {
    id: 11,
    slug: 'professional-tax-services',
    title: 'Professional Tax Services (P-Tax)',
    category: 'Tax & Compliance',
    shortDesc: 'West Bengal Professional Tax Registration (Enrolment EC & Registration RC), annual return filing, and challan payments.',
    fullDesc: 'Professional Tax is administered by the Directorate of Commercial Taxes, West Bengal. We handle Enrolment Certificate (for self-employed individuals/professionals) and Registration Certificate (for employers deducting P-Tax from salaries), along with annual Form III returns.',
    scopeOfWork: [
      'P-Tax Enrolment Certificate (EC) for proprietors, traders, and consultants',
      'P-Tax Registration Certificate (RC) for employers with staff',
      'Monthly / Annual P-Tax challan payment calculation via GRIPS portal',
      'Filing of Annual P-Tax Return (Form III)',
      'Settlement of non-payment notices and compound interest waivers'
    ],
    documentsNeeded: [
      'Business PAN & Proprietor Aadhaar',
      'Trade License / Municipal Certificate',
      'Electricity Bill / Commercial address proof',
      'List of staff and monthly salary slabs (for RC)'
    ],
    turnaroundTime: '1 - 2 business days',
    suitableFor: 'Doctors, Engineers, Chartered Accountants, Shop Owners, Traders, Corporate Employers',
    deliverables: ['EC / RC Certificate Copy', 'GRIPS Tax Challan Receipts', 'Annual Return Form III'],
    iconName: 'Building'
  },
  {
    id: 12,
    slug: 'import-export-code-iec',
    title: 'Import Export Code (IEC)',
    category: 'Registrations & Licensing',
    shortDesc: '10-digit DGFT Import Export Code registration for global trade, cross-border remittances, and annual IEC annual updates.',
    fullDesc: 'Mandatory license issued by the Directorate General of Foreign Trade (DGFT), Ministry of Commerce. Required by customs for import clearance and by banks to receive foreign remittances for exported goods and IT/freelancing services.',
    scopeOfWork: [
      'DGFT portal registration with Digital Signature or Aadhaar OTP',
      'Preparation of ANF 2A application with bank validation',
      'Linking with ICEGATE and customs port code mapping guidance',
      'Mandatory annual April-June IEC profile renewal/update',
      'Assistance with Export Promotion Council (RCMC) registration'
    ],
    documentsNeeded: [
      'PAN Card of Enterprise / Proprietor',
      'Aadhaar / Passport of Applicant',
      'Cancelled Cheque showing Account Holder Name, Account No. & IFSC',
      'Proof of business premise (Electricity bill / Sale deed / Lease agreement)'
    ],
    turnaroundTime: '1 - 2 business days',
    suitableFor: 'Exporters, Importers, Jute / Tea / Handloom Traders, IT Freelancers & Agencies',
    deliverables: ['Official DGFT IEC Certificate PDF with QR Code'],
    iconName: 'Globe'
  },
  {
    id: 13,
    slug: 'company-registration-roc',
    title: 'Company Registration & ROC Compliance',
    category: 'Registrations & Licensing',
    shortDesc: 'Private Limited Company, LLP, OPC incorporation, Name approval, MoA/AoA drafting, DIN, and annual MCA ROC e-filing.',
    fullDesc: 'Form your business as a recognized corporate entity. We manage SPICe+ Part A and Part B filing with the Ministry of Corporate Affairs (MCA), drafting Memorandum & Articles of Association, obtaining Director Identification Numbers (DIN), and ensuring post-incorporation compliances like Form INC-20A and annual AOC-4 / MGT-7 filings.',
    scopeOfWork: [
      'Name Reservation on RUN / SPICe+ portal',
      'Drafting Memorandum (MoA) & Articles of Association (AoA)',
      'Incorporation of Private Limited, One Person Company (OPC), Section 8 NGO, or LLP',
      'Obtaining Certificate of Incorporation (COI), PAN, TAN, and EPFO/ESIC bundled codes',
      'Commencement of Business certificate (Form INC-20A)',
      'Annual ROC e-filing (AOC-4 Financials, MGT-7 Annual Return, DIR-3 KYC)'
    ],
    documentsNeeded: [
      'PAN & Aadhaar of all Directors and Shareholders',
      'Passport size photos & Bank statements (not older than 2 months) showing residential address',
      'Registered office electricity bill + Rent agreement + NOC from owner',
      'Class 3 Digital Signature Certificate for directors'
    ],
    turnaroundTime: '5 - 10 business days for complete incorporation',
    suitableFor: 'Startups, Growing Enterprises, Manufacturing Companies, Scalable Ventures',
    deliverables: ['Certificate of Incorporation (COI)', 'CIN, PAN & TAN', 'MoA & AoA Documents', 'Share Certificates Draft'],
    iconName: 'ShieldCheck'
  },
  {
    id: 14,
    slug: 'bank-loan-project-reports',
    title: 'Bank Loan Project Reports & CMA Data',
    category: 'Accounting & Finance',
    shortDesc: 'Bankable detailed project reports (DPR) and CMA data for CC Limits, Term Loans, Mudra Scheme, PMEGP, and Stand-Up India.',
    fullDesc: 'Professionally structured financial feasibility reports tailored to meet nationalized and private bank guidelines. We prepare multi-year projected Balance Sheets, Profit & Loss projections, Cash Flow analysis, Debt Service Coverage Ratios (DSCR), Break-Even Analysis, and Credit Monitoring Arrangement (CMA) data.',
    scopeOfWork: [
      'Detailed Project Report (DPR) drafting including technical & financial aspects',
      '5-Year Projected Balance Sheet, P&L, and Fund Flow statements',
      'Computation of vital banking ratios: DSCR, Current Ratio, Debt-Equity Ratio, ROCE',
      'Specific schemes: PMEGP (KVIC), Mudra (Shishu, Kishore, Tarun), Stand-Up India, CGTMSE',
      'Working capital requirement assessment via Tandon / Nayak Committee turnover method'
    ],
    documentsNeeded: [
      'Past 3 years audited / computed financial statements (for existing business)',
      'Quotation / estimates for proposed plant, machinery, or civil construction',
      'Promoter resume, net worth details, and KYC documents',
      'Target loan amount and proposed promoter margin contribution'
    ],
    turnaroundTime: '2 - 4 business days',
    suitableFor: 'Entrepreneurs seeking business loans, farmers, agro-processing units, retail expansion',
    deliverables: ['Complete Spiral-Bound & PDF Bankable Project Report', 'CMA Format Excel & PDF'],
    iconName: 'TrendingUp'
  },
  {
    id: 15,
    slug: 'insurance-services',
    title: 'Insurance Services – Motor, Health & Life',
    category: 'Accounting & Finance',
    shortDesc: 'Complete insurance advisory: Instant Two-Wheeler / Commercial Vehicle renewal, Family Health Floater policies, and Life Cover.',
    fullDesc: 'Protect your family and commercial assets from unexpected financial shocks. We assist you in comparing and issuing policies from leading IRDAI-registered insurers with optimal coverage, cashless network hospital/garage support, and dedicated claim settlement assistance.',
    scopeOfWork: [
      'Motor Insurance: Two-Wheeler, Private Car, Commercial Trucks, Tractors, Pick-ups',
      'Instant renewal of expired motor insurance without long physical inspection delays',
      'Comprehensive Health Insurance with cashless hospitalization and zero co-pay options',
      'Term Life Insurance and Guaranteed Return Child / Retirement financial plans',
      'Claim documentation guidance and grievance redressal support'
    ],
    documentsNeeded: [
      'Vehicle Registration Certificate (RC) & Previous Insurance policy copy',
      'KYC documents of the proposer (PAN & Aadhaar)',
      'Medical history declaration (for health policies with pre-existing conditions)'
    ],
    turnaroundTime: 'Instant policy generation (10 - 30 minutes)',
    suitableFor: 'Vehicle owners, Families, Business Owners, Fleet operators',
    deliverables: ['Original Insurer Policy Document PDF', 'Payment Receipt', 'Toll-free Cashless Claim Card'],
    iconName: 'Shield'
  },
  {
    id: 16,
    slug: 'property-registration-notary',
    title: 'Property Registration & Notary Assistance',
    category: 'Registrations & Licensing',
    shortDesc: 'Drafting of Deeds, Sale / Gift Deed e-assessment, Stamp Duty calculation, Land Porcha search, and Notary Affidavit attestation.',
    fullDesc: 'Ensure your real estate transactions and legal affidavits are bulletproof. We help buyers and sellers calculate exact market valuation through West Bengal Registration portal, pay e-stamp duty via GRIPS, draft Sale/Gift/Lease deeds, and arrange government-recognized Notary Public attestations.',
    scopeOfWork: [
      'Market value assessment of land, house, or commercial shop plot in Nadia',
      'E-assessment slip generation and West Bengal Stamp Duty & Registration fee calculation',
      'Drafting of Sale Deed (Kabala), Gift Deed (Daanpatra), Partition Deed, Agreement for Sale',
      'Drafting of Notary Affidavits (Name correction, Income, Gap year, Loss of document)',
      'Appointment scheduling at Sub-Registrar Office (ADSR)'
    ],
    documentsNeeded: [
      'Chain Deed copies & Current Khatian / Porcha record',
      'PAN & Aadhaar cards of Buyer, Seller, and Witnesses',
      'Municipal / Panchayat mutation tax receipt',
      'Photographs of buyer and seller'
    ],
    turnaroundTime: '1 - 3 business days for drafting & assessment',
    suitableFor: 'Land buyers, Homeowners, Partitioning families, College students needing affidavits',
    deliverables: ['E-Assessment Market Value Slip', 'Draft Deed Document', 'Notarized Affidavits'],
    iconName: 'Landmark'
  },
  {
    id: 17,
    slug: 'e-way-bill-services',
    title: 'E-Way Bill Services',
    category: 'Tax & Compliance',
    shortDesc: 'Generation, extension, cancellation, and multi-vehicle consignment management on the National E-Way Bill portal.',
    fullDesc: 'Avoid costly vehicle detention and heavy 200% penalties on goods in transit. We manage round-the-clock E-Way Bill generation (Part A & Part B), vehicle number updation in case of breakdown or transshipment, validity extension, and consolidated e-way bills for bulk transport.',
    scopeOfWork: [
      'Generation of E-Way Bill for consignments exceeding ₹50,000 threshold',
      'Part-B vehicle number updation and transporter code assignment',
      'Extension of E-Way Bill validity before expiry during transport delays',
      'Cancellation of wrongly generated bills within the 24-hour window',
      'E-Invoice generation and QR code integration for eligible businesses'
    ],
    documentsNeeded: [
      'Tax Invoice / Delivery Challan / Bill of Supply',
      'Transporter Name & Transporter ID (TRANSIN)',
      'Vehicle Registration Number (Truck/Tempo) and approximate transit distance in KM'
    ],
    turnaroundTime: 'Instant (15 - 30 minutes)',
    suitableFor: 'Transporters, Wholesalers, Grain Merchants, Manufacturing Units, Hardware Stores',
    deliverables: ['Valid E-Way Bill PDF with Barcode for driver copy'],
    iconName: 'Truck'
  },
  {
    id: 18,
    slug: 'website-app-development',
    title: 'Website & App Development',
    category: 'Business & Tech',
    shortDesc: 'Custom business websites, e-commerce stores, billing apps, and digital branding to scale your local enterprise online.',
    fullDesc: 'Modernize your business with high-converting digital storefronts. We build mobile-responsive company websites, local catalog portals, payment gateway integrations, and customized billing & invoicing tools tailored for merchants and coaching institutes.',
    scopeOfWork: [
      'Mobile-first responsive business website design',
      'Google My Business & Local Map listing optimization',
      'Online WhatsApp product catalog & order taking integration',
      'Custom invoice generation & customer billing web tools',
      'Domain registration, business email setup, and annual hosting support'
    ],
    documentsNeeded: [
      'Business logo and brief profile',
      'List of products, services, and pricing details',
      'Contact numbers, office photos, and social media handles'
    ],
    turnaroundTime: '5 - 12 business days',
    suitableFor: 'Retailers, Doctors, Tuition Institutes, Wholesalers, Service Professionals',
    deliverables: ['Live Production Website', 'Domain & Hosting Control', 'Admin Dashboard Access'],
    iconName: 'Code'
  },
  {
    id: 19,
    slug: 'taxation-accounting-courses',
    title: 'Taxation & Accounting Training Courses',
    category: 'Academy & Tuition',
    shortDesc: 'Practical job-oriented academy training in GST portal filing, Income Tax, TDS, Tally Prime, and Balance Sheet finalization.',
    fullDesc: 'Step beyond theoretical textbooks. At Nanda Tax Solution & Academy, students, commerce graduates, and practicing accountants learn real-world compliance directly on live government filing portals and enterprise Tally software. Motto: "Learn • Practice • Succeed".',
    scopeOfWork: [
      'Practical GST: Online registration, GSTR-1, GSTR-3B, ITC reconciliation with live data',
      'Practical Income Tax: ITR-1, ITR-2, ITR-4 filing, computation of total income, Form 26AS & AIS matching',
      'Tally Prime Mastery: Company creation, inventory, GST invoices, debit/credit notes, BRS, final accounts',
      'TDS & P-Tax filing: Challan payment, Form 24Q/26Q, Form 16 issuance, WB P-Tax returns',
      'Real client case studies, printed practical assignment books & course certificate',
      'Placement guidance and freelance tax consultant setup mentorship'
    ],
    documentsNeeded: [
      'Aadhaar Card copy & 2 Passport size photos',
      'Highest academic qualification mark sheet (HS / B.Com / Any Graduate)'
    ],
    turnaroundTime: 'Batch admissions open every month (Weekday & Weekend batches)',
    suitableFor: 'B.Com Students, Commerce Job Seekers, Business Owners wanting to manage accounts, Freelancers',
    deliverables: ['Course Completion Certificate', 'Complete Practical Guide Notes', 'Job Interview Prep Support'],
    iconName: 'GraduationCap'
  },
  {
    id: 20,
    slug: 'home-tuition-accountancy-costing',
    title: 'Home Tuition – Accountancy & Costing',
    category: 'Academy & Tuition',
    shortDesc: 'Specialized 1-on-1 and small batch home coaching in Accountancy and Costing for Class 11, 12 (WBCHSE/CBSE) and B.Com students.',
    fullDesc: 'Strong conceptual foundations and exam-oriented problem-solving for commerce students in Debagram and surrounding Nadia areas. Mentored by experienced faculty specializing in Class XI & XII Higher Secondary Accountancy, Cost & Management Accounting, and Direct/Indirect Tax papers for B.Com.',
    scopeOfWork: [
      'Class 11 & 12 (WBCHSE Bengali & English Medium, CBSE, ISC) Accountancy & Costing',
      'B.Com (Calcutta University / Kalyani University / Autonomous Colleges): Financial Accounting, Costing & Taxation',
      'Step-by-step concept clarification with chapter-wise solved test papers',
      'Regular weekly mock tests and previous 10-year question paper drills',
      'Small focused batches and personalized home tuition attention in Debagram'
    ],
    documentsNeeded: [
      'Student school/college ID card',
      'Previous class mark sheet',
      'Contact number of parents/guardians'
    ],
    turnaroundTime: 'Weekly scheduled classes (Flexible morning / evening timings)',
    suitableFor: 'Class 11 & 12 Commerce Students, B.Com 1st, 2nd, 3rd Year Students, CA Foundation aspirants',
    deliverables: ['Chapter-wise Formula Sheets', 'Weekly Evaluated Test Sheets', 'Exam Suggestion Sets'],
    iconName: 'Home'
  }
];
