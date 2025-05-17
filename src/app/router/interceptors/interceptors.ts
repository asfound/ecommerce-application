import { SERVICE_HUB } from '~/api/services/service-hub';

import type { Router } from '../router';

import { ROUTE_PATH } from '../route-path';

export const isNotLoggedIn = (router: Router): boolean => {
  const loggedIn = SERVICE_HUB.provideAuthService().isLoggedIn();

  if (loggedIn) {
    router.navigate(ROUTE_PATH.MAIN);
    return false;
  }

  return true;
};

export const isLoggedIn = (router: Router): boolean => {
  const loggedIn = SERVICE_HUB.provideAuthService().isLoggedIn();

  if (!loggedIn) {
    router.navigate(ROUTE_PATH.LOGIN);
    return false;
  }

  return true;
};
