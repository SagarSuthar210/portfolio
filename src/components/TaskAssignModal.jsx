import React, { useState, useEffect } from 'react';
import { X, Zap, DollarSign, User, MessageSquare, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { RAZORPAY_KEY_ID, PAYMENT_BACKEND_URL, PAYMENT_CURRENCY, MERCHANT_NAME, MERCHANT_DESCRIPTION } from '../config/razorpay';

// Lazily load Razorpay Checkout.js
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function TaskAssignModal({ isOpen, onClose, onToast }) {
  const [step, setStep] = useState('form'); // 'form' | 'processing' | 'success' | 'error'
  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    taskDescription: '',
    amount: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setForm({ clientName: '', clientEmail: '', taskDescription: '', amount: '' });
      setErrorMsg('');
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return (
      form.clientName.trim().length > 0 &&
      form.clientEmail.trim().length > 0 &&
      form.taskDescription.trim().length > 0 &&
      parseFloat(form.amount) > 0
    );
  };

  const handlePay = async () => {
    if (!isFormValid()) return;

    setStep('processing');
    setErrorMsg('');

    try {
      // 1. Load Razorpay Checkout.js
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK. Please check your connection and try again.');
      }

      // 2. Create order on your backend
      const amountInCents = Math.round(parseFloat(form.amount) * 100); // Razorpay expects paise/cents
      const orderRes = await fetch(`${PAYMENT_BACKEND_URL}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInCents,
          currency: PAYMENT_CURRENCY,
          clientName: form.clientName.trim(),
          clientEmail: form.clientEmail.trim(),
          taskDescription: form.taskDescription.trim(),
        }),
      });

      if (!orderRes.ok) {
        const errData = await orderRes.json().catch(() => ({}));
        throw new Error(errData.error || `Order creation failed (${orderRes.status})`);
      }

      const orderData = await orderRes.json();

      // 3. Open Razorpay Checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amountInCents,
        currency: PAYMENT_CURRENCY,
        name: MERCHANT_NAME,
        description: MERCHANT_DESCRIPTION,
        order_id: orderData.orderId,
        prefill: {
          name: form.clientName.trim(),
          email: form.clientEmail.trim(),
        },
        notes: {
          task: form.taskDescription.trim().substring(0, 255),
        },
        theme: {
          color: '#0f172a', // Sleek slate-900 to match portfolio theme
        },
        handler: async function (response) {
          // 4. Verify payment on backend
          try {
            const verifyRes = await fetch(`${PAYMENT_BACKEND_URL}/api/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) throw new Error('Verification failed');

            setStep('success');
            if (onToast) onToast('Payment successful! Task assigned.');
          } catch (err) {
            setStep('error');
            setErrorMsg('Payment received but verification failed. Please contact me with your payment ID: ' + response.razorpay_payment_id);
          }
        },
        modal: {
          ondismiss: function () {
            setStep('form');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        setStep('error');
        setErrorMsg(response.error?.description || 'Payment failed. Please try again.');
      });
      razorpay.open();
    } catch (err) {
      setStep('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white border border-slate-200/90 rounded-2xl md:rounded-3xl shadow-2xl shadow-slate-900/20 overflow-hidden z-10 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-emerald-600" />
            </div>
            <h2 id="task-modal-title" className="text-xl font-bold text-slate-900 font-heading">
              Assign Me a Task
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Describe what you need, enter the agreed amount in USD, and pay securely via Razorpay.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {step === 'form' && (
            <div className="space-y-4">
              {/* Client Name */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                  <User className="w-3.5 h-3.5 text-slate-700" />
                  Your Name
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={form.clientName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors shadow-xs"
                />
              </div>

              {/* Client Email */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-700" />
                  Your Email
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={form.clientEmail}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors shadow-xs"
                />
              </div>

              {/* Task Description */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-700" />
                  Task Description
                </label>
                <textarea
                  name="taskDescription"
                  value={form.taskDescription}
                  onChange={handleChange}
                  placeholder="Describe the task, scope, and any relevant details..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors resize-none shadow-xs"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  Payment Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-emerald-600">$</span>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                    className="w-full pl-8 pr-3.5 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors shadow-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
              <p className="text-sm text-slate-800 font-medium">Preparing secure payment...</p>
              <p className="text-xs text-slate-500">Razorpay checkout will open shortly.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">Payment Successful!</h3>
              <p className="text-sm text-slate-600 max-w-xs">
                Thank you! Your task has been assigned. I'll review the details and get back to you at <span className="text-slate-900 font-semibold">{form.clientEmail}</span> shortly.
              </p>
            </div>
          )}

          {step === 'error' && (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">Something Went Wrong</h3>
              <p className="text-sm text-slate-600 max-w-xs">{errorMsg}</p>
              <button
                onClick={() => setStep('form')}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step === 'form' && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handlePay}
              disabled={!isFormValid()}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all duration-200 cursor-pointer ${
                isFormValid()
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-emerald-500/20 hover:-translate-y-0.5'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>{form.amount && parseFloat(form.amount) > 0 ? `Pay $${parseFloat(form.amount).toFixed(2)} & Assign` : 'Pay & Assign Task'}</span>
            </button>
          </div>
        )}

        {(step === 'success' || step === 'error') && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer border border-slate-200 bg-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
