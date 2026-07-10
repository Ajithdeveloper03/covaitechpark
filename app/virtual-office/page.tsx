"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { contactInfo } from "../config/contactInfo";
import useEmblaCarousel from "embla-carousel-react";
import { TESTIMONIALS } from "../config/testimonials";

const BASE_PATH = "";
const prefix = (url: string) => `${BASE_PATH}${url}`;

const VIRTUAL_OFFICE_DETAILS = [
  { title: "Personalized Workspace Setup", desc: "Workspaces customized to match your team size, workflow, and business requirements.", icon: "adjust", image: "/virtual office/CTP-1.jpg" },
  { title: "Premium Interiors", desc: "Modern, thoughtfully designed interiors that create a comfortable and professional work environment.", icon: "office", image: "/virtual office/CTP-2.jpg" },
  { title: "Scalable Solutions", desc: "Expand your workspace effortlessly as your team and business grow.", icon: "scale", image: "/virtual office/CTP-3.jpg" },
  { title: "Easily Accessible", desc: "Strategically located with excellent connectivity and easy access for employees and visitors.", icon: "trend", image: "/virtual office/CTP-4.jpg" },
  { title: "Customer Support", desc: "Responsive on site support to ensure smooth day to day operations and prompt assistance.", icon: "reception", image: "/virtual office/CTP-5.jpg" },
  { title: "Coffee & Tea Setup", desc: "Complimentary unlimited beverages to keep your team energized.", icon: "coffee", image: "/virtual office/CTP-6.jpg" }
];

