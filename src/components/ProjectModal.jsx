import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Globe, Tag, Sparkles, Gamepad2 } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    // Close on Escape key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Compact Window Content */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-2xl md:rounded-3xl shadow-2xl shadow-slate-900/20 overflow-hidden z-10 my-auto animate-in zoom-in-95 duration-200">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 backdrop-blur-md transition-all shadow-md cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Thumbnail Image */}
        <div className="relative w-full h-52 sm:h-64 bg-slate-100 overflow-hidden">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-amber-50/20 to-slate-100 p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-900/5 border border-slate-900/10 flex items-center justify-center text-slate-800 mb-2 shadow-sm">
                <Gamepad2 className="w-6 h-6 text-slate-800" />
              </div>
              <span className="text-sm font-semibold text-slate-800">Interactive Game Concept & Mechanics</span>
              <span className="text-xs text-slate-500 mt-1">Full design architecture & details available on Notion</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-amber-800 shadow-md backdrop-blur-sm border border-amber-200/80">
              {project.category}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[calc(85vh-14rem)] overflow-y-auto">
          {/* Title */}
          <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 font-heading">
            {project.title}
          </h2>

          {/* Full Description */}
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Key Features / Highlights */}
          {project.features && project.features.length > 0 && (
            <div className="mb-6 bg-slate-50 border border-slate-200/90 rounded-xl p-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Key Highlights & Capabilities
              </h3>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-700" />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            Close
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold border border-slate-300 transition-colors shadow-xs"
            >
              <GithubIcon className="w-4 h-4 fill-current" />
              <span>Source Code</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-md shadow-slate-900/20 transition-all hover:-translate-y-0.5 border border-slate-800"
            >
              <Globe className="w-4 h-4" />
              <span>{project.linkLabel || 'View Project'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
