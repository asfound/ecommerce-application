import { createSelector } from '~/shared/store/create-selector';

import type { CatalogState } from './store';

const selectCategoryId = createSelector((state: CatalogState) => state.categoryId);

export const catalogSelector = {
  selectCategoryId,
} as const;
