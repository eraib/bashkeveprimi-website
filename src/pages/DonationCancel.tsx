import { Link } from 'react-router-dom';
import { FaTimesCircle, FaRedo, FaHome, FaEnvelope } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DonationCancel = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#F3F2E7] to-white flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Cancel Icon */}
          <div className="mx-auto w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <FaTimesCircle className="w-12 h-12 text-gray-400" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Donation Cancelled
          </h1>
          
          <p className="text-gray-600 mb-8">
            No worries! Your payment was not processed. If you experienced any issues 
            or have questions, please don't hesitate to reach out to us.
          </p>

          {/* Encouragement */}
          <div className="bg-[#00CFD0]/5 border border-[#00CFD0]/20 rounded-xl p-6 mb-8">
            <p className="text-gray-700 font-medium mb-2">
              Every contribution matters
            </p>
            <p className="text-sm text-gray-600">
              Even the smallest donation can provide food, water, or education 
              to someone in need. We hope you'll consider trying again.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Link
              to="/"
              className="flex-1 py-3 px-6 bg-[#00CFD0] text-white rounded-xl font-medium hover:bg-[#00b6b7] transition flex items-center justify-center gap-2"
            >
              <FaRedo />
              Try Again
            </Link>
            <Link
              to="/"
              className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <FaHome />
              Return Home
            </Link>
          </div>

          {/* Contact */}
          <div className="border-t pt-6">
            <p className="text-sm text-gray-500 mb-3">Need help with your donation?</p>
            <a
              href="mailto:bashkeveprimi@gmail.com"
              className="inline-flex items-center gap-2 text-[#00CFD0] hover:underline"
            >
              <FaEnvelope />
              bashkeveprimi@gmail.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DonationCancel;
