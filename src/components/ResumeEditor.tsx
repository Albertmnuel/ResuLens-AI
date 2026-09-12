import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationAndSkillsForm from './EducationAndSkillsForm';
import { User, Briefcase, GraduationCap } from 'lucide-react';

export default function ResumeEditor() {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education'>('personal');

  return (
    <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="flex border-b border-gray-200 bg-gray-50/50 p-1">
        <button
          onClick={() => setActiveTab('personal')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'personal'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Personal</span>
        </button>

        <button
          onClick={() => setActiveTab('experience')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'experience'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Experience</span>
        </button>

        <button
          onClick={() => setActiveTab('education')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'education'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Education & Skills</span>
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'personal' && <PersonalInfoForm />}
        {activeTab === 'experience' && <ExperienceForm />}
        {activeTab === 'education' && <EducationAndSkillsForm />}
      </div>
    </div>
  );
}