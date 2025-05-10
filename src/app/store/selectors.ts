import { createSelector } from '~/shared/store/create-selector';

import type { AppState } from './store';

const selectLoggedIn = createSelector((state: AppState) => state.loggedIn);

export const rootSelector = {
  selectLoggedIn,
} as const;
