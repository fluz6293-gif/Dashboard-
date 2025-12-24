
import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-3.5 mx-6 mt-6">
      <div className="bg-white p-4 rounded-[1.75rem] border border-slate-50 shadow-sm relative overflow-hidden group">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Pedidos</span>
          <div className="flex items-center gap-1 bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded-md text-[8px] font-bold border border-slate-100">
            <TrendingUp size={9} />
            0%
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-black text-slate-900 tracking-tighter">0</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-[1.75rem] border border-slate-50 shadow-sm relative overflow-hidden group">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Receita</span>
          <ArrowUpRight size={14} className="text-slate-200" />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-400 mb-0.5">R$</span>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">0,00</span>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
