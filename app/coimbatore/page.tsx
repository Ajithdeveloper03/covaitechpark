"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

const COIMBATORE_PLAN_DETAILS = [
  {
    name: "Day Pass",
    tag: "Flexible",
    price: "₹450",
    priceUnit: "/seat/day",
    description: "Reserve your seat in our coworking space for individuals and enjoy all the amenities with the flexibility to use it your way when you book by the hour, day or month.",
    image: prefix("/workspace-lounge.png"),
    featured: false,
    details: [
      "Flexible Shared Space Access",
      "High-Speed Dual-Fiber Internet",
      "Ergonomic Hot Desking", 
      "Breakout Lounge Access",
      "Purified Drinking Water",
      "Flexible hourly/daily terms"
    ]
  },
  {
    name: "Dedicated Desk",
    tag: "Most Popular",
    price: "₹6,000",
    priceUnit: "/seat/month",
    description: "Enjoy the comfort of your own dedicated desk in our coworking space. The desk is reserved for you at a specific spot in our facility during your membership period.",
    image: prefix("/workspace-cabin.png"),
    featured: true,
    details: [
      "Reserved Permanent Workspace",
      "Ergonomic Desk & Chair",
      "Dedicated Under-Desk Locker",
      "Business Address Option",
      "High-Speed Internet & SLA Backup",
      "24/7 Access to Facility"
    ]
  }
];

const COIMBATORE_AMENITIES = [
  { name: "Furnished Office Space", icon: "office", desc: "Move-in ready cabins and premium ergonomic desk setups." },
  { name: "Secure Business Wi-Fi", icon: "wifi", desc: "Dual-active high-speed fiber lines with SLA backup." },
  { name: "Air-conditioned Rooms", icon: "ac", desc: "Individually controlled smart climate systems." },
  { name: "Facility Manager Support", icon: "support", desc: "Dedicated professional team on-site for daily operations." },
  { name: "Cleaning & Maintenance", icon: "cleaning", desc: "Rigorous daily housekeeping and upkeep." },
  { name: "Mail & Package Handling", icon: "mail", desc: "Secure receiving, logging, and storage services." },
  { name: "Front Desk Support", icon: "reception", desc: "Warm reception services for your clients and guests." },
  { name: "Dedicated Parking", icon: "parking", desc: "Allocated slots for two-wheelers and four-wheelers." },
  { name: "CCTV Surveillance", icon: "cctv", desc: "Continuous security monitoring for absolute safety." },
  { name: "Power Backup (24x7)", icon: "generator", desc: "Uninterrupted operation with heavy diesel generators." },
  { name: "Cafeteria / Food Court", icon: "food", desc: "Fresh meals, snacks, and hot beverages on-site." },
  { name: "Purified Drinking Water", icon: "water", desc: "Clean, healthy RO drinking water stations." },
  { name: "Printers & Scanners", icon: "printer", desc: "Advanced multi-function network printing hubs." },
  { name: "On-site Security Guard", icon: "security", desc: "24/7 manned security for safety and compliance." },
  { name: "24x7 Building Access", icon: "access", desc: "Work on your schedule with secure entry systems." },
  { name: "Break-out Lounge", icon: "breakout", desc: "Vibrant zones to relax and network with members." },
  { name: "In-House Gym Facility", icon: "gym", desc: "Fully equipped fitness studio for wellness." }
];

const COIMBATORE_TESTIMONIALS = [
  {
    name: "Saravanan",
    role: "Tech Lead",
    quote: "Ready to move office space at the best price. I highly recommend this place if you are planning for an office space in Coimbatore."
  },
  {
    name: "Vivek Anand",
    role: "Founder, Startup Firm",
    quote: "I'm happy to share this information. It has a friendly atmosphere working in the community space. They provide end to end support and suitable for startup firm, freelancers and large scale business office use."
  },
  {
    name: "Vijayakumar Balu",
    role: "Remote Consultant",
    quote: "I used this Facility and found to be useful and productive for me. I recommend this facility for freelancers or startups or corporate professionals working remotely."
  },
  {
    name: "Dhanush",
    role: "Operations Manager",
    quote: "It is clean and bright place and convenient to work. We Booked conference room for a day to a official business meet, our team is so happy and satisfied with their service. Then it's a great experience to us and also reasonable price."
  }
];

const COIMBATORE_FAQS = [
  {
    question: "Is there an option to book a coworking space for one day in Coimbatore?",
    answer: "Yes, the shared workspace can be booked for a day in Coimbatore. The terms for using the workspace are highly flexible to meet your short-term and long-term office space needs."
  },
  {
    question: "How is dedicated desk different from hot desk plan?",
    answer: "The main difference between a dedicated desk plan and a hot desk is that with a dedicated desk plan, you get a specific spot to work during your membership period at the coworking space. On the other hand, with a hot desk, you get a work desk in an unreserved spot."
  },
  {
    question: "What are the types of workspace available at Covai Tech Park in Coimbatore?",
    answer: "Dedicated desk and hot desk are the two primary coworking space options available in Coimbatore. Further, there are other options like private office space, virtual office, and much more at Covai Tech Park."
  },
  {
    question: "Is there 24/7 access to the coworking space facility?",
    answer: "Yes, the Covai Tech Park’s coworking space facility is accessible 24/7."
  },
  {
    question: "Who can benefit from coworking space?",
    answer: "Coworking spaces in Coimbatore are best suited for entrepreneurs, remote workers, freelancers, small-medium enterprises, startups, businesses, and professionals who want to be part of a dynamic community."
  },
  {
    question: "Can we host events in this coworking facility?",
    answer: "Yes, Event spaces are available at Covai Tech Park."
  },
  {
    question: "What are the benefits of choosing a shared office space in Coimbatore?",
    answer: "Professional working environment at affordable price. Opportunities to network and collaborate. Workspace that is flexible and can be adjusted according to your requirements."
  }
];

