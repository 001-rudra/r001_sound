export type Currency = 'INR' | 'USD';

export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  priceINR: number;
  priceUSD: number;
  originalPriceINR: number;
  originalPriceUSD: number;
  rating: number;
  reviewCount: number;
  description: string;
  specs: { label: string; value: string }[];
  variants: ProductVariant[];
  image: string;
}

export type UpiAppType = 'gpay' | 'phonepe' | 'paytm' | 'bhim' | 'cred';

export interface UpiAppConfig {
  id: UpiAppType;
  name: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  vpaHandle: string;
  iconType: string;
}

export type FlowStage = 1 | 2 | 3;

export type OrderStatus = 'cart' | 'checkout_initiated' | 'upi_opened' | 'upi_paid' | 'utr_submitted' | 'verifying' | 'paid_confirmed' | 'failed';

export interface Order {
  orderId: string;
  productId: string;
  productName: string;
  selectedVariant: string;
  quantity: number;
  amountINR: number;
  amountUSD: number;
  currency: Currency;
  status: OrderStatus;
  vpa: string;
  upiApp: UpiAppType;
  generatedUtr: string;
  submittedUtr?: string;
  createdAt: string;
  verifiedAt?: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
}

export interface AuditRecord {
  id: string;
  orderId: string;
  utr: string;
  amount: string;
  payerName: string;
  bankRef: string;
  submittedAt: string;
  reconciliationStatus: 'auto_matched' | 'manual_review' | 'rejected';
  matchedNote: string;
}
