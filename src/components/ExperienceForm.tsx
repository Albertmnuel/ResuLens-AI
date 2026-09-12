import React, { useState } from 'react';
import { useResumeStore } from './useResumeStore';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';

export default function ExperienceForm() {
  const experience = useResumeStore((state) => state.resume.experience);
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);
  const updateBullets = useResumeStore((state) => state.updateBullets);

  // Track loading state per bullet index (e.g., "expId-bIndex")
  const [enhancingKey, setEnhancingKey] = useState<string | null>(null);

  const handleEnhance = async (expId: string, bIndex: number, currentText: string) => {
    const key = `${expId}-${bIndex}`;
    setEnhancingKey(key);

    // Simulate smart AI enhancement delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    let enhancedText = currentText.trim();
    const upperText = enhancedText.toUpperCase();

    // Smart contextual rules based on what you typed
    if (upperText.includes('HTML') || upperText.includes('REACT') || upperText.includes('JAVASCRIPT')) {
      enhancedText = `Engineered and maintained high-performance web applications using Modern JavaScript, React, HTML, and CSS, boosting user engagement and client retention.`;
    } else if (upperText.includes('FRONTEND') || upperText.includes('UI')) {
      enhancedText = `Designed and implemented responsive, accessible user interfaces utilizing clean component structures and modern styling frameworks.`;
    } else if (enhancedText.length < 5) {
      enhancedText = `Spearheaded key development initiatives, writing clean, scalable code and collaborating effectively with cross-functional team members.`;
    } else {
      // General professional upgrade for any other raw notes
      enhancedText = `Successfully delivered ${enhancedText.toLowerCase()}, optimizing overall workflow efficiency and ensuring robust application standards.`;
    }

    const exp = experience.find((e) => e.id === expId);
    if (exp) {
      const updated = [...exp.bullets];
      updated[bIndex] = enhancedText;
      updateBullets(expId, updated);
    }

    setEnhancingKey(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Work Experience</h2>
        <button
          onClick={addExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-sm text-gray-500">No work experience added yet.</p>
          <button
            onClick={addExperience}
            className="mt-2 text-xs text-indigo-600 font-medium hover:underline"
          >
            + Add your first experience
          </button>
        </div>
      ) : (
        experience.map((exp, index) => (
          <div key={exp.id} className="p-4 border border-gray-200 rounded-xl space-y-4 bg-gray-50/30">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Position #{index + 1}
              </span>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-gray-400 hover:text-red-500 transition"
                title="Remove Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Role / Job Title</label>
                <input
                  type="text"
                  placeholder="Frontend Engineer"
                  value={exp.role}
                  onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                <input
                  type="text"
                  placeholder="Jan 2023"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                <input
                  type="text"
                  placeholder="Present"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-medium text-gray-600">Key Achievements / Bullets</label>
                <button
                  type="button"
                  onClick={() => updateBullets(exp.id, [...exp.bullets, ''])}
                  className="text-xs text-indigo-600 hover:underline font-medium"
                >
                  + Add Bullet
                </button>
              </div>

              {exp.bullets.map((bullet, bIndex) => {
                const isEnhancing = enhancingKey === `${exp.id}-${bIndex}`;
                return (
                  <div key={bIndex} className="flex gap-2 items-start">
                    <textarea
                      rows={2}
                      placeholder="Built responsive user interfaces using React and Tailwind..."
                      value={bullet}
                      onChange={(e) => {
                        const updated = [...exp.bullets];
                        updated[bIndex] = e.target.value;
                        updateBullets(exp.id, updated);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />

                    <button
                      type="button"
                      onClick={() => handleEnhance(exp.id, bIndex, bullet)}
                      disabled={isEnhancing}
                      className="flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm shrink-0 disabled:opacity-50 cursor-pointer"
                      title="Enhance with AI"
                    >
                      {isEnhancing ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                      <span className="hidden sm:inline">
                        {isEnhancing ? 'Enhancing...' : 'Enhance'}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}