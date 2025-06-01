import { createSelector } from '~/shared/store/create-selector';

import type { CatalogCategoryNameState, CatalogLoadingState, CatalogState } from './store';

const selectCategoryId = createSelector((state: CatalogState) => state.categoryId);

const selectSearchTerm = createSelector((state: CatalogState) => state.searchTerm);

const selectCategoryName = createSelector((state: CatalogCategoryNameState) => state.categoryName);

const selectLoading = createSelector((state: CatalogLoadingState) => state.loading);

const selectSortDirection = createSelector((state: CatalogState) => state.sortDirection);

const selectSortField = createSelector((state: CatalogState) => state.sortField);

const selectWeight = createSelector((state: CatalogState) => state.weight);

const selectBrand = createSelector((state: CatalogState) => state.brand);

export const catalogSelector = {
  selectBrand,
  selectCategoryId,
  selectSearchTerm,
  selectSortDirection,
  selectSortField,
  selectWeight,
} as const;

export const catalogCategoryNameSelector = {
  selectCategoryName,
} as const;

export const catalogLoadingSelector = {
  selectLoading,
} as const;
