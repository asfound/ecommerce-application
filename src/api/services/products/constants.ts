import { APP_LOCALE } from '~/shared/constants/constants';

import type { ProductsFilterPayload } from './types';

export const PRODUCT_ATTRIBUTE = {
  BEST_SELLER: 'bestSeller',
} as const;

export const QUERY_KEY = {
  FILTER_QUERY: 'filter.query',
  FULL_TEXT_SEARCH: `text.${APP_LOCALE}`,
  LIMIT: 'limit',
  MATCHING_VARIANTS: 'markMatchingVariants',
  SORT: 'sort',
} as const;

export const FILTER = {
  CATEGORY_SUBTREE: (categoryId: string) => `categories.id: subtree("${categoryId}")`,
} as const;

export const SORT_FIELD = {
  NAME: (direction: ProductsFilterPayload['sortDirection']) => `name.${APP_LOCALE} ${direction}`,
  PRICE: (direction: ProductsFilterPayload['sortDirection']) => `price ${direction}`,
} as const;
