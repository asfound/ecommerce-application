import type { Router } from '../router';
import type { SearchParameters } from '../types';

import { routerStore } from './store';

const setPathname = (pathname: string): void => {
  routerStore.setState({ pathname });
};

const setSearchParameters = (router: Router, searchParameters: SearchParameters): void => {
  routerStore.setState({ searchParameters });

  router.updateHistory({
    pathname: globalThis.location.pathname,
    pushState: false,
    searchParameters,
  });
};

export const routerAction = {
  setPathname,
  setSearchParameters,
} as const;
