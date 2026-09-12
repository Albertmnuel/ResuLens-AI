import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { Navbar } from './components/Navbar';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';

// Your existing builder screen wrapped as a component
function ResumeBuilderApp() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 antialiased selection:bg-indigo-500 selection:text-white">
      <div className="print:hidden">
        <Navbar />
      </div>
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <section className="lg:col-span-6 bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden print:hidden">
          <ResumeEditor />
        </section>
        
        <section className="lg:col-span-6 lg:sticky top-24 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden w-full">
          <ResumePreview />
        </section>
      </main>
    </div>
  );
}

// Main App Router
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<ResumeBuilderApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;