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

const HOT_DESK_DETAILS = [
  { title: "Flexible Hot Desk Pass", desc: "Choose any available seat in our shared layout, plug in, and get straight to work.", icon: "zap", image: "/coworking space/CTP-1.jpg" },
  { title: "High-Speed Business Wi-Fi", desc: "Enterprise-grade secure high-speed Wi-Fi keeps your business operations running seamlessly.", icon: "wifi", image: "/coworking space/CTP-2.jpg" },
  { title: "Cost-Effective Workspace", desc: "Enjoy premium shared office amenities without the overhead costs of a traditional lease.", icon: "scale", image: "/coworking space/CTP-3.jpg" },
  { title: "Professional Networking", desc: "Collaborate and connect with a thriving community of startups, freelancers, and remote workers.", icon: "adjust", image: "/coworking space/CTP-1.jpg" },
  { title: "Access to Meeting Rooms", desc: "Host clients or teams in premium boardrooms and conference rooms at customized member rates.", icon: "office", image: "/coworking space/CTP-2.jpg" },
  { title: "Prime Office Location", desc: "Located at Kovai Thirunagar, Sitra, making it easily accessible from all key parts of Coimbatore.", icon: "trend", image: "/coworking space/CTP-3.jpg" }
];

const HOT_DESK_AMENITIES = [
  { name: "Furnished Office Space", icon: "office", desc: "Fully furnished shared work desk configurations designed for comfort." },
  { name: "Secure Business-Class Wi-Fi", icon: "wifi", desc: "High-speed internet connectivity with redundant backup links for zero downtime." },
  { name: "Air-Conditioned Environment", icon: "ac", desc: "Fully air-conditioned office environment for a comfortable workspace." },
  { name: "Facility Manager Support", icon: "shield", desc: "Dedicated onsite support team for any workspace help or technical assistance." },
  { name: "Cleaning & Maintenance", icon: "cleaning", desc: "Daily professional housekeeping to maintain an ultra-clean workspace." },
  { name: "Mail & Package Handling", icon: "heart", desc: "Secure handling of incoming postal mail, courier deliveries, and packages." },
  { name: "Front Desk Support", icon: "reception", desc: "Professional front desk support team to welcome guests and assist with enquiries." },
  { name: "Ample Parking Space", icon: "parking", desc: "Secure parking facility for two-wheelers and four-wheelers." },
  { name: "CCTV Surveillance", icon: "security", desc: "24/7 CCTV monitoring of common areas to ensure secure office environments." },
  { name: "Power Backup", icon: "generator", desc: "Uninterrupted power supply with automatic diesel generator backup." },
  { name: "Food Court Access", icon: "food", desc: "Access to onsite food courts and cafeteria areas for refreshments." },
  { name: "Purified Drinking Water", icon: "water", desc: "Continuous RO drinking water supply available at all times." },

  { name: "24/7 Building Security", icon: "lock", desc: "Round-the-clock professional security guard monitoring." },
  { name: "24/7 Building Access", icon: "clock", desc: "Work anytime according to your preferred timeline." },
  { name: "Break-Out Area", icon: "breakout", desc: "Comfortable lounge settings for networking, short breaks, or relaxation." },
  { name: "Dedicated IT Support", icon: "zap", desc: "Expert on-site technical support team to assist with your IT needs." }
];

