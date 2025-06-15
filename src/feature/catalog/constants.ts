export const PRODUCTS_PER_PAGE = 9;

export const USER_INPUT_DEBOUNCE_TIMEOUT = 700;

export const PRODUCT_CART_NOTIFICATION = {
  ADDED_TO_CART: (productName: string) => `${productName} added to cart.`,
  FAILED_ADD_TO_CART: (productName: string) => `Failed to add ${productName} to cart.`,
  FAILED_REMOVE_FROM_CART: (productName: string) => `Failed to remove ${productName} from cart.`,
  REMOVED_FROM_CART: (productName: string) => `${productName} removed from cart.`,
} as const;
