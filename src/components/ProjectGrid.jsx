import React, { useState, useMemo } from 'react';
import { Layers, ArrowUpRight, Search } from 'lucide-react';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white font-heading flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
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
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
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
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-semibold"
                  : "bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* 3 Tiles in a Single Row Horizontally (Compact 3-Column Grid) */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-10 px-4 rounded-2xl bg-slate-900/30 border border-slate-800">
          <p className="text-slate-400 text-xs">No projects matched your criteria.</p>
          <button
            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
            className="mt-2.5 px-3 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 text-xs font-medium hover:bg-indigo-600/30 transition-colors cursor-pointer"
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
              className="group text-left cursor-pointer flex flex-col h-full rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 overflow-hidden relative"
            >
              {/* Compact Thumbnail Container */}
              <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-slate-950">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Category Pill Over Thumbnail */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-950/85 backdrop-blur-md text-indigo-300 border border-indigo-500/20 shadow-sm">
                    {project.category}
                  </span>
                </div>

                {/* Hover Click Indicator */}
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="p-1 rounded bg-indigo-600 text-white flex items-center justify-center shadow-md">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Tile Content (Name & Description) */}
              <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 mb-1 font-heading">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Tags & CTA Prompt */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] font-medium px-1 py-0.5 rounded bg-slate-800/60 text-slate-400">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Details prompt */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-indigo-400 group-hover:text-indigo-300">
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
