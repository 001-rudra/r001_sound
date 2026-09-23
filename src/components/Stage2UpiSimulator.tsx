import React, { useState } from 'react';
import { Currency, UpiAppType } from '../types/payment';
import { UPI_APPS } from '../data/mockData';
import {
  CheckCircle2,
  Lock,
  Copy,
  Check,
  Building2,
  ChevronDown,
  ShieldCheck,
  ArrowDown,
  Smartphone,
  Sparkles,
  Wifi,
  Battery,
  AlertCircle,
} from 'lucide-react';

interface Stage2UpiSimulatorProps {
  currency: Currency;
  selectedUpiApp: UpiAppType;
  setSelectedUpiApp: (app: UpiAppType) => void;
  generatedUtr: string;
  isPaid: boolean;
  onPaySuccess: () => void;
  onProceedToStage3: () => void;
  productName: string;
}

export const Stage2UpiSimulator: React.FC<Stage2UpiSimulatorProps> = ({
  currency,
  selectedUpiApp,
  setSelectedUpiApp,
  generatedUtr,
  isPaid,
  onPaySuccess,
  onProceedToStage3,
  productName,
}) => {
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedUtr, setCopiedUtr] = useState(false);

  const currentApp = UPI_APPS.find((a) => a.id === selectedUpiApp) || UPI_APPS[0];
  const formattedAmount = currency === 'INR' ? '₹14,999.00' : '$189.00';

  const handleKeypadPress = (digit: string) => {
    if (enteredPin.length < 6) {
      const newPin = enteredPin + digit;
      setEnteredPin(newPin);
      if (newPin.length === 6) {
        // Auto trigger submit after 6th digit
        triggerPaymentProcessing();
      }
    }
  };

  const handleBackspace = () => {
    setEnteredPin((prev) => prev.slice(0, -1));
  };

  const triggerPaymentProcessing = () => {
    setPinModalOpen(false);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaySuccess();
    }, 1800);
  };

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(generatedUtr);
    setCopiedUtr(true);
    setTimeout(() => setCopiedUtr(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Stage Header Kicker */}
      <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
            2
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-300">
            Stage 2: The UPI App Redirection (Mobile View)
          </span>
        </div>
        <span className="text-xs text-slate-400">Mobile Simulator</span>
      </div>

      <div className="p-6 flex-1 flex flex-col items-center justify-between space-y-6 bg-slate-50/70">
        {/* UPI App Switcher Pills (simulator feature) */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg shadow-2xs">
          <span className="text-[11px] text-slate-500 font-medium px-2">App Theme:</span>
          {UPI_APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedUpiApp(app.id)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                selectedUpiApp === app.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {app.name}
            </button>
          ))}
        </div>

        {/* Mobile Device Frame */}
        <div className="w-full max-w-[340px] bg-slate-900 rounded-[38px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-black/20 relative">
          {/* Dynamic Island / Speaker Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800/80 mr-3" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
          </div>

          {/* Screen Content Container */}
          <div className="w-full bg-white rounded-[30px] overflow-hidden min-h-[550px] flex flex-col text-slate-900 relative">
            {/* Phone Status Bar */}
            <div className="h-10 px-5 pt-2 flex items-center justify-between text-[11px] font-semibold text-slate-700 bg-white">
              <span>09:41</span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="text-[10px] font-bold">5G</span>
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Simulated UPI App Header */}
            <div
              className="px-4 py-3 text-white flex items-center justify-between shadow-xs transition-colors duration-300"
              style={{ backgroundColor: currentApp.color }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                  {currentApp.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-tight">{currentApp.name}</h4>
                  <p className="text-[9px] text-white/80">Secured with NPCI UPI 2.0</p>
                </div>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono font-medium">
                P2M Intent
              </span>
            </div>

            {/* Body of Simulated UPI App */}
            {!isPaid && !isProcessing && (
              <div className="p-4 flex-1 flex flex-col justify-between">
                {/* Merchant & Order Details */}
                <div className="space-y-4 pt-2">
                  <div className="text-center pb-2 border-b border-slate-100">
                    <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm mb-2 shadow-inner">
                      r001
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <h3 className="text-sm font-bold text-slate-900">r001 sound Store</h3>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">pay@r001sound</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Verified NPCI Merchant
                    </span>
                  </div>

                  {/* Transaction Summary Card */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Product:</span>
                      <span className="font-semibold text-slate-800 text-right truncate max-w-[170px]">
                        {productName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Order ID:</span>
                      <span className="font-mono text-slate-800 font-bold">#QM-8924</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Ref Code:</span>
                      <span className="font-mono text-blue-600 font-semibold">QNT-PAY-INTENT</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                      <span className="text-xs font-bold text-slate-700">Total Amount:</span>
                      <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                        {formattedAmount}
                      </span>
                    </div>
                  </div>

                  {/* Account Debit Selector */}
                  <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-800">State Bank of India</p>
                        <p className="text-[10px] text-slate-500 font-mono">•••• 4812 · Savings A/C</p>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                {/* Prompt Required: Shows a transaction summary with a large "PAY NOW" button */}
                <div className="space-y-2 pt-4">
                  <button
                    onClick={() => setPinModalOpen(true)}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>PAY NOW · {formattedAmount}</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    Press Pay Now to enter your secret 6-digit UPI PIN
                  </p>
                </div>
              </div>
            )}

            {/* Processing State */}
            {isProcessing && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Authorizing via NPCI Switch</h4>
                  <p className="text-xs text-slate-500 mt-1">Connecting to State Bank of India...</p>
                </div>
                <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 text-[11px] text-blue-700 font-medium">
                  Do not hit back or close the UPI app
                </div>
              </div>
            )}

            {/* Payment Success State inside UPI App */}
            {isPaid && (
              <div className="flex-1 flex flex-col justify-between p-4 text-center">
                <div className="pt-4 space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Paid Successfully!</h3>
                    <p className="text-xs text-emerald-700 font-bold mt-0.5">
                      {formattedAmount} to r001 sound Store
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">
                      {new Date().toLocaleDateString()} · 09:41 AM
                    </p>
                  </div>

                  {/* 12-Digit Reference / UTR Box */}
                  <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3 text-left space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
                        12-Digit UPI Reference No. (UTR)
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold">NPCI Verified</span>
                    </div>

                    <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-blue-200">
                      <span className="font-mono text-sm font-extrabold text-blue-900 tracking-wider">
                        {generatedUtr}
                      </span>
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-0.5 rounded cursor-pointer"
                        title="Copy 12-digit UTR"
                      >
                        {copiedUtr ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-600">
                      💡 Return to the merchant web store and paste this reference number to mark order as paid.
                    </p>
                  </div>
                </div>

                {/* Return to Web App button */}
                <div className="pt-4 space-y-2">
                  <button
                    onClick={onProceedToStage3}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Merchant Confirmation</span>
                    <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                  </button>
                  <p className="text-[9px] text-slate-400">
                    Simulates switching back from mobile UPI app to the store tab
                  </p>
                </div>
              </div>
            )}

            {/* PIN Entry Bottom Sheet Modal */}
            {pinModalOpen && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs z-40 flex flex-col justify-end animate-in fade-in duration-200">
                <div className="bg-slate-900 text-white rounded-t-3xl p-5 space-y-4">
                  <div className="text-center space-y-1">
                    <p className="text-xs text-slate-400 font-medium">Enter 6-Digit UPI PIN</p>
                    <p className="text-sm font-bold text-white">r001 sound Store · {formattedAmount}</p>

                    {/* PIN Dots Display */}
                    <div className="flex items-center justify-center gap-3 pt-3 pb-1">
                      {[0, 1, 2, 3, 4, 5].map((idx) => (
                        <div
                          key={idx}
                          className={`w-3.5 h-3.5 rounded-full border border-slate-600 transition-all ${
                            idx < enteredPin.length
                              ? 'bg-blue-500 border-blue-400 scale-110 shadow-xs shadow-blue-500/50'
                              : 'bg-slate-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Simulated Number Keypad */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                      <button
                        key={digit}
                        onClick={() => handleKeypadPress(digit)}
                        className="h-11 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 font-bold text-base transition-colors flex items-center justify-center cursor-pointer"
                      >
                        {digit}
                      </button>
                    ))}
                    <button
                      onClick={() => setPinModalOpen(false)}
                      className="h-11 rounded-xl text-xs text-slate-400 hover:text-white flex items-center justify-center font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleKeypadPress('0')}
                      className="h-11 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 font-bold text-base transition-colors flex items-center justify-center cursor-pointer"
                    >
                      0
                    </button>
                    <button
                      onClick={handleBackspace}
                      className="h-11 rounded-xl text-xs text-rose-400 hover:text-rose-300 flex items-center justify-center font-medium cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Quick bypass button for user convenience */}
                  <button
                    onClick={() => {
                      setEnteredPin('123456');
                      triggerPaymentProcessing();
                    }}
                    className="w-full py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Quick Pay (Simulate PIN Entry)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prompt Required: Below this, a stylized graphical arrow indicates the transaction is being processed securely, labeled "[UPI-APP OPENS] -> [Customer Pays and Complete transaction]" */}
        <div className="w-full flex flex-col items-center justify-center pt-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 shadow-xs max-w-md w-full justify-center">
            <span className="text-[11px] font-mono font-bold text-blue-700">
              [UPI-APP OPENS]
            </span>
            <span className="text-blue-500 font-bold">→</span>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-mono font-bold text-emerald-800">
                [Customer Pays and Complete transaction]
              </span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-1.5">
            Encrypted NPCI Inter-Bank Settlement Protocol
          </p>
        </div>
      </div>
    </div>
  );
};
