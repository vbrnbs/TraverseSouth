const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

/**
 * Lightweight, dependency-free GraphQL fetcher for the Shopify Storefront API.
 * Keeps payloads small and ensures seamless compile-time stability.
 */
async function shopifyFetch<T>({
  query,
  variables = {}
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<{ data: T; errors?: any } | null> {
  // If the env variables are missing or mock defaults, return null to activate fallback layers.
  if (
    !domain ||
    !storefrontAccessToken ||
    storefrontAccessToken === 'mock_access_token' ||
    domain.includes('your-store-name') ||
    domain.includes('traverse-south.myshopify.com') // Treat the default template domain as placeholder until live credentials are set
  ) {
    return null;
  }

  try {
    const endpoint = `https://${domain}/api/2024-01/graphql.json`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    if (!response.ok) {
      console.warn(`Shopify responded with status: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Shopify Storefront API request failed:', error);
    return null;
  }
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
}

/**
 * Queries a product from Shopify by its handle (slug matches: fiordland, qt-mtcook, relax).
 */
export async function getShopifyProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        handle
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;

  const result = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query,
    variables: { handle }
  });

  return result?.data?.product || null;
}

/**
 * Server-side checkout URL generation mutation. Creates a cart in Shopify and returns the redirect URL.
 */
export async function createShopifyCheckoutUrl(variantId: string): Promise<string | null> {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: [
        {
          merchandiseId: variantId,
          quantity: 1
        }
      ]
    }
  };

  const result = await shopifyFetch<{
    cartCreate: {
      cart: { checkoutUrl: string } | null;
      userErrors: Array<{ field: string[]; message: string }>;
    } | null;
  }>({
    query,
    variables
  });

  if (result?.data?.cartCreate?.userErrors && result.data.cartCreate.userErrors.length > 0) {
    console.error('Shopify cart creation userErrors:', result.data.cartCreate.userErrors);
  }

  return result?.data?.cartCreate?.cart?.checkoutUrl || null;
}
