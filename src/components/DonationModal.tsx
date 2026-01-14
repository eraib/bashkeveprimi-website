import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaHeart, FaChild, FaHandHoldingHeart, FaGlobe } from 'react-icons/fa';
import { donationsApi } from '../lib/api';
import clsx from 'clsx';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DesignationType = 'general' | 'cause' | 'orphan' | 'project';

interface DesignationOption {
  type: DesignationType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const designationOptions: DesignationOption[] = [
  {
    type: 'general',
    label: 'General Fund',
    icon: <FaGlobe className="w-6 h-6" />,
    description: 'Support where needed most',
  },
  {
    type: 'orphan',
    label: 'Orphan Care',
    icon: <FaChild className="w-6 h-6" />,
    description: 'Help children in need',
  },
  {
    type: 'cause',
    label: 'Active Causes',
    icon: <FaHeart className="w-6 h-6" />,
    description: 'Contribute to ongoing campaigns',
  },
  {
    type: 'project',
    label: 'Projects',
    icon: <FaHandHoldingHeart className="w-6 h-6" />,
    description: 'Support specific initiatives',
  },
];

const presetAmounts = [10, 25, 50, 100, 250, 500];

const DonationModal = ({ isOpen, onClose }: DonationModalProps) => {
  const [step, setStep] = useState<'amount' | 'details' | 'processing'>('amount');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [designation, setDesignation] = useState<DesignationType>('general');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorName, setDonorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const effectiveAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  const handleProceedToDetails = () => {
    if (!effectiveAmount || effectiveAmount < 1) {
      setError('Please enter a minimum donation of €1');
      return;
    }
    setError(null);
    setStep('details');
  };

  const handleDonate = async () => {
    if (!effectiveAmount) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = window.location.origin;
      
      const response = await donationsApi.createCheckoutSession({
        amount_eur_cents: Math.round(effectiveAmount * 100),
        designation_type: designation,
        donor_email: donorEmail || undefined,
        donor_full_name: donorName || undefined,
        is_anonymous: isAnonymous,
        success_url: `${baseUrl}/donation/success`,
        cancel_url: `${baseUrl}/donation/cancel`,
      });

      // Redirect to Stripe Checkout
      window.location.href = response.checkout_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('amount');
    setError(null);
    setIsLoading(false);
    onClose();
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-[#F3F2E7] to-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden my-8 z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#00CFD0] to-[#00A8A9] p-6 text-white flex-shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition"
          >
            <IoClose className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Make a Donation</h2>
          <p className="text-white/80 mt-1">Your generosity changes lives</p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'amount' && (
            <div className="space-y-6">
              {/* Designation Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Where should your donation go?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {designationOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setDesignation(option.type)}
                      className={clsx(
                        'p-4 rounded-xl border-2 transition-all text-left',
                        designation === option.type
                          ? 'border-[#00CFD0] bg-[#00CFD0]/10'
                          : 'border-gray-200 hover:border-[#00CFD0]/50'
                      )}
                    >
                      <div className={clsx(
                        'mb-2',
                        designation === option.type ? 'text-[#00CFD0]' : 'text-gray-500'
                      )}>
                        {option.icon}
                      </div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select an amount
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={clsx(
                        'py-3 px-4 rounded-xl font-bold text-lg transition-all',
                        selectedAmount === amount
                          ? 'bg-[#00CFD0] text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      €{amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or enter a custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                    €
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className={clsx(
                      'w-full pl-10 pr-4 py-3 rounded-xl border-2 text-lg font-medium transition-all text-gray-900 placeholder:text-gray-400',
                      customAmount
                        ? 'border-[#00CFD0] ring-2 ring-[#00CFD0]/20'
                        : 'border-gray-200 focus:border-[#00CFD0] focus:ring-2 focus:ring-[#00CFD0]/20'
                    )}
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Continue Button */}
              <button
                onClick={handleProceedToDetails}
                disabled={!effectiveAmount}
                className={clsx(
                  'w-full py-4 rounded-xl font-bold text-lg transition-all',
                  effectiveAmount
                    ? 'bg-[#00CFD0] text-white hover:bg-[#00b6b7] shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                )}
              >
                {effectiveAmount ? `Continue with €${effectiveAmount.toFixed(2)}` : 'Select an amount'}
              </button>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-6">
              {/* Amount Summary */}
              <div className="p-4 bg-[#00CFD0]/10 rounded-xl border border-[#00CFD0]/30">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Donation Amount</span>
                  <span className="text-2xl font-bold text-[#00CFD0]">€{effectiveAmount?.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {designationOptions.find(d => d.type === designation)?.label}
                </div>
              </div>

              {/* Anonymous Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-medium text-gray-900">Donate Anonymously</div>
                  <div className="text-sm text-gray-500">Your name won't be displayed publicly</div>
                </div>
                <button
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={clsx(
                    'w-12 h-6 rounded-full transition-colors relative',
                    isAnonymous ? 'bg-[#00CFD0]' : 'bg-gray-300'
                  )}
                >
                  <div
                    className={clsx(
                      'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                      isAnonymous ? 'translate-x-6' : 'translate-x-0.5'
                    )}
                  />
                </button>
              </div>

              {/* Contact Info (Optional) */}
              {!isAnonymous && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00CFD0] focus:ring-2 focus:ring-[#00CFD0]/20 transition-all text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00CFD0] focus:ring-2 focus:ring-[#00CFD0]/20 transition-all text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('amount')}
                  className="flex-1 py-4 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleDonate}
                  disabled={isLoading}
                  className={clsx(
                    'flex-2 py-4 px-6 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2',
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#00CFD0] hover:bg-[#00b6b7] shadow-lg hover:shadow-xl'
                  )}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaHeart />
                      Proceed to Payment
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-gray-500">
                You'll be redirected to Stripe for secure payment processing
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
