/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  FileText, 
  MapPin, 
  Calendar, 
  Clock, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Receipt,
  CreditCard,
  Percent,
  BadgeCheck,
  Users,
  Utensils,
  Key,
  Building,
  Globe,
  Shield,
  Landmark,
  Truck,
  Code,
  Home as HomeIcon,
  Check,
  Award
} from 'lucide-react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SERVICES_DATA, ServiceItem } from './data/servicesData';
import { COURSES_DATA } from './data/coursesData';
import { IncomeTaxCalculator } from './components/IncomeTaxCalculator';
import { GstCalculator } from './components/GstCalculator';
import { DocumentChecklistFinder } from './components/DocumentChecklistFinder';
import { LoanProjectEstimator } from './components/LoanProjectEstimator';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ConsultationModal } from './components/ConsultationModal';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationPreselected, setConsultationPreselected] = useState<string>('');
  const [consultationNote, setConsultationNote] = useState<string>('');

  // Service filter state
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Tools Tab
  const [activeToolTab, setActiveToolTab] = useState<'income-tax' | 'gst' | 'checklist' | 'loan'>('income-tax');

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filtered services
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        activeCategory === 'All' || service.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.scopeOfWork.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const handleOpenConsultationWithService = (serviceTitle: string, note?: string) => {
    setConsultationPreselected(serviceTitle);
    if (note) setConsultationNote(note);
    setIsConsultationOpen(true);
  };

  const handleSelectServiceBySlug = (slug: string) => {
    const srv = SERVICES_DATA.find((s) => s.slug === slug);
    if (srv) {
      setSelectedService(srv);
    }
  };

  const renderServiceIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-emerald-600" };
    switch (iconName) {
      case 'Receipt': return <Receipt {...props} />;
      case 'Calculator': return <Calculator {...props} />;
      case 'CreditCard': return <CreditCard {...props} />;
      case 'Percent': return <Percent {...props} />;
      case 'BadgeCheck': return <BadgeCheck {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Users': return <Users {...props} />;
      case 'FileCheck': return <FileText {...props} />;
      case 'Utensils': return <Utensils {...props} />;
      case 'Key': return <Key {...props} />;
      case 'Building': return <Building {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Landmark': return <Landmark {...props} />;
      case 'Truck': return <Truck {...props} />;
      case 'Code': return <Code {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Home': return <HomeIcon {...props} />;
      default: return <FileText {...props} />;
    }
  };

  const faqs = [
    {
      q: 'Who should file an Income Tax Return (ITR)?',
      a: 'Any individual with annual gross income exceeding ₹2.5 Lakhs (Old Regime) or ₹3 Lakhs (New Regime) must file an ITR. Furthermore, filing is necessary to claim TDS refunds, apply for home or business bank loans, get visa clearance, and carry forward business or capital market losses.'
    },
    {
      q: 'What is the GST registration threshold for businesses in West Bengal?',
      a: 'For businesses engaged exclusively in the supply of goods, the GST registration threshold is ₹40 Lakhs annual turnover. For service providers, the threshold is ₹20 Lakhs. However, inter-state traders and e-commerce sellers require mandatory GST registration irrespective of turnover.'
    },
    {
      q: 'Which tax regime is better for FY 2024-25 / FY 2025-26?',
      a: 'For salaried individuals without substantial deductions (80C, 80D, HRA, home loan interest), the New Tax Regime is usually much better because it provides a standard deduction of ₹75,000 and 100% tax rebate under Section 87A for net taxable income up to ₹7,00,000 (effectively zero tax up to ₹7.75 Lakhs). You can verify your exact scenario using our interactive calculator below.'
    },
    {
      q: 'What makes Nanda Academy practical training different from normal computer courses?',
      a: 'Most computer training centers teach purely theoretical accounting. At Nanda Academy, our students practice on live government GST & Income Tax portals using actual business vouchers, learn real-time GSTR-1 / 3B filing, e-way bills, TDS returns, and work on client-grade Tally Prime balance sheets.'
    },
    {
      q: 'How can I enroll in Class XI, XII or B.Com Accountancy Home Tuition?',
      a: 'We provide specialized home tuition and small focused batches in Debagram (Shiber Dalan Para) and surrounding areas. Contact us directly at 7908355886 to schedule a trial assessment or discussion with faculty.'
    },
    {
      q: 'How quickly can I get my MSME, Trade License, or GST registered?',
      a: 'MSME/Udyam is generated within 24 hours. Trade Licenses are typically cleared within 2 to 4 days, and GST registration takes 3 to 7 working days once submitted with proper Aadhaar OTP and premise documentation.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <Header
        activeSection="home"
        onOpenConsultation={() => handleOpenConsultationWithService('General Tax Consultation')}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden py-16 sm:py-24 border-b border-slate-800">
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '28px 28px'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed editorial kicker */}
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold tracking-wider uppercase">
                <span>Nadia & West Bengal</span>
                <span aria-hidden="true">·</span>
                <span>Est. Professional Practice</span>
                <span aria-hidden="true">·</span>
                <span>ISO & Statutory Standards</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Complete Business, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                  Taxation & Accounting
                </span>
                <br />
                Solutions in Nadia.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Nanda Tax Solution & Academy delivers trusted GST, Income Tax (ITR), Company Registrations, Bookkeeping, and Bank Loan Project Reports for businesses — paired with practical accounting training and home tuition for commerce students.
              </p>

              {/* Academy motto highlight */}
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Academy Motto:</span>
                <span className="font-serif-title italic font-bold text-emerald-400 text-sm sm:text-base">
                  Learn • Practice • Succeed
                </span>
              </div>

              {/* Hero CTA buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleOpenConsultationWithService('General Tax Consultation')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50"
                >
                  <Award className="w-4 h-4 text-emerald-200" />
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/917908355886?text=Hello%20Nanda%20Tax%20Solution%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors border border-slate-700"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: 7908355886</span>
                </a>

                <a
                  href="#services"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-slate-300 hover:text-white text-sm font-medium transition-colors"
                >
                  <span>Explore 20 Services</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* 4 Quick Assurance Points */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% On-Time Filing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Debagram Office</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Live Portal Practice</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Expert Support</span>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Consultation Card (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Fast Tax Help</span>
                  <h3 className="text-lg font-bold text-white mt-0.5">Quick Service Direct Connect</h3>
                </div>
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  ₹
                </div>
              </div>

              <div className="mt-4 space-y-3.5 text-xs text-slate-300">
                <p>
                  Need immediate filing or business registration assistance? Connect directly with tax consultant <strong>Shri Nandakishor Ghosh</strong>.
                </p>

                {/* Popular fast picks */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                    Popular Immediate Inquiries:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { name: 'Income Tax Return (ITR-1 to 7) Filing', slug: 'income-tax-services' },
                      { name: 'New GST Registration & Monthly 3B Filing', slug: 'gst-services' },
                      { name: 'MSME Udyam / Trade License West Bengal', slug: 'msme-udyam-registration' },
                      { name: 'Taxation & Accounting Course Admission', slug: 'taxation-accounting-courses' },
                    ].map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => handleSelectServiceBySlug(item.slug)}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-left transition-colors group"
                      >
                        <span className="font-medium text-slate-200 group-hover:text-emerald-300">{item.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct action strip */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <a
                    href="tel:7908355886"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors border border-slate-700"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Call Helpline: +91 7908355886</span>
                  </a>

                  <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>Debagram, Shiber Dalan Para, Nadia – 741137</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statutory Deadlines & Compliance Ticker */}
      <section className="bg-emerald-50 border-b border-emerald-200 py-3.5 px-4 text-xs text-emerald-950">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-900 uppercase tracking-wide">Key Due Dates:</span>
            <span className="hidden sm:inline">GSTR-1 (11th monthly) · GSTR-3B (20th monthly) · Advance Tax Q3/Q4 · ITR E-Verification</span>
          </div>
          <button
            onClick={() => handleOpenConsultationWithService('GST Services – Registration & Returns', 'I want to ensure all my pending GST / ITR returns are filed before the deadline.')}
            className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-900 underline text-xs"
          >
            <span>Avoid late fees — File with us today</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Main 20 Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="max-w-3xl mb-10">
            <div className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-1">
              End-to-End Corporate, Tax & Advisory
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our 20 Comprehensive Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From individuals and small retailers to large partnerships and private limited companies, we handle every statutory license, return, and financial report.
            </p>
          </div>

          {/* Search bar & Category filters */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 20 services (e.g. GST, ITR, Trade License, Loan...)"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              {[
                'All',
                'Tax & Compliance',
                'Registrations & Licensing',
                'Accounting & Finance',
                'Academy & Tuition',
                'Business & Tech'
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeCategory === cat
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid (All 20 Services) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/80 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-slate-200/50"
              >
                <div>
                  {/* Top metadata strip: clean unboxed text */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-bold text-slate-900">
                      {String(service.id).padStart(2, '0')}.
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span>{service.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{service.turnaroundTime.split(';')[0]}</span>
                    </div>
                  </div>

                  {/* Service Icon & Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {renderServiceIcon(service.iconName)}
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {service.title}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Key Scope Preview (3 items) */}
                  <div className="space-y-1.5 text-xs text-slate-600 mb-5">
                    {service.scopeOfWork.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 group/btn"
                  >
                    <span>View Details & Docs</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleOpenConsultationWithService(service.title)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-emerald-600 rounded-lg transition-colors shadow-xs"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-sm text-slate-600">No service found matching "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="mt-2 text-xs font-semibold text-emerald-700 hover:underline"
              >
                Reset filters to view all 20 services
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Academy & Home Tuition Section */}
      <section id="academy" className="py-16 sm:py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">
              Practical Training & Commerce Mentorship
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Nanda Academy & Commerce Mentorship
            </h2>
            <div className="font-serif-title italic text-emerald-400 text-lg mt-1">
              "Learn • Practice • Succeed"
            </div>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              We bridge the gap between academic textbooks and live market requirements. Whether you are aiming for 90%+ in Higher Secondary Accountancy or seeking a high-paying accounting role with hands-on Tally & GST knowledge.
            </p>
          </div>

          {/* Academy Course Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {COURSES_DATA.map((course) => (
              <div
                key={course.id}
                className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-bold text-emerald-400">{course.badgeText}</span>
                    <span>{course.duration}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Modules Accordion / List */}
                  <div className="space-y-3 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Curriculum Modules:
                    </span>
                    <div className="space-y-2">
                      {course.modules.map((mod, idx) => (
                        <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                          <div className="font-semibold text-white mb-1">{mod.title}</div>
                          <ul className="text-slate-400 space-y-0.5 list-disc list-inside">
                            {mod.topics.slice(0, 3).map((topic, tidx) => (
                              <li key={tidx} className="truncate">{topic}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="bg-emerald-950/40 border border-emerald-800/40 p-3.5 rounded-xl text-xs mb-6">
                    <span className="font-bold text-emerald-300 block mb-1.5">Program Benefits:</span>
                    <div className="space-y-1 text-slate-300">
                      {course.keyHighlights.map((hl, hidx) => (
                        <div key={hidx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Class Mode:</span>
                    <span className="text-slate-300 font-medium">{course.mode}</span>
                  </div>

                  <button
                    onClick={() => handleOpenConsultationWithService(`Academy Course: ${course.title}`, `I want to enroll / inquire about fees and timings for: ${course.title}`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Inquire / Enroll Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Home tuition highlight callout */}
          <div id="tuition" className="mt-12 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-2xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold uppercase tracking-wider">
                <HomeIcon className="w-4 h-4" />
                <span>Specialized Home Tuition & Small Batches in Debagram</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Commerce Students: Class 11, 12 (WBCHSE / CBSE) & B.Com
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Personalized conceptual clarity, weekly chapter mock tests, formula sheets, and 100% doubt resolution directly at Debagram (Shiber Dalan Para) or student's home.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:7908355886"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call: 7908355886</span>
              </a>
              <button
                onClick={() => handleOpenConsultationWithService('Home Tuition – Accountancy & Costing', 'I am interested in Home Tuition for Commerce (Accountancy / Costing).')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
              >
                <span>Book Demo Class</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Financial & Tax Calculators Section */}
      <section id="calculators" className="py-16 sm:py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-1">
              Instant Self-Service Utilities
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Interactive Tax & Financial Calculators
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Use our live calculation tools to compare your Income Tax regime savings, split GST invoices, test bank loan project report feasibility, or inspect your document checklist.
            </p>
          </div>

          {/* Segmented Tool Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-xl border border-slate-200 mb-8 max-w-2xl shadow-xs">
            <button
              onClick={() => setActiveToolTab('income-tax')}
              className={`flex-1 min-w-[140px] py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeToolTab === 'income-tax'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>Income Tax (Old vs New)</span>
            </button>

            <button
              onClick={() => setActiveToolTab('gst')}
              className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeToolTab === 'gst'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Percent className="w-3.5 h-3.5 text-emerald-400" />
              <span>GST & Invoice</span>
            </button>

            <button
              onClick={() => setActiveToolTab('checklist')}
              className={`flex-1 min-w-[130px] py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeToolTab === 'checklist'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Document Checklist</span>
            </button>

            <button
              onClick={() => setActiveToolTab('loan')}
              className={`flex-1 min-w-[130px] py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeToolTab === 'loan'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Loan & Project DPR</span>
            </button>
          </div>

          {/* Active Tool View */}
          <div id="checklist">
            {activeToolTab === 'income-tax' && (
              <IncomeTaxCalculator
                onSelectConsultation={(srv, note) => handleOpenConsultationWithService(srv, note)}
              />
            )}

            {activeToolTab === 'gst' && (
              <GstCalculator
                onSelectConsultation={(srv, note) => handleOpenConsultationWithService(srv, note)}
              />
            )}

            {activeToolTab === 'checklist' && (
              <DocumentChecklistFinder />
            )}

            {activeToolTab === 'loan' && (
              <LoanProjectEstimator
                onSelectConsultation={(srv, note) => handleOpenConsultationWithService(srv, note)}
              />
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Nanda Tax Solution & Academy */}
      <section id="about" className="py-16 sm:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 6 cols: Text & Pillars */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">
                Why Local Clients Trust Us
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Your Direct, Local Tax Partner — Without Middlemen.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Generic online aggregators often outsource your sensitive financial data to unknown third parties, leading to portal mismatches and notices. At <strong>Nanda Tax Solution & Academy</strong>, you have a physical office in Debagram, Nadia, with direct phone and in-person access to Shri Nandakishor Ghosh.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Zero Mismatch Filing Guarantee</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      We cross-examine AIS, TIS, Form 26AS, and GSTR-2B before submitting any return, eliminating tax scrutiny notices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Rapid Turnaround & Transparent Fees</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Same-day ITR filing, 24-hour Udyam registration, and prompt monthly GST returns with no hidden fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Dual Excellence: Practice & Education</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      We simultaneously run active corporate taxation consultancy and an educational academy, ensuring students learn the most current tax laws.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 cols: Debagram Office & Practitioner Profile Card */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-7 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                    Head Office & Academy Center
                  </span>
                  <span className="text-xs text-slate-400">Nadia District, WB</span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Nanda Tax Solution & Academy
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Managed by Shri Nandakishor Ghosh
                  </p>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Physical Location:</span>
                      <span>Debagram, Shiber Dalan Para, Nadia, West Bengal – 741137</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Helpline / WhatsApp:</span>
                      <a href="tel:7908355886" className="text-emerald-400 font-bold hover:underline">
                        7908355886
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Office Timings:</span>
                      <span>Monday – Saturday: 9:00 AM – 8:00 PM</span>
                      <br />
                      <span>Sunday: 10:00 AM – 2:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="tel:7908355886"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call 7908355886</span>
                  </a>

                  <a
                    href="https://maps.google.com/?q=Debagram+Nadia+West+Bengal+741137"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-700"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-1">
              Common Inquiries
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Clear answers to everyday taxation, registration, and academy coaching queries.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 hover:text-emerald-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-90 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact & Enquiry Banner */}
      <section id="contact" className="py-16 bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 rounded-3xl p-8 sm:p-12 border border-emerald-800/40 text-center space-y-6">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Personalized Tax Advice & Enrollment
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto leading-tight">
              Ready to streamline your business taxes or master practical accounting?
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
              Visit our Debagram office or speak directly with our senior consultant today. Fast turnaround, transparent pricing, and 100% legal compliance.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="tel:7908355886"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Call 7908355886</span>
              </a>

              <a
                href="https://wa.me/917908355886?text=Hello%20Nanda%20Tax%20Solution%2C%20I%20would%20like%20to%20consult%20with%20you%20regarding%20tax%20services."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-md shadow-emerald-900/40"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => handleOpenConsultationWithService('General Tax Consultation')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all border border-slate-700"
              >
                <span>Book Appointment</span>
              </button>
            </div>

            <div className="pt-4 text-xs text-slate-400">
              Debagram, Shiber Dalan Para, Nadia, West Bengal – 741137 · Email: ghoshnandakishar6@gmail.com
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        onSelectService={(slug) => handleSelectServiceBySlug(slug)}
        onOpenConsultation={() => handleOpenConsultationWithService('General Tax Consultation')}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={(srvTitle) => handleOpenConsultationWithService(srvTitle)}
      />

      {/* Consultation / Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => {
          setIsConsultationOpen(false);
          setConsultationNote('');
        }}
        preselectedService={consultationPreselected}
        initialNote={consultationNote}
      />
    </div>
  );
}
