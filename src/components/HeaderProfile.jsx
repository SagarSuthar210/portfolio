import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronDown,
  Zap
} from 'lucide-react';
import { LinkedInIcon, NotionIcon } from './BrandIcons';

export default function HeaderProfile({ profile, onCopyToast, onOpenTaskModal }) {
  const [copiedType, setCopiedType] = useState(null);

  const handleCopy = (text, type, label) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    if (onCopyToast) {
      onCopyToast(`${label} copied to clipboard!`);
    }
    setTimeout(() => setCopiedType(null), 2000);
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative pt-7 sm:pt-9 pb-4 px-4 max-w-4xl mx-auto text-center flex flex-col items-center">
      {/* Ambient soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Profile Image (Top Middle) */}
      <div className="relative group mb-3">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-emerald-400 via-emerald-300 to-teal-300 shadow-xl shadow-emerald-500/20 ring-1 ring-emerald-400/40 transition-transform duration-300 group-hover:scale-105">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full object-cover rounded-full bg-slate-100 border-2 border-white"
            loading="eager"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80";
            }}
          />
        </div>
        {/* Availability indicator badge dot */}
        <span className="absolute bottom-1 right-1 flex h-4 w-4" title="Available for new projects">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
      </div>

      {/* 2. Name & Title (Below Profile Image) */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-1 font-heading">
        {profile.name}
      </h1>
      <p className="text-sm sm:text-base text-amber-700 font-semibold mb-1.5 max-w-xl tracking-tight">
        {profile.role}
      </p>
      <p className="text-xs sm:text-sm text-slate-600 max-w-xl mb-3.5 leading-relaxed">
        {profile.tagline}
      </p>

      {/* 3 & 4. Email & Contact (Prominent, Clearly Visible Side-by-Side Chips) */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-3.5">
        {/* Email */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all shadow-xs">
          <Mail className="w-4 h-4 text-slate-800 shrink-0" />
          <a 
            href={`mailto:${profile.email}`} 
            className="hover:text-slate-900 transition-colors tracking-wide"
            title="Send email"
          >
            {profile.email}
          </a>
          <button
            onClick={() => handleCopy(profile.email, 'email', 'Email')}
            aria-label="Copy email"
            className="p-1 hover:text-slate-900 transition-colors cursor-pointer text-slate-400 hover:bg-slate-100 rounded-md ml-0.5"
            title="Copy email"
          >
            {copiedType === 'email' ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Contact */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs sm:text-sm font-medium text-slate-700 hover:border-emerald-400 hover:bg-slate-50 transition-all shadow-xs">
          <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
          <a 
            href={`tel:${profile.contact.replace(/\s+/g, '')}`} 
            className="hover:text-emerald-700 transition-colors tracking-wide"
            title="Call or WhatsApp"
          >
            {profile.contact}
          </a>
          <button
            onClick={() => handleCopy(profile.contact, 'contact', 'Contact number')}
            aria-label="Copy phone"
            className="p-1 hover:text-slate-900 transition-colors cursor-pointer text-slate-400 hover:bg-slate-100 rounded-md ml-0.5"
            title="Copy contact"
          >
            {copiedType === 'contact' ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* 5. Two Primary Buttons (Redirecting to LinkedIn and Notion) */}
      <div className="flex items-center justify-center gap-3 w-full max-w-sm mb-3">
        {/* LinkedIn Button */}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a66c2] hover:bg-[#084e96] text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <LinkedInIcon className="w-4 h-4 fill-current" />
          <span>LinkedIn</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>

        {/* Notion Button */}
        <a
          href={profile.notion}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm shadow-md shadow-slate-200/70 border border-slate-200/90 hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <NotionIcon className="w-4 h-4 fill-slate-800" />
          <span>Notion Hub</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      {/* 6. Prominent "Assign me a task!" Button (Most Highlighted, Standout Green CTA) */}
      <div className="w-full max-w-sm mb-4">
        <button
          onClick={onOpenTaskModal}
          className="group relative w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer border border-emerald-400/40"
        >
          {/* Subtle pulse badge ring */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <Zap className="w-4 h-4 text-white fill-white" />
          <span>Assign me a task!</span>
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <button 
        onClick={scrollToProjects}
        aria-label="Scroll down to view projects"
        className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600 hover:text-slate-900 transition-all cursor-pointer shadow-xs animate-pulse"
      >
        <span>View projects below</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-700 group-hover:translate-y-0.5 transition-transform" />
      </button>
    </header>
  );
}
