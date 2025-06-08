import { createSelector } from '~/shared/store/create-selector';

import type { CartState } from './store';

const selectItemCount = createSelector((state: CartState) => state.itemCount);

export const catalogSelector = {
  selectItemCount,
} as const;
