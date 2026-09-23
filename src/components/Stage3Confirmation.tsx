import React, { useState } from 'react';
import { Currency } from '../types/payment';
import {
  CheckCircle2,
  FileText,
  Truck,
  ShieldCheck,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Printer,
  Copy,
  Check,
} from 'lucide-react';

interface Stage3ConfirmationProps {
  currency: Currency;
  generatedUtr: string;
  isUpiPaidInStage2: boolean;
  isOrderConfirmed: boolean;
  onConfirmPayment: (submittedUtr: string) => void;
  onOpenInvoiceModal: () => void;
  productName: string;
}

export const Stage3Confirmation: React.FC<Stage3ConfirmationProps> = ({
  currency,
  generatedUtr,
  isUpiPaidInStage2,
  isOrderConfirmed,
  onConfirmPayment,
  onOpenInvoiceModal,
  productName,
}) => {
  const [utrInput, setUtrInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  const formattedAmount = currency === 'INR' ? '₹14,999.00' : '$189.00';
  const orderId = '#QM-8924';

  const cleanDigits = utrInput.replace(/\D/g, '');
  const isValidLength = cleanDigits.length === 12;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only numeric digits up to 12
    const numeric = val.replace(/\D/g, '').slice(0, 12);
    setUtrInput(numeric);
    if (errorMessage) setErrorMessage('');
  };

  const handleAutoPaste = () => {
    if (generatedUtr) {
      setUtrInput(generatedUtr);
      setErrorMessage('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidLength) {
      setErrorMessage('Please enter the full 12-digit numeric UPI reference number.');
      return;
    }

    setIsVerifying(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsVerifying(false);
      onConfirmPayment(cleanDigits);
    }, 1500);
  };

  const copyOrderId = () => {
    navigator.clipboard?.writeText('QM-8924');
    setCopiedOrderId(true);
    setTimeout(() => setCopiedOrderId(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full relative">
      {/* Stage Header Kicker */}
      <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
            3
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-300">
            Stage 3: The Transaction Confirmation Page
          </span>
        </div>
        <span className="text-xs text-slate-400">Merchant Store Confirmation</span>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
        {/* If Order is NOT yet confirmed, show the reference number submission form */}
        {!isOrderConfirmed ? (
          <div className="space-y-6 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Order Pending Notice Banner */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-900">Payment Pending Verification</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono">
                      Order {orderId}
                    </span>
                  </div>
                  <p className="text-amber-700 mt-1 leading-relaxed">
                    Once you complete the payment on your UPI app (Google Pay, PhonePe, Paytm, etc.), locate the 12-digit UTR/Reference number on your transaction receipt and enter it below to confirm.
                  </p>
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Order Reference:</span>
                  <span className="font-mono font-bold text-slate-900">{orderId}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Product:</span>
                  <span className="font-semibold text-slate-800">{productName}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Total Payable:</span>
                  <span className="font-extrabold text-blue-700 tabular-nums">{formattedAmount}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Merchant VPA:</span>
                  <span className="font-mono text-slate-700">pay@quantumstore</span>
                </div>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="utrInput"
                      className="text-xs font-bold text-slate-800 flex items-center gap-1.5"
                    >
                      <span>UPI Reference / UTR Number:</span>
                      <span className="text-blue-600 font-normal">*(12 Digits)</span>
                    </label>

                    {/* Quick Auto-paste helper if paid in Stage 2 */}
                    {generatedUtr && (
                      <button
                        type="button"
                        onClick={handleAutoPaste}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Paste generated UTR ({generatedUtr.slice(0, 4)}••••)</span>
                      </button>
                    )}
                  </div>

                  {/* Prompt Required: A large text box is present with a placeholder that reads "Enter your 12-digit UPI Reference/UTR Number here." */}
                  <div className="relative">
                    <input
                      id="utrInput"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={12}
                      value={utrInput}
                      onChange={handleInputChange}
                      placeholder="Enter your 12-digit UPI Reference/UTR Number here."
                      className={`w-full px-4 py-3.5 text-sm sm:text-base font-mono tracking-wider rounded-xl border-2 transition-all bg-white shadow-2xs focus:outline-hidden ${
                        isValidLength
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20 text-slate-900'
                          : utrInput.length > 0
                          ? 'border-blue-400 ring-2 ring-blue-400/20 text-slate-900'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'
                      }`}
                    />

                    {/* Live digit counter */}
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      {isValidLength ? (
                        <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded">
                          <Check className="w-3 h-3" />
                          <span>12 / 12</span>
                        </div>
                      ) : (
                        <span className="text-xs font-mono text-slate-400">
                          {utrInput.length} / 12 digits
                        </span>
                      )}
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-500">
                    💡 Look in your UPI App's transaction history for "UPI Ref No.", "UTR", or "Bank Reference No."
                  </p>
                </div>

                {/* Prompt Required: A prominent blue button below it reads "[Customer Submits Reference No. of Site] -> CONFIRM PAYMENT" */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isVerifying || !isValidLength}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isValidLength && !isVerifying
                        ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-500/20 hover:shadow-lg'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Verifying with NPCI Bank Gateway...</span>
                      </>
                    ) : (
                      <>
                        <span>[Customer Submits Reference No. of Site] → CONFIRM PAYMENT</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Security notice */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                NPCI Direct Bank Settlement
              </span>
              <span>Ref Match Window: 15 mins</span>
            </div>
          </div>
        ) : (
          /* Prompt Required: Once confirmed, a success overlay appears showing a large green checkmark and the status message "[Mark Order as paid] - ORDER CONFIRMED" */
          <div className="flex-1 flex flex-col justify-between space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center pt-3 space-y-4">
              {/* Large green checkmark */}
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 border-4 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-md">
                <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
              </div>

              {/* Status Message */}
              <div>
                <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-1.5">
                  Automated Bank Reconciliation Success
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  [Mark Order as paid] - ORDER CONFIRMED
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Payment for {orderId} has been successfully verified and marked as PAID in merchant inventory.
                </p>
              </div>

              {/* Confirmed Order Card */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Order ID:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-900">{orderId}</span>
                    <button
                      onClick={copyOrderId}
                      className="text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
                      title="Copy Order ID"
                    >
                      {copiedOrderId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Item Purchased:</span>
                  <span className="font-semibold text-slate-800">{productName}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-extrabold text-emerald-700 tabular-nums">
                    {formattedAmount}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Recorded UTR:</span>
                  <span className="font-mono font-bold text-blue-700">
                    {cleanDigits || generatedUtr}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                    Paid & Locked for Dispatch
                  </span>
                </div>
              </div>

              {/* Delivery Timeline Tracker */}
              <div className="bg-white rounded-xl p-3.5 border border-slate-200 text-left">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Fulfillment Timeline</span>
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="p-1.5 bg-emerald-50 text-emerald-800 rounded-md font-semibold border border-emerald-200">
                    1. Payment Verified ✓
                  </div>
                  <div className="p-1.5 bg-blue-50 text-blue-800 rounded-md font-semibold border border-blue-200">
                    2. Packing (Today)
                  </div>
                  <div className="p-1.5 bg-slate-100 text-slate-500 rounded-md font-medium">
                    3. Delivery (2 Days)
                  </div>
                </div>
              </div>
            </div>

            {/* Actions: Download Invoice & Print */}
            <div className="pt-2 space-y-2">
              <button
                onClick={onOpenInvoiceModal}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 active:bg-black text-white rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View / Download Tax Invoice</span>
              </button>

              <p className="text-center text-[10px] text-slate-400">
                A confirmation SMS & Email has been dispatched with tracking details.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
