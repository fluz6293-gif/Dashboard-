
import React from 'react';
import { ChevronRight, CreditCard, Banknote } from 'lucide-react';
import { MOCK_ORDERS } from '../constants';
import { OrderStatus, PaymentMethod, Order } from '../types';

interface OrderListProps {
  onSelectOrder: (order: Order) => void;
}

const OrderList: React.FC<OrderListProps> = ({ onSelectOrder }) => {
  return (
    <div className="mx-6 mt-8 mb-24">
      <div className="flex items-center justify-between mb-3 px-2">
        <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Todos Pedidos</h2>
        <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600/80 px-2 py-0.5 rounded-full text-[9px] font-bold">
          <div className="w-1 h-1 rounded-full bg-orange-400 animate-pulse"></div>
          {MOCK_ORDERS.length} Pedidos
        </div>
      </div>

      <div className="space-y-2.5">
        {MOCK_ORDERS.map((order) => (
          <div 
            key={order.id} 
            onClick={() => onSelectOrder(order)}
            className="bg-white p-3.5 rounded-[1.75rem] border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md hover:border-slate-200 transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[13px] text-slate-800 uppercase tracking-tight">{order.customerName}</span>
                <span className="text-[10px] text-slate-200 font-bold">•</span>
                <span className="text-[11px] font-semibold text-slate-400">{order.time}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-base font-black text-slate-900 tracking-tight">
                  R$ {order.amount.toFixed(2).replace('.', ',')}
                </span>
                <div className="flex items-center gap-1 bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded-lg text-[8px] font-bold uppercase tracking-wider border border-slate-100/50">
                  {order.paymentMethod === PaymentMethod.PIX ? <Banknote size={8} /> : <CreditCard size={8} />}
                  {order.paymentMethod}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg tracking-widest border ${
                order.status === OrderStatus.CONFIRMED 
                  ? 'text-emerald-500 bg-emerald-50 border-emerald-100' 
                  : 'text-orange-500 bg-orange-50 border-orange-100'
              }`}>
                {order.status}
              </span>
              <div className="bg-slate-900 text-white p-1.5 rounded-xl shadow-sm">
                <ChevronRight size={12} strokeWidth={3} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
