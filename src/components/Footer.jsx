import React from 'react';

export default function Footer({ profile }) {
  return (
    <footer className="relative mt-12 border-t border-slate-200/90 bg-white/70 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 text-center sm:text-left">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p className="flex items-center justify-center gap-1">
          Designed & Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
