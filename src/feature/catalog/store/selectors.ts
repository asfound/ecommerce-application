import { createSelector } from '~/shared/store/create-selector';

import type { CatalogState } from './store';

const selectCategoryId = createSelector((state: CatalogState) => state.categoryId);

const selectSearchTerm = createSelector((state: CatalogState) => state.searchTerm);

export const catalogSelector = {
  selectCategoryId,
  selectSearchTerm,
} as const;
