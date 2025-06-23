import { SERVICE_PROVIDER } from '~/api/services/service-provider';

import type { Router } from '../router';

import { PUSH_STATE_MODE } from '../constants';
import { ROUTE_PATH } from '../route-path';

export const isNotLoggedIn = (router: Router): boolean => {
  const loggedIn = SERVICE_PROVIDER.provideAuthService().isLoggedIn();

  if (loggedIn) {
    router.navigate(ROUTE_PATH.MAIN, { pushState: PUSH_STATE_MODE.REPLACE });
    return false;
  }

  return true;
};

export const isLoggedIn = (router: Router): boolean => {
  const loggedIn = SERVICE_PROVIDER.provideAuthService().isLoggedIn();

  if (!loggedIn) {
    router.navigate(ROUTE_PATH.LOGIN, { pushState: PUSH_STATE_MODE.REPLACE });
    return false;
  }

  return true;
};
