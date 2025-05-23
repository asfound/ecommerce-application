import { APP_LOCALE } from '~/shared/constants/constants';

import type { ProductsFilterPayload } from './types';

const CENTS_IN_DOLLAR = 100;

export const PRODUCT_ATTRIBUTE = {
  BEST_SELLER: 'bestSeller',
  WEIGHT: 'weight',
} as const;

export const QUERY_KEY = {
  FILTER_QUERY: 'filter.query',
  FULL_TEXT_SEARCH: `text.${APP_LOCALE}`,
  LIMIT: 'limit',
  MATCHING_VARIANTS: 'markMatchingVariants',
  SORT: 'sort',
} as const;

export const FILTER = {
  BEST_SELLER: 'variants.attributes.bestSeller:true',
  BRAND: (brand: string[]) => {
    const brands = brand.map((value) => `"${value}"`).join(',');
    return `variants.attributes.brand:${brands}`;
  },
  CATEGORY_SUBTREE: (categoryId: string) => `categories.id: subtree("${categoryId}")`,
  PRICE: (priceRange: ProductsFilterPayload['priceRange']) => {
    const from = priceRange.min == null ? '*' : priceRange.min * CENTS_IN_DOLLAR;

    const to = priceRange.max == null ? '*' : priceRange.max * CENTS_IN_DOLLAR;

    return `variants.price.centAmount:range (${from.toString()} to ${to.toString()})`;
  },
  WEIGHT: (weight: ('lg' | 'md' | 'sm')[]) => {
    const weights = weight.map((value) => `"${value}"`).join(',');
    return `variants.attributes.weight.key:${weights}`;
  },
} as const;

export const SORT_FIELD = {
  NAME: (direction: ProductsFilterPayload['sortDirection']) => `name.${APP_LOCALE} ${direction}`,
  PRICE: (direction: ProductsFilterPayload['sortDirection']) => `price ${direction}`,
} as const;
