"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function PrivacyPage() {
  return (
    <div className="bg-background text-foreground min-h-screen relative font-sans selection:bg-white selection:text-black pb-24">
      {/* Dynamic Navigation */}
      <Navbar />

      {/* Decorative Blur Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full filter blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/3 rounded-full filter blur-3xl pointer-events-none translate-y-1/2" />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 pt-32 relative z-30">
        
        {/* Breadcrumb / Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-white/10 pb-10 mb-12"
        >
          <div className="flex items-center gap-3 text-white/40 mb-4">
            <Shield size={16} />
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold">Legal Document</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-wider text-white mb-6">
            Privacy Policy
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/50">
            <span>Last Updated: May 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:inline" />
            <span>Official Portfolio of Naik Kushal</span>
          </div>
        </motion.div>

        {/* Content Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="prose prose-invert max-w-none space-y-10 text-white/70 leading-relaxed text-sm md:text-base font-light"
        >
          <p className="text-white/90 text-base md:text-lg font-normal leading-relaxed border-l-2 border-white/20 pl-6 py-1">
            Welcome to the official portfolio website of Kushal Naik. Your privacy is important to us. This Privacy Policy explains how information is collected, used, and protected when you visit this website.
          </p>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-display uppercase tracking-widest text-white border-b border-white/5 pb-2">
              Information We Collect
            </h2>
            <p>
              When you submit an inquiry through the contact form, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Name</li>
              <li>Email Address</li>
              <li>Company or Brand Name</li>
              <li>Project Details</li>
              <li>Any information you voluntarily provide</li>
            </ul>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-display uppercase tracking-widest text-white border-b border-white/5 pb-2">
              How We Use Your Information
            </h2>
            <p>
              The information collected may be used to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Respond to inquiries and booking requests</li>
              <li>Communicate regarding collaborations, campaigns, castings, and projects</li>
              <li>Improve website functionality and user experience</li>
            </ul>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-display uppercase tracking-widest text-white border-b border-white/5 pb-2">
              Data Protection
            </h2>
            <p>
              We take reasonable measures to protect submitted information from unauthorized access, disclosure, or misuse.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-display uppercase tracking-widest text-white border-b border-white/5 pb-2">
              Third-Party Links
            </h2>
            <p>
              This website may contain links to third-party platforms, including Instagram and WhatsApp. We are not responsible for the privacy practices of external websites.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-display uppercase tracking-widest text-white border-b border-white/5 pb-2">
              Cookies
            </h2>
            <p>
              This website may use basic cookies or analytics tools to improve performance and user experience.
            </p>
          </div>

          {/* Contact Cards Panel */}
          <div className="space-y-4 pt-8 border-t border-white/10">
            <h2 className="text-xl font-display uppercase tracking-widest text-white">
              Contact & Inquiries
            </h2>
            <p className="pb-4">
              For any questions regarding this Privacy Policy, please reach out directly:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center space-x-4">
                <div className="bg-white/5 p-3 rounded-full text-white/70">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email</h4>
                  <a href="mailto:kushalnaikk142whiteskyblue@gmail.com" className="text-sm font-medium text-white hover:text-white/70 transition-colors">
                    kushalnaikk142whiteskyblue@gmail.com
                  </a>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center space-x-4">
                <div className="bg-white/5 p-3 rounded-full text-white/70">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Location</h4>
                  <p className="text-sm font-medium text-white/90">
                    Bengaluru, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Home Button at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center border-t border-white/5 pt-12"
        >
          <Link href="/" className="btn-luxury-outline px-8 py-3.5 inline-block text-xs">
            Back to Homepage
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
