// WordPress REST API Integration Utilities
// Configure these settings to connect to your WordPress backend

/**
 * WordPress Configuration
 * Update these values with your WordPress site details
 */
export const WP_CONFIG = {
    // Your WordPress site URL (e.g., 'https://yoursite.com')
    baseUrl: process.env.WP_BASE_URL || 'https://your-wordpress-site.com',

    // WordPress REST API endpoint
    apiPath: '/wp-json/wp/v2',

    // Custom post type endpoints (if using WooCommerce or custom CPT)
    endpoints: {
        products: '/wp-json/wc/v3/products', // WooCommerce products
        pages: '/wp-json/wp/v2/pages',
        posts: '/wp-json/wp/v2/posts',
        media: '/wp-json/wp/v2/media',
        // Add custom endpoints as needed
    },

    // Authentication (if needed for private content)
    auth: {
        consumerKey: process.env.WP_CONSUMER_KEY || '',
        consumerSecret: process.env.WP_CONSUMER_SECRET || '',
    }
};

/**
 * Fetch data from WordPress REST API
 * @param {string} endpoint - API endpoint path
 * @param {object} params - Query parameters
 * @returns {Promise} - Fetched data
 */
export async function fetchFromWordPress(endpoint, params = {}) {
    const url = new URL(`${WP_CONFIG.baseUrl}${endpoint}`);

    // Add query parameters
    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });

    // Add authentication if configured
    if (WP_CONFIG.auth.consumerKey && WP_CONFIG.auth.consumerSecret) {
        url.searchParams.append('consumer_key', WP_CONFIG.auth.consumerKey);
        url.searchParams.append('consumer_secret', WP_CONFIG.auth.consumerSecret);
    }

    try {
        const response = await fetch(url.toString(), {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching from WordPress:', error);
        throw error;
    }
}

/**
 * Get all products from WordPress/WooCommerce
 * @param {object} filters - Filter parameters (category, per_page, etc.)
 * @returns {Promise<Array>} - Array of products
 */
export async function getProducts(filters = {}) {
    const params = {
        per_page: 100,
        status: 'publish',
        ...filters
    };

    return await fetchFromWordPress(WP_CONFIG.endpoints.products, params);
}

/**
 * Get a single product by slug
 * @param {string} slug - Product slug
 * @returns {Promise<object>} - Product data
 */
export async function getProductBySlug(slug) {
    const products = await fetchFromWordPress(WP_CONFIG.endpoints.products, {
        slug: slug,
        per_page: 1
    });

    return products[0] || null;
}

/**
 * Get all product categories
 * @returns {Promise<Array>} - Array of categories
 */
export async function getProductCategories() {
    return await fetchFromWordPress('/wp-json/wc/v3/products/categories', {
        per_page: 100
    });
}

/**
 * Get a page by slug
 * @param {string} slug - Page slug
 * @returns {Promise<object>} - Page data
 */
export async function getPageBySlug(slug) {
    const pages = await fetchFromWordPress(WP_CONFIG.endpoints.pages, {
        slug: slug,
        per_page: 1
    });

    return pages[0] || null;
}

/**
 * Get site options/settings
 * This requires a custom endpoint in WordPress
 * @returns {Promise<object>} - Site settings
 */
export async function getSiteSettings() {
    return await fetchFromWordPress('/wp-json/custom/v1/settings');
}

/**
 * Transform WooCommerce product to our data structure
 * @param {object} wpProduct - WordPress/WooCommerce product
 * @returns {object} - Transformed product
 */
export function transformWPProduct(wpProduct) {
    return {
        id: wpProduct.id,
        slug: wpProduct.slug,
        name: wpProduct.name,
        category: wpProduct.categories[0]?.name || 'Mezcal',
        description: wpProduct.short_description || wpProduct.description,
        price: parseFloat(wpProduct.price),
        discountPrice: wpProduct.sale_price ? parseFloat(wpProduct.sale_price) : null,
        abv: wpProduct.attributes?.find(attr => attr.name === 'ABV')?.options[0] || '',
        volume: wpProduct.attributes?.find(attr => attr.name === 'Volume')?.options[0] || '750ml',
        image: wpProduct.images[0]?.src || '',
        badge: wpProduct.tags[0]?.name || null,
        inStock: wpProduct.stock_status === 'instock',
        stockCount: wpProduct.stock_quantity || 0,
        tastingNotes: {
            nose: wpProduct.meta_data?.find(m => m.key === 'tasting_nose')?.value || '',
            palate: wpProduct.meta_data?.find(m => m.key === 'tasting_palate')?.value || '',
            finish: wpProduct.meta_data?.find(m => m.key === 'tasting_finish')?.value || ''
        },
        productionDetails: {
            masterDistiller: wpProduct.meta_data?.find(m => m.key === 'master_distiller')?.value || '',
            agave: wpProduct.meta_data?.find(m => m.key === 'agave_type')?.value || '',
            region: wpProduct.meta_data?.find(m => m.key === 'region')?.value || '',
            process: wpProduct.meta_data?.find(m => m.key === 'process')?.value || ''
        },
        gallery: wpProduct.images?.map(img => img.src) || []
    };
}

/**
 * USAGE EXAMPLE:
 * 
 * In your Astro pages, replace static imports with WordPress API calls:
 * 
 * // Before (static data):
 * import { products } from '../lib/data.js';
 * 
 * // After (WordPress data):
 * import { getProducts, transformWPProduct } from '../lib/wordpress.js';
 * const wpProducts = await getProducts();
 * const products = wpProducts.map(transformWPProduct);
 * 
 * For dynamic routes like [slug].astro:
 * 
 * export async function getStaticPaths() {
 *   const wpProducts = await getProducts();
 *   return wpProducts.map(product => ({
 *     params: { slug: product.slug },
 *     props: { product: transformWPProduct(product) }
 *   }));
 * }
 */
