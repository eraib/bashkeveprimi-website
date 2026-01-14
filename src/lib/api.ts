/**
 * API client for Bashkeveprimi backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

interface CheckoutSessionRequest {
  amount_eur_cents: number;
  designation_type?: 'general' | 'cause' | 'project' | 'orphan';
  designation_slug?: string;
  donor_email?: string;
  donor_full_name?: string;
  is_anonymous?: boolean;
  success_url: string;
  cancel_url: string;
}

interface CheckoutSessionResponse {
  checkout_url: string;
  donation_intent_id: number;
}

interface ApiError {
  error: string;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API Error: ${response.status}`);
  }

  return response.json();
}

interface VerifyDonationResponse {
  donation_id: number;
  status: 'created' | 'pending' | 'succeeded' | 'failed' | 'canceled' | 'refunded';
  amount: string;
  designation: string;
}

export const donationsApi = {
  /**
   * Create a Stripe checkout session for a donation
   */
  createCheckoutSession: async (data: CheckoutSessionRequest): Promise<CheckoutSessionResponse> => {
    return apiRequest<CheckoutSessionResponse>('/donations/checkout-session/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Verify a donation status with Stripe
   */
  verifyDonation: async (params: { session_id?: string; donation_id?: string }): Promise<VerifyDonationResponse> => {
    const searchParams = new URLSearchParams();
    if (params.session_id) searchParams.set('session_id', params.session_id);
    if (params.donation_id) searchParams.set('donation_id', params.donation_id);
    
    return apiRequest<VerifyDonationResponse>(`/donations/verify/?${searchParams.toString()}`);
  },

  /**
   * Get recent public donations
   */
  getRecentDonations: async () => {
    return apiRequest('/donations/recent_public/');
  },
};

export type { CheckoutSessionRequest, CheckoutSessionResponse, VerifyDonationResponse };
