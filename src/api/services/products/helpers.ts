import type { FilterQueryArguments, ProductsFilterPayload } from './types';

import { FILTER, PAGE_NUMBER_TO_OFFSET_SHIFT, QUERY_KEY, SORT_FIELD } from './constants';

export const getQueryArguments = (payload: ProductsFilterPayload): FilterQueryArguments => {
  const filters: string[] = [];

  const queryArguments: FilterQueryArguments = {
    [QUERY_KEY.FILTER_QUERY]: filters,
    [QUERY_KEY.LIMIT]: payload.productsPerPage,
    [QUERY_KEY.MATCHING_VARIANTS]: true,
    [QUERY_KEY.OFFSET]:
      (payload.currentPage - PAGE_NUMBER_TO_OFFSET_SHIFT) * payload.productsPerPage,
    [QUERY_KEY.SORT]: getSortType(payload),
  };

  const searchTerm = payload.searchTerm?.trim();

  if (searchTerm) {
    queryArguments[QUERY_KEY.FULL_TEXT_SEARCH] = searchTerm;
  }

  if (payload.categoryId) {
    filters.push(FILTER.CATEGORY_SUBTREE(payload.categoryId));
  }

  if (payload.bestSeller) {
    filters.push(FILTER.BEST_SELLER);
  }

  if (payload.priceRange.min !== undefined || payload.priceRange.max !== undefined) {
    filters.push(FILTER.PRICE(payload.priceRange));
  }

  if (payload.weight?.length) {
    filters.push(FILTER.WEIGHT(payload.weight));
  }

  if (payload.brand?.length) {
    filters.push(FILTER.BRAND(payload.brand));
  }

  return queryArguments;
};

const getSortType = (payload: ProductsFilterPayload): string => {
  return payload.sortField === 'name'
    ? SORT_FIELD.NAME(payload.sortDirection)
    : SORT_FIELD.PRICE(payload.sortDirection);
};
