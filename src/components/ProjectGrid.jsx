import React, { useState, useMemo } from 'react';
import { Layers, ArrowUpRight, Search, Gamepad2 } from 'lucide-react';

export default function ProjectGrid({ projects, categories, onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = 
        activeCategory === "All" || project.category === activeCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-12">
      {/* Section Header & Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 border-b border-slate-200/90 pb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-900" />
            <span>Featured Projects</span>
            <span className="text-xs font-normal text-slate-500">({filteredProjects.length})</span>
          </h2>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-800 shadow-xs transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      {categories && categories.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeCategory === cat
                  ? "bg-slate-900 text-white shadow-sm shadow-slate-900/20 font-semibold border border-slate-900"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-xs"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* 3 Tiles in a Single Row Horizontally (Compact 3-Column Grid) */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-10 px-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-slate-500 text-xs">No projects matched your criteria.</p>
          <button
            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
            className="mt-2.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200/80"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
              className="group text-left cursor-pointer flex flex-col h-full rounded-2xl bg-white border border-slate-200/90 hover:border-slate-400/90 hover:bg-white transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-slate-900/8 overflow-hidden relative"
            >
              {/* Compact Thumbnail Container */}
              <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-slate-100">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-amber-50/20 to-slate-100 p-4 text-center">
                    <div className="w-9 h-9 rounded-xl bg-slate-900/5 border border-slate-900/10 flex items-center justify-center text-slate-800 mb-1.5 group-hover:scale-110 transition-transform">
                      <Gamepad2 className="w-4 h-4 text-slate-800" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800">Concept & Mechanics</span>
                    <span className="text-[10px] text-slate-500">Documented on Notion</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity" />
                
                {/* Category Pill Over Thumbnail */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/95 backdrop-blur-md text-amber-800 border border-amber-200/80 shadow-xs">
                    {project.category}
                  </span>
                </div>

                {/* Hover Click Indicator */}
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="p-1 rounded bg-slate-900 text-white flex items-center justify-center shadow-md">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Tile Content (Name & Description) */}
              <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1 mb-1 font-heading">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-3">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Tags & CTA Prompt */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/80"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] font-medium px-1 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200/80">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Details prompt */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-900 group-hover:text-amber-700">
                    <span>View Details</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
