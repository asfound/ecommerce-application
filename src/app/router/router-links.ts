import type { RouterLinkProperties } from './components/router-link';

import { ROUTE_PATH } from './route-path';

export const ROUTER_LINKS: RouterLinkProperties[] = [
  { path: ROUTE_PATH.LOGIN, textContent: 'Login' },
  { path: ROUTE_PATH.REGISTRATION, textContent: 'Registration' },
  { path: ROUTE_PATH.MAIN, textContent: 'Main' },
  { path: ROUTE_PATH.CATALOG, textContent: 'Catalog' },
  { path: ROUTE_PATH.ABOUT, textContent: 'About us' },
];
