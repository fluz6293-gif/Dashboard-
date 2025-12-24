
import React from 'react';
import { User, Store, Mail, Phone, MapPin, Briefcase, Lock } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const logoPreview = null;

  const InputField = ({ icon: Icon, label, placeholder, type = "text", value = "" }: any) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <Icon size={12} />
        {label}
      </label>
      <input 
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        readOnly
        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-xs font-bold text-slate-500 focus:outline-none cursor-not-allowed transition-all"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between px-6 py-6 border-b border-slate-50 sticky top-0 bg-white z-10">
        <div className="flex flex-col">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Meu Perfil</h2>
          <span className="text-[8px] font-bold text-orange-500 uppercase tracking-[0.2em] flex items-center gap-1">
            <Lock size={8} /> Apenas Visualização
          </span>
        </div>
        <button onClick={onClose} className="bg-slate-50 text-slate-500 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">Fechar</button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 pb-12 scrollbar-hide">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-[2rem] bg-slate-50 border-2 border-slate-100 flex items-center justify-center overflow-hidden">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="w-full h-full object-cover grayscale-[0.5]" />
              ) : (
                <Store size={32} className="text-slate-200" />
              )}
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Logo do Comércio</h3>
          </div>
        </div>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <User size={16} />
            </div>
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Informações Pessoais</h3>
          </div>
          <div className="grid gap-4">
            <InputField label="Nome Completo" placeholder="Não informado" icon={User} />
            <InputField label="Email Pessoal" placeholder="Não informado" icon={Mail} type="email" />
          </div>
        </section>

        <section className="space-y-6 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <Store size={16} />
            </div>
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Informações do Comércio</h3>
          </div>
          <div className="grid gap-4">
            <InputField label="Nome do Comércio" placeholder="Não informado" icon={Store} />
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Briefcase size={12} />
                Segmento
              </label>
              <select disabled className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-xs font-bold text-slate-500 appearance-none cursor-not-allowed">
                <option>Selecione...</option>
              </select>
            </div>
            <InputField label="WhatsApp" placeholder="Não informado" icon={Phone} />
            <InputField label="Email do Comércio" placeholder="Não informado" icon={Mail} type="email" />
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={12} />
                Endereço do Comércio
              </label>
              <textarea placeholder="Endereço não cadastrado" readOnly rows={3} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-xs font-bold text-slate-500 focus:outline-none transition-all resize-none cursor-not-allowed" />
            </div>
          </div>
        </section>

        <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 text-center leading-relaxed">
            As alterações de perfil estão desabilitadas. <br/>
            Entre em contato com o suporte para atualizar seus dados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
