
import React, { useState } from 'react';
import { ExternalLink, Copy, Check } from 'lucide-react';

const StoreLinkCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const storeUrl = "loja-exemplo";

  const handleCopy = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-6 mt-4">
      <div className="bg-[#121622] rounded-3xl p-5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="bg-slate-700/50 p-2.5 rounded-xl">
            <ExternalLink className="text-slate-300" size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sua Loja</span>
            <span className="text-white font-semibold text-lg">{storeUrl}</span>
          </div>
        </div>
        
        <button 
          onClick={handleCopy}
          className="bg-slate-700/40 hover:bg-slate-700/60 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all active:scale-95"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          <span className="text-xs font-bold uppercase tracking-wider">{copied ? 'Copiado' : 'Copiar'}</span>
        </button>
      </div>
    </div>
  );
};

export default StoreLinkCard;
