export const PRODUCT_DETAILS_TEXT = {
  INPUT_LABEL: (weight?: string) => `${(weight ?? '').toString()}g`,
  WEIGHT: 'Weight:',
} as const;

export const PRODUCT_TYPE = {
  COFFEE: 'coffee',
} as const;

export const NOT_FOUND_MESSAGE = 'Item not found';

export const BESTSELLER_LABEL = 'Bestseller';
