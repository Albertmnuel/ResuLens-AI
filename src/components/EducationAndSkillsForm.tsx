import React, { useState } from 'react';
import { useResumeStore } from './useResumeStore';
import { generateSummaryWithGemini } from '../lib/gemini';
import { Sparkles, Loader2, Plus, X, Trash2 } from 'lucide-react';

const NIGERIAN_UNIVERSITIES = [
  'Mountain Top University (MTU)',
  'University of Lagos (UNILAG)',
  'Covenant University',
  'University of Ibadan (UI)',
  'University of Nigeria, Nsukka (UNN)',
  'Obafemi Awolowo University (OAU)',
  'Babcock University',
  'Ahmadu Bello University (ABU)',
  'Federal University of Technology, Akure (FUTA)',
  'Lagos State University (LASU)',
  'University of Benin (UNIBEN)',
  'Pan-Atlantic University',
  'Bells University of Technology',
  'Afe Babalola University (ABUAD)',
  'Redeemer\'s University',
  'Lead City University',
  'Other'
];

export default function EducationAndSkillsForm() {
  const resume = useResumeStore((state) => state.resume);
  const updateSummary = useResumeStore((state) => state.updateSummary);
  const setSkills = useResumeStore((state) => state.setSkills);
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);

  const [skillInput, setSkillInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle adding skills
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

      {/* Education Block with University Dropdown */}
      <div className="space-y-4 border-t border-gray-100 pt-5">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-700">Education</label>
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium bg-indigo-50 px-2.5 py-1.5 rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Education</span>
          </button>
        </div>

        <div className="space-y-4">
          {resume.education?.map((edu, index) => (
            <div key={edu.id || index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 relative">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Education #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* University Dropdown */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">University / Institution</label>
                <select
                  value={edu.institution || ''}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none bg-white transition"
                >
                  <option value="">Select your university...</option>
                  {NIGERIAN_UNIVERSITIES.map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              {/* Degree / Course Input */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Degree & Course of Study</label>
                <input
                  type="text"
                  value={edu.degree || ''}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="e.g. B.Sc. Computer Science"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none bg-white transition"
                />
              </div>
            </div>
          ))}

          {(!resume.education || resume.education.length === 0) && (
            <p className="text-xs text-gray-400 italic">No education added yet. Click 'Add Education' to start.</p>
          )}
        </div>
      </div>
    </div>
  );
}