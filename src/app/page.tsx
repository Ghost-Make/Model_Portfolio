"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Instagram, 
  MapPin, 
  ArrowDown, 
  Compass, 
  Ruler, 
  Globe,
  MessageCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import BentoGrid from "@/components/BentoGrid";
import BookingForm from "@/components/BookingForm";

// Animation Presets for consistency
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  })
};

const brandLogos = [
  "PRADA", "DIOR", "BALENCIAGA", "CALVIN KLEIN", "VOGUE", 
  "GUCCI", "GIVENCHY", "CELINE", "SAINT LAURENT", "JIL SANDER"
];

export default function HomePage() {
  return (
    <div className="bg-background text-foreground min-h-screen relative font-sans selection:bg-white selection:text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Hero Section - Full screen fashion editorial focal point */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
        
        {/* Background Ambient Blur Layer (Full bleed) */}
        <div className="absolute inset-0 z-0 opacity-15 filter blur-3xl pointer-events-none scale-105 select-none">
          <Image
            src="/hero.jpg"
            alt="Ambient blur background"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Art-Directed Portrait Layer (Soft Masked & Right-Aligned on Desktop) */}
        <div 
          className="absolute inset-0 md:left-[45%] md:w-[55%] h-full z-10 flex items-center justify-center select-none overflow-hidden"
          style={{
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)',
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)'
          }}
        >
          <div className="relative w-full h-[65vh] md:h-[90vh] aspect-[3/4] max-w-lg md:max-w-xl mx-auto opacity-30 md:opacity-80 transition-all duration-1000">
            <Image
              src="/hero.jpg"
              alt="Naik Kushal featured editorial portrait"
              fill
              priority
              className="object-cover object-center filter grayscale brightness-[0.75] contrast-[1.05] hover:scale-102 hover:brightness-[0.85] transition-all duration-[8000ms] ease-out"
            />
            {/* Subtle bottom fade to blend with landing page background */}
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent z-20" />
          </div>
        </div>

        {/* Luxury Vignette Shader Overlay */}
        <div className="absolute inset-0 bg-luxury-gradient z-15 pointer-events-none" />

        {/* Hero Copy Overlay - Left-Aligned on Desktop, Centered on Mobile */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full h-full flex flex-col justify-center items-center md:items-start text-center md:text-left pt-16">
          
          {/* Floating badge */}
          <motion.div
            custom={1}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex items-center bg-white/5 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6"
          >
            <span className="text-[10px] tracking-[0.3em] font-display font-semibold uppercase text-white/90">
              Editorial & Commercial
            </span>
          </motion.div>

          {/* Large elegant typography - Matches Bebas/Oswald compressed style */}
          <motion.h1
            custom={2}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-6xl sm:text-8xl md:text-[11rem] font-display font-bold tracking-tighter text-white uppercase leading-none select-none"
            style={{ letterSpacing: "-0.03em" }}
          >
            Naik Kushal
          </motion.h1>

          {/* Premium outline buttons */}
          <motion.div
            custom={3}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-12 w-full max-w-sm sm:max-w-none"
          >
            <a href="#contact" className="btn-luxury-outline w-full sm:w-auto py-3.5 px-8 font-semibold">
              Book Me
            </a>
            <a href="#portfolio" className="btn-luxury-outline w-full sm:w-auto py-3.5 px-8 font-medium">
              My Portfolio
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator - Horizontally centered using absolute center configuration */}
        <div className="absolute bottom-6 left-0 right-0 mx-auto w-fit z-25 flex flex-col items-center space-y-2 opacity-50 animate-bounce">
          <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-white/60">Scroll</span>
          <ArrowDown size={14} className="text-white" />
        </div>
      </section>

      {/* Brands Infinitely Scrolling Showcase */}
      <section className="bg-background py-8 border-y border-white/5 overflow-hidden w-full relative z-30">
        <div className="flex w-full select-none">
          {/* Loop double lists for infinite animation */}
          <div className="flex space-x-20 animate-marquee whitespace-nowrap min-w-full">
            {brandLogos.concat(brandLogos).map((brand, idx) => (
              <span 
                key={idx} 
                className="text-white/35 font-display text-2xl tracking-[0.4em] font-semibold uppercase hover:text-white transition-colors duration-300"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About & Statistics Profile Section */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-30">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-white/40 mb-3">Model Profile</span>
          <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wider text-white">The Stats & Profile</h2>
          <div className="h-[1px] w-20 bg-white/20 mt-4" />
        </div>

        {/* Stats Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Large Statement Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-8 glass-panel p-8 md:p-12 rounded-3xl flex flex-col justify-between border border-white/5 relative overflow-hidden group"
          >
            {/* Soft decorative background circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full filter blur-[100px] pointer-events-none group-hover:bg-white/10 transition-colors duration-500" />
            
            <div className="space-y-6">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/40 block">The Aesthetic</span>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/95 font-light leading-relaxed max-w-2xl">
                Combining editorial elegance with commercial appeal, creating a versatile presence that resonates across fashion publications, advertising campaigns, television commercials, and premium brand collaborations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mt-12 pt-8 border-t border-white/5">
              <div className="flex items-start space-x-4">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5 mt-1 text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold">Base Location</h4>
                  <p className="text-sm font-semibold text-white mt-1">Bengaluru, India</p>
                  <p className="text-xs text-white/60">Available for global booking</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Interactive Statistics Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4 glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/40 block mb-6">Metrics</span>
              <h3 className="text-xl font-display uppercase tracking-widest text-white mb-6 flex items-center">
                <Ruler size={16} className="mr-2 text-white" />
                <span>Physical Card</span>
              </h3>
              
              <div className="space-y-4">
                {[
                  { label: "Height", val: "6'0\" / 183 cm" },
                  { label: "Chest", val: "41 in / 104 cm" },
                  { label: "Waist", val: "34 in / 86 cm" },
                  { label: "Suit", val: "41R / 34" },
                  { label: "Eyes", val: "Dark Brown" },
                  { label: "Hair", val: "Dark Brown" },
                  { label: "Shoe", val: "10 UK / 44 EU" }
                ].map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2.5 border-b border-white/5">
                    <span className="text-xs uppercase tracking-wider text-white/55 font-medium">{stat.label}</span>
                    <span className="text-sm font-semibold text-white tracking-wide">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Specialties Card - Expanded to col-span-12 for visual layout balance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-12 glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/40 block">Focus</span>
              <h3 className="text-xl font-display uppercase tracking-widest text-white flex items-center">
                <Compass size={16} className="mr-2 text-white" />
                <span>Specialties</span>
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Specializing in premium editorial, commercial, and television productions. Creating impactful visual narratives for fashion houses, global brands, and contemporary media campaigns.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 mt-8 pt-4">
              {[
                "Editorial Modeling", "Commercial Modeling", "TVC & Video Productions", 
                "Fashion Campaigns", "Lifestyle Photography", "Brand Ambassador Work", "Digital Content Creation"
              ].map((specialty, idx) => (
                <span 
                  key={idx}
                  className="bg-white/5 border border-white/5 hover:border-white/20 text-white/90 text-xs px-4 py-2 rounded-full transition-all duration-300 font-medium cursor-default"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Bento Grid Showcase */}
      <section id="portfolio" className="py-24 px-6 md:px-12 bg-background border-t border-white/5 relative z-30">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-white/40 mb-3">Portfolio Bento</span>
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wider text-white">Campaigns & Editorials</h2>
            <div className="h-[1px] w-20 bg-white/20 mt-4" />
          </div>

          {/* Interactive Asymmetrical Bento Gallery */}
          <BentoGrid />
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-background border-t border-white/5 relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Details Panel */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-white/40 block">Casting Calls</span>
                <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wider text-white">Let's Collaborate</h2>
                <p className="text-white/60 text-sm leading-relaxed max-w-md">
                  Representing a versatile presence across editorial fashion, commercial advertising, and television productions. For castings, brand campaigns, runway shows, or creative collaborations with Kushal Naik, please submit your booking request below.
                </p>
              </div>

              {/* Contact Information display - Refined left-aligned layout */}
              <div className="space-y-8 border-t border-white/5 pt-8 w-full">
                
                {/* Horizontal premium icons row - Left-aligned */}
                <div className="flex items-center justify-start gap-5 pl-1">
                  {/* Instagram Icon - First */}
                  <a
                    href="https://www.instagram.com/kushalkrishnanaik?igsh=Y2dpOXFydmQ5eG9s"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white/5 border border-white/10 hover:border-white/30 p-4 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center hover:scale-110 shadow-lg cursor-pointer"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <Instagram size={22} />
                  </a>

                  {/* WhatsApp Icon - Second */}
                  <a
                    href="https://wa.me/919380930917?text=Hello%20Kushal,%20I%20would%20like%20to%20discuss%20a%20modeling%20opportunity."
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white/5 border border-white/10 hover:border-white/30 p-4 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center hover:scale-110 shadow-lg cursor-pointer"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                  >
                    <MessageCircle size={22} />
                  </a>
                </div>

                {/* Original Location Styling - Left-aligned text below social icons */}
                <div className="pl-1">
                  <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold">Base Location</h4>
                  <p className="text-sm font-medium text-white/90 mt-1">Bengaluru, India</p>
                  <p className="text-xs text-white/50">Available for commercial cast calls and editorial travel</p>
                </div>

              </div>
            </div>

            {/* Casting Form Panel */}
            <div className="lg:col-span-7">
              <BookingForm />
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-white/5 relative z-30 text-center px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-2xl font-bold tracking-tighter text-white font-display">KN</span>
          
          <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/40">
            © 2026 KUSHAL NAIK. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex space-x-6 text-[10px] tracking-wider uppercase font-medium text-white/50">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
