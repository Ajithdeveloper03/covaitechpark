"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { contactInfo } from "../config/contactInfo";
import useEmblaCarousel from "embla-carousel-react";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

const VIRTUAL_OFFICE_DETAILS = [
  { title: "GST & Business Registry", desc: "Obtain dynamic company registration and GST registration in a prime IT park location with all documentation.", icon: "shield", image: "/workspace-cabin.png" },
  { title: "Prestigious Address", desc: "Use our premium corporate addresses on your business cards, website, letterheads, and official documents.", icon: "zap", image: "/workspace-lounge.png" },
  { title: "Mail Handling & Scanning", desc: "Daily mail and courier receipt, scanning notifications, and secure forwarding directly to your remote location.", icon: "heart", image: "/workspace-meeting.png" },
  { title: "Meeting Room Credits", icon: "office", desc: "Complimentary monthly credits to use our premium boardrooms and conference slots for client reviews.", image: "/workspace-hotdesk.png" },
  { title: "On-Demand Hot Desking", desc: "Book physically workspace seating and professional desks on-demand when traveling or visiting headquarters.", icon: "scale", image: "/workspace-event.png" },
  { title: "Dedicated Call Routing", desc: "Add a local phone line with custom professional reception greeting and automated call-forwarding.", icon: "adjust", image: "/workspace-cafe.png" }
];

const VIRTUAL_OFFICE_AMENITIES = [
  { name: "GST Registration Support", icon: "shield", desc: "All legal papers, NOC, utility bills, and agreements." },
  { name: "Mail Scanning & Forward", icon: "reception", desc: "Immediate scanning notifications and mail sorting." },
  { name: "Prime Hub Addresses", icon: "lock", desc: "Addresses in Nehru Nagar East (CBE) & Thillai Nagar (Trichy)." },
  { name: "Complimentary Boardroom", icon: "office", desc: "Book corporate meeting rooms on-demand." },
  { name: "High-Speed SLA WiFi", icon: "wifi", desc: "High-speed SLA-backed internet access during onsite visits." },
  { name: "Breakout Lounges", icon: "breakout", desc: "Access premium breakout lounges for casual client meets." },
  { name: "Uninterrupted Backup Power", icon: "generator", desc: "100% generator power backup during onsite visits." },
  { name: "In-house Gym Studio", icon: "gym", desc: "Employee fitness studio access during physical stays." },
  { name: "RO Pure Drinking Water", icon: "water", desc: "Purified RO water dispenser availability across corridors." },
  { name: "Cafeteria Refreshments", icon: "food", desc: "Premium tea, coffee, and cafeteria access for members." },
  { name: "Smart Key Access Control", icon: "security", desc: "Authorized keycard system security for onsite bookings." },
  { name: "Housekeeping Support", icon: "cleaning", desc: "Clean and sanitised workspaces for drop-in desks." }
];

const TESTIMONIALS = [
  {
    name: "Arun Prasath",
    role: "Co-Founder, DevStudio",
    quote: "Registering our technology firm for GST through Covai Tech Park's Virtual Office plan was seamless. The document package was verified immediately by authorities."
  },
  {
    name: "Meera Nair",
    role: "Consultant, HR Link",
    quote: "An incredible service for remote professionals. Having a premium commercial address in Coimbatore instantly improved client trust in our services."
  },
  {
    name: "Siddharth Sen",
    role: "Proprietor, Apex Solutions",
    quote: "Very cost-effective. We pay a fraction of standard office leases but enjoy mail handling, call routing, and executive boardroom bookings. Outstanding value!"
  }
];

