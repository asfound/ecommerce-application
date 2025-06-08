import { createSelector } from '~/shared/store/create-selector';

import type { CartState } from './store';

const selectItemCount = createSelector((state: CartState) => state.itemCount);

const selectCartTotal = createSelector((state: CartState) => state.cartTotal);

export const catalogSelector = {
  selectCartTotal,
  selectItemCount,
} as const;
