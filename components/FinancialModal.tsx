
import React, { useState, useMemo } from 'react';
import { TrendingUp, BarChart3, ChevronDown, CalendarDays } from 'lucide-react';

interface FinancialModalProps {
  onClose: () => void;
}

const FinancialModal: React.FC<FinancialModalProps> = ({ onClose }) => {
  const [viewType, setViewType] = useState<'MES' | 'ANO'>('MES');
  const [selectedMonth, setSelectedMonth] = useState('Janeiro');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [showSelector, setShowSelector] = useState(false);

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const years = ['2023', '2024', '2025'];

  const currentData = useMemo(() => {
    const count = viewType === 'MES' ? 30 : 12;
    // Empty charts
    const revenue = Array.from({ length: count }, () => 0);
    const orders = Array.from({ length: count }, () => 0);

    return { revenue, orders, totalRevenue: 0, totalOrders: 0 };
  }, [viewType]);

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between px-6 py-6 bg-white border-b border-slate-50 sticky top-0 z-10">
        <div className="flex flex-col cursor-pointer group" onClick={() => setShowSelector(!showSelector)}>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selecione Período</span>
          <div className="flex items-center gap-2 mt-1">
            <h2 className="text-xl font-black text-slate-900 uppercase">
              {viewType === 'MES' ? `${selectedMonth} ${selectedYear}` : selectedYear}
            </h2>
            <ChevronDown size={18} className={`text-orange-500 transition-transform duration-300 ${showSelector ? 'rotate-180' : ''}`} />
          </div>
        </div>
        <button onClick={onClose} className="bg-slate-50 text-slate-500 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">
          Fechar
        </button>
      </div>

      {showSelector && (
        <div className="absolute top-24 left-0 right-0 bg-white/95 backdrop-blur-md z-20 p-6 border-b border-slate-100 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="max-h-60 overflow-y-auto">
            <div className="grid grid-cols-3 gap-2">
              {(viewType === 'MES' ? months : years).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (viewType === 'MES') setSelectedMonth(item);
                    else setSelectedYear(item);
                    setShowSelector(false);
                  }}
                  className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    (viewType === 'MES' ? selectedMonth : selectedYear) === item ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-6 py-6">
          <div className="bg-slate-50 p-1 rounded-2xl flex gap-1 border border-slate-100">
            <button onClick={() => { setViewType('MES'); setShowSelector(false); }} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewType === 'MES' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400'}`}>Visão Mensal</button>
            <button onClick={() => { setViewType('ANO'); setShowSelector(false); }} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewType === 'ANO' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400'}`}>Visão Anual</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-6 mb-10">
          <div className="bg-white border border-slate-100 p-5 rounded-[2.5rem] shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receita</span>
              <div className="w-8 h-8 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center">
                <TrendingUp size={14} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 mb-0.5">R$</span>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">0,00</span>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-5 rounded-[2.5rem] shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pedidos</span>
              <div className="w-8 h-8 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center">
                <CalendarDays size={14} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 mb-0.5">QTD</span>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">0</span>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-10">
          <div>
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Gráfico Receita</h3>
            </div>
            <div className="bg-slate-50/50 rounded-[2rem] p-6 border border-slate-50 flex items-center justify-center h-32">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Sem dados no período</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialModal;
