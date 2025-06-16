export const CART_TOTALS_TEXT = {
  BUTTON_APPLY: 'Apply',
  BUTTON_REMOVE: 'Remove',
  DISCOUNT: 'Discount: ',
  INPUT_PROMO_PLACEHOLDER: 'Enter coupon here',
  SUBTOTAL: 'Subtotal: ',
  TOTAL: 'Total: ',
} as const;

export const CART_NOTIFICATION = {
  CODE_APPLIED: (code: string) => `Discount code "${code}" applied`,
  CODE_REMOVED: (code: string) => `Discount code "${code}" removed`,
} as const;
