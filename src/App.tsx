import React, { useState, useEffect } from 'react';
import { Currency, Order, UpiAppType } from './types/payment';
import { QUANTUM_HEADPHONES, UPI_APPS } from './data/mockData';
import { Header } from './components/Header';
import { Stage1ProductCheckout } from './components/Stage1ProductCheckout';
import { Stage2UpiSimulator } from './components/Stage2UpiSimulator';
import { Stage3Confirmation } from './components/Stage3Confirmation';
import { WorkflowDiagramCorner } from './components/WorkflowDiagramCorner';
import { MerchantAuditLedger } from './components/MerchantAuditLedger';
import { InvoiceModal } from './components/InvoiceModal';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Info,
  Smartphone,
  CreditCard,
  Building,
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'mockup' | 'simulator' | 'workflow' | 'ledger'>('mockup');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [selectedVariant, setSelectedVariant] = useState('v-blue');
  const [selectedUpiApp, setSelectedUpiApp] = useState<UpiAppType>('phonepe');
  
  // Interactive Flow state
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(1);
  const [isUpiPaid, setIsUpiPaid] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [generatedUtr, setGeneratedUtr] = useState('429381948201');
  const [submittedUtr, setSubmittedUtr] = useState('');
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [scenarioNotification, setScenarioNotification] = useState<string | null>(null);

  // Generate a random 12-digit UTR on load or reset
  const generateNewUtr = () => {
    const randomSuffix = Math.floor(100000000 + Math.random() * 900000000);
    return `429${randomSuffix}`;
  };

  const resetAll = () => {
    setIsUpiPaid(false);
    setIsOrderConfirmed(false);
    setSubmittedUtr('');
    const newUtr = generateNewUtr();
    setGeneratedUtr(newUtr);
    setActiveStage(1);
    setScenarioNotification('Simulation reset to initial stage.');
    setTimeout(() => setScenarioNotification(null), 3000);
  };

  // Stage 1 Action: [Customer Click Pay] -> OPEN UPI APP
  const handleOpenUpiApp = () => {
    setActiveStage(2);
    setScenarioNotification('UPI App Launched: Customer moved from Web App to mobile UPI simulator.');
    setTimeout(() => setScenarioNotification(null), 3500);

    // If on mobile / smaller view, scroll smoothly to Stage 2
    const stage2El = document.getElementById('stage-2-container');
    if (stage2El) {
      stage2El.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Stage 2 Action: UPI PIN success -> customer gets 12-digit UTR
  const handlePaySuccess = () => {
    setIsUpiPaid(true);
    setScenarioNotification('Payment Authorized! 12-Digit UTR generated. Return to site to submit.');
    setTimeout(() => setScenarioNotification(null), 3500);
  };

  const handleProceedToStage3 = () => {
    setActiveStage(3);
    const stage3El = document.getElementById('stage-3-container');
    if (stage3El) {
      stage3El.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Stage 3 Action: [Customer Submits Reference No. of Site] -> CONFIRM PAYMENT
  const handleConfirmPayment = (enteredUtr: string) => {
    setSubmittedUtr(enteredUtr);
    setIsOrderConfirmed(true);
    setScenarioNotification('Order Confirmed! UTR verified against merchant bank ledger.');
    setTimeout(() => setScenarioNotification(null), 4000);
  };

  // One-click happy path scenario
  const handleAutoFillHappyPath = () => {
    setIsUpiPaid(true);
    setSubmittedUtr(generatedUtr);
    setIsOrderConfirmed(true);
    setActiveStage(3);
    setScenarioNotification('Instant Happy Path executed: Paid & Order Marked as Paid.');
    setTimeout(() => setScenarioNotification(null), 3000);
  };

  const currentOrder: Order = {
    orderId: '#QM-8924',
    productId: QUANTUM_HEADPHONES.id,
    productName: QUANTUM_HEADPHONES.name,
    selectedVariant: QUANTUM_HEADPHONES.variants.find((v) => v.id === selectedVariant)?.name || 'Midnight Blue',
    quantity: 1,
    amountINR: QUANTUM_HEADPHONES.priceINR,
    amountUSD: QUANTUM_HEADPHONES.priceUSD,
    currency,
    status: isOrderConfirmed ? 'paid_confirmed' : isUpiPaid ? 'upi_paid' : 'checkout_initiated',
    vpa: 'pay@quantumstore',
    upiApp: selectedUpiApp,
    generatedUtr,
    submittedUtr,
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    customerName: 'Aarav Patel',
    customerPhone: '+91 98450 12891',
    shippingAddress: '42 Orchid Heights, 80 Feet Road, Indiranagar, Bangalore 560038',
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Bar (Follows Top Bar Contract) */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currency={currency}
        setCurrency={setCurrency}
        onReset={resetAll}
        isOrderPaid={isOrderConfirmed}
      />

      {/* Hero / Context Sub-Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
                <span>E-COMMERCE CHECKOUT & SETTLEMENT FLOW</span>
                <span>·</span>
                <span className="text-slate-400">P2M INTENT SPECIFICATION</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                UPI Intent & Manual Reference Number Payment Mockup
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Experience the 3-stage payment journey: Customer initiates checkout on the regular web app, transitions to the UPI mobile app to complete the transaction, and returns to submit their 12-digit reference number to mark the order as paid.
              </p>
            </div>

            {/* Quick Demo Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleAutoFillHappyPath}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                title="Instantly simulate complete successful flow"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>Simulate Happy Path</span>
              </button>
              <button
                onClick={resetAll}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset simulation to initial state"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Notification Toast */}
      {scenarioNotification && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 text-xs font-medium flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <Info className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{scenarioNotification}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* VIEW 1: 3-Stage Multi-Panel Mockup (Requested by User Prompt) */}
        {currentTab === 'mockup' && (
          <div className="space-y-8">
            {/* Stage Progress Bar / Flow Tracker */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-700">3-Stage Flow Navigation</span>
                <span className="text-slate-500">
                  {isOrderConfirmed
                    ? 'Flow Completed · Order Marked as Paid'
                    : isUpiPaid
                    ? 'Payment authorized in UPI App · Submit Ref No. on Site'
                    : 'Customer checkout active · Click Open UPI App'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    activeStage >= 1 ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
                <div
                  className={`h-2 rounded-full transition-all ${
                    isUpiPaid || activeStage >= 2 ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
                <div
                  className={`h-2 rounded-full transition-all ${
                    isOrderConfirmed ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              </div>
            </div>

            {/* Prompt Required: Multi-Panel Layout showing three distinct stages */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* STAGE 1: The Product Page & Checkout (approx 4.5 cols) */}
              <div id="stage-1-container" className="lg:col-span-4 flex flex-col">
                <Stage1ProductCheckout
                  product={QUANTUM_HEADPHONES}
                  currency={currency}
                  selectedVariant={selectedVariant}
                  setSelectedVariant={setSelectedVariant}
                  selectedUpiApp={selectedUpiApp}
                  setSelectedUpiApp={setSelectedUpiApp}
                  onOpenUpiApp={handleOpenUpiApp}
                />
              </div>

              {/* STAGE 2: The UPI App Redirection (Mobile View) (approx 3.8 cols) */}
              <div id="stage-2-container" className="lg:col-span-4 flex flex-col">
                <Stage2UpiSimulator
                  currency={currency}
                  selectedUpiApp={selectedUpiApp}
                  setSelectedUpiApp={setSelectedUpiApp}
                  generatedUtr={generatedUtr}
                  isPaid={isUpiPaid}
                  onPaySuccess={handlePaySuccess}
                  onProceedToStage3={handleProceedToStage3}
                  productName={QUANTUM_HEADPHONES.name}
                />
              </div>

              {/* STAGE 3: The Transaction Confirmation Page (approx 3.7 cols) */}
              <div id="stage-3-container" className="lg:col-span-4 flex flex-col">
                <Stage3Confirmation
                  currency={currency}
                  generatedUtr={generatedUtr}
                  isUpiPaidInStage2={isUpiPaid}
                  isOrderConfirmed={isOrderConfirmed}
                  onConfirmPayment={handleConfirmPayment}
                  onOpenInvoiceModal={() => setIsInvoiceOpen(true)}
                  productName={QUANTUM_HEADPHONES.name}
                />
              </div>
            </div>

            {/* Prompt Required: "A workflow visualization diagram (like the one in image_0.png) is subtly integrated into the background corner of the dashboard view, showing how these steps connect." */}
            <div className="pt-4 flex justify-end">
              <div className="w-full max-w-xl">
                <WorkflowDiagramCorner
                  currentStage={activeStage}
                  onSelectStage={(s) => setActiveStage(s)}
                  isOrderConfirmed={isOrderConfirmed}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Interactive Step-by-Step Flow (Focused Simulator Mode) */}
        {currentTab === 'simulator' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Active Simulation Step:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveStage(1)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      activeStage === 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    1. Product & Checkout
                  </button>
                  <button
                    onClick={() => setActiveStage(2)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      activeStage === 2
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    2. UPI Mobile Simulator
                  </button>
                  <button
                    onClick={() => setActiveStage(3)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      activeStage === 3
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    3. Submit Ref No.
                  </button>
                </div>
              </div>

              <span className="text-xs font-mono text-slate-500">
                UTR: {generatedUtr}
              </span>
            </div>

            {/* Focused Step Display */}
            <div className="transition-all duration-300">
              {activeStage === 1 && (
                <Stage1ProductCheckout
                  product={QUANTUM_HEADPHONES}
                  currency={currency}
                  selectedVariant={selectedVariant}
                  setSelectedVariant={setSelectedVariant}
                  selectedUpiApp={selectedUpiApp}
                  setSelectedUpiApp={setSelectedUpiApp}
                  onOpenUpiApp={handleOpenUpiApp}
                />
              )}

              {activeStage === 2 && (
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <Stage2UpiSimulator
                      currency={currency}
                      selectedUpiApp={selectedUpiApp}
                      setSelectedUpiApp={setSelectedUpiApp}
                      generatedUtr={generatedUtr}
                      isPaid={isUpiPaid}
                      onPaySuccess={handlePaySuccess}
                      onProceedToStage3={handleProceedToStage3}
                      productName={QUANTUM_HEADPHONES.name}
                    />
                  </div>
                </div>
              )}

              {activeStage === 3 && (
                <div className="flex justify-center">
                  <div className="w-full max-w-lg">
                    <Stage3Confirmation
                      currency={currency}
                      generatedUtr={generatedUtr}
                      isUpiPaidInStage2={isUpiPaid}
                      isOrderConfirmed={isOrderConfirmed}
                      onConfirmPayment={handleConfirmPayment}
                      onOpenInvoiceModal={() => setIsInvoiceOpen(true)}
                      productName={QUANTUM_HEADPHONES.name}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: Full Architecture Workflow Diagram */}
        {currentTab === 'workflow' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <WorkflowDiagramCorner
              currentStage={activeStage}
              onSelectStage={(s) => setActiveStage(s)}
              isOrderConfirmed={isOrderConfirmed}
            />
          </div>
        )}

        {/* VIEW 4: Merchant Audit Ledger */}
        {currentTab === 'ledger' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <MerchantAuditLedger
              currentOrder={currentOrder}
              isOrderConfirmed={isOrderConfirmed}
            />
          </div>
        )}
      </main>

      {/* Invoice / Receipt Modal */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        order={currentOrder}
        productName={QUANTUM_HEADPHONES.name}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 r001 sound Labs Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              NPCI UPI Protocol Architecture
            </span>
            <span>·</span>
            <span>PCI-DSS Level 1 Compliant</span>
            <span>·</span>
            <button
              onClick={() => setCurrentTab('workflow')}
              className="text-blue-600 hover:underline"
            >
              Flow Documentation
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
