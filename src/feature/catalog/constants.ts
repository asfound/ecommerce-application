export const PRODUCTS_PER_PAGE = 9;

export const USER_INPUT_DEBOUNCE_TIMEOUT = 700;

export const PRODUCT_CART_NOTIFICATION = {
  ADDED_TO_CART: (productName: string) => `${productName} added to cart.`,
  FAILED_ADD_TO_CART: (productName: string) => `Failed to add ${productName} to cart.`,
} as const;
