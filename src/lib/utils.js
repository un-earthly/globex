import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    return serializedCart ? JSON.parse(serializedCart) : { items: [], total: 0, discountedTotal: 0 };
  } catch (e) {
    console.error('Could not load cart from local storage', e);
    return { items: [], total: 0, discountedTotal: 0 };
  }
};
export const saveCartToLocalStorage = (state) => {
  try {
    const serializedCart = JSON.stringify(state);
    localStorage.setItem('cart', serializedCart);
  } catch (e) {
    console.error('Could not save cart to local storage', e);
  }
};
