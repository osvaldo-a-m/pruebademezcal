import { fetchGraphQL } from './wordpress';
import {
    GET_PRODUCTS_QUERY,
    GET_PRODUCT_BY_SLUG_QUERY,
    GET_PRODUCT_CATEGORIES_QUERY,
} from './queries/products';
import type { Product, ProductCategory } from '../types/woocommerce';

// Response types for GraphQL queries
interface ProductsResponse {
    products: {
        nodes: Product[];
        pageInfo: {
            hasNextPage: boolean;
            endCursor: string;
        };
    };
}

interface ProductResponse {
    product: Product;
}

interface CategoriesResponse {
    productCategories: {
        nodes: ProductCategory[];
    };
}

/**
 * Fetch all products from WooCommerce
 * @param first - Number of products to fetch (default: 100)
 * @param after - Cursor for pagination
 * @returns Array of products
 */
export async function getProducts(
    first: number = 100,
    after?: string
): Promise<Product[]> {
    try {
        const data = await fetchGraphQL<ProductsResponse>(GET_PRODUCTS_QUERY, {
            first,
            after,
        });

        return data.products.nodes.map(transformProduct);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        // Return empty array if WordPress is not configured yet
        return [];
    }
}

/**
 * Fetch a single product by slug
 * @param slug - Product slug
 * @returns Product or null if not found
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
    try {
        const data = await fetchGraphQL<ProductResponse>(
            GET_PRODUCT_BY_SLUG_QUERY,
            { slug }
        );

        return data.product ? transformProduct(data.product) : null;
    } catch (error) {
        console.error(`Failed to fetch product with slug "${slug}":`, error);
        return null;
    }
}

/**
 * Fetch all product categories
 * @returns Array of product categories
 */
export async function getProductCategories(): Promise<ProductCategory[]> {
    try {
        const data = await fetchGraphQL<CategoriesResponse>(
            GET_PRODUCT_CATEGORIES_QUERY
        );

        return data.productCategories.nodes;
    } catch (error) {
        console.error('Failed to fetch product categories:', error);
        return [];
    }
}

/**
 * Transform product data from GraphQL response
 * Normalizes image URLs and data structure
 */
function transformProduct(product: any): Product {
    return {
        ...product,
        image: product.image
            ? {
                id: product.image.id,
                src: product.image.sourceUrl,
                alt: product.image.altText || product.name,
                name: product.image.title || product.name,
            }
            : undefined,
        galleryImages: product.galleryImages?.nodes.map((img: any) => ({
            id: img.id,
            src: img.sourceUrl,
            alt: img.altText || product.name,
            name: img.title || product.name,
        })),
    };
}

/**
 * Filter products by category
 * @param products - Array of products
 * @param categorySlug - Category slug to filter by
 * @returns Filtered products
 */
export function filterProductsByCategory(
    products: Product[],
    categorySlug: string
): Product[] {
    if (!categorySlug || categorySlug === 'all') {
        return products;
    }

    return products.filter((product) =>
        product.productCategories?.nodes.some((cat) => cat.slug === categorySlug)
    );
}

/**
 * Get featured products
 * @param products - Array of products
 * @returns Featured products
 */
export function getFeaturedProducts(products: Product[]): Product[] {
    return products.filter((product) => product.featured);
}

/**
 * Get products on sale
 * @param products - Array of products
 * @returns Products on sale
 */
export function getSaleProducts(products: Product[]): Product[] {
    return products.filter((product) => product.onSale);
}
