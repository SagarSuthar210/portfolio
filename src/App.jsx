import React, { useState } from 'react';
import HeaderProfile from './components/HeaderProfile';
import ProjectGrid from './components/ProjectGrid';
import ProjectModal from './components/ProjectModal';
import TaskAssignModal from './components/TaskAssignModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { profileData, projectCategories, projectsData } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 relative overflow-x-hidden">
      {/* Background subtle pattern & gradient highlights */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-60 -z-10" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-100/60 via-purple-50/40 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* Top Middle Section: Profile Image, Name, Email, Contact, LinkedIn & Notion buttons */}
        <HeaderProfile 
          profile={profileData} 
          onCopyToast={showToast}
          onOpenTaskModal={() => setTaskModalOpen(true)}
        />

        {/* Projects Section: 3-Tile Row Grid */}
        <ProjectGrid
          projects={projectsData}
          categories={projectCategories}
          onSelectProject={(project) => setSelectedProject(project)}
        />
      </main>

      {/* Footer */}
      <Footer profile={profileData} />

      {/* Compact Project Details Modal within Web Page */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Task Assignment & Razorpay Payment Modal */}
      <TaskAssignModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onToast={showToast}
      />

      {/* Floating Feedback Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}
