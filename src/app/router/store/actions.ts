import type { Router } from '../router';
import type { SearchParameters } from '../types';

import { PUSH_STATE_MODE } from '../constants';
import { routerStore } from './store';

let routerInstance: Router;

const setPathname = (pathname: string): void => {
  routerStore.setState({ pathname });
};

const setSearchParameters = (searchParameters: SearchParameters): void => {
  routerStore.setState({ searchParameters });

  routerInstance.updateHistory({
    pathname: globalThis.location.pathname,
    pushState: PUSH_STATE_MODE.REPLACE,
    searchParameters,
  });
};

const initialize = (router: Router): void => {
  routerInstance = router;
};

export const routerAction = {
  initialize,
  setPathname,
  setSearchParameters,
} as const;