const COIMBATORE_WHY_CHOOSE = [
  {
    id: "01",
    title: "Flexible Plans",
    subtitle: "SYNERGY & DYNAMICS",
    description: "Covai Tech Park offers flexible coworking membership plans that cater to your long-term and short-term workspace needs. Whether you're looking for a dedicated desk or a hot desk, we have options that can fulfill your requirements. You can book our coworking space starting from a day, a week, or a month - for as long as you need it!",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=600&q=80",
    points: [
      "No long-term lease bindings",
      "Flexible daily or monthly options",
      "Easy scaling as your team grows"
    ]
  },
  {
    id: "02",
    title: "Cost-effective Workspace",
    subtitle: "MAXIMUM EFFICIENCY",
    description: "Coworking space at Covai Tech Park business center are ready-to-use, which significantly reduce the initial investment required to set up your office space in Coimbatore. Focus on business growth rather than heavy upfront capital expenditure.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    points: [
      "Zero setting up expenses",
      "Fully serviced operations included",
      "Shared utilities reduce overall costs"
    ]
  },
  {
    id: "03",
    title: "Maintenance Covered",
    subtitle: "HASSLE-FREE OPERATIONS",
    description: "Don't worry about the maintenance of your office space - we've got you covered! Our dedicated staff handle regular cleaning and maintenance of the Covai Tech Park facility to keep your workspace fresh, secure, and fully functional.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    points: [
      "Daily professional housekeeping",
      "Regular systems maintenance",
      "24/7 responsive management support"
    ]
  },
  {
    id: "04",
    title: "Best in Class Amenities",
    subtitle: "ENTERPRISE CAPABILITIES",
    description: "To provide you with a productive working experience, we have equipped our business center with best-in-class amenities such as high-speed internet connectivity, ergonomic furniture, air-conditioned environment, power backup, and much more.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    points: [
      "SLA-backed dual-fiber internet",
      "Smart environment controls",
      "Robust backup electricity"
    ]
  },
  {
    id: "05",
    title: "Meeting & Board Rooms",
    subtitle: "IMPACTFUL DISCUSSIONS",
    description: "You can book meeting room and conference room to host your business meetings, team discussions and client presentations whenever you need. Soundproof cabins with modern writing systems and digital displays.",
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=600&q=80",
    points: [
      "Sleek boardrooms & seminar spaces",
      "Smart presentation screens",
      "On-demand catering and support"
    ]
  },
  {
    id: "06",
    title: "Prime Location",
    subtitle: "STRATEGIC CONNECTIVITY",
    description: "Covai Tech Park is located in a prime area of Coimbatore, providing office space for rent that can be easily accessible from localities such as R S Puram, Avinashi Road, Race Course Road, Ganapathy, Saravanampatti, Villankiruchi Road, Eachanari, Sai Baba Colony, Udayampalayam, Sri Krishna Avenue and many more.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    points: [
      "Heart of Coimbatore hub",
      "Excellent transport accessibility",
      "Close to premium retail & dining"
    ]
  }
];

const AmenityIcon = ({ name, className }: { name: string; className?: string }) => {
  const cls = className || "w-6 h-6";
  switch (name) {
    case "office":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 21V5.25A2.25 2.25 0 0017.25 3h-10.5A2.25 2.25 0 004.5 5.25V21m15 0h-15M19.5 21h-3v-3A2.25 2.25 0 0014.25 15h-4.5A2.25 2.25 0 007.5 17.25v3h-3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6h.008v.008H9V6zm0 3h.008v.008H9V9zm0 3h.008v.008H9V12zm3-6h.008v.008H12V6zm0 3h.008v.008H12V9zm0 3h.008v.008H12V12zm3-6h.008v.008H15V6zm0 3h.008v.008H15V9zm0 3h.008v.008H15V12z" />
        </svg>
      );
    case "wifi":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856a9.75 9.75 0 0113.788 0M1.924 8.674a14.25 14.25 0 0120.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
        </svg>
      );
    case "ac":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l-3 3m3-3l3 3m-3 12l-3-3m3 3l3-3M3 12h18M3 12l3-3m-3 3l3 3m12-3l-3-3m3 3l-3 3" />
        </svg>
      );
    case "support":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728A9 9 0 015.636 5.636" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 100-12 6 6 0 000 12z" />
        </svg>
      );
    case "cleaning":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096M9 21h3.75m-8.25-3h12a1.5 1.5 0 001.5-1.5V11.25m-15 3v-6a1.5 1.5 0 011.5-1.5h13.5a1.5 1.5 0 011.5 1.5v3.75m-16.5-3.75h18" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 6.75h.008v.008H15V6.75zm.75 2.25h.008v.008H15.75V9zm.75-2.25h.008v.008H16.5V6.75z" />
        </svg>
      );
    case "mail":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      );
    case "reception":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
        </svg>
      );
    case "parking":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3m2.25 0h1.5m10.125-9h4.875a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5H10m-5.25-9h10.5m-10.5 0a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5m-10.5 0v7.5M12 9v3.75m0 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0" />
        </svg>
      );
    case "cctv":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316A2.192 2.192 0 0014.502 4h-5c-.7 0-1.363.336-1.782.909l-.893 1.266zM12 15.75a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      );
    case "generator":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
    case "food":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.003 9.003 0 008.367-5.633M12 21a9.003 9.003 0 01-8.367-5.633m16.734 0A9.003 9.003 0 0012 3v18M12 3a9.003 9.003 0 00-8.367 12.367" />
        </svg>
      );
    case "water":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      );
    case "printer":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.617 0-1.11-.474-1.12-1.09L5.8 18M17.66 18H5.8m14.05-8.125a3.375 3.375 0 00-3.375-3.375H5.8a3.375 3.375 0 00-3.375 3.375v1.5a1.125 1.125 0 001.125 1.125h15.75a1.125 1.125 0 001.125-1.125v-1.5zM16.5 9h.008v.008H16.5V9z" />
        </svg>
      );
    case "security":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
        </svg>
      );
    case "access":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      );
    case "breakout":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M3 7.5V18M21 12H3m15-4.5a3 3 0 10-6 0v4.5h6V7.5zM9 7.5a3 3 0 10-6 0v4.5h6V7.5z" />
        </svg>
      );
    case "gym":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6h10.5M6.75 18h10.5M12 3v18M3 12h18" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

