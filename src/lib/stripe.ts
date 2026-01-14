import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublicKey) {
  console.warn('Stripe publishable key not found. Make sure VITE_STRIPE_PUBLISHABLE_KEY is set.');
}

export const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;
