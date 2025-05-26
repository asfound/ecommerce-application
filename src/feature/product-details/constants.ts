export const PRODUCT_DETAILS_TEXT = {
  INPUT_LABEL: (weight?: string) => `${(weight ?? '').toString()}g`,
  WEIGHT: 'Weight:',
} as const;

export const PRODUCT_TYPE = {
  COFFEE: 'coffee',
} as const;

export const NOT_FOUND_MESSAGE = {
  INCORRECT_ID: (id: string) => `No item found with the ID "${id}".`,
  INCORRECT_SKU: (sku: string) => `No item found with the SKU "${sku}".`,
} as const;
