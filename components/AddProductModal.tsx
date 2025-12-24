
import React, { useState, useRef } from 'react';
import { Camera, Upload, CheckSquare, Square, RefreshCcw, ChevronDown, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface AddProductModalProps {
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

type Category = 'Hambúrguer' | 'Pastel' | 'Pizza' | 'Açaí' | 'Bebida' | 'Pratos';

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onAddProduct }) => {
  const [productType, setProductType] = useState<'simples' | 'customizavel'>('simples');
  const [category, setCategory] = useState<Category>('Hambúrguer');
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');

  // Customizable specific states
  const [sabores, setSabores] = useState<string[]>(['']);
  
  // Açaí specific states
  const [complementos, setComplementos] = useState<string[]>(['']);
  const [coberturas, setCoberturas] = useState<string[]>(['']);
  const [frutas, setFrutas] = useState<string[]>(['']);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const categories: Category[] = ['Hambúrguer', 'Pastel', 'Pizza', 'Açaí', 'Bebida', 'Pratos'];

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const updateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!name || !price) {
      alert("Por favor, preencha o nome e o valor.");
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      const newProduct: Product = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        price: parseFloat(price.replace(',', '.')),
        category: category,
        imageUrl: imagePreview || 'https://picsum.photos/seed/new/200'
      };

      onAddProduct(newProduct);
      setIsSaving(false);
      setSaved(true);
      
      setTimeout(() => {
        onClose();
      }, 1000);
    }, 800);
  };

  const renderAdditionSection = (title: string, items: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, placeholder: string = "Ex: Leite Ninho") => (
    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</label>
        <button 
          onClick={() => addItem(setter)}
          className="text-orange-500 hover:text-orange-600 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input 
              type="text" 
              value={item}
              onChange={(e) => updateItem(setter, idx, e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
            {items.length > 1 && (
              <button 
                onClick={() => removeItem(setter, idx)}
                className="text-slate-300 hover:text-red-500 transition-colors p-2"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="p-6 overflow-y-auto scrollbar-hide">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Novo Produto</h2>
            <button 
              onClick={onClose}
              className="bg-slate-50 text-[10px] font-black text-slate-500 px-4 py-2 rounded-xl hover:bg-slate-100 active:scale-95 transition-all tracking-widest uppercase"
            >
              Fechar
            </button>
          </div>

          {saved ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle2 size={40} />
              </div>
              <p className="text-lg font-black text-slate-900 uppercase tracking-tight">Produto Salvo!</p>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              {/* Top Grid: Photo, Name, Weight, Value */}
              <div className="grid grid-cols-2 gap-6 relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-100 -translate-x-1/2 hidden sm:block"></div>

                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Foto: *</label>
                    <div className="flex flex-col gap-2">
                      <div 
                        onClick={handleUploadClick}
                        className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-300 overflow-hidden cursor-pointer hover:border-orange-200 transition-colors group"
                      >
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <Camera size={24} className="group-hover:text-orange-300 transition-colors" />
                        )}
                      </div>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      <button 
                        onClick={handleUploadClick}
                        className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest py-2 rounded-lg flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-transform"
                      >
                        {imagePreview ? <RefreshCcw size={10} /> : <Upload size={10} />}
                        {imagePreview ? 'Alterar' : 'Upload'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Nome: *</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: X-Salada"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Peso:</label>
                    <input 
                      type="text" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="300g"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Valor: *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">R$</span>
                      <input 
                        type="text" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0,00"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-8 pr-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Section */}
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Categoria: *</label>
                <div 
                  onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <span>{category}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${showCategoryMenu ? 'rotate-180' : ''}`} />
                </div>

                {showCategoryMenu && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-10 py-2 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-2 gap-1 px-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setCategory(cat);
                            setShowCategoryMenu(false);
                          }}
                          className={`px-3 py-2.5 text-[10px] font-black uppercase text-left rounded-xl transition-all ${
                            category === cat ? 'bg-orange-500 text-white' : 'text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Conditional Rendering for Açaí or Other Categories */}
              {category === 'Açaí' ? (
                <div className="space-y-6 pt-2">
                  {renderAdditionSection('Adicionar Complementos', complementos, setComplementos)}
                  {renderAdditionSection('Adicionar Coberturas', coberturas, setCoberturas)}
                  {renderAdditionSection('Adicionar Frutas', frutas, setFrutas)}
                </div>
              ) : (
                <>
                  {/* Selection Grid (Simple / Customizable) */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div 
                      onClick={() => setProductType('simples')}
                      className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                        productType === 'simples' ? 'bg-orange-50 border-orange-100' : 'bg-slate-50/50 border-slate-100'
                      }`}
                    >
                      <div className={productType === 'simples' ? 'text-orange-500' : 'text-slate-300'}>
                        {productType === 'simples' ? <CheckSquare size={18} /> : <Square size={18} />}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-tight ${productType === 'simples' ? 'text-orange-700' : 'text-slate-400'}`}>Simples</span>
                    </div>

                    <div 
                      onClick={() => setProductType('customizavel')}
                      className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                        productType === 'customizavel' ? 'bg-orange-50 border-orange-100' : 'bg-slate-50/50 border-slate-100'
                      }`}
                    >
                      <div className={productType === 'customizavel' ? 'text-orange-500' : 'text-slate-300'}>
                        {productType === 'customizavel' ? <CheckSquare size={18} /> : <Square size={18} />}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-tight ${productType === 'customizavel' ? 'text-orange-700' : 'text-slate-400'}`}>Customizável</span>
                    </div>
                  </div>

                  {/* Dynamic flavors section for Customizable */}
                  {productType === 'customizavel' && (
                    <div className="pt-2">
                      {renderAdditionSection('Adicionar Sabores', sabores, setSabores, "Ex: Calabresa")}
                    </div>
                  )}
                </>
              )}

              {/* Save Button */}
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className={`w-full bg-slate-900 text-white py-4 rounded-3xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 active:scale-95 transition-all mt-4 flex items-center justify-center gap-2 ${
                  isSaving ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSaving ? (
                  <>
                    <RefreshCcw size={14} className="animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar Produto'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
