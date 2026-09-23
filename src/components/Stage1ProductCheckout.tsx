import React, { useState } from 'react';
import { Product, Currency, UpiAppType } from '../types/payment';
import { UPI_APPS } from '../data/mockData';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  Smartphone,
  QrCode,
  ArrowRight,
  Headphones,
} from 'lucide-react';

interface Stage1ProductCheckoutProps {
  product: Product;
  currency: Currency;
  selectedVariant: string;
  setSelectedVariant: (variantId: string) => void;
  selectedUpiApp: UpiAppType;
  setSelectedUpiApp: (app: UpiAppType) => void;
  onOpenUpiApp: () => void;
  isCompact?: boolean;
}

export const Stage1ProductCheckout: React.FC<Stage1ProductCheckoutProps> = ({
  product,
  currency,
  selectedVariant,
  setSelectedVariant,
  selectedUpiApp,
  setSelectedUpiApp,
  onOpenUpiApp,
  isCompact = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [cartAdded, setCartAdded] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [showQrCode, setShowQrCode] = useState(false);

  const price = currency === 'INR' ? product.priceINR : product.priceUSD;
  const originalPrice = currency === 'INR' ? product.originalPriceINR : product.originalPriceUSD;
  const currencySymbol = currency === 'INR' ? '₹' : '$';
  const subtotal = price * quantity;
  const savings = (originalPrice - price) * quantity;

  const handleAddToCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2400);
  };

  const currentVariantObj = product.variants.find((v) => v.id === selectedVariant) || product.variants[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Stage Header Kicker */}
      <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
            1
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-300">
            Stage 1: The Product & Checkout Page
          </span>
        </div>
        <span className="text-xs text-slate-400">Regular Web Store</span>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
        {/* Product Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Product Image Frame */}
          <div className="md:col-span-5 relative group">
            <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center relative shadow-inner">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback container in case image load fails
                  (e.target as HTMLElement).style.display = 'none';
                  const fallback = (e.target as HTMLElement).parentElement?.querySelector('.img-fallback');
                  if (fallback) {
                    (fallback as HTMLElement).classList.remove('hidden');
                  }
                }}
              />
              <div className="img-fallback hidden absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
                <Headphones className="w-12 h-12 text-blue-400 mb-2 stroke-[1.5]" />
                <span className="text-sm font-semibold">{product.name}</span>
                <span className="text-xs text-slate-400 mt-1">Spatial Audio Edition</span>
              </div>

              {/* Verified Product Watermark */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-800 shadow-xs border border-slate-200/80 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>2026 Flagship</span>
              </div>
            </div>

            {/* Micro Value Props */}
            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="bg-slate-50 border border-slate-200/80 p-1.5 rounded-lg">
                <p className="text-[10px] text-slate-500 font-medium">Noise Cancelling</p>
                <p className="text-xs font-bold text-slate-800">-42dB Hybrid</p>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 p-1.5 rounded-lg">
                <p className="text-[10px] text-slate-500 font-medium">Battery</p>
                <p className="text-xs font-bold text-slate-800">45 Hours</p>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 p-1.5 rounded-lg">
                <p className="text-[10px] text-slate-500 font-medium">Drivers</p>
                <p className="text-xs font-bold text-slate-800">40mm Bio-Cell</p>
              </div>
            </div>
          </div>

          {/* Product Details & Selection */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-semibold text-blue-600">R001 SOUND LABS</span>
                <span>·</span>
                <span>Model QM-H1</span>
                <span>·</span>
                <span className="text-emerald-600 font-medium">In Stock</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                {product.name}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pt-1 border-t border-slate-100">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">
                {currencySymbol}
                {price.toLocaleString()}
              </span>
              <span className="text-sm text-slate-400 line-through tabular-nums">
                {currencySymbol}
                {originalPrice.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Save {currencySymbol}
                {savings.toLocaleString()}
              </span>
            </div>

            {/* Variant Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                <span>Color Finish:</span>
                <span className="text-slate-900 font-bold">{currentVariantObj.name}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedVariant === variant.id
                        ? 'border-blue-600 bg-blue-50/60 text-blue-900 shadow-xs ring-1 ring-blue-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: variant.colorHex }}
                    />
                    <span>{variant.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Prominent Blue "Add to Cart" Button */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 p-0.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-white rounded transition-colors text-sm font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold tabular-nums text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                  className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-white rounded transition-colors text-sm font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Prompt Required: Prominent blue "Add to Cart" button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg font-semibold text-xs transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                {cartAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <span>Add to Cart</span>
                    <span className="opacity-80">·</span>
                    <span className="tabular-nums">
                      {currencySymbol}
                      {subtotal.toLocaleString()}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Section: Payment Method Selection */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Select Payment Method</span>
            </h3>
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              256-Bit NPCI Encrypted
            </span>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => setActivePaymentMethod('upi')}
              className={`p-2.5 rounded-xl border text-left transition-all relative ${
                activePaymentMethod === 'upi'
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">UPI Payment</span>
                {/* UPI Official Logo representation */}
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                  UPI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Instant App Transfer (GPay / PhonePe)</p>
            </button>

            <button
              onClick={() => setActivePaymentMethod('card')}
              className="p-2.5 rounded-xl border border-slate-200 text-left opacity-60 hover:opacity-80 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Cards</span>
                <span className="text-[9px] text-slate-400">Debit / Credit</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Visa, Mastercard</p>
            </button>

            <button
              onClick={() => setActivePaymentMethod('netbanking')}
              className="p-2.5 rounded-xl border border-slate-200 text-left opacity-60 hover:opacity-80 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Net Banking</span>
                <span className="text-[9px] text-slate-400">All Banks</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">50+ Indian Banks</p>
            </button>
          </div>

          {/* Prompt Required: Above checkout total, large clear section for UPI Payment featuring UPI logo */}
          {activePaymentMethod === 'upi' && (
            <div className="bg-gradient-to-br from-blue-50/70 via-slate-50 to-indigo-50/40 rounded-xl p-4 border border-blue-200 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white border border-blue-300 flex items-center justify-center shadow-xs">
                    <span className="text-xs font-black text-blue-700 tracking-tighter">UPI</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Unified Payments Interface (UPI)
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Zero convenience fees · Direct mobile authorization
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowQrCode(!showQrCode)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-white px-2 py-1 rounded-md border border-blue-200 shadow-2xs"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{showQrCode ? 'Hide QR' : 'Show QR'}</span>
                </button>
              </div>

              {/* Choice of UPI Apps */}
              <div>
                <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                  Select installed UPI Application:
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {UPI_APPS.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => setSelectedUpiApp(app.id)}
                      className={`p-2 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all ${
                        selectedUpiApp === app.id
                          ? 'border-blue-600 bg-white shadow-xs ring-1 ring-blue-600'
                          : 'border-slate-200 bg-white/70 hover:bg-white text-slate-600'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                        style={{ backgroundColor: app.color }}
                      >
                        {app.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-medium truncate w-full text-center">
                        {app.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* QR Code toggle fallback */}
              {showQrCode && (
                <div className="bg-white p-3 rounded-lg border border-blue-200 flex items-center gap-4 text-left">
                  <div className="w-20 h-20 bg-slate-900 p-1.5 rounded-md flex items-center justify-center shrink-0">
                    {/* Simulated vector QR code */}
                    <div className="w-full h-full bg-white p-1 grid grid-cols-4 gap-0.5">
                      <div className="bg-slate-900" />
                      <div className="bg-slate-900" />
                      <div className="bg-slate-200" />
                      <div className="bg-slate-900" />
                      <div className="bg-slate-900" />
                      <div className="bg-white" />
                      <div className="bg-slate-900" />
                      <div className="bg-slate-200" />
                      <div className="bg-slate-200" />
                      <div className="bg-slate-900" />
                      <div className="bg-slate-900" />
                      <div className="bg-slate-900" />
                      <div className="bg-slate-900" />
                      <div className="bg-slate-200" />
                      <div className="bg-slate-900" />
                      <div className="bg-slate-900" />
                    </div>
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">Scan to Pay via Any UPI App</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      VPA: <span className="font-mono text-blue-700">pay@r001sound</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Works with GPay, PhonePe, Paytm, BHIM & 100+ banking apps
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Checkout Total calculation */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mt-3 space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Item Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
              <span className="font-mono tabular-nums text-slate-800">
                {currencySymbol}{subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-blue-600" />
                Express Shipping
              </span>
              <span className="text-emerald-700 font-semibold uppercase text-[11px]">Free</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>GST / Taxes Included (18%)</span>
              <span className="text-slate-500 font-mono text-[11px]">₹0 additional</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-900">Total Payable Amount</span>
              <span className="text-xl font-extrabold text-blue-700 tabular-nums">
                {currencySymbol}{subtotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Prompt Required: Under this option, there is a large blue button that reads "[Customer Click Pay] -> OPEN UPI APP" */}
          <div className="mt-4">
            <button
              onClick={onOpenUpiApp}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-blue-200 group-hover:scale-110 transition-transform" />
              <span>[Customer Click Pay] → OPEN UPI APP</span>
              <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-2">
              Opens {UPI_APPS.find((a) => a.id === selectedUpiApp)?.name} on device · Intent Deeplink
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
