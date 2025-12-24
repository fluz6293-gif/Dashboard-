
import React, { useState } from 'react';
import { Truck, Box, MapPin, CheckSquare, Square } from 'lucide-react';
import { Order } from '../types';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose }) => {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pedido ID</span>
              <h2 className="text-xl font-black text-slate-900">#{order.id}</h2>
            </div>
            <button 
              onClick={onClose}
              className="bg-slate-50 text-[10px] font-bold text-slate-500 px-4 py-2 rounded-xl hover:bg-slate-100 active:scale-95 transition-all tracking-widest uppercase"
            >
              Fechar
            </button>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Cliente</span>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-[9px] font-bold">
                  {order.customerName[0]}
                </div>
                <span className="text-xs font-black text-slate-800 uppercase">{order.customerName}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Telefone</span>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-[10px]">📞</span>
                </div>
                <span className="text-xs font-bold text-slate-800">{order.phone}</span>
              </div>
            </div>
          </div>

          {/* Type Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 rounded-2xl mb-4">
            <div className={`flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all ${
              order.type === 'ENTREGA' ? 'bg-white shadow-sm text-slate-900 border border-slate-100' : 'text-slate-300'
            }`}>
              <Truck size={12} className={order.type === 'ENTREGA' ? 'text-orange-500' : 'text-slate-300'} />
              Entrega
            </div>
            <div className={`flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all ${
              order.type === 'RETIRADA' ? 'bg-white shadow-sm text-slate-900 border border-slate-100' : 'text-slate-300'
            }`}>
              <Box size={12} />
              Retirada
            </div>
          </div>

          {/* Address */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-3 flex gap-3 mb-6">
            <div className="mt-0.5">
              <MapPin size={14} className="text-slate-300" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Endereço</span>
              <p className="text-[11px] font-semibold text-slate-600 leading-tight">
                {order.address}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Itens</span>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{order.items.length} Itens</span>
            </div>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-slate-900 text-white rounded flex items-center justify-center text-[9px] font-bold">{item.quantity}</span>
                    <span className="font-bold text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-slate-100 border-dashed pt-4 mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Frete</span>
              <span className="text-xs font-bold text-slate-500">R$ {order.shippingFee.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs font-black text-slate-900 uppercase">Total</span>
              <span className="text-xl font-black text-slate-900">R$ {order.amount.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            <div 
              onClick={() => setPaymentConfirmed(!paymentConfirmed)}
              className={`border rounded-2xl p-4 flex items-center gap-4 group cursor-pointer transition-all duration-200 ${
                paymentConfirmed 
                  ? 'bg-emerald-50 border-emerald-100' 
                  : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className={paymentConfirmed ? 'text-emerald-500' : 'text-slate-300'}>
                {paymentConfirmed ? <CheckSquare size={20} /> : <Square size={20} />}
              </div>
              <div>
                <span className={`text-[9px] font-bold uppercase tracking-widest block ${paymentConfirmed ? 'text-emerald-600' : 'text-slate-400'}`}>
                  Pagamento: {order.paymentMethod}
                </span>
                <span className={`text-xs font-bold ${paymentConfirmed ? 'text-emerald-700' : 'text-slate-600'}`}>
                  {paymentConfirmed ? 'Confirmado' : 'Confirmar'}
                </span>
              </div>
            </div>

            <div 
              onClick={() => setDeliveryConfirmed(!deliveryConfirmed)}
              className={`border rounded-2xl p-4 flex items-center gap-4 group cursor-pointer transition-all duration-200 ${
                deliveryConfirmed 
                  ? 'bg-emerald-50 border-emerald-100' 
                  : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className={deliveryConfirmed ? 'text-emerald-500' : 'text-slate-300'}>
                {deliveryConfirmed ? <CheckSquare size={20} /> : <Square size={20} />}
              </div>
              <div>
                <span className={`text-[9px] font-bold uppercase tracking-widest block ${deliveryConfirmed ? 'text-emerald-600' : 'text-slate-400'}`}>
                  Envio
                </span>
                <span className={`text-xs font-bold ${deliveryConfirmed ? 'text-emerald-700' : 'text-slate-600'}`}>
                  {deliveryConfirmed ? 'Enviado' : 'Confirmar Envio'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
