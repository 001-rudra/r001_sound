import React, { useState } from 'react';
import { AuditRecord, Order } from '../types/payment';
import { INITIAL_AUDIT_RECORDS } from '../data/mockData';
import {
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowUpDown,
  Building2,
  Download,
  AlertTriangle,
  Check,
} from 'lucide-react';

interface MerchantAuditLedgerProps {
  currentOrder: Order;
  isOrderConfirmed: boolean;
}

export const MerchantAuditLedger: React.FC<MerchantAuditLedgerProps> = ({
  currentOrder,
  isOrderConfirmed,
}) => {
  const [records, setRecords] = useState<AuditRecord[]>(INITIAL_AUDIT_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');

  // Dynamically insert current confirmed order into the ledger if marked paid
  const allRecords = isOrderConfirmed
    ? [
        {
          id: 'rec-live',
          orderId: currentOrder.orderId,
          utr: currentOrder.submittedUtr || currentOrder.generatedUtr,
          amount: currentOrder.currency === 'INR' ? '₹14,999.00' : '$189.00',
          payerName: 'Customer (Current Demo)',
          bankRef: `State Bank of India - NPCI/UPI/${currentOrder.submittedUtr || currentOrder.generatedUtr}`,
          submittedAt: 'Just Now (Live)',
          reconciliationStatus: 'auto_matched' as const,
          matchedNote: 'Instant UTR format matched with settlement webhook.',
        },
        ...records,
      ]
    : records;

  const filteredRecords = allRecords.filter(
    (r) =>
      r.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.utr.includes(searchTerm) ||
      r.payerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              MERCHANT BACKEND
            </span>
            <span className="text-xs text-slate-500">r001 sound Labs Inc.</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
            UPI UTR Reconciliation Ledger
          </h2>
          <p className="text-xs text-slate-600">
            Real-time feed of submitted reference numbers and automated bank statement match status.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-right">
            <p className="text-[10px] uppercase font-bold text-slate-500">Auto-Match Rate</p>
            <p className="text-base font-extrabold text-emerald-600 tabular-nums">99.4%</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-right">
            <p className="text-[10px] uppercase font-bold text-slate-500">Today's Settlements</p>
            <p className="text-base font-extrabold text-slate-900 tabular-nums">
              ₹{(14999 * (allRecords.length + 4)).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Order ID, UTR, or Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs text-slate-600">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Bank Statement Sync: Connected
          </span>
        </div>
      </div>

      {/* Reconciliation Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Submitted 12-Digit UTR</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Payer / Source</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Bank Verification Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRecords.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                  {record.orderId}
                  {record.id === 'rec-live' && (
                    <span className="ml-2 text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                      LIVE
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 font-mono font-semibold text-blue-700 tracking-wider">
                  {record.utr}
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900 tabular-nums">
                  {record.amount}
                </td>
                <td className="py-3.5 px-4 text-slate-700">
                  <p className="font-medium">{record.payerName}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{record.bankRef}</p>
                </td>
                <td className="py-3.5 px-4 text-slate-500">{record.submittedAt}</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Reconciled & Paid
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">{record.matchedNote}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
        <p>
          💡 <strong>How it works:</strong> When a customer submits their 12-digit UTR on Stage 3, the store server matches it against the merchant account's RTGS/NEFT/UPI statement feed. Upon match, the order state switches to <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-700">paid_confirmed</code> and fulfillment begins.
        </p>
      </div>
    </div>
  );
};
