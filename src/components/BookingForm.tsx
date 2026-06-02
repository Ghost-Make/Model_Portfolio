"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, MessageCircle } from "lucide-react";

export default function BookingForm() {
  const [formState, setFormState] = useState({
    name: "",
    agency: "",
    email: "",
    type: "Campaign",
    date: "",
    message: ""
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    // Client-side Validation
    const { name, email, message } = formState;
    if (!name || !email || !message) {
      setErrorMsg("Name, Email, and Message are required.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          agency: formState.agency || "N/A",
          type: formState.type,
          message: formState.message
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("Casting Inquiry submission success:", data);
        setIsSubmitted(true);
        // Clear the form after successful submission
        setFormState({
          name: "",
          agency: "",
          email: "",
          type: "Campaign",
          date: "",
          message: ""
        });
      } else {
        // Highly descriptive console audit detailing Service ID status, templates, and missing keys
        console.error("Casting Inquiry server-side failure audit:", {
          message: data.message,
          details: data.details,
          missingKeys: data.missingKeys,
          rawResponse: data
        });
        throw new Error(data.message || "Unable to send inquiry. Please try again later.");
      }
    } catch (err: any) {
      console.error("Critical Inquiry Submission client-side exception:", {
        message: err.message,
        stack: err.stack,
        rawError: err
      });
      setErrorMsg("Unable to send inquiry. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    // Direct WhatsApp chat link using +91 9380930917 (919380930917)
    const whatsappNumber = "919380930917";
    const text = encodeURIComponent("Hello Kushal, I would like to discuss a modeling opportunity.");
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="w-full max-w-xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden">
      {/* Decorative luxury gradient background in card */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full filter blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full filter blur-[80px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="booking-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="text-center md:text-left mb-8">
              <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-white/40 block mb-2">Inquiries & Castings</span>
              <h3 className="text-3xl font-display uppercase tracking-wider text-white">Book Kushal Naik</h3>
              <p className="text-white/60 text-xs mt-2 max-w-sm leading-relaxed">
                Direct casting or luxury campaign inquiries. Enter your details below or connect immediately via WhatsApp.
              </p>
            </div>

            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-950/40 border border-red-500/20 text-red-200 text-xs px-4 py-3 rounded-xl backdrop-blur-md"
              >
                {errorMsg}
              </motion.div>
            )}

            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] tracking-wider uppercase text-white/50 pl-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexander McQueen"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="input-luxury text-sm"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-[10px] tracking-wider uppercase text-white/50 pl-1">Brand / Agency</label>
                <input
                  type="text"
                  placeholder="e.g. Dior Paris"
                  value={formState.agency}
                  onChange={(e) => setFormState({ ...formState, agency: e.target.value })}
                  className="input-luxury text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] tracking-wider uppercase text-white/50 pl-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="contact@agency.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="input-luxury text-sm"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-[10px] tracking-wider uppercase text-white/50 pl-1">Proposed Date</label>
                <input
                  type="date"
                  value={formState.date}
                  onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                  className="input-luxury text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-wider uppercase text-white/50 pl-1">Inquiry Type</label>
              <select
                value={formState.type}
                onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                className="input-luxury text-sm cursor-pointer"
              >
                <option value="Campaign" className="bg-background text-white">Campaign Photoshoot</option>
                <option value="Runway" className="bg-background text-white">Runway & Fashion Week</option>
                <option value="Editorial" className="bg-background text-white">Editorial Feature</option>
                <option value="Brand Partnership" className="bg-background text-white">Influencer & Brand Ambassador</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-wider uppercase text-white/50 pl-1">Message & Creative Brief *</label>
              <textarea
                required
                rows={4}
                placeholder="Describe your creative vision, location, budget and timeline..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="input-luxury text-sm resize-none"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto btn-luxury-outline flex items-center justify-center space-x-2 py-3.5 px-8 font-semibold text-xs transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send size={14} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 text-xs uppercase tracking-widest text-white/60 hover:text-white border border-white/10 hover:border-white/30 px-8 py-3.5 rounded-full transition-all duration-300 bg-white/5 cursor-pointer"
              >
                <MessageCircle size={14} />
                <span>Kushal Naik</span>
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center py-12 px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="text-white bg-white/10 p-5 rounded-full border border-white/20 mb-6"
            >
              <CheckCircle2 size={48} strokeWidth={1} />
            </motion.div>
            
            <h3 className="text-3xl font-display uppercase tracking-widest text-white mb-3">Inquiry Submitted</h3>
            <p className="text-white/60 text-sm max-w-md leading-relaxed mb-8 font-light">
              Thank you. Your inquiry has been sent successfully.
            </p>

            <button
              onClick={handleWhatsAppRedirect}
              className="btn-luxury-outline flex items-center space-x-2 py-4 px-8 cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Kushal Naik</span>
            </button>
            
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormState({ name: "", agency: "", email: "", type: "Campaign", date: "", message: "" });
              }}
              className="text-white/40 hover:text-white/70 text-xs uppercase tracking-widest font-medium mt-6 transition-colors cursor-pointer"
            >
              Submit Another Brief
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
