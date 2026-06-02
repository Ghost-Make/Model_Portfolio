"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function TermsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen relative font-sans selection:bg-white selection:text-black pb-24">
      {/* Dynamic Navigation */}
      <Navbar />

      {/* Decorative Blur Background Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 rounded-full filter blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/3 rounded-full filter blur-3xl pointer-events-none translate-y-1/2" />

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
            <FileText size={16} />
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold">Terms of Use</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-wider text-white mb-6">
            Terms & Conditions
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
          <div className="space-y-4">
            <h2 className="text-xl font-display uppercase tracking-widest text-white border-b border-white/5 pb-2">
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you agree to comply with these Terms and Conditions.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-display uppercase tracking-widest text-white border-b border-white/5 pb-2">
              Portfolio Content
            </h2>
            <p>
              All photographs, videos, designs, graphics, logos, and written content displayed on this website are the property of Kushal Naik unless otherwise stated.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-display uppercase tracking-widest text-white border-b border-white/5 pb-2">
              Intellectual Property
            </h2>
            <p>
              No content from this website may be copied, reproduced, distributed, modified, or used for commercial purposes without prior written permission.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-display uppercase tracking-widest text-white border-b border-white/5 pb-2">
              Booking & Inquiries
            </h2>
            <p>
              Submission of an inquiry form does not guarantee acceptance of a project, collaboration, campaign, or booking request. All bookings are subject to availability and mutual agreement.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-display uppercase tracking-widest text-white border-b border-white/5 pb-2">
              Third-Party Links
            </h2>
            <p>
              This website may include links to external platforms such as Instagram and WhatsApp. We are not responsible for the content or practices of those third-party services.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-display uppercase tracking-widest text-white border-b border-white/5 pb-2">
              Website Availability
            </h2>
            <p>
              While every effort is made to keep the website available and accurate, we do not guarantee uninterrupted access or error-free operation.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-display uppercase tracking-widest text-white border-b border-white/5 pb-2">
              Limitation of Liability
            </h2>
            <p>
              Use of this website is at your own risk. Kushal Naik shall not be held liable for any direct, indirect, or incidental damages arising from the use of this website.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-display uppercase tracking-widest text-white border-b border-white/5 pb-2">
              Changes to Terms
            </h2>
            <p>
              These Terms and Conditions may be updated at any time without prior notice.
            </p>
          </div>

          {/* Contact Cards Panel */}
          <div className="space-y-4 pt-8 border-t border-white/10">
            <h2 className="text-xl font-display uppercase tracking-widest text-white">
              Contact & Inquiries
            </h2>
            <p className="pb-4">
              For any questions regarding these Terms & Conditions, please reach out directly:
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
