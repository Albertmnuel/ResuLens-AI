import React from 'react';
import { Logo } from './Logo';
import { useResumeStore } from './useResumeStore';
import { RotateCcw, Download, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { resetResume, activeTemplate, setTemplate } = useResumeStore();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3.5 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-8">
        <Logo />
        <div className="hidden md:flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200/60 text-xs font-medium">
          <span className="text-gray-400 px-2">Template:</span>
          {(['modern', 'minimal', 'classic'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTemplate(t)}
              className={`px-3 py-1.5 rounded-md capitalize transition-all ${
                activeTemplate === t
                  ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium border border-emerald-200/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gemini AI Connected</span>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Reset all resume data?')) resetResume();
          }}
          className="flex items-center gap-1.5 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
          title="Reset Form"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </header>
  );
};