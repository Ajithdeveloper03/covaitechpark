"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingNav from "../components/FloatingNav";
import useEmblaCarousel from "embla-carousel-react";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "plans", label: "Plans" },
  { id: "amenities", label: "Amenities" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faqs", label: "FAQ" },
  { id: "contact", label: "Contact" }
];

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
  const [activeSection, setActiveSection] = useState("hero");

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

  // IntersectionObserver to sync vertical dot navigation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -45% 0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Booking Modal States
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [bookingFirstName, setBookingFirstName] = useState("");
  const [bookingLastName, setBookingLastName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingPhoneCode, setBookingPhoneCode] = useState("+91");
  const [bookingLookingFor, setBookingLookingFor] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Contact form states
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactPhoneCode, setContactPhoneCode] = useState("+91");
  const [contactLookingFor, setContactLookingFor] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
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
    setBookingLookingFor(plan);
    setBookingOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingFirstName && bookingLastName && bookingEmail && bookingPhone) {
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingFirstName("");
        setBookingLastName("");
        setSelectedPlan("");
        setBookingLookingFor("");
        setBookingEmail("");
        setBookingPhone("");
        setBookingPhoneCode("+91");
        setBookingOpen(false);
        setBookingSuccess(false);
      }, 3000);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactFirstName && contactLastName && contactEmail && contactPhone) {
      setContactSuccess(true);
      setTimeout(() => {
        setContactFirstName("");
        setContactLastName("");
        setContactEmail("");
        setContactPhone("");
        setContactPhoneCode("+91");
        setContactLookingFor("");
        setContactSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-brand-navy flex flex-col font-inter relative select-none font-medium text-base antialiased">
      
      <FloatingNav sections={SECTIONS} />
      
      {/* ── HEADER / NAVBAR ── */}
      <Header />

      {/* ── COIMBATORE HERO SECTION — coimbatore.png bg + centered text + fan arc cards ── */}
      <section id="hero" className="relative min-h-[100vh] w-full flex flex-col items-center justify-start pt-24 sm:pt-28 pb-60 overflow-hidden text-white">

        {/* Full bleed coimbatore.png background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/covaitechpark/coimbatore.png"
            alt="Coimbatore coworking space"
            fill
            priority
            className="object-cover object-center"
           sizes="(max-width: 768px) 100vw, 800px"/>
          {/* Multi-layer dark overlay for readability */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80 z-10" /> */}
          {/* <div className="absolute inset-0 bg-brand-navy/30 z-10" /> */}
        </div>

        {/* Ambient glow orbs */}
        {/* <div className="absolute top-[15%] left-[10%] w-[350px] h-[350px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none z-10" />
        <div className="absolute top-[20%] right-[8%] w-[300px] h-[300px] bg-cyan-600/8 rounded-full blur-[100px] pointer-events-none z-10" /> */}

        {/* Centered Hero Content */}
        <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-4 max-w-8xl mt-8 mx-auto w-full">
          {/* <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/85 text-[10px] font-medium tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            Premium Coworking &middot; Coimbatore
          </span> */}

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-outfit font-medium tracking-tight text-white leading-[1.05] mb-6">
            Coworking Space in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-300 to-yellow-300">
              Coimbatore
            </span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-4xl mb-8">
            Covai Tech Park coworking space offers a vibrant, dynamic working environment in Coimbatore. Join our network of 650+ professionals and businesses.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleOpenBooking("Coimbatore General Quote")}
              className="px-8 py-4 bg-brand-orange hover:bg-white hover:text-brand-navy text-white font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg cursor-pointer"
            >
              Book Appointment
            </button>
            <a
              href="#amenities"
              className="px-8 py-4 border border-white/30 hover:border-brand-orange text-white hover:bg-brand-orange/15 font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer no-underline"
            >
              Explore Amenities
            </a>
          </div>
        </div>

        {/* Fan-out Arc of 5 tilted workspace cards at bottom — flex-based responsive */}
        <div className="relative z-20 w-full max-w-5xl mx-auto mt-4 sm:mt-2 md:mt-2 lg:mt-6 px-4 flex-shrink-0 h-[220px] sm:h-[240px] md:h-[280px] justify-start">
          {/* Desktop/tablet: absolute positioned fan */}
          <div className="hidden sm:block relative w-full h-full">
            {[
              { img: "/covaitechpark/hero1.jpg", rotate: -36, offset: "-420px", translateY: "60px", active: false },
              { img: "/covaitechpark/hero2.jpg", rotate: -18, offset: "-210px", translateY: "15px", active: false },
              { img: "/covaitechpark/hero3.jpg", rotate: 0, offset: "0px", translateY: "0px", active: true },
              { img: "/covaitechpark/hero11.jpg", rotate: 18, offset: "210px", translateY: "15px", active: false },
              { img: "/covaitechpark/hero13.jpg", rotate: 36, offset: "420px", translateY: "60px", active: false },
            ].map((card, i) => (
              <div
                key={i}
                className="absolute bottom-0 left-1/2"
                style={{
                  transform: `translateX(calc(-50% + ${card.offset})) translateY(${card.translateY}) rotate(${card.rotate}deg)`,
                  transformOrigin: 'bottom center',
                  zIndex: card.active ? 30 : 20 - Math.abs(i - 2),
                  transition: 'transform 0.5s ease',
                }}
              >
                <div
                  className={`relative w-48 sm:w-56 md:w-68 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden transition-all duration-500 ${
                    card.active ? 'scale-105' : 'scale-95'
                  }`}
                  style={{ height: card.active ? '260px' : '260px' }}
                >
                  <Image src={card.img} alt="Workspace" fill sizes="156px" className="object-cover"  loading="lazy"/>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: horizontal scroll row (no rotation) */}
          <div className="flex sm:hidden gap-3 overflow-x-auto pb-2 scrollbar-hide items-end justify-center">
            {[
              { img: "/covaitechpark/hero1.jpg" },
              { img: "/covaitechpark/hero2.jpg" },
              { img: "/covaitechpark/hero3.jpg", active: true },
              { img: "/covaitechpark/hero11.jpg" },
              { img: "/covaitechpark/hero13.jpg" },
            ].map((card, i) => (
              <div key={i} className={`flex-shrink-0 w-28 relative rounded-[1rem] overflow-hidden ${card.active ? 'h-44' : 'h-36'}`}>
                <Image src={card.img} alt="Workspace" fill sizes="112px" className="object-cover"  loading="lazy"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION (Image 2 Bottom Reference) ── */}
      <section id="plans" className="py-20 sm:py-28 bg-[white] section-x w-full">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-medium text-brand-orange uppercase tracking-widest block border border-brand-orange/30 text-brand-orange w-max px-3 py-1 rounded-sm mx-auto">
              PLANS & PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium text-brand-navy tracking-tight leading-[1.1]">
              Flexible Office Solutions<br />Tailored For Your Budget
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between h-full hover:border-brand-orange/45 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-[4rem]" />
                <div>
                  <div className="mb-6 w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                  </div>
                  <h3 className="font-outfit font-medium text-xl text-brand-navy mb-2">Dedicated Desk</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal mb-6">Enjoy the comfort of your own dedicated desk in our coworking space. Reserved for you at a specific spot in our facility during your membership period.</p>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-medium text-brand-navy">₹6,000</span>
                    <span className="text-sm text-slate-400 font-semibold">/seat/month</span>
                  </div>
                  <button onClick={() => handleOpenBooking("Coimbatore Dedicated Desk")} className="w-full py-3.5 bg-brand-navy/5 text-brand-navy hover:bg-brand-orange hover:text-white text-sm font-medium  tracking-widest rounded-xl transition-all duration-300">Book Seat</button>
                </div>
              </div>
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between h-full hover:border-brand-orange/45 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-[4rem]" />
                <div>
                  <div className="mb-6 w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <h3 className="font-outfit font-medium text-xl text-brand-navy mb-2">Private Office Space</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal mb-6">Ideal for growing teams requiring secure, lockable, fully furnished private cabins with complete operational privacy.</p>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-medium text-brand-navy">Custom Pricing</span>
                    <span className="text-sm text-slate-400 font-semibold">/team layout</span>
                  </div>
                  <button onClick={() => handleOpenBooking("Coimbatore Private Office")} className="w-full py-3.5 bg-brand-navy/5 text-brand-navy hover:bg-brand-orange hover:text-white text-sm font-medium  tracking-widest rounded-xl transition-all duration-300">Request Quote</button>
                </div>
              </div>
            </div>
            <div className="relative min-h-[400px] md:min-h-full rounded-3xl overflow-hidden shadow-md">
              <Image src="https://images.pexels.com/photos/20123842/pexels-photo-20123842.jpeg" alt="Services Image" fill className="object-cover"  sizes="(max-width: 768px) 100vw, 800px" loading="lazy"/>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between h-full hover:border-brand-orange/45 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-[4rem]" />
                <div>
                  <div className="mb-6 w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
                  </div>
                  <h3 className="font-outfit font-medium text-xl text-brand-navy mb-2">Day Pass</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal mb-6">Access professional hot desking workspace on demand with high-speed internet, comfortable seating, and premium support amenities.</p>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-medium text-brand-navy">₹450</span>
                    <span className="text-sm text-slate-400 font-semibold">/seat/day</span>
                  </div>
                  <button onClick={() => handleOpenBooking("Coimbatore Day Pass")} className="w-full py-3.5 bg-brand-navy/5 text-brand-navy hover:bg-brand-orange hover:text-white text-sm font-medium  tracking-widest rounded-xl transition-all duration-300">Get Pass</button>
                </div>
              </div>
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between h-full hover:border-brand-orange/45 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-[4rem]" />
                <div>
                  <div className="mb-6 w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                  <h3 className="font-outfit font-medium text-xl text-brand-navy mb-2">Meeting Room</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal mb-6">Host client presentations, team discussions, and strategic boot camps in professionally configured boardrooms.</p>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-medium text-brand-navy">Custom Hours</span>
                    <span className="text-sm text-slate-400 font-semibold">/hour block</span>
                  </div>
                  <button onClick={() => handleOpenBooking("Coimbatore Meeting Room")} className="w-full py-3.5 bg-brand-navy/5 text-brand-navy hover:bg-brand-orange hover:text-white text-sm font-medium  tracking-widest rounded-xl transition-all duration-300">Reserve Room</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKSPACE SOLUTIONS DIRECTORY SECTION (Image 3 Top Style) ── */}
      <section className="py-20 sm:py-28 bg-slate-50 section-x w-full border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-6 border-b border-slate-200 pb-8">
            <div className="max-w-xl space-y-2 text-left">
              <span className="text-sm font-medium text-brand-orange uppercase tracking-[0.25em] block">
                OTHER WORKSPACE SOLUTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium text-brand-navy tracking-tight leading-[1.1]">
                Versatile setups for <br className="hidden sm:block" />every work style
              </h2>
            </div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
              {[
                { title: "Virtual Office", desc: "Professional Business Address", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80" },
                { title: "Event Space", desc: "Spacious Venues for Gatherings", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" },
                { title: "Training Room", desc: "Corporate Training Setups", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80" }
              ].map((item, i) => (
                <div key={i} className="w-full">
                  <div className="group flex flex-col text-left cursor-pointer relative h-full" onClick={() => handleOpenBooking(`Coimbatore Directory: ${item.title}`)}>
                    <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-md h-full">
                      <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110"  sizes="(max-width: 768px) 100vw, 800px" loading="lazy"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 w-full bg-brand-navy/10 backdrop-blur-md border-t border-white/20 p-5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <h3 className="font-outfit font-medium text-xl sm:text-2xl text-white mb-1 drop-shadow-sm">{item.title}</h3>
                        <p className="text-white/90 text-sm font-normal drop-shadow-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE COVAI TECH PARK — 2-column split layout like image 4 ── */}
      <section id="benefits" className="py-20 sm:py-20 bg-slate-50 section-x w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] bg-white shadow-xl border border-slate-100">
            <div className="p-5 sm:p-10 lg:p-10 flex flex-col justify-center">
              <span className="text-[10px] font-medium text-brand-orange uppercase tracking-widest block mb-4 border border-brand-orange/40 w-max px-3 py-1 rounded-full bg-brand-orange/5">
                WHY CHOOSE COVAI TECH PARK
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium text-brand-navy tracking-tight leading-[1.1] mb-12">
                A modern approach to<br />coworking
              </h2>
              <div className="space-y-4 mb-12">
                {[
                  { label: "Flexible Plans", desc: "Covai Tech Park offers flexible coworking membership plans that cater to your long-term and short-term workspace needs. Book from a day to a month.", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
                  { label: "Cost-effective Workspace", desc: "Coworking spaces at Covai Tech Park are ready-to-use, which significantly reduces the initial investment required to set up your office.", icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" },
                  { label: "Maintenance Covered", desc: "Don't worry about maintenance! Our dedicated staff handle regular cleaning and maintenance of the facility.", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d={feat.icon} /></svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-base text-brand-navy mb-1.5">{feat.label}</h3>
                      <p className="text-slate-500 text-sm font-normal leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleOpenBooking("Book an appointment")} 
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand-navy hover:bg-brand-orange text-white font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 w-max shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Book an appointment
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
            <div className="relative w-full h-[400px] lg:h-auto min-h-[500px]">
              <Image src="https://images.pexels.com/photos/7688333/pexels-photo-7688333.jpeg" alt="Modern workspace approach" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover"  loading="lazy"/>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION — Image 3 Reference ── */}
      {/* <section className="w-full min-h-[100vh] flex flex-col justify-center py-16 sm:py-20 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-brand-orange" />
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.2em]">ACHIEVEMENTS AT A GLANCE</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-medium text-brand-navy tracking-tight leading-[1.1]">
                Our Edge<br />in Excellence
              </h2>
              <p className="text-slate-500 text-sm font-normal leading-relaxed pt-2 pb-4">
                With a diverse range of workspace solutions, premium amenities, and a prime location in Coimbatore, we are committed to delivering exceptional quality infrastructure.
              </p>
              <div className="w-24 h-[1px] bg-slate-300" />
            </div>
            <div className="relative flex items-center justify-center lg:justify-end gap-8 sm:gap-10 lg:pr-8">
              <div className="mt-28">
                <div className="relative w-48 sm:w-56 h-56 sm:h-64 rounded-[2rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] bg-[#0a1120] border border-white/5">
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-brand-orange" />
                  <div className="absolute inset-0 flex flex-col justify-between p-8 pr-10">
                    <div>
                      <p className="text-[10px] font-medium text-white/70 uppercase tracking-widest leading-snug">SUBSCRIBERS<br />TRUST US</p>
                    </div>
                    <p className="font-outfit font-medium text-5xl sm:text-6xl text-white leading-none tracking-tighter">250+</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 sm:gap-10">
                <div className="relative w-48 sm:w-56 h-56 sm:h-64 rounded-[2rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] bg-[#0a1120] border border-white/5">
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-brand-orange" />
                  <div className="absolute inset-0 flex flex-col justify-between p-8 pr-10">
                    <p className="text-[10px] font-medium text-white/70 uppercase tracking-widest leading-snug">LOCATIONS<br />PRIME</p>
                    <p className="font-outfit font-medium text-5xl sm:text-6xl text-white leading-none tracking-tighter">8</p>
                  </div>
                </div>
                <div className="relative w-48 sm:w-56 h-56 sm:h-64 rounded-[2rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] bg-[#0a1120] border border-white/5">
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-brand-orange" />
                  <div className="absolute inset-0 flex flex-col justify-between p-8 pr-10">
                    <p className="text-[10px] font-medium text-white/70 uppercase tracking-widest leading-snug">EXPERIENCE<br />YEARS</p>
                    <p className="font-outfit font-medium text-5xl sm:text-6xl text-white leading-none tracking-tighter">25+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── HELP BANNER ── */}
      <section className="bg-brand-navy py-12 sm:py-16 w-full text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,112,33,0.15),transparent_50%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <h3 className="font-outfit font-medium text-xl sm:text-2xl lg:text-3xl text-left max-w-xl leading-tight">
            Need help with finding the right workspace solution?
          </h3>
          <button
            onClick={() => handleOpenBooking("Talk to Our Experts (Coimbatore)")}
            className="px-8 py-4 bg-brand-orange hover:bg-white hover:text-brand-navy text-white font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shrink-0 cursor-pointer"
          >
            Talk to Our Experts
          </button>
        </div>
      </section>

      {/* ── AMENITIES SECTION — Minimalist Grid with Icons ── */}
      <section id="amenities" className="py-20 sm:py-28 bg-[#f8fafc] w-full border-b border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-sm font-medium text-brand-orange uppercase tracking-[0.3em] block leading-none">
              FACILITIES DIRECTORY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium text-brand-navy tracking-tight">
              Best in Class Amenities
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
              Everything your organization needs is covered. Zero maintenance overhead, zero setup complications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {COIMBATORE_AMENITIES.map((amenity, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  {/* Icon Block with subtle color background */}
                  <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-brand-orange/10 group-hover:text-brand-orange flex items-center justify-center transition-colors duration-300 mb-5">
                    <AmenityIcon name={amenity.icon} className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  
                  <h3 className="font-outfit font-medium text-base text-brand-navy group-hover:text-brand-orange transition-colors duration-300 mb-2">
                    {amenity.name}
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-sm font-normal leading-relaxed">
                    {amenity.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION — Premium Slider Carousel ── */}
      <section id="testimonials" className="py-20 sm:py-28 bg-[#f1f3f6] section-x w-full relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-14 relative z-10">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
            <div className="space-y-3 text-left">
              <span className="text-sm font-medium text-brand-orange uppercase tracking-[0.3em] block leading-none">
                WHAT OUR MEMBERS SAY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium text-brand-navy tracking-tight leading-tight">
                Here's what our happy customers say!
              </h2>
              <div className="flex items-center gap-2 pt-1">
                <div className="text-brand-orange flex items-center gap-0.5 text-base">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <span className="text-sm font-medium text-brand-navy">4.9</span>
                <span className="text-slate-400 text-sm font-normal">· Google Business</span>
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
              {[
                { name: "Saravanan", review: "Ready to move office space at the best price. I highly recommend this place if you are planning for an office space in Coimbatore." },
                { name: "Vivek Anand", review: "I'm happy to share this information. It has a friendly atmosphere working in the community space. They provide end to end support and suitable for startup firm, freelancers and large scale business office use." },
                { name: "Vijayakumar Balu", review: "I used this Facility and found to be useful and productive for me. I recommend this facility for freelancers or startups or corporate professionals working remotely." },
                { name: "Dhanush", review: "It is clean and bright place and convenient to work. We Booked conference room for a day to a official business meet, out team is so happy and satisfied with their service." }
              ].map((testimonial, idx) => (
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
                        &ldquo;{testimonial.review}&rdquo;
                      </p>
                    </div>

                    {/* Member profile */}
                    <div className="mt-8 pt-5 border-t border-slate-100 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center text-white font-medium text-sm shrink-0 border-2 border-brand-orange/20">
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
      <section id="faqs" className="py-20 sm:py-28 bg-white section-x w-full">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-[10px] font-medium text-brand-orange uppercase tracking-[0.25em]">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-medium text-brand-navy">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is there an option to book a coworking space for one day in Coimbatore?", a: "Yes, the shared workspace can be booked for a day in Coimbatore. The terms for using the workspace are highly flexible to meet your short-term and long-term office space needs." },
              { q: "Is there 24/7 access to the coworking space facility?", a: "Yes, the Covai Tech Park’s coworking space facility is accessible 24/7." },
              { q: "Who can benefit from coworking space?", a: "Coworking spaces in Coimbatore are best suited for entrepreneurs, remote workers, freelancers, small-medium enterprises, startups, businesses, and professionals who want to be part of a dynamic community." },
              { q: "Can we host events in this coworking facility?", a: "Yes, Event spaces are available at Covai Tech Park." },
              { q: "What are the benefits of choosing a shared office space in Coimbatore?", a: "Professional working environment at affordable price. Opportunities to network and collaborate. Workspace that is flexible and can be adjusted according to your requirements." },
              { q: "Can we access the coworking space on Sundays?", a: "Certainly! Our coworking space is open throughout the entire week, including Sundays." }
            ].map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl p-2 transition-all">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full p-4 sm:p-5 text-left bg-transparent group"
                >
                  <span className="font-outfit font-medium text-brand-navy text-sm sm:text-base pr-8 group-hover:text-brand-orange transition-colors">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === i ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-brand-orange/10 group-hover:text-brand-orange'}`}>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="p-4 sm:p-5 pt-0 text-slate-500 text-sm leading-relaxed border-t border-slate-100 mt-2">{faq.a}</p>
                </div>
              </div>
            ))}
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
              <span className="text-sm font-medium text-brand-orange uppercase tracking-[0.25em] block leading-none">
                VISIT THE CAMPUS
              </span>
              <h2 className="text-3xl sm:text-4xl font-outfit font-medium text-brand-navy tracking-tight leading-tight">
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
                  <h4 className="font-outfit font-medium text-sm sm:text-base text-brand-navy">Coimbatore Main campus</h4>
                  <p className="text-sm sm:text-sm text-slate-500 font-normal leading-relaxed mt-1">
                    Covai Tech Park, 4th South Cross St, Kovai Thirunagar, Nehru Nagar East, Coimbatore - 641 014.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 mt-1">
                  ✓
                </span>
                <div>
                  <h4 className="font-outfit font-medium text-sm sm:text-base text-brand-navy">Campus Contacts</h4>
                  <p className="text-sm sm:text-sm text-slate-500 font-normal mt-1">
                    <a href="mailto:info@covaitechpark.com" className="hover:text-brand-orange transition-colors">info@covaitechpark.com</a>
                  </p>
                  <div className="text-sm sm:text-sm text-slate-500 font-normal mt-0.5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <a href="tel:+919360780768" className="hover:text-brand-orange transition-colors whitespace-nowrap">+91 93607 80768</a>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <a href="tel:+919688992210" className="hover:text-brand-orange transition-colors whitespace-nowrap">+91 96889 92210</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek form card */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/80 w-full max-w-lg">
              <div className="mb-6 space-y-1">
                <h3 className="font-outfit font-medium text-xl text-brand-navy">Book a Campus Tour</h3>
                <p className="text-sm text-brand-slate font-medium">Leave your contact details and we&apos;ll call you shortly.</p>
              </div>

              {contactSuccess ? (
                <div className="py-10 text-center space-y-4 w-full">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-brand-orange">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                  <h4 className="font-outfit font-medium text-lg text-brand-navy leading-none">Tour Request Submitted!</h4>
                  <p className="text-sm text-brand-slate font-medium leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{contactFirstName} {contactLastName}</strong>. Your tour request has been received. We will contact you at <strong>{contactEmail}</strong> or <strong>{contactPhoneCode} {contactPhone}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-left font-medium text-sm w-full">
                  {/* Name Row */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-brand-navy">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          required
                          value={contactFirstName}
                          onChange={(e) => setContactFirstName(e.target.value)}
                          placeholder=""
                          className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                        />
                        <span className="text-[10px] text-slate-400 font-medium italic mt-1 block">First</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          value={contactLastName}
                          onChange={(e) => setContactLastName(e.target.value)}
                          placeholder=""
                          className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                        />
                        <span className="text-[10px] text-slate-400 font-medium italic mt-1 block">Last</span>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-brand-navy">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="flex border border-brand-navy/15 rounded-xl overflow-hidden focus-within:border-brand-orange shadow-sm">
                      <select
                        value={contactPhoneCode}
                        onChange={(e) => setContactPhoneCode(e.target.value)}
                        className="bg-slate-50 border-r border-slate-200/80 px-3 py-3 text-sm text-slate-800 focus:outline-none cursor-pointer font-medium shrink-0"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+65">🇸🇬 +65</option>
                      </select>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder=""
                        className="w-full bg-white px-4 py-3 text-sm text-brand-navy focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-brand-navy">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder=""
                      className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                    />
                  </div>

                  {/* What are you looking for? */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-brand-navy">
                      What are you looking for?
                    </label>
                    <select
                      value={contactLookingFor}
                      onChange={(e) => setContactLookingFor(e.target.value)}
                      className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium cursor-pointer shadow-sm"
                      required
                    >
                      <option value="">-Select-</option>
                      <option value="Coworking & Hot Desks">Coworking & Hot Desks</option>
                      <option value="Dedicated Desks">Dedicated Desks</option>
                      <option value="Private Cabins">Private Cabins</option>
                      <option value="Meeting Rooms">Meeting Rooms</option>
                      <option value="Custom Office Solutions">Custom Office Solutions</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-orange hover:bg-brand-navy text-white text-sm font-medium uppercase tracking-widest rounded-xl transition-all duration-300 shadow cursor-pointer mt-4"
                  >
                    Request Tour Schedule
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />

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
               sizes="(max-width: 768px) 100vw, 800px" loading="lazy"/>
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
                <h3 className="font-outfit font-medium text-2xl text-brand-navy">
                  Reserve Your Space
                </h3>
                <p className="text-sm text-brand-slate font-medium">
                  Fill in the details below. Our space administration team will follow up.
                </p>
              </div>

              {bookingSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-brand-orange">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                  <h4 className="font-outfit font-medium text-lg text-brand-navy leading-none">Booking Request Sent!</h4>
                  <p className="text-sm text-brand-slate font-medium leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{bookingFirstName} {bookingLastName}</strong>. Your interest in <strong>{bookingLookingFor || selectedPlan}</strong> has been logged. We will contact you at <strong>{bookingEmail}</strong> or <strong>{bookingPhoneCode} {bookingPhone}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 text-left font-medium text-sm">
                  {/* Name Row */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-brand-navy">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          required
                          value={bookingFirstName}
                          onChange={(e) => setBookingFirstName(e.target.value)}
                          placeholder=""
                          className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                        />
                        <span className="text-[10px] text-slate-400 font-medium italic mt-1 block">First</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          value={bookingLastName}
                          onChange={(e) => setBookingLastName(e.target.value)}
                          placeholder=""
                          className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                        />
                        <span className="text-[10px] text-slate-400 font-medium italic mt-1 block">Last</span>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-brand-navy">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="flex border border-brand-navy/15 rounded-xl overflow-hidden focus-within:border-brand-orange shadow-sm">
                      <select
                        value={bookingPhoneCode}
                        onChange={(e) => setBookingPhoneCode(e.target.value)}
                        className="bg-slate-50 border-r border-slate-200/80 px-3 py-3 text-sm text-slate-800 focus:outline-none cursor-pointer font-medium shrink-0"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+65">🇸🇬 +65</option>
                      </select>
                      <input
                        type="tel"
                        required
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        placeholder=""
                        className="w-full bg-white px-4 py-3 text-sm text-brand-navy focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-brand-navy">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      placeholder=""
                      className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                    />
                  </div>

                  {/* What are you looking for? */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-brand-navy">
                      What are you looking for?
                    </label>
                    <select
                      value={bookingLookingFor}
                      onChange={(e) => setBookingLookingFor(e.target.value)}
                      className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium cursor-pointer shadow-sm"
                      required
                    >
                      <option value="">-Select-</option>
                      <option value="Coworking & Hot Desks">Coworking & Hot Desks</option>
                      <option value="Dedicated Desks">Dedicated Desks</option>
                      <option value="Private Cabins">Private Cabins</option>
                      <option value="Meeting Rooms">Meeting Rooms</option>
                      <option value="Custom Office Solutions">Custom Office Solutions</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#091b29] text-white text-sm font-medium uppercase tracking-widest rounded-xl hover:bg-brand-orange transition-all duration-300 shadow cursor-pointer mt-4"
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
