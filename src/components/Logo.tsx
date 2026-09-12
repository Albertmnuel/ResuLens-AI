import React from 'react';
import { Sparkles } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2.5 cursor-pointer">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white">
        <Sparkles className="w-5 h-5 animate-pulse" />
      </div>
      <div>
        <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          ResuLens AI
        </span>
        <span className="block text-[10px] font-semibold text-gray-400 tracking-wider uppercase -mt-1">
          Smart Resume Builder
        </span>
      </div>
    </div>
  );
};