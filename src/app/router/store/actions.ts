import type { Router } from '../router';
import type { SearchParameters } from '../types';

import { PUSH_STATE_MODE } from '../constants';
import { routerStore } from './store';

let routerInstance: Router;

const setPathname = (pathname: string): void => {
  routerStore.setState({ pathname });
};

// FOR USE ONLY INSIDE ROUTER
const setSearchParameters = (searchParameters: SearchParameters): void => {
  routerStore.setState({ searchParameters });
};

// FOR OUTER USAGE ON PAGE OR COMPONENT
const replaceSearchParameters = (searchParameters: SearchParameters): void => {
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
  setAndReplaceSearchParameters: replaceSearchParameters,
  setPathname,
  setSearchParameters,
} as const;
