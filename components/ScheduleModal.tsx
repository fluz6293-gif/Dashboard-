
import React, { useState } from 'react';
import { Square, CheckSquare, Clock, Truck, Plus, Trash2, MapPin, Hash } from 'lucide-react';

interface ScheduleModalProps {
  onClose: () => void;
}

interface BairroFrete {
  id: string;
  name: string;
  cep: string;
  fee: string;
}

const DAYS = [
  { label: 'DOM', key: 'dom' },
  { label: 'SEG', key: 'seg' },
  { label: 'TER', key: 'ter' },
  { label: 'QUA', key: 'qua' },
  { label: 'QUI', key: 'qui' },
  { label: 'SEX', key: 'sex' },
  { label: 'SÁB', key: 'sab' },
];

const ScheduleModal: React.FC<ScheduleModalProps> = ({ onClose }) => {
  const [closedDays, setClosedDays] = useState<Record<string, boolean>>({});
  const [freteType, setFreteType] = useState<'fixo' | 'customizavel'>('fixo');
  const [bairros, setBairros] = useState<BairroFrete[]>([]);

  const toggleClosed = (day: string) => {
    setClosedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const addBairro = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setBairros([...bairros, { id: newId, name: '', cep: '', fee: '' }]);
  };

  const removeBairro = (id: string) => {
    setBairros(bairros.filter(b => b.id !== id));
  };

  const updateBairro = (id: string, field: keyof BairroFrete, value: string) => {
    setBairros(bairros.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between px-6 py-6 border-b border-slate-50">
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Configurações</h2>
        <button onClick={onClose} className="bg-slate-50 text-slate-500 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">Fechar</button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 pb-24 scrollbar-hide">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Clock size={16} className="text-orange-500" />
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Horário de Funcionamento</h3>
          </div>

          <div className="space-y-3">
            {DAYS.map((day) => (
              <div key={day.key} className="flex items-center gap-4">
                <span className="w-8 text-[11px] font-black text-slate-400">{day.label}</span>
                <div className={`flex-1 flex items-center gap-2 transition-opacity ${closedDays[day.key] ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">DE</span>
                  <input type="text" placeholder="00:00" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-2 py-2 text-center text-xs font-bold text-slate-800 focus:outline-none" />
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">ATÉ</span>
                  <input type="text" placeholder="00:00" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-2 py-2 text-center text-xs font-bold text-slate-800 focus:outline-none" />
                </div>
                <button onClick={() => toggleClosed(day.key)} className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${closedDays[day.key] ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-300'}`}>
                  <span className="text-[9px] font-black uppercase tracking-widest">Fechado</span>
                  {closedDays[day.key] ? <CheckSquare size={14} /> : <Square size={14} />}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <Truck size={16} className="text-orange-500" />
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Entrega</h3>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Configuração de Frete:</span>
            <div className="grid grid-cols-2 gap-3">
              <div onClick={() => setFreteType('fixo')} className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${freteType === 'fixo' ? 'bg-orange-50 border-orange-100 ring-2 ring-orange-500/10' : 'bg-slate-50/50 border-slate-100'}`}>
                <div className={freteType === 'fixo' ? 'text-orange-500' : 'text-slate-300'}>{freteType === 'fixo' ? <CheckSquare size={18} /> : <Square size={18} />}</div>
                <span className={`text-[10px] font-black uppercase tracking-tight ${freteType === 'fixo' ? 'text-orange-700' : 'text-slate-400'}`}>Fixo</span>
              </div>
              <div onClick={() => setFreteType('customizavel')} className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${freteType === 'customizavel' ? 'bg-orange-50 border-orange-100 ring-2 ring-orange-500/10' : 'bg-slate-50/50 border-slate-100'}`}>
                <div className={freteType === 'customizavel' ? 'text-orange-500' : 'text-slate-300'}>{freteType === 'customizavel' ? <CheckSquare size={18} /> : <Square size={18} />}</div>
                <span className={`text-[10px] font-black uppercase tracking-tight ${freteType === 'customizavel' ? 'text-orange-700' : 'text-slate-400'}`}>Customizável</span>
              </div>
            </div>

            {freteType === 'fixo' && (
              <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 animate-in slide-in-from-top-2">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Valor da Taxa Única:</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">R$</span>
                  <input type="text" placeholder="0,00" className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none" />
                </div>
              </div>
            )}

            {freteType === 'customizavel' && (
              <div className="space-y-4 animate-in slide-in-from-top-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Taxas por Bairros:</label>
                  <button onClick={addBairro} className="text-orange-500 hover:text-orange-600 p-1 bg-orange-50 rounded-lg transition-colors"><Plus size={16} strokeWidth={3} /></button>
                </div>
                <div className="space-y-3">
                  {bairros.map((bairro) => (
                    <div key={bairro.id} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-3 animate-in zoom-in-95 duration-200">
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <MapPin size={12} className="text-slate-300 shrink-0" />
                            <input type="text" value={bairro.name} onChange={(e) => updateBairro(bairro.id, 'name', e.target.value)} placeholder="Bairro" className="w-full bg-transparent text-[11px] font-black text-slate-800 placeholder:text-slate-300 focus:outline-none" />
                          </div>
                          <div className="flex items-center gap-2 border-l border-slate-50 pl-2">
                            <Hash size={12} className="text-slate-300 shrink-0" />
                            <input type="text" value={bairro.cep} onChange={(e) => updateBairro(bairro.id, 'cep', e.target.value)} placeholder="CEP" className="w-full bg-transparent text-[11px] font-black text-slate-800 placeholder:text-slate-300 focus:outline-none" />
                          </div>
                        </div>
                        <div className="relative pt-1 border-t border-slate-50">
                          <span className="absolute left-0 top-[calc(50%+2px)] -translate-y-1/2 text-[10px] font-bold text-slate-300">R$</span>
                          <input type="text" value={bairro.fee} onChange={(e) => updateBairro(bairro.id, 'fee', e.target.value)} placeholder="0,00" className="w-full bg-transparent pl-6 text-xs font-bold text-slate-800 focus:outline-none" />
                        </div>
                      </div>
                      <button onClick={() => removeBairro(bairro.id)} className="text-slate-200 hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  {bairros.length === 0 && (
                    <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum bairro adicionado</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <button className="w-full bg-slate-900 text-white py-4 rounded-3xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 active:scale-95 transition-all mt-6">Salvar Configurações</button>
      </div>
    </div>
  );
};

export default ScheduleModal;
