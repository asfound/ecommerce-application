export const PRODUCT_DETAILS_TEXT = {
  INPUT_LABEL: (weight?: string) => `${(weight ?? '').toString()}g`,
  WEIGHT: 'Weight:',
} as const;

export const PRODUCT_TYPE = {
  COFFEE: 'coffee',
} as const;
