import type {
  AppProduct,
  FilterQueryArguments,
  ProductsFilterPayload,
  SortDirection,
  SortField,
} from './types';

import {
  FACET,
  FILTER,
  PAGE_NUMBER_TO_OFFSET_SHIFT,
  QUERY_KEY,
  SORT_DIRECTION,
  SORT_FIELD,
  SORT_FIELD_TYPE,
} from './constants';

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
  return payload.sortField === SORT_FIELD_TYPE.NAME
    ? SORT_FIELD.NAME(payload.sortDirection)
    : SORT_FIELD.PRICE(payload.sortDirection);
};

export const getQueryFacets = (categoryId: string): FilterQueryArguments => {
  return {
    facet: [FACET.ATTRIBUTE_BRAND, FACET.ATTRIBUTE_WEIGHT_KEY, FACET.ATTRIBUTE_WEIGHT_LABEL],
    'filter.facets': [FILTER.CATEGORY_SUBTREE(categoryId)],
  };
};

export const sortProducts = (
  a: AppProduct,
  b: AppProduct,
  { sortDirection, sortField }: { sortDirection: SortDirection; sortField: SortField },
): number => {
  if (sortField === SORT_FIELD_TYPE.PRICE && sortDirection === SORT_DIRECTION.ASC) {
    return a.price.default - b.price.default;
  }

  if (sortField === SORT_FIELD_TYPE.PRICE && sortDirection === SORT_DIRECTION.DESC) {
    return b.price.default - a.price.default;
  }

  if (sortField === SORT_FIELD_TYPE.NAME && sortDirection === SORT_DIRECTION.ASC) {
    return a.name.localeCompare(b.name);
  }

  if (sortField === SORT_FIELD_TYPE.NAME && sortDirection === SORT_DIRECTION.DESC) {
    return b.name.localeCompare(a.name);
  }

  return 0;
};
