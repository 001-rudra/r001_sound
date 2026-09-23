import React, { useState } from 'react';
import {
  GitFork,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Smartphone,
  Globe,
  Database,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Layers,
} from 'lucide-react';

interface WorkflowDiagramCornerProps {
  currentStage: 1 | 2 | 3;
  onSelectStage?: (stage: 1 | 2 | 3) => void;
  isOrderConfirmed: boolean;
}

export const WorkflowDiagramCorner: React.FC<WorkflowDiagramCornerProps> = ({
  currentStage,
  onSelectStage,
  isOrderConfirmed,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`transition-all duration-300 ${
        isExpanded
          ? 'fixed inset-4 sm:inset-10 z-50 bg-slate-950/95 backdrop-blur-md rounded-2xl border border-blue-500/30 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto text-white'
          : 'bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-md'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-600">
            <GitFork className="w-4 h-4" />
          </div>
          <div>
            <h4
              className={`text-xs font-bold tracking-tight ${
                isExpanded ? 'text-white text-sm' : 'text-slate-900'
              }`}
            >
              UPI Manual Reference Flow Architecture
            </h4>
            <p className="text-[10px] text-slate-500">
              Interactive 3-Stage Intent & Settlement Graph
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer ${
            isExpanded
              ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
          title={isExpanded ? 'Minimize diagram' : 'Expand full diagram'}
        >
          {isExpanded ? (
            <>
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Minimize</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Expand Spec</span>
            </>
          )}
        </button>
      </div>

      {/* Mini Flow vs Expanded Flow */}
      {!isExpanded ? (
        /* Compact Diagram View in Background Corner */
        <div className="space-y-2.5">
          <div className="grid grid-cols-3 gap-2">
            {/* Step 1 Node */}
            <button
              onClick={() => onSelectStage?.(1)}
              className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                currentStage === 1
                  ? 'border-blue-600 bg-blue-50/80 ring-1 ring-blue-500'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span className="font-bold">Step 1</span>
                <Globe className="w-3 h-3 text-blue-600" />
              </div>
              <p className="text-[11px] font-bold text-slate-800 leading-tight">
                Regular Web App
              </p>
              <p className="text-[9px] text-slate-500 mt-0.5 truncate">
                Customer clicks Pay
              </p>
            </button>

            {/* Step 2 Node */}
            <button
              onClick={() => onSelectStage?.(2)}
              className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                currentStage === 2
                  ? 'border-blue-600 bg-blue-50/80 ring-1 ring-blue-500'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span className="font-bold">Step 2</span>
                <Smartphone className="w-3 h-3 text-purple-600" />
              </div>
              <p className="text-[11px] font-bold text-slate-800 leading-tight">
                UPI-App Opens
              </p>
              <p className="text-[9px] text-slate-500 mt-0.5 truncate">
                Pays & gets 12-digit UTR
              </p>
            </button>

            {/* Step 3 Node */}
            <button
              onClick={() => onSelectStage?.(3)}
              className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                currentStage === 3
                  ? 'border-blue-600 bg-blue-50/80 ring-1 ring-blue-500'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span className="font-bold">Step 3</span>
                <CheckCircle2
                  className={`w-3 h-3 ${isOrderConfirmed ? 'text-emerald-600' : 'text-slate-400'}`}
                />
              </div>
              <p className="text-[11px] font-bold text-slate-800 leading-tight">
                Submits Ref No.
              </p>
              <p className="text-[9px] text-slate-500 mt-0.5 truncate">
                {isOrderConfirmed ? 'Marked as Paid ✓' : 'Pending UTR'}
              </p>
            </button>
          </div>

          {/* Micro status ticker */}
          <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Direct P2M Intent Protocol
            </span>
            <span className="font-mono text-blue-600">Zero Gateway Commission</span>
          </div>
        </div>
      ) : (
        /* Detailed Expanded Blueprint View */
        <div className="flex-1 flex flex-col justify-between space-y-6 pt-2">
          {/* Architectural Stage Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Box 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-400">STAGE 01</span>
                <Globe className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="text-sm font-bold text-white">E-Commerce Web Store</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Customer selects Quantum Headphones, initiates checkout, picks UPI payment option, and triggers:
              </p>
              <div className="bg-slate-950 p-2 rounded text-[11px] font-mono text-blue-300 border border-slate-800">
                [Customer Click Pay] → OPEN UPI APP
              </div>
              <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-1 pt-1">
                <li>Generates UPI Intent URI (`upi://pay?pa=...`)</li>
                <li>Assigns internal Order ID (#QM-8924)</li>
                <li>Displays QR fallback for desktop screens</li>
              </ul>
            </div>

            {/* Box 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400">STAGE 02</span>
                <Smartphone className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="text-sm font-bold text-white">UPI Client Application</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deep link opens GPay / PhonePe / Paytm / BHIM. Customer reviews transaction summary:
              </p>
              <div className="bg-slate-950 p-2 rounded text-[11px] font-mono text-emerald-300 border border-slate-800">
                [UPI-APP OPENS] → [Customer Pays]
              </div>
              <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-1 pt-1">
                <li>User inputs secret 4/6-digit UPI PIN</li>
                <li>NPCI inter-bank switch transfers funds</li>
                <li>Bank generates unique 12-digit UTR</li>
              </ul>
            </div>

            {/* Box 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">STAGE 03</span>
                <Layers className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="text-sm font-bold text-white">Manual Reference Return</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Customer returns from UPI App back to the web store tab and inputs the 12-digit reference code:
              </p>
              <div className="bg-slate-950 p-2 rounded text-[11px] font-mono text-amber-300 border border-slate-800">
                [Customer Submits Ref No.] → CONFIRM
              </div>
              <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-1 pt-1">
                <li>12-digit input mask prevents typos</li>
                <li>Instant client format validation</li>
                <li>Enters reconciliation pending state</li>
              </ul>
            </div>

            {/* Box 4 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">STAGE 04</span>
                <Database className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-sm font-bold text-white">Merchant Reconciliation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Backend or Admin reconciles the submitted UTR against the merchant bank statement feed:
              </p>
              <div className="bg-slate-950 p-2 rounded text-[11px] font-mono text-emerald-400 border border-slate-800">
                [Mark Order as paid] - CONFIRMED
              </div>
              <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-1 pt-1">
                <li>Matches amount, timestamp & UTR</li>
                <li>Unlocks order for warehouse packing</li>
                <li>Dispatches SMS & Invoice to buyer</li>
              </ul>
            </div>
          </div>

          {/* Value comparison table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <h5 className="text-xs font-bold text-slate-200 mb-2">
              Why E-Commerce Businesses Use The Manual UTR / Reference Flow:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <p className="font-semibold text-white">Zero Gateway MDR Fees</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Saves 2.0% – 2.5% per order compared to third-party payment aggregators by taking direct peer-to-merchant UPI transfers.
                </p>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <p className="font-semibold text-white">Instant Bank Liquidity</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Funds settle immediately into the merchant's current account without T+2 payout delays.
                </p>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <p className="font-semibold text-white">Universal App Compatibility</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Works seamlessly across all 100+ UPI enabled apps with zero proprietary SDK integration requirements.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-500">
            <span>Standard NPCI UPI Inter-Bank Flow Specification</span>
            <button
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
            >
              Return to 3-Stage Mockup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
