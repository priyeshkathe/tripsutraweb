/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Download, 
  Play, 
  MapPin, 
  Compass, 
  Utensils, 
  Calendar, 
  Wallet, 
  Bell, 
  MessageSquare, 
  Search, 
  ShieldCheck, 
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Navigation,
  History,
  User,
  Clock,
  Hotel,
  Ticket,
  Camera,
  X,
  Menu,
  ArrowUp,
  ShieldAlert,
  Users,
  Cloud,
  AlertTriangle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Problem', href: '#problem' },
    { name: 'Features', href: '#features' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Roadmap', href: '#future-scope' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-6",
      isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-brand-primary/10 py-4 shadow-lg" : "bg-transparent"
    )}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-brand-primary/20 group-hover:rotate-12 transition-transform duration-300 overflow-hidden">
              <img src="/images/AppLogo.png" alt="TripSutra Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-brand-dark">TripSutra</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-base font-bold text-brand-dark/60 hover:text-brand-primary transition-all hover:tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a 
            href="/tripsutra.apk" 
            download 
            className="hidden sm:block px-8 py-3 bg-brand-primary text-white font-bold rounded-2xl text-base hover:shadow-2xl hover:shadow-brand-primary/40 active:scale-95 transition-all text-center"
          >
            Download App
          </a>
          <button 
            className="md:hidden p-3 text-brand-dark hover:bg-brand-surface rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-brand-primary/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-brand-dark/70 hover:text-brand-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="/tripsutra.apk" 
              download 
              className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-lg text-center"
            >
              Download Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  // Replace this with your YouTube Shorts or standard YouTube link
  const demoVideoUrl = "https://youtu.be/1W1wUZAdJwk?si=X7RWcvstzhcKMPrN";

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    
    // Robustly extract the video ID from various YouTube URL formats
    let videoId = "";
    try {
      if (url.includes("/shorts/")) {
        videoId = url.split("/shorts/")[1].split(/[?#]/)[0];
      } else if (url.includes("watch?v=")) {
        videoId = url.split("watch?v=")[1].split(/[?#]/)[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split(/[?#]/)[0];
      } else if (url.includes("/embed/")) {
        videoId = url.split("/embed/")[1].split(/[?#]/)[0];
      }
    } catch (e) {
      console.error("Error parsing YouTube URL:", e);
    }

    // If we couldn't find an ID, return the original URL as a fallback
    if (!videoId) return url;

    // Use www.youtube.com/embed/ for maximum compatibility
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&origin=${window.location.origin}`;
  };

  const isShorts = demoVideoUrl.includes("/shorts/");

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-surface">
      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-brand-dark/95"
          >
            {/* Atmospheric Background Elements for Modal */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                  x: [0, 100, 0],
                  y: [0, -50, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/4 -left-1/4 w-full h-full bg-brand-primary/20 rounded-full blur-[150px]" 
              />
              <motion.div 
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  rotate: [90, 0, 90],
                  x: [0, -100, 0],
                  y: [0, 50, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-brand-accent/20 rounded-full blur-[150px]" 
              />
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
              className={cn(
                "relative w-full bg-black overflow-hidden shadow-[0_0_100px_rgba(255,99,33,0.3)] border border-white/10 z-10",
                isShorts 
                  ? "max-w-[380px] aspect-[9/16] rounded-[3rem]" 
                  : "max-w-5xl aspect-video rounded-[2.5rem]"
              )}
            >
              <button 
  onClick={() => setIsVideoOpen(false)}
  className="absolute top-8 right-8 z-[120] p-5 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-xl border border-white/20 transition-all hover:scale-110 active:scale-90 group shadow-2xl"
>
  <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
</button>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />

              {/* TripSutra Demo Video */}
              <iframe 
                className="w-full h-full relative z-0"
                src={getEmbedUrl(demoVideoUrl)} 
                title="TripSutra Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] animate-pulse delay-700" />
      
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left space-y-8"
        >
          <div className="space-y-4">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-medium text-brand-dark/60"
            >
              Welcome,
            </motion.p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-brand-dark leading-[1.1] tracking-tight">
              Plan your trip <br />
              <span className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4">
                with <span className="font-script text-brand-accent capitalize">TripSutra</span>
              </span>
            </h1>
          </div>
          
          <p className="text-base md:text-lg text-brand-dark/60 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            TripSutra is your AI-powered companion that uncovers hidden local gems, plans itineraries, and keeps you safe on every journey.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <a 
              href="/tripsutra.apk" 
              download 
              className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-2xl shadow-brand-primary/30 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <Download size={24} />
              Download Now
            </a>
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white text-brand-dark font-bold rounded-2xl border border-brand-primary/10 hover:bg-brand-surface active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <Play size={24} fill="currentColor" />
              Watch Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-[320px] h-[650px] bg-white rounded-[3rem] border-[12px] border-brand-dark/5 shadow-2xl overflow-hidden group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-primary to-brand-accent rounded-[3.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            
            <div className="absolute inset-0 bg-brand-surface overflow-y-auto hide-scrollbar z-20">
              {/* Top Header Section */}
              <div className="gradient-bg p-8 pt-12 rounded-b-[3rem] text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 w-16 h-16 bg-brand-accent/20 rounded-full blur-xl" />
                <div className="flex justify-between items-center mb-6">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div className="w-8 h-8 bg-white rounded-full border-2 border-white/20 overflow-hidden shadow-sm">
                    <img src="/images/AppLogo.png" alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <p className="text-xs opacity-80 mb-1">Welcome,</p>
                <h2 className="text-3xl font-bold mb-1">Plan your trip</h2>
                <h2 className="text-3xl font-bold mb-4">with <span className="script-font text-white">TripSutra</span></h2>
                <p className="text-[10px] opacity-70 mb-6">Discover hidden local stops, heritage & stays around you.</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center text-brand-primary shadow-sm">
                    <Navigation size={16} className="mb-1" />
                    <span className="text-[10px] font-bold text-center">Use current location</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl flex flex-col items-center justify-center text-white border border-white/10">
                    <Search size={16} className="mb-1" />
                    <span className="text-[10px] font-bold text-center">Enter location</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[8px] opacity-60">Current coordinates</p>
                    <p className="text-[10px] font-bold">Nashik Division, Maharashtra</p>
                  </div>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-primary">
                    <Clock size={14} />
                  </div>
                </div>

                <button className="w-full py-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center gap-2 text-white text-[10px] font-bold hover:bg-white/30 transition-colors">
                  <Compass size={12} />
                  View Photos of Destination
                </button>
              </div>

              {/* Trip Tools Section */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-brand-primary rounded-full" />
                  <h3 className="font-bold text-lg">Trip Tools</h3>
                </div>
                <p className="text-[10px] text-brand-dark/40 mb-4">Monuments, stays, food & events powered by AI</p>

                <div className="bg-white p-4 rounded-3xl shadow-sm border border-brand-primary/5 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Trip Duration</h4>
                      <p className="text-[10px] text-brand-dark/40">How many days is your trip?</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <button className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white"><Minus size={16} /></button>
                    <div className="flex-1 bg-brand-primary/5 py-2 rounded-xl text-center font-bold text-brand-primary">3 days</div>
                    <button className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white"><Plus size={16} /></button>
                  </div>

                  <div className="flex justify-between gap-2">
                    {['1d', '3d', '5d', '7d'].map((d, i) => (
                      <div key={i} className={cn("px-3 py-1 rounded-full text-[10px] font-bold", i === 1 ? "bg-brand-primary text-white" : "bg-brand-primary/5 text-brand-primary")}>{d}</div>
                    ))}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-3xl shadow-sm border border-brand-primary/5">
                    <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-3">
                      <Ticket size={20} />
                    </div>
                    <h4 className="text-xs font-bold">Attractions</h4>
                    <p className="text-[8px] text-brand-dark/40">Heritage & Gems</p>
                  </div>
                  <div className="bg-white p-4 rounded-3xl shadow-sm border border-brand-primary/5">
                    <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-3">
                      <Hotel size={20} />
                    </div>
                    <h4 className="text-xs font-bold">Hotels</h4>
                    <p className="text-[8px] text-brand-dark/40">Find your stay</p>
                  </div>
                  <div className="bg-white p-4 rounded-3xl shadow-sm border border-brand-primary/5">
                    <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-3">
                      <Utensils size={20} />
                    </div>
                    <h4 className="text-xs font-bold">Food</h4>
                    <p className="text-[8px] text-brand-dark/40">Local & Popular</p>
                  </div>
                  <div className="bg-white p-4 rounded-3xl shadow-sm border border-brand-primary/5">
                    <div className="w-10 h-10 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-3">
                      <Bell size={20} />
                    </div>
                    <h4 className="text-xs font-bold">Events</h4>
                    <p className="text-[8px] text-brand-dark/40">Nearby & Live</p>
                  </div>
                  <div className="bg-white p-4 rounded-3xl shadow-sm border border-brand-primary/5">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-3">
                      <Calendar size={20} />
                    </div>
                    <h4 className="text-xs font-bold">AI Planner</h4>
                    <p className="text-[8px] text-brand-dark/40">Smart Itinerary</p>
                  </div>
                  <div className="bg-white p-4 rounded-3xl shadow-sm border border-brand-primary/5">
                    <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-3">
                      <Wallet size={20} />
                    </div>
                    <h4 className="text-xs font-bold">Budget</h4>
                    <p className="text-[8px] text-brand-dark/40">Cost Estimator</p>
                  </div>
                </div>

                <button className="w-full py-4 bg-brand-primary text-white font-bold rounded-3xl shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 text-sm">
                  <Compass size={18} />
                  Plan My Trip
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  return (
    <section id="problem" className="py-24 bg-white relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-base font-bold text-brand-primary uppercase tracking-[0.4em]">Problem Statement</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold text-brand-dark leading-tight">
              Why do we need <br />
              <span className="gradient-text">TripSutra?</span>
            </h3>
            <div className="space-y-6 text-xl text-brand-dark/60 leading-relaxed font-medium">
              <p>
                Modern travelers face a paradox of choice. While information is abundant, finding authentic local experiences, hidden heritage sites, and reliable real-time event information remains a challenge.
              </p>
              <p>
                Most travel apps focus on commercial landmarks, leaving the true soul of a destination—its local gems and cultural heritage—undiscovered.
              </p>
            </div>
            <div className="bg-brand-surface p-10 rounded-[3rem] border border-brand-primary/10 shadow-sm">
              <h4 className="text-xl font-bold text-brand-primary mb-4 flex items-center gap-3">
                <ShieldCheck size={28} /> Our Mission
              </h4>
              <p className="text-base text-brand-dark/70 leading-relaxed">
                To bridge the gap between travelers and the authentic local essence of a destination using AI-driven insights and real-time location awareness.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { label: "Authenticity", value: "90%", desc: "Focus on local gems" },
              { label: "Efficiency", value: "2x", desc: "Faster planning" }
            ].map((stat, i) => (
              <div key={i} className="bg-brand-surface p-12 rounded-[3rem] border border-brand-primary/5 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 transition-all">
                <span className="text-5xl font-bold text-brand-primary mb-2">{stat.value}</span>
                <span className="text-lg font-bold text-brand-dark mb-2">{stat.label}</span>
                <span className="text-xs text-brand-dark/40 uppercase tracking-widest">{stat.desc}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const AppPreviewSection = () => {
  const [active, setActive] = useState(0);
  const screens = [
    { 
      title: "Home Screen", 
      desc: "Discover attractions, food, and events at a glance.", 
      color: "from-brand-primary", 
      icon: <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-sm"><img src="/images/AppLogo.png" alt="Home" className="w-full h-full object-cover" referrerPolicy="no-referrer" /></div>,
      image: "/images/Home.jpeg" // Replace with your image path like "/home-screen.png"
    },
    { 
      title: "Trip Planner", 
      desc: "AI-generated itineraries based on your duration.", 
      color: "from-purple-600", 
      icon: <Calendar size={40} className="text-white" />,
      image: "/images/Trip_planning.jpeg"
    },
    { 
      title: "Budget Estimator", 
      desc: "Real-time cost predictions for your journey.", 
      color: "from-blue-600", 
      icon: <Wallet size={40} className="text-white" />,
      image: "/images/Budget.jpeg"
    },
    { 
      title: "Food Explorer", 
      desc: "Find authentic local restaurants nearby.", 
      color: "from-orange-500", 
      icon: <Utensils size={40} className="text-white" />,
      image: "/images/Food.jpeg"
    },
    { 
      title: "Events Discovery", 
      desc: "Never miss a local festival or concert.", 
      color: "from-pink-500", 
      icon: <Bell size={40} className="text-white" />,
      image: "/images/Events.jpeg"
    },
  ];

  const next = () => setActive((prev) => (prev + 1) % screens.length);

  return (
    <section id="gallery" className="py-20 bg-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">App Preview</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-brand-dark">Experience the Interface</h3>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
          {/* Phone Mockup */}
          <div className="relative w-[300px] h-[600px] shrink-0">
            <div className="absolute inset-0 bg-brand-surface rounded-[3rem] border-[12px] border-brand-dark/5 shadow-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0"
                >
                  {screens[active].image ? (
                    <img 
                      src={screens[active].image} 
                      alt={screens[active].title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className={cn(
                      "w-full h-full bg-gradient-to-b p-8 flex flex-col justify-center items-center text-center text-white",
                      screens[active].color,
                      "to-brand-primary"
                    )}>
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
                        {screens[active].icon}
                      </div>
                      <h4 className="text-3xl font-bold mb-4">{screens[active].title}</h4>
                      <p className="text-white/80 leading-relaxed">{screens[active].desc}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <button 
              onClick={next}
              className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-brand-primary text-white flex items-center justify-center hover:scale-110 transition-transform z-20 shadow-xl"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Features List */}
          <div className="max-w-md w-full space-y-4">
            {screens.map((s, i) => (
              <motion.div 
                key={i} 
                onClick={() => setActive(i)}
                whileHover={{ x: 10 }}
                className={cn(
                  "p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group",
                  active === i 
                    ? "bg-brand-surface border-brand-primary shadow-lg" 
                    : "bg-white border-brand-primary/5 hover:border-brand-primary/20"
                )}
              >
                <div className="relative z-10">
                  <h4 className={cn(
                    "text-lg font-bold mb-1 transition-colors",
                    active === i ? "text-brand-primary" : "text-brand-dark"
                  )}>
                    {s.title}
                  </h4>
                  <p className={cn(
                    "text-xs transition-colors",
                    active === i ? "text-brand-dark/70" : "text-brand-dark/40"
                  )}>
                    {s.desc}
                  </p>
                </div>
                {active === i && (
                  <motion.div 
                    layoutId="active-bg"
                    className="absolute inset-0 bg-brand-primary/5"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const FutureScopeSection = () => {
  const scopes = [
    {
      icon: <ShieldAlert className="text-red-500" />,
      title: "SOS Safety System",
      desc: "Instant emergency help with live location sharing and authority alerts for solo travelers."
    },
    {
      icon: <Users className="text-blue-500" />,
      title: "Local Community",
      desc: "A live travel ecosystem where locals contribute hidden gems and authentic cultural insights."
    },
    {
      icon: <Cloud className="text-green-500" />,
      title: "Smart Trip Vault",
      desc: "Securely save, reuse, and collaborate on trip plans with cloud sync and multi-user support."
    },
    {
      icon: <AlertTriangle className="text-orange-500" />,
      title: "Danger Zone Alerts",
      desc: "Real-time safety warnings for risky areas based on crime data and time-based risk analysis."
    }
  ];

  return (
    <section id="future-scope" className="py-24 bg-white relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-4">Roadmap</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-brand-dark leading-tight">Future Scope</h3>
          <p className="mt-4 text-brand-dark/60 max-w-2xl mx-auto font-medium">
            TripSutra is evolving from a travel app into a <strong>Smart Travel Companion</strong>.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {scopes.map((scope, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[3rem] bg-brand-surface border border-brand-primary/5 hover:border-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {scope.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4 text-brand-dark">{scope.title}</h4>
              <p className="text-brand-dark/50 leading-relaxed font-medium">{scope.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "AI Analysis", desc: "Mistral AI analyzes your preferences and destination.", icon: <Search className="text-brand-primary" /> },
    { title: "Live Tracking", desc: "Our engine tracks your real-time position for nearby gems.", icon: <Navigation className="text-brand-accent" /> },
    { title: "Smart Itinerary", desc: "Get a personalized, safe, and authentic travel plan.", icon: <Compass className="text-brand-primary" /> },
  ];

  return (
    <section className="py-24 bg-brand-surface">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-4">The Process</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-brand-dark leading-tight">Simple. Smart. Seamless.</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center p-12 bg-white rounded-[3rem] border border-brand-primary/5 shadow-xl shadow-brand-primary/5"
            >
              <div className="w-20 h-20 bg-brand-surface rounded-3xl flex items-center justify-center mb-8 text-brand-primary shadow-inner">
                {React.cloneElement(step.icon as React.ReactElement, { size: 32 })}
              </div>
              <h4 className="text-2xl font-bold mb-4 text-brand-dark">{step.title}</h4>
              <p className="text-brand-dark/50 leading-relaxed font-medium">{step.desc}</p>
              {i < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-20">
                  <ChevronRight className="text-brand-primary/20" size={40} />
                </div>
              )}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center font-display font-bold text-xl shadow-lg">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const TeamSection = () => {
  const team = [
    "Saket Kulthe",
    "Ojaswini Patil",
    "Priyesh Kathe",
    "Mrudula Pagar",
    "Diya Walunj"
  ];

  return (
    <section id="team" className="py-24 bg-brand-surface relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[4rem] shadow-2xl shadow-brand-primary/10 border border-brand-primary/5 overflow-hidden"
        >
          <div className="grid lg:grid-cols-12 items-stretch">
            {/* Logo & Brand Side */}
            <div className="lg:col-span-5 gradient-bg p-12 md:p-20 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                className="relative w-48 h-48 md:w-64 md:h-64 mb-10 group"
              >
                <div className="absolute inset-0 bg-white/20 rounded-[3rem] blur-3xl group-hover:bg-white/30 transition-all duration-500" />
                <div className="relative w-full h-full bg-white rounded-[3rem] shadow-2xl flex items-center justify-center p-8 group-hover:rotate-3 transition-transform duration-500">
                  {/* Replace the src with your actual logo path */}
                  <img 
                    src="/images/logo.jpeg" 
                    alt="TripSutra Logo" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              <h3 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">Bug Busterz</h3>
              <div className="w-20 h-1.5 bg-brand-accent rounded-full mx-auto" />
            </div>

            {/* Info & Team Side */}
            <div className="lg:col-span-7 p-12 md:p-20 flex flex-col justify-center">
              <div className="mb-12">
                <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-6">Our Mission</h2>
                <p className="text-xl md:text-2xl text-brand-dark/70 leading-relaxed font-medium italic relative">
                  <span className="absolute -left-6 -top-4 text-6xl text-brand-primary/10 font-serif">"</span>
                  Bug Busters is a team with a creative spark and an innovative mark. We crush bugs, solve problems, and build smart solutions. With bold ideas and collaborative minds, we turn challenges into breakthroughs and code the future with passion and precision. 🚀
                </p>
              </div>

              <div className="space-y-8">
                <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em]">The Minds Behind</h2>
                <div className="flex flex-wrap gap-4">
                  {team.map((name, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-8 py-4 bg-brand-surface rounded-2xl border border-brand-primary/5 hover:border-brand-primary/20 hover:bg-white hover:shadow-xl hover:shadow-brand-primary/5 transition-all cursor-default group"
                    >
                      <span className="text-lg font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                        {name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
const FeaturesSection = () => {
  const features = [
    { 
      title: "AI Trip Planner", 
      desc: "Day-by-day itineraries optimized for your unique travel style and time.",
      icon: <Calendar className="text-brand-primary" />
    },
    { 
      title: "Nearby Attractions", 
      desc: "Discover heritage sites and hidden gems based on your live location.",
      icon: <Ticket className="text-purple-500" />
    },
    { 
      title: "Nearby Hotels", 
      desc: "Instantly find the best stays around you, from luxury to local homestays.",
      icon: <Hotel className="text-blue-500" />
    },
    { 
      title: "Explore Food", 
      desc: "Find authentic local cuisine and popular spots that define the culture.",
      icon: <Utensils className="text-orange-500" />
    },
    { 
      title: "Nearby Events", 
      desc: "Get location of festivals and concerts happening right now around you.",
      icon: <Bell className="text-pink-500" />
    },
    { 
      title: "Budget Estimator", 
      desc: "Accurate trip cost predictions based on duration and destination.",
      icon: <Wallet className="text-green-500" />
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-4">Trip Tools</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-brand-dark leading-tight">Everything you need <br className="hidden md:block" /> to explore the world</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[3rem] bg-brand-surface border border-brand-primary/5 hover:border-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4 text-brand-dark">{f.title}</h4>
              <p className="text-brand-dark/50 leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const AccountSection = () => {
  return (
    <section className="py-20 bg-brand-surface relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center"
      >
        <div className="order-2 md:order-1">
          <div className="glass-card p-8 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white">
                <User size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold">John Doe</h4>
                <p className="text-sm text-brand-dark/40">Travel Enthusiast</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                <History className="text-brand-primary" />
                <div>
                  <p className="text-xs text-brand-dark/40">Trip History</p>
                  <p className="text-sm font-bold">12 Trips Completed</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                <Clock className="text-brand-accent" />
                <div>
                  <p className="text-xs text-brand-dark/40">Trip Timeline</p>
                  <p className="text-sm font-bold">Saved Itineraries & Routes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Personalized</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-6">Your Travel History, <br />Always Saved</h3>
          <p className="text-lg text-brand-dark/60 mb-8 leading-relaxed">
            With our secure login feature, your trip history, personal details, and custom timelines are safely stored. Revisit your favorite journeys or pick up where you left off.
          </p>
          <ul className="space-y-4">
            {[
              "Secure User Profiles",
              "Detailed Trip History",
              "Saved Timelines & Routes",
              "Personalized Recommendations"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <ShieldCheck className="text-brand-primary" size={20} />
                <span className="font-semibold text-brand-dark/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

const DownloadSection = () => {
  return (
    <section className="py-24 gradient-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">Start your journey today</h2>
          <p className="text-xl md:text-2xl text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed">
            Download TripSutra and experience the future of travel planning. AI-powered, location-aware, and built for explorers.
          </p>
          
          <div className="flex flex-col items-center gap-12">
            <motion.a 
              href="/tripsutra.apk"
              download
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-6 bg-white text-brand-primary font-bold text-2xl rounded-[2.5rem] flex items-center gap-4 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-10 transition-opacity" />
              <Download size={32} className="group-hover:bounce" />
              <span>Download TripSutra</span>
              <div className="absolute -right-4 -top-4 w-12 h-12 bg-brand-accent/20 rounded-full blur-xl group-hover:scale-150 transition-transform" />
            </motion.a>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-[3rem] border-2 border-white/20 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-white rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white p-4 rounded-[2rem]">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin + '/tripsutra.apk' : '')}`} 
                  alt="Download QR Code"
                  className="w-40 h-40 md:w-48 md:h-48"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[10px] font-bold text-brand-dark/40 mt-3 uppercase tracking-[0.2em] text-center">Scan to Download</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-10 bg-white border-t border-brand-primary/10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
            <img src="/images/AppLogo.png" alt="TripSutra Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-brand-dark">TripSutra</span>
        </div>
        
        <div className="flex gap-8 text-sm font-medium text-brand-dark/40">
          <a href="#" className="hover:text-brand-primary transition-colors">Contact Us</a>
        </div>

        <p className="text-xs text-brand-dark/20">© 2026 TripSutra. All rights reserved.</p>
      </div>
    </footer>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-[100] origin-left"
      style={{ scaleX }}
    />
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-brand-primary text-white rounded-2xl shadow-2xl shadow-brand-primary/30 hover:-translate-y-2 transition-all"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-brand-dark relative">
      <ScrollProgress />
      <BackToTop />
      
      {/* Global Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-accent/5 rounded-full blur-[120px]" />
      </div>

      <Navbar />
      <main className="relative">
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <AppPreviewSection />
        <AccountSection />
        <HowItWorks />
        <FutureScopeSection />
        <TeamSection />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
