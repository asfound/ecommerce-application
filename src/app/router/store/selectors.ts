import { createSelector } from '~/shared/store/create-selector';

import type { RouterState } from './store';

const selectSearchParameters = createSelector((state: RouterState) => state.searchParameters);

const selectPathname = createSelector((state: RouterState) => state.pathname);

export const routerSelector = {
  selectPathname,
  selectSearchParameters,
} as const;
