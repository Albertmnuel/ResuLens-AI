import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  gradYear: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    portfolioUrl: string;
    githubUrl: string;
    linkedinUrl: string;
  };
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}

interface ResumeStore {
  resume: ResumeData;
  activeTemplate: 'modern' | 'minimal' | 'classic';
  isAiLoading: boolean;

  updatePersonalInfo: (field: keyof ResumeData['personalInfo'], value: string) => void;
  updateSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: keyof WorkExperience, value: any) => void;
  removeExperience: (id: string) => void;
  updateBullets: (expId: string, bullets: string[]) => void;
  
  // Education & Skills Actions
  addEducation: () => void;
  updateEducation: (id: string, field: keyof Education, value: string) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  setSkills: (skills: string[]) => void;

  setTemplate: (template: 'modern' | 'minimal' | 'classic') => void;
  setAiLoading: (loading: boolean) => void;
  resetResume: () => void;
}

const initialResumeState: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    portfolioUrl: '',
    githubUrl: '',
    linkedinUrl: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialResumeState,
      activeTemplate: 'modern',
      isAiLoading: false,

      updatePersonalInfo: (field, value) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, [field]: value },
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          resume: { ...state.resume, summary },
        })),

      addExperience: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [
              ...state.resume.experience,
              {
                id: crypto.randomUUID(),
                company: '',
                role: '',
                startDate: '',
                endDate: '',
                bullets: [''],
              },
            ],
          },
        })),

      updateExperience: (id, field, value) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((exp) =>
              exp.id === id ? { ...exp, [field]: value } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((exp) => exp.id !== id),
          },
        })),

      updateBullets: (expId, bullets) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((exp) =>
              exp.id === expId ? { ...exp, bullets } : exp
            ),
          },
        })),

      addEducation: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [
              ...state.resume.education,
              { id: crypto.randomUUID(), institution: '', degree: '', gradYear: '' },
            ],
          },
        })),

      updateEducation: (id, field, value) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((edu) =>
              edu.id === id ? { ...edu, [field]: value } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((edu) => edu.id !== id),
          },
        })),

      addSkill: (skill) =>
        set((state) => {
          const trimmed = skill.trim();
          if (!trimmed || state.resume.skills.includes(trimmed)) return state;
          return {
            resume: {
              ...state.resume,
              skills: [...state.resume.skills, trimmed],
            },
          };
        }),

      removeSkill: (skillToRemove) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.filter((s) => s !== skillToRemove),
          },
        })),

      setSkills: (skills) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills,
          },
        })),

      setTemplate: (activeTemplate) => set({ activeTemplate }),
      setAiLoading: (isAiLoading) => set({ isAiLoading }),
      resetResume: () => set({ resume: initialResumeState }),
    }),
    {
      name: 'ai-resume-builder-storage',
    }
  )
);