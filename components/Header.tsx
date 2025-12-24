
import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white sticky top-0 z-10">
      <div className="relative">
        <img 
          src="https://picsum.photos/seed/user/40/40" 
          alt="Profile" 
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      </div>
      
      <div className="flex items-center gap-1">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Pede <span className="text-orange-500">Aí</span>
        </h1>
      </div>

      <button 
        onClick={onOpenSettings}
        className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors active:scale-90"
      >
        <Settings size={22} strokeWidth={2.5} />
      </button>
    </header>
  );
};

export default Header;
