// WooCommerce Product Types

export interface ProductImage {
    id: string;
    src: string;
    alt: string;
    name: string;
}

export interface ProductCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface Product {
    id: string;
    databaseId: number;
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    price: string;
    regularPrice: string;
    salePrice?: string;
    onSale: boolean;
    stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'ON_BACKORDER';
    stockQuantity?: number;
    image?: ProductImage;
    galleryImages?: ProductImage[];
    productCategories?: {
        nodes: ProductCategory[];
    };
    sku?: string;
    featured: boolean;
    averageRating?: number;
    reviewCount?: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
    subtotal: number;
}

export interface Cart {
    items: CartItem[];
    total: number;
    itemCount: number;
}

export interface OrderLineItem {
    productId: number;
    quantity: number;
}

export interface BillingAddress {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
}

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
}

export interface Order {
    id?: string;
    orderNumber?: string;
    status?: string;
    total?: string;
    lineItems: OrderLineItem[];
    billing: BillingAddress;
    shipping?: ShippingAddress;
    paymentMethod?: string;
    customerNote?: string;
}
