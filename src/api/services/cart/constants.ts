export const EXPAND_PATH = {
  DISCOUNT_CODES: 'discountCodes[*].discountCode',
} as const;

export const CART_ERROR_MESSAGE = {
  CODE_ALREADY_APPLIED: (code: string) => `Discount code "${code}" already applied`,
  CODE_NOT_APPLIED: (code: string) => `Discount code "${code}" not applied`,
} as const;
