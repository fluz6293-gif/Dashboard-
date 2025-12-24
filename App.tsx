
import React, { useState } from 'react';
import Header from './components/Header';
import StoreLinkCard from './components/StoreLinkCard';
import DateNavigator from './components/DateNavigator';
import StatsGrid from './components/StatsGrid';
import OrderList from './components/OrderList';
import BottomNav from './components/BottomNav';
import OrderDetailModal from './components/OrderDetailModal';
import ProductManagement from './components/ProductManagement';
import FinancialModal from './components/FinancialModal';
import ScheduleModal from './components/ScheduleModal';
import SettingsModal from './components/SettingsModal';
import { Order } from './types';

const App: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showProducts, setShowProducts] = useState(false);
  const [showFinancial, setShowFinancial] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col overflow-hidden">
        <Header onOpenSettings={() => setShowSettings(true)} />
        
        <main className="flex-1 overflow-y-auto pb-6">
          <StoreLinkCard />
          <DateNavigator />
          <statsGrid />
          <OrderList onSelectOrder={handleSelectOrder} />
        </main>

        <BottomNav 
          onOpenProducts={() => setShowProducts(true)} 
          onOpenFinancial={() => setShowFinancial(true)}
          onOpenSchedule={() => setShowSchedule(true)}
        />

        {selectedOrder && (
          <OrderDetailModal 
            order={selectedOrder} 
            onClose={handleCloseModal} 
          />
        )}

        {showProducts && (
          <ProductManagement onClose={() => setShowProducts(false)} />
        )}

        {showFinancial && (
          <FinancialModal onClose={() => setShowFinancial(false)} />
        )}

        {showSchedule && (
          <ScheduleModal onClose={() => setShowSchedule(false)} />
        )}

        {showSettings && (
          <SettingsModal onClose={() => setShowSettings(false)} />
        )}
      </div>
    </div>
  );
};

export default App;
