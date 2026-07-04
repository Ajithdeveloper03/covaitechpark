"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { contactInfo } from "../config/contactInfo";
import useEmblaCarousel from "embla-carousel-react";
import { TESTIMONIALS } from "../config/testimonials";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

const FEATURES = [
  { title: "Ideal For All Business Types", desc: "Commercial office space at Covaitechpark is feasible for startups, SMEs, freelancers, and corporates alike.", icon: "office", image: "/workspace-cabin.png" },
  { title: "Save Time & Money", desc: "Setting up a commercial office on your own is expensive. Our ready-to-use spaces save you time and significant overhead costs.", icon: "trend", image: "/workspace-lounge.png" },
  { title: "Flexible Contracts", desc: "Choose the workspace arrangement that suits your business needs — flexible short-term and long-term leasing options available.", icon: "adjust", image: "/workspace-meeting.png" },
  { title: "Fully Furnished", desc: "All commercial spaces come fully furnished with ergonomic workstations, air conditioning, and high-speed internet.", icon: "zap", image: "/workspace-hotdesk.png" },
  { title: "Prime Location", desc: "Located in a prestigious address in Coimbatore — elevate your company image and impress clients effortlessly.", icon: "scale", image: "/workspace-event.png" },
  { title: "Managed Services", desc: "Professional maintenance, housekeeping, security, and facility management so you can focus entirely on your business.", icon: "heart", image: "/workspace-cafe.png" }
];

const AMENITIES = [
  { name: "Furnished Workstations", icon: "office", desc: "Ergonomic furniture and ready-to-use workstations." },
  { name: "High-Speed Wi-Fi", icon: "wifi", desc: "SLA-backed dual fiber internet with automatic failover." },
  { name: "Air Conditioned", icon: "ac", desc: "Individually controlled AC units across all office areas." },
  { name: "Front Desk Support", icon: "reception", desc: "Professional reception presence and mail management." },
  { name: "Housekeeping", icon: "cleaning", desc: "Daily maintenance and sanitation services." },
  { name: "24/7 Security & CCTV", icon: "security", desc: "Round-the-clock surveillance and security guards." },
  { name: "Power Backup", icon: "generator", desc: "Uninterrupted power backed by auto-trigger DG sets." },
  { name: "Meeting Rooms", icon: "office", desc: "Access to boardrooms and conference rooms with AV equipment." },
  { name: "RO Drinking Water", icon: "water", desc: "Pure drinking water stations across all floors." },
  { name: "Cafeteria Access", icon: "food", desc: "Lounge area and cafeteria for meals, coffee, and tea." },
  { name: "Gym Facility", icon: "gym", desc: "In-house fitness studio for employee wellness." },
  { name: "Networking Lounges", icon: "breakout", desc: "Collaborative breakout zones for community engagement." }
];



