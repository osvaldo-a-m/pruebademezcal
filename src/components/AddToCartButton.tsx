import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { addToCart, cartItemCount } from '../stores/cart';
import type { Product } from '../types/woocommerce';

interface AddToCartButtonProps {
    product: Product;
    className?: string;
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const itemCount = useStore(cartItemCount);

    const handleAddToCart = () => {
        setIsAdding(true);

        // Add to cart
        addToCart(product, quantity);

        // Show success feedback
        setTimeout(() => {
            setIsAdding(false);
            setShowSuccess(true);

            // Hide success message after 2 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
        }, 300);
    };

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const isOutOfStock = product.stockStatus === 'OUT_OF_STOCK';

    return (
        <div className={`add-to-cart-container ${className}`}>
            {!isOutOfStock && (
                <div className="quantity-selector">
                    <button
                        onClick={decrementQuantity}
                        className="quantity-btn"
                        aria-label="Decrease quantity"
                        disabled={quantity <= 1}
                    >
                        −
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="quantity-input"
                        min="1"
                        aria-label="Quantity"
                    />
                    <button
                        onClick={incrementQuantity}
                        className="quantity-btn"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            )}

            <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAdding}
                className={`add-to-cart-btn ${isAdding ? 'adding' : ''} ${showSuccess ? 'success' : ''}`}
            >
                {isOutOfStock ? (
                    'Out of Stock'
                ) : showSuccess ? (
                    <>
                        <svg className="checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Added to Cart!
                    </>
                ) : isAdding ? (
                    'Adding...'
                ) : (
                    'Add to Cart'
                )}
            </button>

            <style>{`
        .add-to-cart-container {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--color-border, #2d4a3e);
          border-radius: 0.5rem;
          overflow: hidden;
          background: var(--color-bg-secondary, #1a2f26);
        }

        .quantity-btn {
          padding: 0.5rem 0.75rem;
          background: transparent;
          border: none;
          color: var(--color-text, #e8f5e1);
          font-size: 1.25rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .quantity-btn:hover:not(:disabled) {
          background: var(--color-hover, #2d4a3e);
        }

        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-input {
          width: 3rem;
          padding: 0.5rem;
          text-align: center;
          border: none;
          border-left: 1px solid var(--color-border, #2d4a3e);
          border-right: 1px solid var(--color-border, #2d4a3e);
          background: transparent;
          color: var(--color-text, #e8f5e1);
          font-size: 1rem;
        }

        .quantity-input::-webkit-inner-spin-button,
        .quantity-input::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .add-to-cart-btn {
          flex: 1;
          padding: 0.75rem 1.5rem;
          background: var(--color-primary, #7cb342);
          color: var(--color-bg, #0a1612);
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-width: 150px;
        }

        .add-to-cart-btn:hover:not(:disabled) {
          background: var(--color-primary-hover, #8bc34a);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(124, 179, 66, 0.3);
        }

        .add-to-cart-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .add-to-cart-btn.adding {
          background: var(--color-primary-hover, #8bc34a);
        }

        .add-to-cart-btn.success {
          background: #4caf50;
        }

        .checkmark {
          width: 1.25rem;
          height: 1.25rem;
          animation: checkmark-pop 0.3s ease;
        }

        @keyframes checkmark-pop {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @media (max-width: 640px) {
          .add-to-cart-container {
            flex-direction: column;
            width: 100%;
          }

          .quantity-selector {
            width: 100%;
            justify-content: center;
          }

          .add-to-cart-btn {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
}
