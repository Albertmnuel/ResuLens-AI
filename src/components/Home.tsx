import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, ArrowRight, CheckCircle2, Zap, ShieldCheck, Star, Code, Globe, MessageSquare } from 'lucide-react';
import FeedbackSection from './FeedbackSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
            ResuLensAI
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/builder"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition cursor-pointer"
          >
            Launch App
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 max-w-7xl w-full mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center justify-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6 tracking-wide uppercase">
          <Zap className="w-3.5 h-3.5" /> Next-Gen AI Resume Generation
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl text-white leading-[1.1]">
          Build a job-winning resume in <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">seconds</span>, not hours.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Leverage intelligent layout structures and real-time formatting previews designed to bypass applicant tracking systems (ATS) and land interviews faster.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link
            to="/builder"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-xl shadow-indigo-600/25 transition cursor-pointer group"
          >
            <span>Start Building Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl border border-slate-800 transition cursor-pointer"
          >
            Explore Features
          </a>
        </div>

        {/* Product Preview Mockup Window */}
        <div className="mt-16 w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-xs text-slate-500 font-mono">localhost:5173/builder</div>
            <div className="w-12" />
          </div>
          <div className="p-8 md:p-12 text-center bg-slate-950/40 rounded-xl flex flex-col items-center justify-center min-h-[320px]">
            <FileText className="w-16 h-16 text-indigo-500/40 mb-4 animate-pulse" />
            <h3 className="text-lg font-semibold text-slate-200">Live Single-Page Formatting Engine</h3>
            <p className="text-sm text-slate-500 max-w-md mt-1">
              Your edits update dynamically on an exact-fit paper layout with clean PDF export controls.
            </p>
          </div>
        </div>

      </section>

      {/* Social Proof / Testimonials Section */}
      <section className="border-t border-slate-800/60 py-20 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-sm font-semibold text-indigo-400 tracking-wider uppercase">Trusted by developers & students</h2>
            <p className="text-2xl font-bold text-white mt-1">Loved by job seekers worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                "The AI enhance button transformed my basic bullet points into powerful statements. Secured an interview within a week of updating my resume!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 text-xs">
                  JD
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">James D.</h4>
                  <p className="text-xs text-slate-500">Frontend Developer</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                "Cleanest layout engine I've used. The print preview actually locks everything onto a single page cleanly without awkward text overflows."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 text-xs">
                  SA
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Sarah A.</h4>
                  <p className="text-xs text-slate-500">Software Engineering Student</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                "Super fast and zero clutter. I built my entire application portfolio resume in under ten minutes. Absolute game changer."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 text-xs">
                  MK
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Michael K.</h4>
                  <p className="text-xs text-slate-500">Full Stack Intern</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="border-t border-slate-800/60 bg-slate-900/20 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Everything you need to stand out
            </h2>
            <p className="text-slate-400 mt-2 text-sm md:text-base">
              Engineered for speed, structure, and professional presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Live Preview</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Watch your profile data map automatically into a beautifully structured resume layout without manual formatting headaches.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">ATS-Friendly Layouts</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Constructed with clean structural tags that automated parsing software can read smoothly without losing critical text data.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">One-Click PDF Export</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Cleanly isolates your document and locks it directly onto a single, perfectly formatted sheet ready to download.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section Added Here */}
      <section className="py-12 bg-slate-950 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6">
          <FeedbackSection />
        </div>
      </section>

      {/* Expanded Multi-Column Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                ResuLensAI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering modern professionals and students to craft immaculate, interview-ready resumes in seconds.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/builder" className="hover:text-white transition">Resume Builder</Link></li>
              <li><a href="#features" className="hover:text-white transition">AI Enhancement</a></li>
              <li><a href="#features" className="hover:text-white transition">ATS Templates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><span className="hover:text-white transition cursor-pointer">Career Blog</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Resume Guide</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Interview Tips</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition">
                <Code className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

       <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResuLensAI. All rights reserved. • Created by <span className="text-indigo-400 font-semibold">Albertdev.tech</span></p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>

    </div>
  );
}