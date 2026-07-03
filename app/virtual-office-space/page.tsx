"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { contactInfo } from "../config/contactInfo";
import useEmblaCarousel from "embla-carousel-react";
import { TESTIMONIALS } from "../config/testimonials";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

const VIRTUAL_OFFICE_DETAILS = [
  { title: "Personalized Workspace Setup", desc: "Workspaces customized to match your team size, workflow, and business requirements.", icon: "adjust", image: "/workspace-cabin.png" },
  { title: "Premium Interiors", desc: "Modern, thoughtfully designed interiors that create a comfortable and professional work environment.", icon: "heart", image: "/workspace-lounge.png" },
  { title: "Scalable Solutions", desc: "Expand your workspace effortlessly as your team and business grow.", icon: "scale", image: "/workspace-meeting.png" },
  { title: "Easily Accessible", desc: "Strategically located with excellent connectivity and easy access for employees and visitors.", icon: "office", image: "/workspace-hotdesk.png" },
  { title: "Customer Support", desc: "Responsive on-site support to ensure smooth day-to-day operations and prompt assistance.", icon: "shield", image: "/workspace-event.png" },
  { title: "Flexible Office Solutions", desc: "Choose from coworking spaces, private cabins, managed offices, or customized workspace solutions designed to suit your business needs.", icon: "zap", image: "/workspace-cafe.png" }
];

const VIRTUAL_OFFICE_AMENITIES = [
  { name: "Furnished Office Space", icon: "office", desc: "Fully furnished workspaces designed to meet your business requirements." },
  { name: "Secure Business-Class Wi-Fi", icon: "wifi", desc: "High-speed, secure internet connectivity for seamless business operations." },
  { name: "Air-Conditioned Environment", icon: "ac", desc: "Fully air-conditioned workspaces for a comfortable working environment." },
  { name: "Cleaning & Maintenance", icon: "cleaning", desc: "Daily housekeeping and regular facility maintenance for a clean workspace." },
  { name: "Front Desk Support", icon: "reception", desc: "Professional reception services to welcome visitors and assist with enquiries." },
  { name: "Power Backup", icon: "generator", desc: "Uninterrupted power backup to ensure continuous business operations." },
  { name: "CCTV Surveillance", icon: "security", desc: "24/7 CCTV monitoring across the facility for enhanced security." },
  { name: "24/7 Building Security", icon: "lock", desc: "Round-the-clock security personnel ensuring a safe and secure workplace." },
  { name: "Facility Manager Support", icon: "breakout", desc: "Dedicated on-site facility management for day-to-day operational support." },
  { name: "Mail & Package Handling", icon: "heart", desc: "Secure handling of incoming and outgoing mail and courier deliveries." },
  { name: "Dining Area", icon: "food", desc: "Spacious and well-maintained dining area for members." },
  { name: "Break-Out Area", icon: "water", desc: "Comfortable breakout spaces for informal meetings, collaboration, and relaxation." }
];



const FAQS = [
  {
    question: "What are the documents required to book a virtual office in Coimbatore?",
    answer: "The documents required to get a virtual office space at Covai Tech Park in Coimbatore include the authorised person’s KYC (PAN, Aadhaar, photo, mobile number, email address) and company documents (if available) such as registration certificate, TAN, PAN, email address and registered phone number."
  },
  {
    question: "How will the mails and packages handled?",
    answer: "The receptionist at Covai Tech Park will receive your mail and packages and keep them safely secured at the facility for you to collect later."
  },
  {
    question: "Can the mail and packages received at Covai Tech Park be forwarded to another address?",
    answer: "Yes, Mail and packages received at your virtual office address by Covai Tech Park can be forwarded to your preferred address. However, mail forwarding charges will apply as per the mailing service provider."
  },
  {
    question: "What are the benefits of choosing a virtual office in Coimbatore?",
    answer: "Establish your business presence at prime location in coimbatore. Get a mailing address for your business communication. Access to ready to use office space. Center to host meeting, training and team gathering. Authentic address for company registration and GST registration."
  }
];