const FAQS = [
  {
    question: "Does this property come with furnishings and maintenance service?",
    answer: "Covaitechpark offers fully-furnished and maintained commercial properties for rent. All spaces come with ergonomic furniture, air conditioning, high-speed internet, and daily housekeeping."
  },
  {
    question: "Is this commercial space a business center?",
    answer: "This commercial space is a business center in Coimbatore that offers multiple workspace options including coworking spaces, private offices, meeting rooms, and virtual office services — best suited to your requirements."
  },
  {
    question: "What are the office space solutions available at this commercial property?",
    answer: "This commercial property offers a wide range of office space solutions including coworking space, private office space, meeting space, event space, training space, and virtual office."
  },
  {
    question: "What is the minimum contract period for commercial space?",
    answer: "We offer flexible leasing terms to suit your business requirements. Contact our team for specific minimum tenure details based on the workspace size and configuration you need."
  },
  {
    question: "Can I customize the commercial space as per my brand?",
    answer: "Yes, our commercial spaces are highly customizable. We can configure the layout, furniture, branding elements, and infrastructure as per your specific operational requirements."
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

export default function CommercialOfficePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true, slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev(); }, [emblaApi]);
  const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext(); }, [emblaApi]);
  const onSelect = useCallback(() => { if (!emblaApi) return; setSelectedIndex(emblaApi.selectedScrollSnap()); }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [bookingFirstName, setBookingFirstName] = useState("");
  const [bookingLastName, setBookingLastName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingLookingFor, setBookingLookingFor] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [botField, setBotField] = useState("");

  

  const handleOpenBooking = (plan: string) => {
    setSelectedPlan(plan);
    setBookingLookingFor(plan);
    setBookingOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (bookingFirstName && bookingLastName && bookingEmail && bookingPhone) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            name: `${bookingFirstName} ${bookingLastName}`,
            email: bookingEmail,
            phone: bookingPhone,
            company: "",
            message: `Booking Inquiry for: ${bookingLookingFor || selectedPlan}`,
            source: "popup",
            bot_field: botField
          }),
        });
        if (response.ok) {
          setBookingSuccess(true);
          setTimeout(() => {
            setBookingFirstName(""); setBookingLastName(""); setSelectedPlan("");
            setBookingLookingFor(""); setBookingEmail(""); setBookingPhone("");
            setBookingOpen(false); setBookingSuccess(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Booking form error", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-inter relative select-none antialiased">
      <Header />

      {/* ── 1. HERO SECTION ── */}
      <section
        id="hero"
        className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden pt-20 md:pt-28 pb-10 md:pb-16 bg-brand-navy"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={prefix("/services-bg.png")}
            alt="Commercial Office Space Background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="relative z-10 lg:w-1/2 text-left flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-orange/20 rounded-full border border-brand-orange/30 text-brand-orange text-[10px] font-medium tracking-[0.15em] ">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              Commercial Space &middot; Coimbatore
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold tracking-tight text-white leading-[1.08]">
              Commercial Space in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ff802b]">
                Coimbatore
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Save your time searching for commercial space for rent. Covaitechpark workspace solutions are designed to offer you the right commercial space for your office space needs.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleOpenBooking("Commercial Space Quote")}
                className="px-8 py-4 bg-brand-orange hover:bg-slate-900 text-white font-medium text-sm tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-orange-500/10 hover:scale-[1.02] cursor-pointer"
              >
                Get Quote &rarr;
              </button>
              <a href="#amenities" className="px-8 py-4 border border-slate-700 hover:border-brand-orange text-slate-300 hover:bg-slate-900 font-medium text-sm tracking-widest rounded-full transition-all duration-300 cursor-pointer no-underline" >
                Explore Amenities
              </a>
            </div>
          </div>

          <div className="relative z-10 lg:w-1/2 w-full aspect-[16/9] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
            <Image
              src={prefix("/service5.png")}
              alt="Commercial Office Space Coimbatore"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </div>
      </section>

      {/* Quick Details Bar */}
      <section className="py-6 bg-white border-t border-b border-slate-200 shadow-sm w-full section-x">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { label: "Type", val: "Commercial Space" },
            { label: "Setup", val: "Fully Furnished" },
            { label: "Access", val: "24/7 Operations" },
            { label: "Internet", val: "SLA Fiber" },
            { label: "For", val: "All Business Types" },
            { label: "Location", val: "Prime Coimbatore" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center justify-center p-2">
              <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mb-1">{item.label}</span>
              <span className="text-sm font-medium text-slate-800">{item.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. ABOUT SECTION (UNIQUE UI/UX DESIGN) ── */}
      <section className="py-16 sm:py-24 bg-slate-50 section-x w-full relative overflow-hidden border-t border-slate-200">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-navy/5 skew-x-12 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[10px] font-bold text-brand-orange tracking-[0.2em] bg-brand-orange/10 px-4 py-2 rounded-full mb-4 border border-brand-orange/20">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-slate-900 tracking-tight leading-[1.1]">
              Elevate your business with our commercial spaces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Wide Card 1: Text + Image Split */}
            <div className="md:col-span-2 group relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 transition-all duration-500 hover:shadow-xl flex flex-col sm:flex-row">
              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6">
                  <IconHelper name="office" className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-slate-900 mb-4 leading-tight">
                  Find the ideal space
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Setting up an office requires significant upfront investment and maintenance overheads. Our fully furnished, managed commercial spaces save you time and money.
                </p>
              </div>
              <div className="w-full sm:w-2/5 relative min-h-[200px] sm:min-h-full bg-slate-200">
                 <Image src={prefix("/hero1.jpg")} alt="Ideal Commercial Space" fill className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                 <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-slate-50 via-slate-50/60 to-transparent z-10" />
              </div>
            </div>

            {/* Square Card 2: Minimal Solid Color */}
            <div className="md:col-span-1 group relative bg-brand-navy rounded-3xl p-8 sm:p-10 border border-slate-800 transition-all duration-500 hover:shadow-xl overflow-hidden flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6">
                  <IconHelper name="adjust" className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-outfit font-bold text-white mb-4 leading-tight">
                  Flexible terms
                </h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                The terms in the rental agreement are highly flexible, allowing you to scale up or down the workspace as per your business demands with 24/7 access throughout the year.
              </p>
            </div>

            {/* Square Card 3: Image Background */}
            <div className="md:col-span-1 group relative rounded-3xl transition-all duration-500 hover:shadow-xl overflow-hidden min-h-[300px]">
              <Image src={prefix("/hero11.jpg")} alt="Ease of access" fill className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 p-8 sm:p-10 z-20 flex flex-col justify-end text-white">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange text-white flex items-center justify-center mb-4">
                  <IconHelper name="trend" className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-outfit font-bold mb-3 leading-tight">
                  Ease of access
                </h3>
                <p className="text-white/80 leading-relaxed text-sm">
                  The commercial properties of Covai Tech Park in Coimbatore are present at a prime location in the city, making them easily accessible for your team and clients.
                </p>
              </div>
            </div>

            {/* Wide Card 4: Image Right Split */}
            <div className="md:col-span-2 group relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 transition-all duration-500 hover:shadow-xl flex flex-col sm:flex-row-reverse">
              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6">
                  <IconHelper name="breakout" className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-slate-900 mb-4 leading-tight">
                  Connect and collaborate
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Covai Tech Park offers commercial office space that allows you to connect with a professional network within the center, fostering opportunities to grow and exchange services.
                </p>
              </div>
              <div className="w-full sm:w-2/5 relative min-h-[200px] sm:min-h-full bg-slate-200">
                 <Image src={prefix("/workspace-meeting.png")} alt="Connect and collaborate" fill className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                 <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-l from-slate-50 via-slate-50/60 to-transparent z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURES SECTION ── */}
      <section id="features" className="py-10 sm:py-20 md:py-28 bg-slate-50 section-x w-full relative overflow-hidden border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-medium text-brand-orange tracking-widest block border border-brand-orange/30 w-max px-3 py-1 rounded-sm mx-auto">
              BENEFITS &amp; CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-slate-900 tracking-tight leading-[1.1]">
              Why Choose Our Commercial Office Space?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {FEATURES.map((feat, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col gap-6 hover:border-brand-orange/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-2">
                  <IconHelper name={feat.icon} className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-outfit font-bold text-lg text-slate-800">{feat.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. AMENITIES SECTION ── */}
      <section id="amenities" className="py-10 sm:py-20 md:py-28 bg-slate-100 section-x w-full relative border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-medium text-brand-orange tracking-widest block border border-brand-orange/30 w-max px-3 py-1 rounded-sm mx-auto">
              SERVICES INCLUDED
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-slate-900 tracking-tight leading-[1.1]">
              Everything Your Business Needs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {AMENITIES.map((amenity, idx) => (
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

      {/* ── 5. CTA SECTION ── */}
      <section className="w-full bg-gradient-to-r from-[#0a0f1c] to-[#121b2f] py-6 sm:py-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white m-0">
            Need help with finding the right workspace solution?
          </h2>
          <button
            onClick={() => handleOpenBooking("Commercial Space Rent Inquiry")}
            className="px-6 py-2.5 bg-[#f03a17] hover:bg-white hover:text-slate-900 text-white font-semibold text-sm rounded-md transition-all whitespace-nowrap shadow-md cursor-pointer"
          >
            Talk to our Expert
          </button>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ── */}
      <section id="testimonials" className="py-10 sm:py-20 md:py-28 bg-[#f1f3f6] section-x w-full relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-14 relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
            <div className="space-y-3 text-left">
              <span className="text-sm font-medium text-brand-orange uppercase tracking-[0.3em] block leading-none">WHAT OUR MEMBERS SAY</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-tight">
                Here&apos;s what our happy customers say!
              </h2>
              <div className="flex items-center gap-2 pt-1">
                <div className="text-brand-orange flex items-center gap-0.5 text-base">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <span className="text-sm font-medium text-brand-navy">4.9</span>
                <span className="text-slate-400 text-sm font-normal">· Google Business</span>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={scrollPrev} className="w-12 h-12 rounded-full border border-slate-300 bg-white hover:bg-brand-orange hover:border-brand-orange hover:text-white text-brand-navy flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer active:scale-95" aria-label="Previous">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              </button>
              <button onClick={scrollNext} className="w-12 h-12 rounded-full border border-slate-300 bg-white hover:bg-brand-orange hover:border-brand-orange hover:text-white text-brand-navy flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer active:scale-95" aria-label="Next">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </button>
            </div>
          </div>

          <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {TESTIMONIALS.map((testimonial, idx) => (
                <div key={idx} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3 min-w-0">
                  <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between relative group">
                    <span className="absolute top-6 right-8 text-6xl text-brand-orange/10 font-serif leading-none select-none pointer-events-none group-hover:text-brand-orange/25 transition-colors duration-300">&ldquo;</span>
                    <div>
                      <div className="flex gap-1 mb-4 text-brand-orange text-sm">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                      <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed -mt-1">&ldquo;{testimonial.quote}&rdquo;</p>
                    </div>
                    <div className="mt-8 pt-5 border-t border-slate-100 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-white font-medium text-sm shrink-0 border-none">
                        {testimonial.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                      </div>
                      <div className="text-left">
                        <p className="font-outfit font-medium text-sm text-brand-navy">{testimonial.name}</p>
                        <p className="text-sm text-brand-orange font-semibold">Verified Member</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 pt-4">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${selectedIndex === index ? "w-8 bg-brand-orange" : "w-2.5 bg-slate-300 hover:bg-slate-400"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ SECTION ── */}
      <section id="faqs" className="py-10 sm:py-20 md:py-28 bg-slate-50 section-x w-full border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-medium text-brand-orange tracking-widest block border border-brand-orange/30 w-max px-3 py-1 rounded-sm mx-auto">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className="font-outfit font-medium text-base sm:text-lg text-slate-800">{faq.question}</span>
                    <span className={`text-brand-orange text-xl font-medium transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{ maxHeight: isOpen ? "200px" : "0px", opacity: isOpen ? 1 : 0 }}
                  >
                    <p className="px-6 pb-6 text-slate-500 text-sm leading-relaxed font-normal">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 8. EXPLORE OTHER SERVICES ── */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Coworking Space", desc: "Vibrant community-driven workspaces designed for flexibility.", link: "/coworking-space-in-coimbatore", img: "/workspace-hotdesk.png" },
              { name: "Private Office", desc: "Lockable, fully furnished private cabins for productive work.", link: "/private-office-space", img: "/workspace-cabin.png" },
              { name: "Managed Office", desc: "Enterprise scale fully managed spaces for large organizations.", link: "/managed-office", img: "/workspace-meeting.png" },
              { name: "Meeting Room", desc: "Premium boardrooms equipped for seamless presentations.", link: "/meeting-room", img: "/workspace-event.png" },
            ].map((sol, idx) => (
              <Link href={sol.link} key={idx} className="group relative bg-white border border-slate-200 rounded-[2rem] overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image src={prefix(sol.img)} alt={sol.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="font-outfit font-medium text-2xl mb-1">{sol.name}</h4>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-between flex-grow bg-white relative">
                  <div className="absolute -top-6 right-6 w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-45 transition-transform duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <p className="text-slate-500 text-sm font-normal leading-relaxed pr-6">{sol.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* ── BOOKING MODAL ── */}
      {bookingOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
          <div className="bg-white rounded-[2rem] overflow-hidden w-full max-w-md shadow-2xl relative border border-slate-200 p-8 text-slate-800">
            <button onClick={() => setBookingOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 cursor-pointer transition-colors" aria-label="Close modal">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {bookingSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-brand-orange/20 text-brand-orange rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="font-outfit font-medium text-lg text-slate-900">Request Submitted!</h4>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">Our workspace expert will reach out to you within 2 hours to help you find the perfect commercial space.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <input type="text" name="bot_field" value={botField} onChange={(e) => setBotField(e.target.value)} className="hidden" style={{ display: "none" }} autoComplete="off" />
                <h3 className="font-outfit font-bold text-2xl text-slate-900">Inquire Commercial Space</h3>
                <p className="text-slate-500 text-sm">Fill out the details below to receive a customized quote.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-600">First Name</label>
                    <input type="text" required value={bookingFirstName} onChange={(e) => setBookingFirstName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-orange" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-600">Last Name</label>
                    <input type="text" required value={bookingLastName} onChange={(e) => setBookingLastName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-orange" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-600">Email Address</label>
                  <input type="email" required value={bookingEmail} onChange={(e) => setBookingEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-orange" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-600">Phone Number</label>
                  <input type="tel" required value={bookingPhone} onChange={(e) => setBookingPhone(e.target.value)} placeholder="e.g. +91 98765 43210" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-orange" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-600">Inquiry Purpose</label>
                  <input type="text" disabled value={bookingLookingFor} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500" />
                </div>
                <button type="submit" className="w-full py-4 bg-brand-orange hover:bg-slate-900 text-white text-sm font-medium tracking-widest rounded-xl transition-all duration-300 cursor-pointer mt-4">
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
\n
export const metadata = {
  title: "Commercial Space for Rent in Coimbatore | CovaiTech Park",
  description: "Prime commercial spaces for rent in Coimbatore. Ideal for businesses looking for flexible, well-connected, and premium workspace solutions.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/commercial-space-for-rent",
  }
};
