
import React from 'react';
import { LayoutGrid, Landmark, Clock } from 'lucide-react';

interface BottomNavProps {
  onOpenProducts: () => void;
  onOpenFinancial: () => void;
  onOpenSchedule: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onOpenProducts, onOpenFinancial, onOpenSchedule }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-8 py-2.5 flex justify-between items-center z-20">
      <button 
        onClick={onOpenProducts}
        className="flex flex-col items-center gap-1 text-slate-400 hover:text-orange-500 transition-colors group"
      >
        <LayoutGrid size={20} strokeWidth={2.5} />
        <span className="text-[8px] font-bold uppercase tracking-widest">Produtos</span>
      </button>
      
      <button 
        onClick={onOpenFinancial}
        className="flex flex-col items-center gap-1 text-slate-400 hover:text-orange-500 transition-colors group"
      >
        <Landmark size={20} strokeWidth={2.5} />
        <span className="text-[8px] font-bold uppercase tracking-widest">Financeiro</span>
      </button>

      <button 
        onClick={onOpenSchedule}
        className="flex flex-col items-center gap-1 text-slate-400 hover:text-orange-500 transition-colors group"
      >
        <Clock size={20} strokeWidth={2.5} />
        <span className="text-[8px] font-bold uppercase tracking-widest">Horário</span>
      </button>
    </nav>
  );
};

export default BottomNav;