const IconHelper = ({ name, className }: { name: string; className?: string }) => {
  const cls = className || "w-6 h-6";
  switch (name) {
    case "lock":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
    case "wifi":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.94 0M12 20h.01" /></svg>;
    case "ac":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5L7 19M19 12H5M17 19L7 5M12 2l3 3M12 22l-3-3M2 12l3-3M22 12l-3 3" /></svg>;
    case "reception":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 18h20M12 4v2M12 6a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7zM5 13v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1" /></svg>;
    case "cleaning":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3c-1.2 2.5-3.5 4.8-6 6 2.5 1.2 4.8 3.5 6 6 1.2-2.5 3.5-4.8 6-6-2.5-1.2-4.8-3.5-6-6zM5 16c-.6 1.3-1.8 2.5-3 3 1.3.6 2.5 1.8 3 3 .6-1.3 1.8-2.5 3-3-1.3-.6-2.5-1.8-3-3zM19 16c-.6 1.3-1.8 2.5-3 3 1.3.6 2.5 1.8 3 3 .6-1.3 1.8-2.5 3-3-1.3-.6-2.5-1.8-3-3z" /></svg>;
    case "security":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case "generator":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
    case "office":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M9 21V9a3 3 0 0 1 6 0v12M4 21V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15" /></svg>;
    case "water":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>;
    case "food":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 8h1a4 4 0 1 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" /></svg>;
    case "gym":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6.5 6.5H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2.5M17.5 6.5H20a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2.5M6.5 12h11M6.5 9v6M17.5 9v6" /></svg>;
    case "breakout":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-9M3 14h18M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" /></svg>;
    case "zap":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
    case "trend":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
    case "adjust":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10z" /></svg>;
    case "scale":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
    case "heart":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
    case "shield":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    default:
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>;
  }
};