const FAQS = [
  {
    question: "What is a Virtual Office?",
    answer: "A virtual office gives your business a professional corporate address and mail handling services without the high cost of leasing a physical office. It is ideal for remote startups, freelancers, and businesses expanding into new cities."
  },
  {
    question: "Can I use this address for GST registration?",
    answer: "Yes, our Virtual Office for GST plan provides all necessary documents including the Lease Agreement, No Objection Certificate (NOC), and Electricity Bill required for official government registry."
  },
  {
    question: "How is our incoming mail handled?",
    answer: "Our front desk team receives all your mail and couriers. We notify you via email/WhatsApp, and can scan the contents or forward the packages to your physical home address on request."
  },
  {
    question: "Do I get physical space to work?",
    answer: "Yes, our plans include complimentary credits for meeting rooms and shared coworking hot desks, allowing you to run physical meetings or work from the campus when needed."
  },
  {
    question: "What is the minimum tenure for registration?",
    answer: "We offer flexible terms. Standard business registration plans are available on 1-year terms to align with legal compliance and company registry standards."
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
  const [botField, setBotField] = useState("");



  // Set page meta title for SEO
  useEffect(() => {
    document.title = "Virtual Office Address for GST & Company Registration - Covai Tech Park";
  }, []);

  const handleOpenBooking = (plan: string) => {
    setSelectedPlan(plan);
    setBookingLookingFor(plan);
    setBookingOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingFirstName && bookingLastName && bookingEmail && bookingPhone) {
      try {
        const response = await fetch("http://localhost:8000/api/contact", {
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
        }
      } catch (error) {
        console.error("Booking form error", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-inter relative select-none antialiased">
      <Header />

      {/* ── 1. HERO SECTION ── */}
      <section 
        id="hero" 
        className="relative min-h-[100vh] flex flex-col lg:flex-row justify-center items-center overflow-hidden pt-28 pb-16 section-x gap-12 bg-brand-navy"
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
        <div className="relative z-10 lg:w-1/2 text-left flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-orange/20 rounded-full border border-brand-orange/30 text-brand-orange text-[10px] font-medium tracking-[0.15em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            Statutory Company Addresses
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-medium tracking-tight text-white leading-[1.08]">
            Premium Virtual <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ff802b]">
              Office Plans
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
            Secure a prestigious commercial address for your remote company in Nehru Nagar East, Coimbatore or Thillai Nagar, Trichy. Perfect for GST registry, statutory compliance, and mail handling at the best price.
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

        <div className="relative z-10 lg:w-1/2 w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
          <Image
            src="https://images.pexels.com/photos/5920775/pexels-photo-5920775.jpeg"
            alt="Virtual Office Address Support"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      </section>

      {/* Floating details bar */}
      <section className="py-6 bg-white border-t border-b border-slate-200 shadow-sm w-full section-x">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-4">
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

      {/* ── 2. FEATURES & BENEFITS ── */}
      <section id="features" className="py-20 sm:py-28 bg-white section-x w-full relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-medium text-brand-orange uppercase tracking-widest block border border-brand-orange/30 text-brand-orange w-max px-3 py-1 rounded-sm mx-auto">
              VIRTUAL OFFICE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium text-slate-900 tracking-tight leading-[1.1]">
              Establish Credibility &amp; Professionalism
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {VIRTUAL_OFFICE_DETAILS.map((feat, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col gap-6 hover:border-brand-orange/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-inner border border-slate-200">
                  <Image src={prefix(feat.image)} alt={feat.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 800px" loading="lazy" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                      <IconHelper name={feat.icon} className="w-4.5 h-4.5" />
                    </span>
                    <h3 className="font-outfit font-medium text-lg text-slate-800">{feat.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. AMENITIES SECTION ── */}
      <section id="amenities" className="py-20 sm:py-28 bg-slate-100 section-x w-full relative border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-medium text-brand-orange uppercase tracking-widest block border border-brand-orange/30 text-brand-orange w-max px-3 py-1 rounded-sm mx-auto">
              ON-DEMAND FACILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium text-slate-900 tracking-tight leading-[1.1]">
              Full Access To Our Physical Spaces
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
      <section 
        className="relative w-full overflow-hidden py-24 bg-slate-950"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 15, 26, 0.8), rgba(10, 15, 26, 0.9)), url(${prefix("/awards-bg.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto section-x text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium tracking-tight text-white leading-tight">
            Register for GST &amp; Business Address Today
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed font-normal">
            Our legal compliance team delivers property documents, NOC letters, and utility receipts within 48 hours. Let's get registered.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => handleOpenBooking("GST Address Registration")}
              className="px-8 py-4 bg-brand-orange hover:bg-white hover:text-slate-950 text-white font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg cursor-pointer"
            >
              Sign Up Now
            </button>
            <a
              href={`tel:${contactInfo.phone1.raw}`}
              className="px-8 py-4 border border-slate-700 hover:border-brand-orange text-slate-300 hover:bg-slate-900 font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer no-underline flex items-center gap-2"
            >
              Call: {contactInfo.phone1.display}
            </a>
          </div>
        </div>
      </section>

      {/* ── 5. TESTIMONIALS ── */}
      <section id="testimonials" className="py-20 sm:py-28 bg-[#f1f3f6] section-x w-full relative overflow-hidden border-b border-slate-200">
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
                      <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-outfit font-medium">
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
      <section id="faqs" className="py-20 sm:py-28 bg-white section-x w-full relative">
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
                <span className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center text-2xl">&check;</span>
                <h4 className="font-outfit font-medium text-lg text-slate-800">Registration Inquiry Submitted!</h4>
                <p className="text-slate-400 text-sm font-normal">Our compliance office will contact you immediately.</p>
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
