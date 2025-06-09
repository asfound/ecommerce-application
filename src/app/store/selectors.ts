import { createSelector } from '~/shared/store/create-selector';

import type { AppState } from './store';

const selectLoggedIn = createSelector((state: AppState) => state.loggedIn);

const selectProductsCount = createSelector((state: AppState) => state.productsCount);

export const rootSelector = {
  selectLoggedIn,
  selectProductsCount,
} as const;
