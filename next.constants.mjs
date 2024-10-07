
// Max item display per page.
export  const MAX_ITEM_PER_PAGE = Number(process.env.MAX_ITEM_PER_PAGE ?? 10);

// Max item display per page in order page.
export  const MAX_ITEM_PER_PAGE_ORDER = Number(process.env.
MAX_ITEM_PER_PAGE_ORDER ?? 6);

// The key tag for get product cache tag.
export const GET_PRODUCTS_CACHE_TAG = 'GET-PRODUCTS-CACHE-TAG';

/**
 * This is used for any place that requires the full canonical URL path for the Node.js Website (and its deployment), such as for example, the Node.js RSS Feed.
 *
 * This variable can either come from the Vercel Deployment as `NEXT_PUBLIC_VERCEL_URL` or from the `NEXT_PUBLIC_BASE_URL` Environment Variable that is manually defined
 * by us if necessary. Otherwise it will fallback to the default Node.js Website URL.
 *
 * @see https://vercel.com/docs/concepts/projects/environment-variables/system-environment-variables#framework-environment-variables
 */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';
