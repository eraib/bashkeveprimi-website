import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaHeart, FaHome, FaShareAlt } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { donationsApi, type VerifyDonationResponse } from '../lib/api';

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const donationId = searchParams.get('donation_id');
  const sessionId = searchParams.get('session_id');
  const [showConfetti, setShowConfetti] = useState(true);
  const [donationDetails, setDonationDetails] = useState<VerifyDonationResponse | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Verify the donation to update status in backend
    const verifyDonation = async () => {
      try {
        const result = await donationsApi.verifyDonation({
          session_id: sessionId || undefined,
          donation_id: donationId || undefined,
        });
        setDonationDetails(result);
      } catch (error) {
        console.error('Failed to verify donation:', error);
      } finally {
        setIsVerifying(false);
      }
    };

    if (sessionId || donationId) {
      verifyDonation();
    } else {
      setIsVerifying(false);
    }
  }, [sessionId, donationId]);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#F3F2E7] to-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  backgroundColor: ['#00CFD0', '#FF6B6B', '#FFE66D', '#4ECDC4', '#95E1D3'][Math.floor(Math.random() * 5)],
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`,
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                }}
              />
            ))}
          </div>
        )}

        <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 text-center relative z-10">
          {/* Success Icon */}
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-[#00CFD0]/20 rounded-full animate-ping" />
            <div className="relative w-full h-full bg-gradient-to-br from-[#00CFD0] to-[#00A8A9] rounded-full flex items-center justify-center">
              <FaCheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Thank You for Your Generosity!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Your donation has been successfully processed. Together, we are making a real difference 
            in the lives of those who need it most.
          </p>

          {/* Heart Animation */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <FaHeart
                key={i}
                className="text-[#FF6B6B] animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          {/* Donation Details */}
          {isVerifying ? (
            <div className="bg-gray-50 rounded-xl p-4 mb-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-2" />
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
            </div>
          ) : donationDetails ? (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Amount</span>
                <span className="text-xl font-bold text-[#00CFD0]">€{donationDetails.amount}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Designation</span>
                <span className="text-sm text-gray-700">{donationDetails.designation}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-500">Reference</span>
                <span className="font-mono text-gray-700">#{donationDetails.donation_id}</span>
              </div>
            </div>
          ) : donationId ? (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500">Donation Reference</p>
              <p className="font-mono text-gray-700">#{donationId}</p>
            </div>
          ) : null}

          {/* What Happens Next */}
          <div className="bg-[#00CFD0]/5 border border-[#00CFD0]/20 rounded-xl p-4 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• You'll receive a confirmation email shortly</li>
              <li>• Your donation will be allocated to help those in need</li>
              <li>• We'll keep you updated on the impact of your contribution</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="flex-1 py-3 px-6 bg-[#00CFD0] text-white rounded-xl font-medium hover:bg-[#00b6b7] transition flex items-center justify-center gap-2"
            >
              <FaHome />
              Return Home
            </Link>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'I just donated to Bashkeveprimi!',
                    text: 'Join me in supporting those in need. Every donation makes a difference.',
                    url: window.location.origin,
                  });
                }
              }}
              className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <FaShareAlt />
              Share
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {/* Confetti Keyframes */}
      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </>
  );
};

export default DonationSuccess;
