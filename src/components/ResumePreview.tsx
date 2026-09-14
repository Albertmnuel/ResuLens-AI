import React, { useRef, useState } from 'react';
import { useResumeStore } from './useResumeStore';
import { Download, Loader2 } from 'lucide-react';

export default function ResumePreview() {
  const resume = useResumeStore((state) => state.resume);
  const { personalInfo, summary, experience, education, skills } = resume;
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = () => {
    setIsGenerating(true);
    try {
      // Triggers the browser's native Print-to-PDF dialog
      window.print();
    } catch (error) {
      console.error('Print error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="resume-preview" className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm p-8 min-h-[700px] text-gray-800 flex flex-col justify-between relative">
      <div>
        {/* Header Bar - Hidden when printing via CSS if desired, or kept clean */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6 print:hidden">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Live Preview
          </span>

          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Preparing PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>

        {/* Header / Personal Info */}
        <div className="text-center border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-gray-600 mt-2">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.githubUrl && <span>• {personalInfo.githubUrl}</span>}
            {personalInfo.linkedinUrl && <span>• {personalInfo.linkedinUrl}</span>}
          </div>
        </div>

        {/* Professional Summary */}
        {summary && (
          <div className="space-y-1 mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 border-b border-indigo-100 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <div className="space-y-3 mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 border-b border-indigo-100 pb-1">
              Work Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-gray-800">
                      {exp.role || 'Role Title'}{' '}
                      {exp.company && (
                        <span className="font-normal text-gray-600">at {exp.company}</span>
                      )}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}
                    </span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-gray-600 space-y-1 pl-1">
                      {exp.bullets.map(
                        (b, i) => b.trim() && <li key={i}>{b}</li>
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="space-y-2 mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 border-b border-indigo-100 pb-1">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {edu.institution || 'University'}
                    </p>
                    <p className="text-xs text-gray-600">{edu.degree}</p>
                  </div>
                  <span className="text-xs text-gray-500">{edu.gradYear}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 border-b border-indigo-100 pb-1">
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-medium rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}