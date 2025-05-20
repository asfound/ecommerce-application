import { createSelector } from '~/shared/store/create-selector';

import type { CatalogLoadingState, CatalogState } from './store';

const selectCategoryId = createSelector((state: CatalogState) => state.categoryId);

const selectSearchTerm = createSelector((state: CatalogState) => state.searchTerm);

const selectCategoryName = createSelector((state: CatalogState) => state.categoryName);

const selectLoading = createSelector((state: CatalogLoadingState) => state.loading);

const selectSortDirection = createSelector((state: CatalogState) => state.sortDirection);

const selectSortField = createSelector((state: CatalogState) => state.sortField);

export const catalogSelector = {
  selectCategoryId,
  selectCategoryName,
  selectLoading,
  selectSearchTerm,
  selectSortDirection,
  selectSortField,
} as const;
