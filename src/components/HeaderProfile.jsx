import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  ExternalLink
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

  return (
    <header className="relative pt-14 pb-14 px-4 max-w-4xl mx-auto text-center flex flex-col items-center">
      {/* Ambient background glow behind profile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Availability Status Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6 shadow-sm shadow-emerald-500/5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        {profile.availabilityBadge}
      </div>

      {/* 1. Profile Image (Top Middle) */}
      <div className="relative group mb-5">
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-xl shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
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
      </div>

      {/* 2. Name & Title (Below Profile Image) */}
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-heading">
        {profile.name}
      </h1>
      <p className="text-base md:text-lg text-indigo-300/90 font-medium max-w-xl mb-3">
        {profile.role}
      </p>
      <p className="text-sm md:text-base text-slate-400 max-w-lg mb-6 leading-relaxed">
        {profile.tagline}
      </p>

      {/* 3. Email (Below Name) */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <a 
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all text-sm font-medium shadow-sm"
          title="Send email"
        >
          <Mail className="w-4 h-4 text-indigo-400" />
          <span>{profile.email}</span>
        </a>
        <button
          onClick={() => handleCopy(profile.email, 'email', 'Email')}
          aria-label="Copy email to clipboard"
          className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all cursor-pointer"
          title="Copy email"
        >
          {copiedType === 'email' ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 4. Contact / Phone (Below Email) */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <a 
          href={`tel:${profile.contact.replace(/\s+/g, '')}`}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all text-sm font-medium shadow-sm"
          title="Call or WhatsApp"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
          <span>{profile.contact}</span>
        </a>
        <button
          onClick={() => handleCopy(profile.contact, 'contact', 'Contact number')}
          aria-label="Copy phone number"
          className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all cursor-pointer"
          title="Copy contact"
        >
          {copiedType === 'contact' ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 5. Two Primary Buttons (Redirecting to LinkedIn and Notion) */}
      <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md">
        {/* LinkedIn Button */}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0a66c2] hover:bg-[#084e96] text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
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
          className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm shadow-lg shadow-white/10 hover:shadow-white/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <NotionIcon className="w-4 h-4 fill-slate-900" />
          <span>Notion Portfolio</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      {/* Quick stats highlight strip */}
      {profile.stats && profile.stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-12 w-full pt-8 border-t border-slate-800/80">
          {profile.stats.map((stat, i) => (
            <div 
              key={i} 
              className="px-4 py-3 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm text-center"
            >
              <div className="text-xl md:text-2xl font-bold text-white font-heading">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