export default function VirtualOfficePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Carousel Testimonials
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Forms
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [bookingFirstName, setBookingFirstName] = useState("");
  const [bookingLastName, setBookingLastName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingLookingFor, setBookingLookingFor] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState(false);
  const [botField, setBotField] = useState("");



  // Set page meta title for SEO
  

  const handleOpenBooking = (plan: string) => {
    setSelectedPlan(plan);
    setBookingLookingFor(plan);
    setBookingOpen(true);
    setBookingSuccess(false);
    setBookingError(false);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (bookingFirstName && bookingLastName && bookingEmail && bookingPhone) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: `${bookingFirstName} ${bookingLastName}`,
            email: bookingEmail,
            phone: bookingPhone,
            company: "",
            message: `Booking Inquiry for Virtual Office: ${bookingLookingFor || selectedPlan}`,
            source: "popup",
            bot_field: botField
          }),
        });

        if (response.ok) {
          setBookingSuccess(true);
          setBookingError(false);
          setTimeout(() => {
            setBookingFirstName("");
            setBookingLastName("");
            setSelectedPlan("");
            setBookingLookingFor("");
            setBookingEmail("");
            setBookingPhone("");
            setBookingOpen(false);
            setBookingSuccess(false);
          }, 3000);
        } else {
          setBookingError(true);
          setTimeout(() => {
            setBookingError(false);
          }, 4000);
        }
      } catch (error) {
        console.error("Booking form error", error);
        setBookingError(true);
        setTimeout(() => {
          setBookingError(false);
        }, 4000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-inter relative select-none antialiased">
      <Header />

      {/* ── 1. HERO SECTION ── */}
      <section
        id="hero"
        className="relative min-h-[100vh] flex flex-col justify-center items-center overflow-hidden pt-20 md:pt-28 pb-10 md:pb-16 bg-brand-navy"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={prefix("/services-bg.png")}
            alt="Virtual Office Space Background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* Container wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="lg:w-1/2 text-left flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-orange/20 rounded-full border border-brand-orange/30 text-brand-orange text-[10px] font-medium tracking-[0.15em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              Premium Business Address &middot; Coimbatore
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-medium tracking-tight text-white leading-[1.08]">
              Virtual Office Space in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ff802b]">
                Coimbatore
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Premium office address suitable for company and GST registration purposes, mailing and other uses in coimbatore.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleOpenBooking("Virtual Office Quote")}
                className="px-8 py-4 bg-brand-orange hover:bg-slate-900 text-white font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-orange-500/10 hover:scale-[1.02] cursor-pointer"
              >
                Get Started &rarr;
              </button>
              <a
                href="#features"
                className="px-8 py-4 border border-slate-700 hover:border-brand-orange text-slate-300 hover:bg-slate-900 font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer no-underline"
              >
                Explore Features
              </a>
            </div>
          </div>

          <div className="relative lg:w-1/2 w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
            <Image
              src={prefix("/service3.png")}
              alt="Virtual Office Address Support"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </div>
      </section>

      {/* Floating details bar */}
      <section className="py-6 bg-white border-t border-b border-slate-200 shadow-sm w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { label: "Purpose", val: "GST & Registry" },
            { label: "Duration", val: "1 Year Contract" },
            { label: "Mail Alert", val: "Instant Email" },
            { label: "Onsite Desk", val: "Credits Included" },
            { label: "NOC Document", val: "Provided" },
            { label: "Support", val: "Compliance Team" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center justify-center p-2">
              <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mb-1">{item.label}</span>
              <span className="text-sm font-medium text-slate-800">{item.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. VIRTUAL OFFICE PLANS ── */}
      <section id="plans" className="py-16 sm:py-24 bg-white section-x w-full relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] bg-brand-orange/10 px-4 py-2 rounded-full mb-4">
              Pricing Plans
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium text-slate-900 tracking-tight leading-[1.1]">
              Virtual Office Plans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-xl hover:border-brand-orange/50 transition-all duration-500 relative flex flex-col group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-orange/5 to-transparent rounded-bl-3xl pointer-events-none" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-navy/5 text-brand-navy flex items-center justify-center shrink-0">
                  <IconHelper name="office" className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-outfit font-medium text-slate-900">Virtual Office Basic</h3>
                  <p className="text-brand-orange font-medium mt-1">INR 1000 per month</p>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {[
                  "Premium Office Address for Business Communication",
                  "Mail Handling Service",
                  "Booking and Renewal at a Phone Call"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 font-normal">
                    <span className="w-5 h-5 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleOpenBooking("Virtual Office Basic")}
                className="w-full py-4 bg-brand-navy text-white font-medium text-sm uppercase tracking-widest rounded-xl hover:bg-brand-orange transition-colors duration-300"
              >
                Choose Basic
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-brand-navy border border-brand-navy rounded-3xl p-8 sm:p-10 shadow-2xl relative flex flex-col transform md:-translate-y-4 group overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
              <div className="absolute top-4 right-4 bg-brand-orange text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange text-white flex items-center justify-center shrink-0 shadow-lg shadow-brand-orange/20">
                  <IconHelper name="shield" className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-outfit font-medium text-white">Virtual Office Premium</h3>
                  <p className="text-brand-orange font-medium mt-1">INR 3500 per month <span className="text-white/60 text-xs">(Billed Annually)</span></p>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow relative z-10">
                {[
                  "Premium Office Address for Business Communication",
                  "Documents for Company & TAX Registration",
                  "Signage",
                  "Booking and Renewal at Phone Call",
                  "Dedicated Desk Allotment"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 font-normal">
                    <span className="w-5 h-5 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleOpenBooking("Virtual Office Premium")}
                className="w-full py-4 bg-brand-orange text-white font-medium text-sm uppercase tracking-widest rounded-xl hover:bg-white hover:text-brand-navy transition-colors duration-300 shadow-xl shadow-brand-orange/20 relative z-10"
              >
                Choose Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2B. DETAILED BENEFITS (REPLACES OLD GENERIC BENEFITS) ── */}
      <section className="py-16 sm:py-20 bg-slate-50 section-x w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Col */}
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brand-orange mb-4">
                  <IconHelper name="scale" className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-outfit font-medium text-slate-900 leading-tight">
                  Authentic address for company and GST Registration
                </h3>
                <p className="text-slate-600 leading-relaxed font-normal">
                  With Covai Tech Park virtual office solution you can register an authentic office address for your professional and business needs. By choosing a virtual office you get to save huge upfront cost that is incurred when setting up a physical office space. Virtual office service provided by Covai Tech Park can be leveraged for company registration and GST registration purposes.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brand-orange mb-4">
                  <IconHelper name="heart" className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-outfit font-medium text-slate-900 leading-tight">
                  Mailing and Package Handling
                </h3>
                <p className="text-slate-600 leading-relaxed font-normal">
                  The virtual office package at Covai Tech Park includes the mailing address service feature, which allows you to use the virtual office address for receiving business mails and packages. The received items will be secured at the facility for you to collect later.
                </p>
              </div>
            </div>

            {/* Right Col */}
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brand-navy mb-4">
                  <IconHelper name="breakout" className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-outfit font-medium text-slate-900 leading-tight">
                  A place to connect
                </h3>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Covai Tech Park business center offers you the facility to get connected with your remote team, clients, and stakeholders. Covai Tech Park's on-demand services enable you to host business meetings, client presentations, and team gathering effortlessly. The meeting space at Covai Tech Park is well equipped with essentials and managed so that it's always ready to use. The virtual office premium plan comes with credits that allows you to utilize meeting room twice a year.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brand-navy mb-4">
                  <IconHelper name="office" className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-outfit font-medium text-slate-900 leading-tight">
                  Get access to ready to use workspace
                </h3>
                <p className="text-slate-600 leading-relaxed font-normal">
                  You can use the coworking space at Covai Tech Park whenever you need a workspace in Coimbatore. The virtual office premium plan includes a 3-day pass to access the hot desk on any days for a month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. AMENITIES SECTION ── */}
      <section id="amenities" className="py-10 sm:py-20 md:py-28 bg-slate-100 section-x w-full relative border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-medium text-brand-orange uppercase tracking-widest block border border-brand-orange/30 text-brand-orange w-max px-3 py-1 rounded-sm mx-auto">
              SERVICES INCLUDED
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium text-slate-900 tracking-tight leading-[1.1]">
              Amenities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {VIRTUAL_OFFICE_AMENITIES.map((amenity, idx) => (
              <div key={idx} className="bg-white border border-slate-200 hover:border-brand-orange/30 rounded-2xl p-6 transition-all duration-300 flex flex-col gap-3 group shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center group-hover:scale-105 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                  <IconHelper name={amenity.icon} className="w-5 h-5" />
                </div>
                <h4 className="font-outfit font-medium text-base text-slate-800">{amenity.name}</h4>
                <p className="text-slate-500 text-sm font-normal leading-relaxed">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA PANEL ── */}
      <section className="relative w-full overflow-hidden py-12 md:py-24 bg-gradient-to-br from-brand-navy via-[#1e293b] to-black">
        {/* Lightened glowing orb 1 */}
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-br from-brand-orange/40 to-transparent blur-[100px] pointer-events-none" />
        {/* Lightened glowing orb 2 */}
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-tl from-brand-orange/30 to-transparent blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium tracking-tight text-white leading-tight md:w-1/2">
            Need help with finding the right workspace solution?
          </h2>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:w-1/2">
            <button
              onClick={() => handleOpenBooking("GST Address Registration")}
              className="px-8 py-4 bg-brand-orange hover:bg-white hover:text-slate-950 text-white font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap"
            >
              Talk to our Expert
            </button>
            <a
              href={`tel:${contactInfo.phone1.raw}`}
              className="px-8 py-4 border border-slate-700 hover:border-brand-orange text-slate-300 hover:bg-slate-900 font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer no-underline flex items-center gap-2 whitespace-nowrap"
            >
              Call: {contactInfo.phone1.display}
            </a>
          </div>
        </div>
      </section>

      {/* ── 5. TESTIMONIALS ── */}
      <section id="testimonials" className="py-10 sm:py-20 md:py-28 bg-[#f1f3f6] section-x w-full relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-14 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
            <div className="space-y-3 text-left">
              <span className="text-sm font-medium text-brand-orange uppercase tracking-[0.3em] block leading-none">
                REMOTE FIRM ENDORSEMENTS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium text-brand-navy tracking-tight leading-tight">
                Trusted by 100+ Remote Startups
              </h2>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={scrollPrev}
                className="w-12 h-12 rounded-full border border-slate-300 bg-white hover:bg-brand-orange hover:border-brand-orange hover:text-white text-brand-navy flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                aria-label="Previous Testimonial"
              >
                &larr;
              </button>
              <button
                onClick={scrollNext}
                className="w-12 h-12 rounded-full border border-slate-300 bg-white hover:bg-brand-orange hover:border-brand-orange hover:text-white text-brand-navy flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                aria-label="Next Testimonial"
              >
                &rarr;
              </button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4 min-h-full">
                  <div className="bg-white rounded-3xl p-8 flex flex-col justify-between h-full border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic mb-8">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white font-outfit font-medium">
                        {t.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <h4 className="font-outfit font-medium text-base text-brand-navy">{t.name}</h4>
                        <span className="text-slate-400 text-xs font-normal">{t.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FAQS ── */}
      <section id="faqs" className="py-10 sm:py-20 md:py-28 bg-white section-x w-full relative">
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-medium text-brand-orange uppercase tracking-widest block border border-brand-orange/30 text-brand-orange w-max px-3 py-1 rounded-sm mx-auto">
              COMMON QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium text-slate-900 tracking-tight leading-[1.1]">
              Virtual Offices FAQ
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto text-left">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-colors text-left font-medium text-slate-800 text-sm sm:text-base font-outfit cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="text-brand-orange text-lg font-light leading-none">{openFaq === idx ? "−" : "+"}</span>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaq === idx ? "max-h-[300px] border-t border-slate-200" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-slate-500 text-sm leading-relaxed font-normal bg-white">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* ── BOOKING INQUIRY POPUP MODAL ── */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden border border-slate-100 shadow-2xl relative p-8 sm:p-10 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setBookingOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              &times;
            </button>
            <div className="space-y-2 text-left mb-6">
              <span className="text-[10px] font-medium text-brand-orange uppercase tracking-wider">Virtual Office Booking</span>
              <h3 className="font-outfit font-medium text-2xl text-slate-950">Inquire About Virtual Address</h3>
              <p className="text-slate-400 text-xs font-normal">Please share your business details and contact numbers.</p>
            </div>

            {bookingSuccess ? (
              <div className="py-12 text-center flex flex-col items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center text-2xl animate-bounce">&check;</span>
                <h4 className="font-outfit font-medium text-lg text-slate-800">Registration Inquiry Submitted!</h4>
                <p className="text-slate-400 text-sm font-normal">Our compliance office will contact you immediately.</p>
              </div>
            ) : bookingError ? (
              <div className="py-12 text-center flex flex-col items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-2xl animate-pulse">!</span>
                <h4 className="font-outfit font-medium text-lg text-red-600">Submission Failed</h4>
                <p className="text-slate-400 text-sm font-normal">There was an error submitting your request. Please try again or contact us directly.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
                <input type="text" className="hidden" value={botField} onChange={(e) => setBotField(e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">First Name</label>
                    <input required type="text" value={bookingFirstName} onChange={(e) => setBookingFirstName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Last Name</label>
                    <input required type="text" value={bookingLastName} onChange={(e) => setBookingLastName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Business Email</label>
                  <input required type="email" value={bookingEmail} onChange={(e) => setBookingEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Contact Phone</label>
                  <input required type="tel" value={bookingPhone} onChange={(e) => setBookingPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Plan Requirement</label>
                  <select value={bookingLookingFor} onChange={(e) => setBookingLookingFor(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors">
                    <option value="GST Registration Setup">GST Registration Setup</option>
                    <option value="Company Mailing Address">Company Mailing Address</option>
                    <option value="Full Call Handling Package">Full Call Handling Package</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-brand-orange hover:bg-slate-900 text-white font-medium text-xs uppercase tracking-widest rounded-full transition-all duration-300 mt-2 cursor-pointer">
                  Request Documents Pack
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