const FAQS = [
  {
    question: "What is a Hot Desk?",
    answer: "A Hot Desk is a flexible shared workspace option where you can use any available desk in the open coworking area. It operates on a plug-and-play format, ideal for remote teams, freelancers, and businesses wanting flexibility."
  },
  {
    question: "Is there an option to book a hot desk for one day in Coimbatore?",
    answer: "Yes, our hot desks can be booked on a daily basis (Day Pass) or monthly plans in Coimbatore, providing you complete flexibility for short-term or ongoing workspace requirements."
  },
  {
    question: "What amenities are included with a Hot Desk plan?",
    answer: "Your plan includes access to secure high-speed Wi-Fi, air conditioning, RO drinking water, power backup, front desk services, mail handling, cafeteria access, parking, and common breakout zones."
  },
  {
    question: "Can I book meeting rooms with a Hot Desk plan?",
    answer: "Yes! Hot desk members can book our high-end meeting rooms and conference rooms to host client discussions, board presentations, or internal team updates at special member rates."
  },
  {
    question: "How is a Hot Desk different from a Dedicated Desk?",
    answer: "With a Dedicated Desk, you get a reserved, specific workspace assigned exclusively to you for the duration of your membership. With a Hot Desk, you choose from any open desk in our coworking zone on a first-come, first-served basis."
  },
  {
    question: "Why choose Covai Tech Park for Hot Desks in Coimbatore?",
    answer: "Covai Tech Park is situated near Sitra/Airport, one of the most accessible areas of Coimbatore. We offer top-notch facilities, high-speed redundancy internet, and a thriving business community at competitive pricing."
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
    case "print":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>;
    case "clock":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
    case "parking":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></svg>;
    default:
      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>;
  }
};