export default function CoimbatorePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Embla Carousel setup for Testimonials
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Embla Carousel setup for Workspace Directory
  const [directoryRef, directoryApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1
  });
  const scrollDirectoryPrev = useCallback(() => {
    if (directoryApi) directoryApi.scrollPrev();
  }, [directoryApi]);
  const scrollDirectoryNext = useCallback(() => {
    if (directoryApi) directoryApi.scrollNext();
  }, [directoryApi]);

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

  // Set page meta title for SEO
  useEffect(() => {
    document.title = "Book a Shared Office For Rent in Coimbatore | Coworking Space";
  }, []);

  // Booking Modal States
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleOpenBooking = (plan: string) => {
    setSelectedPlan(plan);
    setBookingOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingName && bookingEmail && bookingPhone) {
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingName("");
        setSelectedPlan("");
        setBookingEmail("");
        setBookingPhone("");
        setBookingOpen(false);
        setBookingSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-brand-navy flex flex-col font-inter relative select-none font-bold text-base antialiased">
      
      {/* ── HEADER / NAVBAR ── */}
      <header
        className={`left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "fixed top-0 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-2.5 lg:py-3.5"
            : "absolute top-0 lg:top-4 bg-transparent border-none py-3 lg:py-4"
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 xl:px-12 flex justify-between items-center gap-2 sm:gap-3 lg:gap-4">
          
          <a
            href={prefix("/")}
            className="flex items-center shrink-0 transition-all duration-300 hover:scale-[1.01] min-w-0 p-1 sm:p-1.5 md:p-2 bg-white rounded-lg sm:rounded-xl shadow-sm"
          >
            <Image
              src={prefix("/covai-tech-park-logo.png")}
              alt="Covai Tech Park"
              width={180}
              height={85}
              priority
              className="object-contain h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[200px]"
            />
          </a>

          <nav
            className={`hidden xl:flex items-center gap-8 text-[12px] font-medium tracking-widest uppercase mx-auto transition-colors duration-300 ${
              isScrolled ? "text-slate-700" : "text-white/80"
            }`}
          >
            <div className="relative group cursor-pointer">
              <a href={prefix("/#locations")} className="hover:text-brand-orange transition-colors flex items-center gap-1">Locations <span className="text-[8px]">▼</span></a>
              <div className="absolute top-full left-0 mt-4 w-52 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 flex flex-col p-2 text-sm normal-case tracking-normal font-medium z-50">
                <a href={prefix("/coimbatore")} className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Coimbatore</a>
                <a href="https://trichycoworks.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Trichy</a>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <a href={prefix("/#services-dark")} className="hover:text-brand-orange transition-colors flex items-center gap-1">Services <span className="text-[8px]">▼</span></a>
              <div className="absolute top-full left-0 mt-4 w-52 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 flex flex-col p-2 text-sm normal-case tracking-normal font-medium z-50">
                <a href={prefix("/#services-dark")} className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Private Office</a>
                <a href={prefix("/#services-dark")} className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Managed Office</a>
                <a href={prefix("/#services-dark")} className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Virtual Office</a>
                <a href={prefix("/#services-dark")} className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Meeting Rooms</a>
                <a href={prefix("/#services-dark")} className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Event Space</a>
              </div>
            </div>
            <a href="#" className="hover:text-brand-orange transition-colors">Blog</a>
            <a href="#contact" className="hover:text-brand-orange transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
            <a
              href="https://wa.me/919360780768"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 rounded-full text-[10px] sm:text-[11px] font-normal uppercase tracking-wider sm:tracking-widest bg-[#25d366] text-white hover:bg-[#1da851] transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 32 32" fill="white">
                <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.828 1.781 6.858L2 30l7.352-1.758A13.918 13.918 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.46 11.46 0 01-5.844-1.598l-.42-.25-4.36 1.043 1.074-4.248-.277-.438A11.46 11.46 0 014.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.524c-.344-.172-2.035-1.004-2.349-1.118-.314-.115-.543-.172-.771.172-.229.344-.88 1.118-1.079 1.347-.199.229-.397.257-.741.086-.344-.172-1.453-.535-2.766-1.707-1.022-.913-1.713-2.04-1.912-2.384-.199-.344-.021-.53.15-.7.154-.153.344-.4.516-.6.172-.2.229-.344.344-.572.114-.229.057-.43-.029-.601-.086-.172-.771-1.858-1.057-2.546-.278-.668-.56-.578-.771-.588l-.657-.011c-.229 0-.6.086-.914.43-.314.344-1.2 1.176-1.2 2.865s1.228 3.325 1.4 3.554c.171.229 2.42 3.695 5.863 5.182.82.354 1.46.566 1.959.724.824.262 1.574.225 2.167.136.66-.098 2.035-.831 2.32-1.634.286-.803.286-1.49.2-1.634-.086-.143-.314-.229-.657-.4z" />
              </svg>
              <span className="hidden lg:inline">+91 93607 80768</span>
              <span className="hidden sm:inline lg:hidden">WhatsApp</span>
            </a>

            <button
              onClick={() => handleOpenBooking("Book Space (Coimbatore)")}
              className="hidden md:flex px-4 py-2.5 lg:px-6 lg:py-3 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest bg-gradient-to-r from-brand-orange to-[#ffaa66] text-white hover:scale-103 transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap items-center gap-2"
            >
              Book Space
              <span className="text-sm font-bold">&rarr;</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-350 cursor-pointer shrink-0 ${
                isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <div className={`fixed inset-y-0 right-0 w-full max-w-xs bg-brand-navy/98 backdrop-blur-2xl z-50 flex flex-col justify-center items-center gap-6 xl:hidden transition-transform duration-500 shadow-2xl ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white cursor-pointer transition-colors duration-250"
            aria-label="Close Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex flex-col items-center gap-6 text-[15px] font-bold text-white uppercase tracking-widest w-full px-8">
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/45 text-[10px] tracking-widest uppercase">Locations</span>
              <a href={prefix("/coimbatore")} onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-sm normal-case tracking-normal">Coimbatore</a>
              <a href="https://trichycoworks.com/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-sm normal-case tracking-normal">Trichy</a>
            </div>
            <a href={prefix("/#services-dark")} onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Services</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Blog</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Contact</a>
            
            <div className="w-full h-px bg-white/10 max-w-[160px] my-3 shrink-0" />
            
            <a
              href="https://wa.me/919360780768"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#25d366] text-white hover:bg-[#1da851] transition-all duration-300 w-full justify-center max-w-[220px] shadow-md hover:scale-[1.02]"
            >
              +91 93607 80768
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenBooking("Schedule a Tour (Coimbatore)");
              }}
              className="mt-2 px-8 py-3.5 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg w-full max-w-[220px]"
            >
              Book Space Now
            </button>
          </nav>
        </div>
      </header>

      {/* ── COIMBATORE HERO SECTION WITH DARK OVERLAY ── */}
      <section className="relative min-h-[100vh] w-full flex items-center pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 overflow-hidden bg-brand-navy text-white">

        {/* Full-bleed BG image with sophisticated dark overlays for enhanced readability */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
            alt="Coimbatore workspace background"
            fill
            priority
            className="object-cover object-center brightness-[0.25]"
          />
          {/* Multi-layered dark overlay for maximum text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/85 to-brand-navy/60 z-1" />
          <div className="absolute inset-0 bg-black/65 z-1" />
        </div>

        {/* Accent glow */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/12 rounded-full blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-[5%] right-[5%] w-[350px] h-[350px] bg-brand-orange/8 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="w-full box-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/95 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Premium Workspace Community</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-outfit font-bold tracking-tight text-white leading-[1.1]">
              Coworking Space in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ffaa66]">
                Coimbatore
              </span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl">
              Covai Tech Park coworking space offers you a vibrant and dynamic working environment in Coimbatore. Get connected with the network of professionals and businesses by joining Covai Tech Park&apos;s coworking community.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleOpenBooking("Coimbatore General Quote")}
                className="px-8 py-4 bg-brand-orange hover:bg-white hover:text-brand-navy text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-350 shadow-lg hover:scale-103 cursor-pointer shrink-0"
              >
                Get Quote
              </button>
              <a
                href="#amenities"
                className="px-8 py-4 border border-white/20 hover:border-brand-orange text-white hover:bg-brand-orange/10 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-350 hover:scale-103 cursor-pointer decoration-transparent shrink-0"
              >
                Explore Amenities
              </a>
            </div>
          </div>

          {/* Right Column: High-fidelity website mock photo */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-0 aspect-[4/3] lg:aspect-square">
            <div className="absolute right-0 top-0 w-11/12 h-11/12 rounded-3xl overflow-hidden border border-white/15 shadow-2xl hover:scale-[1.02] transition-transform duration-700">
              <Image 
                src="https://covaitechpark.com/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-08-at-16.38.05.jpeg" 
                alt="CovaiTech Park Coimbatore Workspace" 
                fill 
                priority 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE SPACE SOLUTIONS SECTION (Image 2 Bottom Style) ── */}
      <section id="plans" className="py-20 sm:py-28 bg-[#f8fafc] section-x w-full border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.3em] block leading-none">WORKSPACE PACKAGES</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight">
              Choose your workspace. <br />Built for high-growth teams.
            </h2>
          </div>

          {/* 3-column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: 2 Cards */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              
              {/* Card 1: Hot Desking */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col justify-between flex-1 text-left group hover:shadow-md hover:border-brand-orange/45 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A2.25 2.25 0 0112.75 21.5h-1.5a2.25 2.25 0 01-2.25-2.263V19.13m-4.75-3.07a9.3 9.3 0 00-1.724 1.156 4.125 4.125 0 006.182 4.417A2.25 2.25 0 0110.5 19.5h1.5a2.25 2.25 0 012.25 2.25M6.75 19.13v-.003c0-1.11-.285-2.16-.786-3.07m0 0A7.447 7.447 0 0112 13.5c2.16 0 4.12.915 5.503 2.392" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-outfit font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors">Hot Desks</h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                      Reserve a seat in our open-plan shared workspace community. Perfect for freelancers, startup founders, and remote workers who enjoy a collaborative environment.
                    </p>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-brand-navy">₹450<span className="text-xs text-slate-400 font-normal"> /seat/day</span></span>
                  <button onClick={() => handleOpenBooking("Coimbatore: Hot Desks")} className="px-5 py-2.5 bg-brand-navy hover:bg-brand-orange text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all">Book Space</button>
                </div>
              </div>

              {/* Card 2: Dedicated Desks */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col justify-between flex-1 text-left group hover:shadow-md hover:border-brand-orange/45 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                      <path d="M9 4v16M15 4v16M4 9h16M4 15h16" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-outfit font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors">Dedicated Desks</h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                      Enjoy the comfort of your own dedicated desk reserved just for you at a specific spot. Ideal for growing teams requiring permanent desks and local storage.
                    </p>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-brand-navy">₹6,000<span className="text-xs text-slate-400 font-normal"> /seat/month</span></span>
                  <button onClick={() => handleOpenBooking("Coimbatore: Dedicated Desk")} className="px-5 py-2.5 bg-brand-navy hover:bg-brand-orange text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all">Book Space</button>
                </div>
              </div>

            </div>

            {/* Center Column: Tall Image */}
            <div className="lg:col-span-4 relative min-h-[350px] lg:min-h-0 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm">
              <Image 
                src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80" 
                alt="CovaiTech Park Premium Interior" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>

            {/* Right Column: 2 Cards */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              
              {/* Card 3: Private Cabins */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col justify-between flex-1 text-left group hover:shadow-md hover:border-brand-orange/45 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 21V5.25A2.25 2.25 0 0017.25 3h-10.5A2.25 2.25 0 004.5 5.25V21m15 0h-15M19.5 21h-3v-3A2.25 2.25 0 0014.25 15h-4.5A2.25 2.25 0 007.5 17.25v3h-3" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-outfit font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors">Private Cabins</h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                      Lockable, secure, and fully furnished soundproof offices designed to reflect your corporate identity. Perfect for compliance-heavy teams and agencies.
                    </p>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-brand-navy">₹8,999<span className="text-xs text-slate-400 font-normal"> /seat/month</span></span>
                  <button onClick={() => handleOpenBooking("Coimbatore: Private Cabins")} className="px-5 py-2.5 bg-brand-navy hover:bg-brand-orange text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all">Book Space</button>
                </div>
              </div>

              {/* Card 4: Meeting & Boardrooms */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col justify-between flex-1 text-left group hover:shadow-md hover:border-brand-orange/45 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 100-12 6 6 0 000 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-outfit font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors">Meeting Rooms</h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                      Host clients, team standups, and strategic reviews in soundproof rooms equipped with smart presentation displays, whiteboards, and high-speed Wi-Fi.
                    </p>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-brand-navy">₹500<span className="text-xs text-slate-400 font-normal"> /hour</span></span>
                  <button onClick={() => handleOpenBooking("Coimbatore: Meeting Room")} className="px-5 py-2.5 bg-brand-navy hover:bg-brand-orange text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all">Book Space</button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── WORKSPACE SOLUTIONS DIRECTORY SECTION (Image 3 Top Style) ── */}
      <section className="py-20 sm:py-28 bg-[#f5f6f8] section-x w-full border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header with slider controls on right */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200/80 pb-6 text-left">
            <div className="space-y-3">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.3em] block leading-none">
                DIRECTORY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-tight">
                Workspace Solutions Directory
              </h2>
            </div>
            
            {/* Prev/Next circle buttons */}
            <div className="flex gap-3 shrink-0">
              <button
                onClick={scrollDirectoryPrev}
                className="w-12 h-12 rounded-full border border-slate-300 bg-white hover:bg-brand-orange hover:border-brand-orange hover:text-white text-brand-navy flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                aria-label="Previous Slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={scrollDirectoryNext}
                className="w-12 h-12 rounded-full border border-slate-300 bg-white hover:bg-brand-orange hover:border-brand-orange hover:text-white text-brand-navy flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                aria-label="Next Slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Embla slider for directory */}
          <div className="overflow-hidden w-full" ref={directoryRef}>
            <div className="flex gap-8">
              
              {/* Card 1 */}
              <div className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                <div className="group flex flex-col text-left cursor-pointer" onClick={() => handleOpenBooking("Coimbatore Directory: Coworking")}>
                  <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm">
                    <Image 
                      src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=600&q=80" 
                      alt="Coworking Space" 
                      fill 
                      className="object-cover transition-transform duration-750 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 to-transparent" />
                  </div>
                  <div className="mt-4 px-2">
                    <h3 className="font-outfit font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors">Coworking Space</h3>
                    <p className="text-slate-400 text-xs font-normal mt-0.5">50+ Seats Available · Coimbatore, India</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                <div className="group flex flex-col text-left cursor-pointer" onClick={() => handleOpenBooking("Coimbatore Directory: Private Cabins")}>
                  <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm">
                    <Image 
                      src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80" 
                      alt="Private Office Space" 
                      fill 
                      className="object-cover transition-transform duration-750 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 to-transparent" />
                  </div>
                  <div className="mt-4 px-2">
                    <h3 className="font-outfit font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors">Private Office Space</h3>
                    <p className="text-slate-400 text-xs font-normal mt-0.5">20+ Cabin Suites · Coimbatore, India</p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                <div className="group flex flex-col text-left cursor-pointer" onClick={() => handleOpenBooking("Coimbatore Directory: Virtual Office")}>
                  <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm">
                    <Image 
                      src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80" 
                      alt="Virtual Office & GST" 
                      fill 
                      className="object-cover transition-transform duration-750 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 to-transparent" />
                  </div>
                  <div className="mt-4 px-2">
                    <h3 className="font-outfit font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors">Virtual Office &amp; GST</h3>
                    <p className="text-slate-400 text-xs font-normal mt-0.5">100+ Registrations · Coimbatore, India</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── WHY CHOOSE COVAI TECH PARK SECTION — Elegant, Rich & Modern Grid ── */}
      <section className="py-20 sm:py-32 bg-white w-full border-b border-slate-100 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">

          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-10 h-px bg-brand-orange"></span>
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.4em] leading-none">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-light text-slate-900 tracking-tight leading-[1.1]">
              Why choose <br className="hidden sm:block" />
              <span className="font-semibold text-brand-orange">Covai Tech Park Coworking?</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal max-w-xl leading-relaxed pt-2">
              Discover the benefits of establishing your business operations inside Coimbatore&apos;s most premium coworking space.
            </p>
          </div>

          {/* 3-column Elegant Grid of Cards with Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COIMBATORE_WHY_CHOOSE.map((pillar) => (
              <div key={pillar.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-sm hover:shadow-xl hover:border-brand-orange/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                {/* Top Image Container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
                  <span className="absolute bottom-4 left-6 text-6xl font-extralight text-white/35 font-outfit select-none leading-none">
                    {pillar.id}
                  </span>
                </div>

                {/* Card Content with Minimal Text */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-brand-orange uppercase tracking-widest block">
                        {pillar.subtitle}
                      </span>
                      <h3 className="font-outfit font-semibold text-2xl text-brand-navy leading-tight group-hover:text-brand-orange transition-colors duration-250">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Checklist */}
                  <ul className="space-y-3 mt-6 pt-6 border-t border-slate-100">
                    {pillar.points.map(pt => (
                      <li key={pt} className="flex items-start gap-3">
                        <span className="mt-[0.45rem] w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        <span className="text-xs font-semibold text-slate-800 leading-tight">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── NEED HELP BANNER ── */}
      <section className="bg-brand-navy py-12 sm:py-16 w-full text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,112,33,0.15),transparent_50%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <h3 className="font-outfit font-bold text-xl sm:text-2xl lg:text-3xl text-left max-w-xl leading-tight">
            Need help with finding the right workspace solution?
          </h3>
          <button
            onClick={() => handleOpenBooking("Talk to Our Experts (Coimbatore)")}
            className="px-8 py-4 bg-brand-orange hover:bg-white hover:text-brand-navy text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shrink-0 cursor-pointer"
          >
            Talk to Our Experts
          </button>
        </div>
      </section>

      {/* ── AMENITIES SECTION — Mockup Card Grid with Overlapping Circle Icons ── */}
      <section id="amenities" className="py-20 sm:py-28 bg-[#f8fafc] w-full border-b border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">

          {/* Header */}
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.3em] block leading-none">
              FACILITIES DIRECTORY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight">
              Amenities
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
              Everything your organization needs is covered. Zero maintenance overhead, zero setup complications.
            </p>
          </div>

          {/* 3-column grid matching the user's reference image exactly */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COIMBATORE_AMENITIES.map((amenity, i) => {
              // High-quality relevant Unsplash URLs for the 17 amenities
              const imagesList = [
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80", // Office
                "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80", // Wifi
                "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80", // AC
                "https://images.unsplash.com/photo-1521791136364-728647526959?auto=format&fit=crop&w=600&q=80", // Support
                "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80", // Cleaning
                "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80", // Mail
                "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=600&q=80", // Reception
                "https://images.unsplash.com/photo-1506521788723-868114856b3e?auto=format&fit=crop&w=600&q=80", // Parking
                "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80", // CCTV
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80", // generator
                "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80", // food
                "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=600&q=80", // water
                "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80", // printer
                "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80", // security
                "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80", // access
                "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=600&q=80", // breakout
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80"  // gym
              ];
              const imageUrl = imagesList[i] || imagesList[0];

              return (
                <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-sm hover:shadow-xl hover:border-brand-orange/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                  {/* Top Image Container */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={amenity.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                  </div>

                  {/* Overlapping circular icon */}
                  <div className="relative px-6">
                    <div className="w-12 h-12 -mt-6 mb-2 relative z-20 rounded-full border-4 border-white shadow-md flex items-center justify-center bg-brand-orange text-white group-hover:bg-[#d96010] transition-colors duration-300">
                      <AmenityIcon name={amenity.icon} className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-6 pb-6 pt-2 flex flex-col justify-between flex-grow">
                    <div className="space-y-2">
                      <h3 className="font-outfit font-bold text-lg text-brand-navy group-hover:text-brand-orange transition-colors duration-200 text-left">
                        {amenity.name}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed text-left">
                        {amenity.desc}
                      </p>
                    </div>

                    {/* Learn More link */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex justify-start">
                      <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-orange group-hover:gap-2.5 transition-all duration-300">
                        Learn more <span className="text-sm font-bold">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── TESTIMONIALS SECTION — Premium Slider Carousel ── */}
      <section className="py-20 sm:py-28 bg-[#f1f3f6] section-x w-full relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-14 relative z-10">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
            <div className="space-y-3 text-left">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.3em] block leading-none">
                WHAT OUR MEMBERS SAY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-tight">
                Here&apos;s what our happy customers say!
              </h2>
              <div className="flex items-center gap-2 pt-1">
                <div className="text-brand-orange flex items-center gap-0.5 text-base">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <span className="text-sm font-bold text-brand-navy">4.9</span>
                <span className="text-slate-400 text-xs font-normal">· Google Business (180+ Reviews)</span>
              </div>
            </div>

            {/* Carousel Buttons */}
            <div className="flex gap-3 shrink-0">
              <button
                onClick={scrollPrev}
                className="w-12 h-12 rounded-full border border-slate-300 bg-white hover:bg-brand-orange hover:border-brand-orange hover:text-white text-brand-navy flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                aria-label="Previous Testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                className="w-12 h-12 rounded-full border border-slate-300 bg-white hover:bg-brand-orange hover:border-brand-orange hover:text-white text-brand-navy flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                aria-label="Next Testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Embla Slider Carousel */}
          <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {COIMBATORE_TESTIMONIALS.map((testimonial, idx) => (
                <div key={idx} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3 min-w-0">
                  <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between relative group">
                    
                    {/* Big quotation icon */}
                    <span className="absolute top-6 right-8 text-6xl text-brand-orange/10 font-serif leading-none select-none pointer-events-none group-hover:text-brand-orange/25 transition-colors duration-300">
                      &ldquo;
                    </span>

                    <div>
                      {/* Star rating */}
                      <div className="flex gap-1 mb-4 text-brand-orange text-sm">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                      <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed -mt-1 italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>

                    {/* Member profile */}
                    <div className="mt-8 pt-5 border-t border-slate-100 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-sm shrink-0 border-2 border-brand-orange/20">
                        {testimonial.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div className="text-left">
                        <p className="font-outfit font-bold text-sm text-brand-navy">{testimonial.name}</p>
                        <p className="text-xs text-brand-orange font-semibold">{testimonial.role}</p>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider dots pagination indicator */}
          <div className="flex justify-center gap-2 pt-4">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  selectedIndex === index ? "w-8 bg-brand-orange" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── FAQ SECTION (Sleek Minimal Grid Layout) ── */}
      <section className="py-20 sm:py-28 bg-white section-x w-full">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
          
          {/* Left Column: Heading and WhatsApp support CTA */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.25em] block leading-none">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm font-normal leading-relaxed">
              Have specific questions about booking terms, GST registration, or space customized layouts?
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/919360780768"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#25d366] hover:bg-[#1da851] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors duration-300 decoration-transparent"
              >
                Ask us on WhatsApp
                <span className="text-sm font-bold">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Accordion list */}
          <div className="lg:col-span-8 space-y-4 w-full">
            {COIMBATORE_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none cursor-pointer"
                  >
                    <span className="font-outfit font-bold text-sm sm:text-base text-brand-navy leading-tight pr-4">{faq.question}</span>
                    <span className={`text-brand-orange transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </button>
                  <div className={`px-6 overflow-hidden transition-all duration-350 ${isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed border-t border-slate-200/60 pt-4">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONNECT / BOOKING SECTION ── */}
      <section id="contact" className="py-20 sm:py-28 bg-slate-50 section-x w-full border-t border-slate-200 relative overflow-hidden">
        
        {/* Glow Element */}
        <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-brand-orange/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left relative z-10">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.25em] block leading-none">
                VISIT THE CAMPUS
              </span>
              <h2 className="text-3xl sm:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-tight">
                Establish Your Organization at CovaiTech Park
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
                Connect with our space administrators to coordinate physical walkthroughs, customize office seating capacities, or get lease agreements drafted immediately.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-200 max-w-md">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 mt-1">
                  ✓
                </span>
                <div>
                  <h4 className="font-outfit font-bold text-sm sm:text-base text-brand-navy">Coimbatore Main campus</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mt-1">
                    Covai Tech Park, 4th South Cross St, Kovai Thirunagar, Nehru Nagar East, Coimbatore - 641 014.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 mt-1">
                  ✓
                </span>
                <div>
                  <h4 className="font-outfit font-bold text-sm sm:text-base text-brand-navy">Campus Contacts</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">info@covaitechpark.com</p>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">+91 93607 80768 | +91 96889 92210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek form card */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/80 w-full max-w-lg">
              <div className="mb-6 space-y-1">
                <h3 className="font-outfit font-bold text-xl text-brand-navy">Book a Campus Tour</h3>
                <p className="text-xs text-brand-slate font-bold">Leave your contact details and we&apos;ll call you shortly.</p>
              </div>

              <form
                className="space-y-5 text-sm font-normal text-left"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleOpenBooking("Coimbatore Tour Request");
                }}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full border-b border-slate-200 py-3 text-brand-navy focus:outline-none focus:border-brand-orange rounded-none placeholder:text-slate-400 font-normal text-xs bg-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full border-b border-slate-200 py-3 text-brand-navy focus:outline-none focus:border-brand-orange rounded-none placeholder:text-slate-400 font-normal text-xs bg-transparent"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className="w-full border-b border-slate-200 py-3 text-brand-navy focus:outline-none focus:border-brand-orange rounded-none placeholder:text-slate-400 font-normal text-xs bg-transparent"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Briefly describe your team size or seating requirements..."
                    rows={2}
                    required
                    className="w-full border-b border-slate-200 py-3 text-brand-navy focus:outline-none focus:border-brand-orange rounded-none placeholder:text-slate-400 font-normal text-xs resize-none bg-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-brand-orange hover:bg-brand-navy text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow cursor-pointer mt-4"
                >
                  Request Tour Schedule
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-[#060c10] text-white border-t border-white/5">
        <div className="box-container py-14 grid grid-cols-1 md:grid-cols-12 gap-10">

          <div className="space-y-6 md:col-span-6 text-left">
            <div className="flex items-center">
              <a href={prefix("/")} className="inline-block p-2 bg-white rounded-xl shadow-md border border-slate-200 hover:scale-[1.01] transition-transform">
                <Image
                  src={prefix("/covai-tech-park-logo.png")}
                  alt="Covai Tech Park"
                  width={140}
                  height={45}
                  className="object-contain h-8 w-auto"
                />
              </a>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em] mb-1">Registered Address</h5>
                <p className="text-white/70 font-bold text-xs uppercase tracking-wider mb-0.5">Max Office</p>
                <p className="text-white/45 text-xs font-normal leading-relaxed max-w-md">
                  2nd Floor, Old No. C-63, New No. C-50, Bloom Plaza, 6th Cross North East Extension, Near to Isha Yoga Center, Thillai Nagar, Tiruchirappalli, Tamil Nadu, 620018
                </p>
              </div>

              <div>
                <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em] mb-1">Address</h5>
                <p className="text-white/45 text-xs font-normal leading-relaxed max-w-md">
                  Covai Tech Park, 4th South Cross St, Kovai Thirunagar, Nehru Nagar East, Coimbatore- 641 014.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em] mb-1">Email</h5>
                  <a href="mailto:info@covaitechpark.com" className="text-white/45 hover:text-brand-orange text-xs font-normal transition-colors">
                    info@covaitechpark.com
                  </a>
                </div>
                <div>
                  <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em] mb-1">Mobile</h5>
                  <div className="flex flex-col gap-1 text-white/45 text-xs font-normal">
                    <a href="tel:+919360780768" className="hover:text-brand-orange transition-colors">+91 93607 80768</a>
                    <a href="tel:+919003550455" className="hover:text-brand-orange transition-colors">+91 900 355 0455</a>
                    <a href="tel:+919688992210" className="hover:text-brand-orange transition-colors">+91 968 899 2210</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5 md:col-span-3 text-left">
            <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em]">Workspace Solutions</h5>
            <ul className="space-y-3 text-xs font-normal text-white/45">
              {[
                "Coworking Space",
                "Private Office Space",
                "Managed Office",
                "Virtual Office",
                "Meeting Room",
                "Event Space",
                "Training Room"
              ].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-brand-orange text-[10px]">&rsaquo;</span>
                  <a href={prefix("/#services-dark")} className="hover:text-brand-orange transition-colors duration-200 cursor-pointer">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 md:col-span-3 text-left">
            <div className="space-y-4">
              <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em]">Useful Links</h5>
              <ul className="space-y-3 text-xs font-normal text-white/45">
                {[
                  { name: "Furnished Office Space in Coimbatore", link: prefix("/coimbatore") },
                  { name: "Commercial Office Space in Coimbatore", link: prefix("/coimbatore") },
                  { name: "Locations", link: prefix("/#locations") },
                  { name: "Refer and Earn Program", link: "#contact" }
                ].map(item => (
                  <li key={item.name} className="flex items-center gap-2">
                    <span className="text-brand-orange text-[10px]">&rsaquo;</span>
                    <a href={item.link} className="hover:text-brand-orange transition-colors duration-200 cursor-pointer">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em]">Social Links</h5>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", link: "https://www.facebook.com/coworkingspaceincoimbatore/", path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" },
                  { label: "LinkedIn", link: "https://www.linkedin.com/company/covai-tech-park/", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                  { label: "Instagram", link: "https://www.instagram.com/covaitechpark/", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a3.913 3.913 0 100 7.826 3.913 3.913 0 000-7.826zm0 6.162a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zm4.071-6.971a.795.795 0 100-1.59.795.795 0 000 1.59z" }
                ].map(item => (
                  <a
                    key={item.label}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-orange flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
                    aria-label={item.label}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d={item.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 py-5 bg-[#050b0e]">
          <div className="box-container flex items-center justify-center text-center text-xs sm:text-sm font-bold text-white/60 px-2">
            <span>© 2026 Copyright Covai Tech Park</span>
          </div>
        </div>
      </footer>

      {/* ── IN-PAGE RESERVATION MODAL ── */}
      {bookingOpen && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-[2rem] overflow-hidden w-full max-w-4xl shadow-2xl relative border border-brand-navy/10 flex flex-col md:flex-row">
            
            <div className="relative w-full md:w-5/12 hidden md:block">
              <Image
                src={prefix("/workspace-cabin.png")}
                alt="CovaiTech Park Premium Workspace"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-navy/20" />
            </div>

            <div className="w-full md:w-7/12 p-8 sm:p-10 relative bg-white">
              <button
                onClick={() => setBookingOpen(false)}
                className="absolute top-5 right-5 text-brand-navy/55 hover:text-brand-navy hover:bg-brand-navy/5 p-2 rounded-full transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="mb-6 space-y-1 text-left">
                <h3 className="font-outfit font-bold text-2xl text-brand-navy">
                  Reserve Your Space
                </h3>
                <p className="text-xs text-brand-slate font-bold">
                  Fill in the details below. Our space administration team will follow up.
                </p>
              </div>

              {bookingSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-brand-orange">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                  <h4 className="font-outfit font-bold text-lg text-brand-navy leading-none">Booking Request Sent!</h4>
                  <p className="text-xs text-brand-slate font-bold leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{bookingName}</strong>. Your interest in <strong>{selectedPlan}</strong> has been logged. We will contact you at <strong>{bookingEmail}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 text-left font-bold text-sm">
                  <div>
                    <label className="block text-[9px] font-bold text-brand-navy uppercase tracking-widest mb-1.5">
                      Selected Workspace / Plan
                    </label>
                    <input
                      type="text"
                      value={selectedPlan}
                      disabled
                      className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl px-4 py-3 text-xs text-brand-navy/70 font-bold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-brand-navy uppercase tracking-widest mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold text-brand-navy uppercase tracking-widest mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-brand-navy uppercase tracking-widest mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-bold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#091b29] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-brand-orange transition-all duration-300 shadow cursor-pointer"
                  >
                    Confirm Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
