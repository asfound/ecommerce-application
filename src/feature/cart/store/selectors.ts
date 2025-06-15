import { createSelector } from '~/shared/store/create-selector';

import type { CartState } from './store';

const selectItemCount = createSelector((state: CartState) => state.itemCount);

export const cartSelector = {
  selectItemCount,
} as const;