export default function HotDeskPage() {
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
            message: `Booking Inquiry for Hot Desk: ${bookingLookingFor || selectedPlan}`,
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
    setIsSubmitting(false);
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
            alt="Hot Desk Space Background"
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
              Shared Office Pass &middot; Coimbatore
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold tracking-tight text-white leading-[1.08]">
              Hot Desk in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ff802b]">
                Coimbatore
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Discover a vibrant and dynamic workspace at Covai Tech Park, offering hot desks and one day office spaces in Coimbatore. Connect and collaborate with a thriving community of professionals.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleOpenBooking("Hot Desk Plan")}
                className="px-8 py-4 bg-brand-orange hover:bg-slate-900 text-white font-medium text-sm tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-orange-500/10 hover:scale-[1.02] cursor-pointer"
              >
                Get Quote &rarr;
              </button>
              <a href="#amenities" className="px-8 py-4 border border-slate-700 hover:border-brand-orange text-slate-300 hover:bg-slate-900 font-medium text-sm tracking-widest rounded-full transition-all duration-300 cursor-pointer no-underline" >
                Explore Amenities
              </a>
            </div>
          </div>

          <div className="relative lg:w-1/2 w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
            <Image
              src={prefix("/workspace-hotdesk.png")}
              alt="Covai Tech Park Hot Desk Area"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </div>
      </section>

      {/* Floating details bar */}
      {/* <section className="py-6 bg-white border-t border-b border-slate-200 shadow-sm w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { label: "Plan", val: "Hot Desk / Day Pass" },
            { label: "Access", val: "Flexible 24/7" },
            { label: "Internet", val: "High-Speed Wi-Fi" },
            { label: "Cafeteria", val: "Unlimited RO & Cafe" },
            { label: "Setup", val: "Plug & Play Layout" },
            { label: "Community", val: "Active Network" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center justify-center p-2">
              <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mb-1">{item.label}</span>
              <span className="text-sm font-medium text-slate-800">{item.val}</span>
            </div>
          ))}
        </div>
      </section> */}

      {/* ── 2. WHY CHOOSE SECTION ── */}
      <section id="why-choose" className="py-10 sm:py-20 md:py-28 bg-white section-x w-full relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-medium text-brand-orange tracking-widest block border border-brand-orange/30 w-max px-3 py-1 rounded-sm mx-auto">
              BENEFITS &amp; CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-slate-900 tracking-tight leading-[1.1]">
              Why choose Covai Tech Park Hot Desk
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xl mx-auto font-normal">
              Covai Tech Park's Hot Desk option is perfect for professionals and businesses seeking flexibility, connectivity, and a highly productive environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {HOT_DESK_DETAILS.map((feat, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col gap-6 hover:border-brand-orange/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
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

      {/* ── 3. AMENITIES SECTION ── */}
      <section id="amenities" className="py-10 sm:py-20 md:py-28 bg-slate-100 section-x w-full relative border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-medium text-brand-orange tracking-widest block border border-brand-orange/30 w-max px-3 py-1 rounded-sm mx-auto">
              SERVICES INCLUDED
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-slate-900 tracking-tight leading-[1.1]">
              Amenities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {HOT_DESK_AMENITIES.map((amenity, idx) => (
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

      {/* ── 4. CTA SECTION ── */}
      <section className="w-full bg-gradient-to-r from-[#0a0f1c] to-[#121b2f] py-6 sm:py-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white m-0">
            Need help with finding the right workspace solution?
          </h2>
          <button
            onClick={() => handleOpenBooking("Hot Desk Expert Guidance")}
            className="px-6 py-2.5 bg-[#f03a17] hover:bg-white hover:text-slate-900 text-white font-semibold text-sm rounded-md transition-all whitespace-nowrap shadow-md cursor-pointer"
          >
            Talk to our Expert
          </button>
        </div>
      </section>

      {/* ── 5. TESTIMONIALS ── */}
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
                        <p className="text-xs text-slate-400 font-normal mt-0.5">{testimonial.role}</p>
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

      {/* ── 6. FAQ SECTION ── */}
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

      {/* ── 7. EXPLORE OTHER SOLUTIONS ── */}
      <section className="py-10 sm:py-20 md:py-28 bg-white section-x w-full border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-medium text-brand-orange tracking-widest block">ADDITIONAL WORKSPACES</span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold tracking-tight leading-[1.1] text-slate-900">
              Explore Other Workspace Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {[
              { name: "Coworking Space", desc: "Vibrant community-driven workspaces designed for flexibility.", link: "/coworking-space-in-coimbatore", img: "/workspace-hotdesk.png" },
              { name: "Private Office", desc: "Lockable, fully furnished private cabins for productive work.", link: "/private-office-space", img: "/workspace-cabin.png" },
              { name: "Managed Office", desc: "Enterprise scale fully managed spaces for large organizations.", link: "/managed-office", img: "/workspace-meeting.png" },
              { name: "Meeting Room", desc: "Premium boardrooms equipped for seamless presentations.", link: "/meeting-room", img: "/workspace-event.png" },
              { name: "Virtual Office", desc: "Prestigious addresses for GST registration and mail handling.", link: "/virtual-office", img: "/workspace-lounge.png" }
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

      {/* ── BOOKING MODAL ── */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden relative p-8 md:p-10 flex flex-col gap-6 transform scale-98 hover:scale-100 transition-transform duration-300">
            <button
              onClick={() => setBookingOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors p-2 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-outfit font-bold text-slate-800">
                Book a Workspace
              </h3>
              <p className="text-slate-500 text-sm font-normal">
                Enquire for <span className="text-brand-orange font-bold font-outfit">{selectedPlan}</span>. Our experts will connect with you.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-2 animate-slideUp">
                <span className="text-2xl">✓</span>
                <h4 className="font-bold text-lg">Inquiry Submitted!</h4>
                <p className="text-sm font-normal text-slate-600">Thank you. Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4 text-left">
                {/* Bot field (hidden) */}
                <input type="text" className="hidden" value={botField} onChange={(e) => setBotField(e.target.value)} />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">First Name</label>
                    <input
                      type="text"
                      required
                      value={bookingFirstName}
                      onChange={(e) => setBookingFirstName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-orange outline-none transition-colors text-slate-800 font-medium text-sm"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Last Name</label>
                    <input
                      type="text"
                      required
                      value={bookingLastName}
                      onChange={(e) => setBookingLastName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-orange outline-none transition-colors text-slate-800 font-medium text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input
                    type="email"
                    required
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-orange outline-none transition-colors text-slate-800 font-medium text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-orange outline-none transition-colors text-slate-800 font-medium text-sm"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                {bookingError && (
                  <p className="text-rose-600 text-xs font-medium bg-rose-50 border border-rose-100 rounded-lg p-2.5 text-center">
                    Submission failed. Please check details or try again later.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-orange hover:bg-slate-900 text-white font-medium text-sm tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-orange-500/10 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
