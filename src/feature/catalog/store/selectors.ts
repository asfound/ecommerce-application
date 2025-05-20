import { createSelector } from '~/shared/store/create-selector';

import type { CatalogCategoryNameState, CatalogLoadingState, CatalogState } from './store';

const selectCategoryId = createSelector((state: CatalogState) => state.categoryId);

const selectSearchTerm = createSelector((state: CatalogState) => state.searchTerm);

const selectCategoryName = createSelector((state: CatalogCategoryNameState) => state.categoryName);

const selectLoading = createSelector((state: CatalogLoadingState) => state.loading);

const selectSortDirection = createSelector((state: CatalogState) => state.sortDirection);

const selectSortField = createSelector((state: CatalogState) => state.sortField);

export const catalogSelector = {
  selectCategoryId,
  selectSearchTerm,
  selectSortDirection,
  selectSortField,
} as const;

export const catalogCategoryNameSelector = {
  selectCategoryName,
} as const;

export const catalogLoadingSelector = {
  selectLoading,
} as const;
