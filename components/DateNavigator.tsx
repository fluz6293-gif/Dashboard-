
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DateNavigator: React.FC = () => {
  return (
    <div className="flex justify-center mt-6">
      <div className="bg-slate-50 flex items-center gap-4 px-3 py-2 rounded-full border border-slate-100 shadow-sm">
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <ChevronLeft size={18} />
        </button>
        <span className="text-xs font-bold text-slate-800 uppercase tracking-widest px-2">Hoje</span>
        <button className="text-slate-200 cursor-not-allowed">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default DateNavigator;
