import type { FilterQueryArguments, ProductsFilterPayload } from './types';

import { FILTER, QUERY_KEY, SORT_FIELD } from './constants';

export const getQueryArguments = (payload: ProductsFilterPayload): FilterQueryArguments => {
  const queryArguments: FilterQueryArguments = {
    [QUERY_KEY.LIMIT]: payload.productsPerPage,
    [QUERY_KEY.MATCHING_VARIANTS]: true,
    [QUERY_KEY.SORT]: getSortType(payload),
  };

  const searchTerm = payload.searchTerm?.trim();

  if (searchTerm) {
    queryArguments[QUERY_KEY.FULL_TEXT_SEARCH] = searchTerm;
  }

  if (payload.categoryId) {
    queryArguments[QUERY_KEY.FILTER_QUERY] = FILTER.CATEGORY_SUBTREE(payload.categoryId);
  }

  return queryArguments;
};

const getSortType = (payload: ProductsFilterPayload): string => {
  return payload.sortField === 'name'
    ? SORT_FIELD.NAME(payload.sortDirection)
    : SORT_FIELD.PRICE(payload.sortDirection);
};
