import React from 'react';
import { Currency } from '../types/payment';
import { RotateCcw, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentTab: 'mockup' | 'simulator' | 'workflow' | 'ledger';
  setCurrentTab: (tab: 'mockup' | 'simulator' | 'workflow' | 'ledger') => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onReset: () => void;
  isOrderPaid: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  currency,
  setCurrency,
  onReset,
  isOrderPaid,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setCurrentTab('mockup')}
          className="text-xl font-bold tracking-tight text-slate-900 hover:text-blue-600 transition-colors text-left"
        >
          r001 sound
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setCurrentTab('mockup')}
            className={`transition-colors pb-0.5 ${
              currentTab === 'mockup'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            3-Stage Overview
          </button>
          <button
            onClick={() => setCurrentTab('simulator')}
            className={`transition-colors pb-0.5 ${
              currentTab === 'simulator'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Interactive Flow
          </button>
          <button
            onClick={() => setCurrentTab('workflow')}
            className={`transition-colors pb-0.5 ${
              currentTab === 'workflow'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Architecture Diagram
          </button>
          <button
            onClick={() => setCurrentTab('ledger')}
            className={`transition-colors pb-0.5 ${
              currentTab === 'ledger'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Merchant Ledger
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-3">
          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs font-semibold">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currency === 'INR'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Show pricing in Indian Rupees (UPI standard)"
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currency === 'USD'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Show pricing in US Dollars"
            >
              $ USD
            </button>
          </div>

          {/* Reset Demo button */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            title="Reset checkout simulation to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          {isOrderPaid && (
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Order Verified</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav subbar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 bg-slate-50 px-2 py-2 text-xs font-medium text-slate-600">
        <button
          onClick={() => setCurrentTab('mockup')}
          className={`py-1 px-2 rounded ${currentTab === 'mockup' ? 'text-blue-600 font-semibold bg-blue-50' : ''}`}
        >
          3-Stage View
        </button>
        <button
          onClick={() => setCurrentTab('simulator')}
          className={`py-1 px-2 rounded ${currentTab === 'simulator' ? 'text-blue-600 font-semibold bg-blue-50' : ''}`}
        >
          Simulator
        </button>
        <button
          onClick={() => setCurrentTab('workflow')}
          className={`py-1 px-2 rounded ${currentTab === 'workflow' ? 'text-blue-600 font-semibold bg-blue-50' : ''}`}
        >
          Diagram
        </button>
        <button
          onClick={() => setCurrentTab('ledger')}
          className={`py-1 px-2 rounded ${currentTab === 'ledger' ? 'text-blue-600 font-semibold bg-blue-50' : ''}`}
        >
          Ledger
        </button>
      </div>
    </header>
  );
};
