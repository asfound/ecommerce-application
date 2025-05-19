import { createSelector } from '~/shared/store/create-selector';

import type { CatalogState } from './store';

const selectCategoryId = createSelector((state: CatalogState) => state.categoryId);

const selectSearchTerm = createSelector((state: CatalogState) => state.searchTerm);

const selectCategoryName = createSelector((state: CatalogState) => state.categoryName);

export const catalogSelector = {
  selectCategoryId,
  selectCategoryName,
  selectSearchTerm,
} as const;
