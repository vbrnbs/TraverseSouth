'use server';

import { createShopifyCheckoutUrl } from './client';

export interface CheckoutResult {
  url: string;
  isMock: boolean;
}

/**
 * Server Action to securely generate a checkout session.
 * If live Shopify configuration is missing, it falls back to a custom interactive checkout simulation.
 */
export async function handleCheckoutAction(
  variantId: string | null,
  slug: string
): Promise<CheckoutResult> {
  // Simulate active network handshakes for premium feel
  await new Promise((resolve) => setTimeout(resolve, 1800));

  if (variantId) {
    try {
      const checkoutUrl = await createShopifyCheckoutUrl(variantId);
      if (checkoutUrl) {
        return {
          url: checkoutUrl,
          isMock: false
        };
      }
    } catch (error) {
      console.error('Failed to create Shopify checkout, reverting to premium simulation:', error);
    }
  }

  // Fallback to our elegant client simulation route
  return {
    url: `/packages/${slug}/simulation`,
    isMock: true
  };
}
