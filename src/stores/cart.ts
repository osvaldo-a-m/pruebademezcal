import { atom, computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import type { Product, CartItem, Cart } from '../types/woocommerce';

// Persistent cart items stored in localStorage
export const cartItems = persistentAtom<CartItem[]>('cart-items', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
});

// Computed cart total
export const cartTotal = computed(cartItems, (items) => {
    return items.reduce((total, item) => total + item.subtotal, 0);
});

// Computed cart item count
export const cartItemCount = computed(cartItems, (items) => {
    return items.reduce((count, item) => count + item.quantity, 0);
});

// Cart visibility state
export const isCartOpen = atom<boolean>(false);

/**
 * Add a product to the cart
 * @param product - Product to add
 * @param quantity - Quantity to add (default: 1)
 */
export function addToCart(product: Product, quantity: number = 1): void {
    const items = cartItems.get();
    const existingItemIndex = items.findIndex(
        (item) => item.product.id === product.id
    );

    if (existingItemIndex > -1) {
        // Update quantity if product already in cart
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += quantity;
        updatedItems[existingItemIndex].subtotal =
            updatedItems[existingItemIndex].quantity *
            parseFloat(product.price || '0');
        cartItems.set(updatedItems);
    } else {
        // Add new item to cart
        const newItem: CartItem = {
            product,
            quantity,
            subtotal: quantity * parseFloat(product.price || '0'),
        };
        cartItems.set([...items, newItem]);
    }
}

/**
 * Remove a product from the cart
 * @param productId - ID of the product to remove
 */
export function removeFromCart(productId: string): void {
    const items = cartItems.get();
    cartItems.set(items.filter((item) => item.product.id !== productId));
}

/**
 * Update the quantity of a product in the cart
 * @param productId - ID of the product
 * @param quantity - New quantity
 */
export function updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const items = cartItems.get();
    const updatedItems = items.map((item) => {
        if (item.product.id === productId) {
            return {
                ...item,
                quantity,
                subtotal: quantity * parseFloat(item.product.price || '0'),
            };
        }
        return item;
    });
    cartItems.set(updatedItems);
}

/**
 * Clear all items from the cart
 */
export function clearCart(): void {
    cartItems.set([]);
}

/**
 * Get the current cart state
 * @returns Cart object with items, total, and item count
 */
export function getCart(): Cart {
    const items = cartItems.get();
    return {
        items,
        total: cartTotal.get(),
        itemCount: cartItemCount.get(),
    };
}

/**
 * Toggle cart visibility
 */
export function toggleCart(): void {
    isCartOpen.set(!isCartOpen.get());
}

/**
 * Open the cart
 */
export function openCart(): void {
    isCartOpen.set(true);
}

/**
 * Close the cart
 */
export function closeCart(): void {
    isCartOpen.set(false);
}
