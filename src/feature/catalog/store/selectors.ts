import { createSelector } from '~/shared/store/create-selector';

import type { CatalogState } from './store';

const selectCategoryId = createSelector((state: CatalogState) => state.categoryId);

const selectSearchTerm = createSelector((state: CatalogState) => state.searchTerm);

const selectCategoryName = createSelector((state: CatalogState) => state.categoryName);

const selectLoading = createSelector((state: CatalogState) => state.loading);

const selectSortDirection = createSelector((state: CatalogState) => state.sortDirection);

const selectSortField = createSelector((state: CatalogState) => state.sortField);

const selectWithoutLoading = createSelector((state: CatalogState) => ({
  categoryId: state.categoryId,
  categoryName: state.categoryName,
  searchTerm: state.searchTerm,
  sortDirection: state.sortDirection,
  sortField: state.sortField,
}));

export const catalogSelector = {
  selectCategoryId,
  selectCategoryName,
  selectLoading,
  selectSearchTerm,
  selectSortDirection,
  selectSortField,
  selectWithoutLoading,
} as const;
