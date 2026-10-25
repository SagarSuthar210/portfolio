import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { LinkedInIcon, NotionIcon } from './BrandIcons';

export default function HeaderProfile({ profile, onCopyToast }) {
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
    <header className="relative pt-6 sm:pt-8 pb-3 px-4 max-w-3xl mx-auto text-center flex flex-col items-center">
      {/* Ambient soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Profile Image (Top Middle) */}
      <div className="relative group mb-2.5">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-0.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full object-cover rounded-full bg-slate-900 border-2 border-[#0b0f19]"
            loading="eager"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80";
            }}
          />
        </div>
        {/* Availability indicator badge dot */}
        <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#0b0f19]"></span>
        </span>
      </div>

      {/* 2. Name & Title (Below Profile Image) */}
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-0.5 font-heading">
        {profile.name}
      </h1>
      <p className="text-xs sm:text-sm text-indigo-300 font-medium mb-1">
        {profile.role}
      </p>
      <p className="text-xs text-slate-400 max-w-md mb-2.5 line-clamp-2 leading-relaxed">
        {profile.tagline}
      </p>

      {/* 3 & 4. Email & Contact (Compact Side-by-Side Chips) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
        {/* Email */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 hover:border-indigo-500/40 transition-colors shadow-sm">
          <Mail className="w-3.5 h-3.5 text-indigo-400" />
          <a 
            href={`mailto:${profile.email}`} 
            className="hover:text-white transition-colors"
            title="Send email"
          >
            {profile.email}
          </a>
          <button
            onClick={() => handleCopy(profile.email, 'email', 'Email')}
            aria-label="Copy email"
            className="p-1 hover:text-white transition-colors cursor-pointer text-slate-400"
            title="Copy email"
          >
            {copiedType === 'email' ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Contact */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 hover:border-indigo-500/40 transition-colors shadow-sm">
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <a 
            href={`tel:${profile.contact.replace(/\s+/g, '')}`} 
            className="hover:text-white transition-colors"
            title="Call or WhatsApp"
          >
            {profile.contact}
          </a>
          <button
            onClick={() => handleCopy(profile.contact, 'contact', 'Contact number')}
            aria-label="Copy phone"
            className="p-1 hover:text-white transition-colors cursor-pointer text-slate-400"
            title="Copy contact"
          >
            {copiedType === 'contact' ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      {/* 5. Two Primary Buttons (Redirecting to LinkedIn and Notion) */}
      <div className="flex items-center justify-center gap-2.5 w-full max-w-xs mb-3">
        {/* LinkedIn Button */}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#0a66c2] hover:bg-[#084e96] text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <LinkedInIcon className="w-3.5 h-3.5 fill-current" />
          <span>LinkedIn</span>
          <ExternalLink className="w-3 h-3 opacity-80" />
        </a>

        {/* Notion Button */}
        <a
          href={profile.notion}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs shadow-md shadow-white/10 hover:shadow-white/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <NotionIcon className="w-3.5 h-3.5 fill-slate-900" />
          <span>Notion Hub</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
      </div>

      {/* Scroll Down Indicator */}
      <button 
        onClick={scrollToProjects}
        aria-label="Scroll down to view projects"
        className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-[11px] font-medium text-slate-400 hover:text-indigo-300 transition-all cursor-pointer shadow-sm animate-pulse"
      >
        <span>View projects below</span>
        <ChevronDown className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-y-0.5 transition-transform" />
      </button>
    </header>
  );
}
