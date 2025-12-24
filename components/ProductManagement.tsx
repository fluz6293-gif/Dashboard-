
import React, { useState } from 'react';
import { Plus, X, Image as ImageIcon } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import AddProductModal from './AddProductModal';

interface ProductManagementProps {
  onClose: () => void;
}

const ProductManagement: React.FC<ProductManagementProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  
  const categories = ['Todos', 'Hambúrguer', 'Pastel', 'Pizza', 'Açaí', 'Bebida', 'Pratos'];

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 mt-2">
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Adiciona Produto</span>
          <Plus size={16} strokeWidth={3} />
        </button>
        
        <button 
          onClick={onClose}
          className="bg-slate-50 text-slate-500 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors"
        >
          Fechar
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                activeCategory === cat 
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20' 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="grid grid-cols-2 gap-4 pb-12">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white border border-slate-100 rounded-[2rem] p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow relative group animate-in fade-in zoom-in-95 duration-300"
            >
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight truncate">
                  {product.name}
                </span>
                <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">
                  {product.category}
                </span>
              </div>
              
              <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden relative flex items-center justify-center border border-slate-50">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ImageIcon className="text-white" size={20} />
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Preço</span>
                  <span className="text-sm font-black text-slate-900">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                  <Plus size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <AddProductModal 
          onClose={() => setShowAddModal(false)} 
          onAddProduct={handleAddProduct}
        />
      )}
    </div>
  );
};

export default ProductManagement;