const FEATURES = [
  { name: "Secure Business Class Wi-Fi", icon: "wifi", desc: "High speed, secure internet connectivity for seamless business operations." },
  { name: "Air Conditioned Environment", icon: "ac", desc: "Fully air conditioned workspaces for a comfortable working environment." },
  { name: "Ergonomic Workstations", icon: "chair", desc: "Designed for comfort and productivity." },
  { name: "Professional Ambience", icon: "briefcase", desc: "Premium interiors and thoughtfully designed spaces." },
  { name: "Daily Housekeeping", icon: "sparkles", desc: "Well maintained and clean work environment." },
  { name: "Ample Parking Facility", icon: "parking", desc: "Dedicated and secure parking space for members." },
  { name: "24/7 Building Security", icon: "lock", desc: "Round the clock security personnel ensuring a safe and secure workplace." },
  { name: "Facility Manager Support", icon: "shield", desc: "Dedicated on site facility management for day to day operational support." },
  { name: "Cafeteria Access", icon: "cafe", desc: "Fully equipped cafeteria for meals and networking." },
  { name: "Dining Area", icon: "food", desc: "Spacious and well maintained dining area for members." },
  { name: "Break Out Area", icon: "breakout", desc: "Comfortable breakout spaces for informal meetings, collaboration, and relaxation." }
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
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-orange/20 rounded-full border border-brand-orange/30 text-brand-orange text-[10px] font-medium tracking-[0.15em] ">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              Premium Business Address &middot; Coimbatore
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold tracking-tight text-white leading-[1.08]">
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
                className="px-8 py-4 bg-brand-orange hover:bg-slate-900 text-white font-medium text-sm tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-orange-500/10 hover:scale-[1.02] cursor-pointer"
              >
                Get Started &rarr;
              </button>
              <a href="#features" className="px-8 py-4 border border-slate-700 hover:border-brand-orange text-slate-300 hover:bg-slate-900 font-medium text-sm tracking-widest rounded-full transition-all duration-300 cursor-pointer no-underline" >
                Explore Features
              </a>
            </div>
          </div>

          <div className="relative lg:w-1/2 w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
            <Image
              src={prefix("/service5.png")}
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
      
      {/* ── 2. VIRTUAL OFFICE PLANS ── */}
      <section id="plans" className="py-16 sm:py-24 bg-white section-x w-full relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[10px] font-bold text-brand-orange tracking-[0.2em] bg-brand-orange/10 px-4 py-2 rounded-full mb-4">
              Pricing Plans
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-slate-900 tracking-tight leading-[1.1]">
              Virtual Office Plans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Premium Plan (Now Office Registration) */}
            <div className="bg-brand-navy border border-brand-navy rounded-3xl p-8 sm:p-10 shadow-2xl relative flex flex-col transform md:-translate-y-4 group overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
              <div className="absolute top-4 right-4 bg-brand-orange text-white text-[10px] tracking-widest font-bold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange text-white flex items-center justify-center shrink-0 shadow-lg shadow-brand-orange/20">
                  <IconHelper name="shield" className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-outfit font-bold text-white">Office Registration</h3>
                  <p className="text-brand-orange font-medium mt-1">₹3,500 + GST / Month (Billed Annually)</p>
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
                onClick={() => handleOpenBooking("Office Registration")}
                className="w-full py-4 bg-brand-orange text-white font-medium text-sm tracking-widest rounded-xl hover:bg-white hover:text-brand-navy transition-colors duration-300 shadow-xl shadow-brand-orange/20 relative z-10"
              >
                Learn More
              </button>
            </div>

            {/* Basic Plan */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-xl hover:border-brand-orange/50 transition-all duration-500 relative flex flex-col group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-orange/5 to-transparent rounded-bl-3xl pointer-events-none" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-navy/5 text-brand-navy flex items-center justify-center shrink-0">
                  <IconHelper name="office" className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-outfit font-bold text-slate-900">Virtual Office Basic</h3>
                  <p className="text-brand-orange font-medium mt-1">₹1,500 + GST / Month (Billed Annually)  </p>
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
                className="w-full py-4 bg-brand-navy text-white font-medium text-sm tracking-widest rounded-xl hover:bg-brand-orange transition-colors duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2B. DETAILED BENEFITS ── */}
      <section id="features" className="py-16 sm:py-24 bg-white section-x w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-outfit font-bold text-brand-orange tracking-tight mb-4">
              Everything You Need to Run Your Business Remotely
            </h2>
            <p className="text-slate-500 font-normal text-lg">
              Our virtual office plans are packed with premium features designed to give your business a professional edge without the overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Wide Card 1: Text + Image Split */}
            <div className="md:col-span-2 group relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 transition-all duration-500 hover:shadow-xl flex flex-col sm:flex-row">
              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6">
                  <IconHelper name="scale" className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-slate-900 mb-4 leading-tight">
                  Authentic address for company and GST Registration
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Register an authentic office address for your professional needs. Save huge upfront costs and leverage it for company and GST registration purposes.
                </p>
              </div>
              <div className="w-full sm:w-2/5 relative min-h-[200px] sm:min-h-full bg-slate-200">
                 <Image src={prefix("/hero2.jpg")} alt="GST Registration" fill className="object-cover transition-transform duration-700 " loading="lazy" />
                 <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-slate-50 via-slate-50/60 to-transparent z-10" />
              </div>
            </div>

            {/* Square Card 2: Minimal Solid Color */}
            <div className="md:col-span-1 group relative bg-brand-navy rounded-3xl p-8 sm:p-10 border border-slate-800 transition-all duration-500 hover:shadow-xl overflow-hidden flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6">
                  <IconHelper name="heart" className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-outfit font-bold text-white mb-4 leading-tight">
                  Mailing and Package Handling
                </h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Includes a mailing address service, allowing you to receive business mails and packages securely.
              </p>
            </div>

            {/* Square Card 3: Image Background */}
            <div className="md:col-span-1 group relative rounded-3xl transition-all duration-500 hover:shadow-xl overflow-hidden min-h-[300px]">
              <Image src={prefix("/hero3.jpg")} alt="A place to connect" fill className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 p-8 sm:p-10 z-20 flex flex-col justify-end text-white">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange text-white flex items-center justify-center mb-4">
                  <IconHelper name="breakout" className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-outfit font-bold mb-3 leading-tight">
                  A place to connect
                </h3>
                <p className="text-white/80 leading-relaxed text-sm">
                  Host meetings and client presentations effortlessly.
                </p>
              </div>
            </div>

            {/* Wide Card 4: Image Right Split */}
            <div className="md:col-span-2 group relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 transition-all duration-500 hover:shadow-xl flex flex-col sm:flex-row-reverse">
              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6">
                  <IconHelper name="office" className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-slate-900 mb-4 leading-tight">
                  Access to ready-to-use workspace
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Use the coworking space whenever you need a workspace in Coimbatore. Includes a 3-day pass to access the hot desk every month.
                </p>
              </div>
              <div className="w-full sm:w-2/5 relative min-h-[200px] sm:min-h-full bg-slate-200">
                 <Image src={prefix("/hero1.jpg")} alt="Workspace" fill className="object-cover transition-transform duration-700 " loading="lazy" />
                 <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-l from-slate-50 via-slate-50/60 to-transparent z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ── 4. CTA PANEL ── */}
      <section className="w-full bg-gradient-to-r from-[#0a0f1c] to-[#121b2f] py-6 sm:py-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white m-0">
            Need help with finding the right workspace solution?
          </h2>
          <button
            onClick={() => handleOpenBooking("GST Address Registration")}
            className="px-6 py-2.5 bg-[#f03a17] hover:bg-white hover:text-slate-900 text-white font-semibold text-sm rounded-md transition-all whitespace-nowrap shadow-md cursor-pointer"
          >
            Talk to our Expert
          </button>
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-tight">
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
            <span className="text-[10px] font-medium text-brand-orange tracking-widest block border border-brand-orange/30 text-brand-orange w-max px-3 py-1 rounded-sm mx-auto">
              COMMON QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-slate-900 tracking-tight leading-[1.1]">
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

      
      {/* ── EXPLORE OTHER SOLUTIONS ── */}
      <section className="py-10 sm:py-20 md:py-28 bg-white section-x w-full border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-medium text-brand-orange tracking-widest block">
              ADDITIONAL WORKSPACES
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold tracking-tight leading-[1.1] text-slate-900">
              Explore Other Workspace Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {[
              { name: "Coworking Space", desc: "Vibrant community-driven workspaces designed for flexibility.", link: "/coworking-space-in-coimbatore", img: "/workspace-hotdesk.png" },
              { name: "Hot Desk", desc: "Flexible, non-reserved desks in a vibrant shared coworking layout.", link: "/hot-desk", img: "/workspace-cafe.png" },
              { name: "Private Office", desc: "Lockable, fully furnished private cabins for productive work.", link: "/private-office-space", img: "/workspace-cabin.png" },
              { name: "Managed Office", desc: "Enterprise scale fully managed spaces for large organizations.", link: "/managed-office", img: "/workspace-meeting.png" },
              { name: "Meeting Room", desc: "Premium boardrooms equipped for seamless presentations.", link: "/meeting-room", img: "/workspace-event.png" }
            ].map((sol, idx) => (
              <Link href={sol.link} key={idx} className="group relative bg-white border border-slate-200 rounded-[2rem] overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image src={prefix(sol.img)} alt={sol.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="font-outfit font-medium text-xl mb-1">{sol.name}</h4>
                  </div>
                </div>
                <div className="p-5 flex flex-col justify-between flex-grow bg-white relative">
                  <div className="absolute -top-6 right-6 w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-45 transition-transform duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <p className="text-slate-500 text-xs font-normal leading-relaxed pr-6 line-clamp-3">{sol.desc}</p>
                </div>
              </Link>
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
              <span className="text-[10px] font-medium text-brand-orange tracking-wider">Virtual Office Booking</span>
              <h3 className="font-outfit font-bold text-2xl text-slate-950">Inquire About Virtual Address</h3>
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
                    <label className="text-[10px] font-black text-slate-400 tracking-wider block mb-1">First Name</label>
                    <input required type="text" value={bookingFirstName} onChange={(e) => setBookingFirstName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 tracking-wider block mb-1">Last Name</label>
                    <input required type="text" value={bookingLastName} onChange={(e) => setBookingLastName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 tracking-wider block mb-1">Business Email</label>
                  <input required type="email" value={bookingEmail} onChange={(e) => setBookingEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 tracking-wider block mb-1">Contact Phone</label>
                  <input required type="tel" value={bookingPhone} onChange={(e) => setBookingPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 tracking-wider block mb-1">Plan Requirement</label>
                  <select value={bookingLookingFor} onChange={(e) => setBookingLookingFor(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors">
                    <option value="GST Registration Setup">GST Registration Setup</option>
                    <option value="Company Mailing Address">Company Mailing Address</option>
                    <option value="Full Call Handling Package">Full Call Handling Package</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-brand-orange hover:bg-slate-900 text-white font-medium text-xs tracking-widest rounded-full transition-all duration-300 mt-2 cursor-pointer">
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
