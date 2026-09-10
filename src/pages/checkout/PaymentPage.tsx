import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  QrCode, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  Copy,
  Check
} from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const { linkToken } = useParams<{ linkToken?: string }>();
  const [isPaid, setIsPaid] = useState(false);
  const [copied, setCopied] = useState(false);
  const [method, setMethod] = useState<'UPI' | 'BANK'>('UPI');

  const utr = `625390918231`;

  return (
    <div className="min-h-screen bg-[#060814] text-gray-100 flex flex-col items-center justify-center p-4 bg-grid-pattern">
      <div className="w-full max-w-md bg-[#0d1226] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-white text-xs">
              P
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white block">PayuLink Checkout</span>
              <span className="text-[10px] text-gray-400">100% Encrypted & RBI Guideline Compliant</span>
            </div>
          </div>
          <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" /> Secure
          </span>
        </div>

        {!isPaid ? (
          <>
            {/* Amount Banner */}
            <div className="text-center py-2 space-y-1">
              <span className="text-xs text-gray-400">Total Payable Amount</span>
              <div className="text-3xl font-bold font-mono text-white">₹25,000.00</div>
              <p className="text-xs text-orange-400 font-medium">DeltaPay FinTech Retainer Invoice</p>
            </div>

            {/* Method Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
              <button
                onClick={() => setMethod('UPI')}
                className={`py-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                  method === 'UPI' ? 'bg-orange-500 text-white font-semibold shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                UPI QR Code
              </button>
              <button
                onClick={() => setMethod('BANK')}
                className={`py-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                  method === 'BANK' ? 'bg-orange-500 text-white font-semibold shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Virtual Bank
              </button>
            </div>

            {method === 'UPI' ? (
              <div className="space-y-4">
                {/* QR Box */}
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white rounded-2xl shadow-xl">
                  <div className="w-44 h-44 bg-gray-950 rounded-xl p-3 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-10 h-10 border-4 border-orange-500 rounded-lg" />
                      <div className="w-10 h-10 border-4 border-orange-500 rounded-lg" />
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="font-bold text-xs tracking-wider text-orange-400 font-mono">PAYULINK</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-10 h-10 border-4 border-orange-500 rounded-lg" />
                      <div className="w-4 h-4 bg-orange-500 rounded-sm self-end" />
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-600 font-mono mt-2 font-medium">VPA: payu.deltapay@icici</span>
                </div>

                <p className="text-center text-[11px] text-gray-400">
                  Scan using Google Pay, PhonePe, Paytm, or BHIM UPI
                </p>

                <button
                  onClick={() => setIsPaid(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-xs shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all"
                >
                  Simulate Successful UPI Payment
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-gray-400 block">Virtual Account Number</span>
                  <span className="font-mono font-bold text-white text-sm">VA99102837465012</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-gray-400 block">Bank & IFSC</span>
                  <span className="font-mono font-bold text-white text-sm">ICICI Bank • ICIC0000104</span>
                </div>
                <button
                  onClick={() => setIsPaid(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-xs shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all mt-3"
                >
                  Simulate Bank Transfer Completed
                </button>
              </div>
            )}
          </>
        ) : (
          /* Success Receipt Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h2 className="font-bold text-lg text-white">Payment Successful!</h2>
              <p className="text-xs text-gray-400 mt-0.5">Your transaction has been processed instantly.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono text-left">
              <div className="flex justify-between text-gray-400">
                <span>Amount Paid:</span>
                <span className="text-white font-bold">₹25,000.00</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Bank UTR:</span>
                <span className="text-emerald-400 font-bold">{utr}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Timestamp:</span>
                <span className="text-white">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <Link
              to="/merchant/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:underline pt-2 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Merchant Portal
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
