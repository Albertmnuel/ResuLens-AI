import React, { useState } from 'react';
import { useResumeStore } from './useResumeStore';
import { generateSummaryWithGemini } from '../lib/gemini';
import { Sparkles, Loader2, Plus, X } from 'lucide-react';

export default function EducationAndSkillsForm() {
  const resume = useResumeStore((state) => state.resume);
  const updateSummary = useResumeStore((state) => state.updateSummary);
  const setSkills = useResumeStore((state) => state.setSkills);
  const addEducation = useResumeStore((state) => state.addEducation);

  const [skillInput, setSkillInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle adding skills (supports single skills or comma-separated values)
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillInput.trim()) return;

    const newSkills = skillInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !resume.skills.includes(s));

    if (newSkills.length > 0 && typeof setSkills === 'function') {
      setSkills([...resume.skills, ...newSkills]);
      setSkillInput('');
    }
  };

  // Handle removing a skill tag
  const handleRemoveSkill = (skillToRemove: string) => {
    if (typeof setSkills === 'function') {
      setSkills(resume.skills.filter((s) => s !== skillToRemove));
    }
  };

  // Call Gemini API to write summary
  const handleGenerateAISummary = async () => {
    setIsGenerating(true);
    try {
      const generatedSummary = await generateSummaryWithGemini(
        'Software Developer',
        resume.skills
      );
      if (generatedSummary) {
        updateSummary(generatedSummary);
      }
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Professional Summary Block */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-700">
            Professional Summary
          </label>
          <button
            type="button"
            onClick={handleGenerateAISummary}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-50 text-indigo-600 text-xs font-medium rounded-lg transition"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate with AI</span>
              </>
            )}
          </button>
        </div>
        <textarea
          rows={4}
          value={resume.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Write a brief overview or click 'Generate with AI'..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none transition"
        />
      </div>

      {/* Skills Input Block */}
      <div className="space-y-3 border-t border-gray-100 pt-5">
        <label className="text-sm font-semibold text-gray-700">Skills</label>
        <form onSubmit={handleAddSkill} className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="e.g. React, TypeScript, Tailwind CSS"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none transition"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition"
          >
            Add
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-2">
          {resume.skills?.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="hover:text-indigo-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Education Block */}
      <div className="space-y-3 border-t border-gray-100 pt-5">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-700">Education</label>
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Education</span>
          </button>
        </div>
      </div>
    </div>
  );
}