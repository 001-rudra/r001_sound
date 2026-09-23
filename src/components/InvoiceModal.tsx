import React from 'react';
import { Currency, Order } from '../types/payment';
import { X, Printer, Download, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  productName: string;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  order,
  productName,
}) => {
  if (!isOpen) return null;

  const formattedAmount = order.currency === 'INR' ? '₹14,999.00' : '$189.00';
  const taxAmount = order.currency === 'INR' ? '₹2,287.98' : '$28.83';
  const baseAmount = order.currency === 'INR' ? '₹12,711.02' : '$160.17';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col text-slate-900">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tax Invoice & Payment Receipt
            </span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              PAID
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Print Invoice"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="p-8 space-y-6 text-xs">
          {/* Brand Header */}
          <div className="flex items-start justify-between pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                r001 sound Labs Inc.
              </h2>
              <p className="text-slate-500 mt-1">104 Tech Boulevard, Cyber Park</p>
              <p className="text-slate-500">Bangalore, Karnataka, India - 560100</p>
              <p className="text-slate-500 font-mono mt-0.5">GSTIN: 29AABCU9603R1ZM</p>
            </div>

            <div className="text-right">
              <span className="text-lg font-mono font-extrabold text-blue-600 block">
                {order.orderId}
              </span>
              <p className="text-slate-500 mt-1">Date: {new Date().toLocaleDateString()}</p>
              <p className="text-slate-500">Status: <strong className="text-emerald-600">Settled via UPI</strong></p>
            </div>
          </div>

          {/* Customer & Payment Details */}
          <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-200">
            <div>
              <p className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-1">
                Billed To:
              </p>
              <p className="font-medium text-slate-900">{order.customerName}</p>
              <p className="text-slate-500">{order.shippingAddress}</p>
              <p className="text-slate-500">Phone: {order.customerPhone}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <p className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">
                Payment Verification:
              </p>
              <p className="text-slate-600">
                Method: <strong>UPI Intent Transfer</strong>
              </p>
              <p className="text-slate-600 font-mono">
                Merchant VPA: <span className="text-blue-700 font-medium">pay@quantumstore</span>
              </p>
              <p className="text-slate-900 font-mono">
                12-Digit UTR: <strong className="text-blue-700">{order.submittedUtr || order.generatedUtr}</strong>
              </p>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold text-[11px]">
                  <th className="pb-2">Description</th>
                  <th className="pb-2 text-center">Qty</th>
                  <th className="pb-2 text-right">Unit Price</th>
                  <th className="pb-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3">
                    <p className="font-bold text-slate-900">{productName}</p>
                    <p className="text-[10px] text-slate-500">
                      Finish: {order.selectedVariant} · Model QM-H1
                    </p>
                  </td>
                  <td className="py-3 text-center">{order.quantity}</td>
                  <td className="py-3 text-right font-mono tabular-nums">{baseAmount}</td>
                  <td className="py-3 text-right font-mono font-bold tabular-nums">{baseAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financial Summary */}
          <div className="pt-4 border-t border-slate-200 space-y-1.5 text-right">
            <div className="flex justify-between text-slate-600">
              <span>Taxable Base Value:</span>
              <span className="font-mono tabular-nums">{baseAmount}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Integrated GST (18%):</span>
              <span className="font-mono tabular-nums">{taxAmount}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Express Delivery:</span>
              <span className="font-semibold text-emerald-600 uppercase text-[10px]">Free</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Paid Amount:</span>
              <span className="font-mono text-base text-blue-700 tabular-nums">
                {formattedAmount}
              </span>
            </div>
          </div>

          {/* Footer stamp */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Electronically signed & verified via NPCI Settlement System</span>
            </div>
            <span>Page 1 of 1</span>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Invoice PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
