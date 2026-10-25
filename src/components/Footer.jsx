import React from 'react';
import { Mail, ArrowRight, Heart } from 'lucide-react';

export default function Footer({ profile }) {
  return (
    <footer className="relative mt-20 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Call to action card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-purple-950/60 border border-indigo-500/20 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 font-heading">
            Have a project in mind?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Let's collaborate and turn your vision into a scalable, high-converting digital product.
          </p>
          <a
            href={`mailto:${profile.email}?subject=Project%20Inquiry%20via%20Portfolio`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm shadow-xl hover:bg-slate-100 transition-all duration-200 hover:scale-105"
          >
            <Mail className="w-4 h-4" />
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1">
            Engineered with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
