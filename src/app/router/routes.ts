import type { BaseComponent } from '~/components/base-component/base-component.ts';

import type { Route } from './types';

import { WILDCARD_ROUTE } from './constants.ts';
import { ROUTE_PATH } from './route-path.ts';

// TODO combine page title form project title + page title
export const ROUTES: Route[] = [
  {
    async component(): Promise<BaseComponent> {
      const { MainPage } = await import('../../pages/main-page.ts');
      return new MainPage();
    },
    path: ROUTE_PATH.MAIN,
    title: 'HUH Coffee | Main',
  },
  {
    async component(): Promise<BaseComponent> {
      const { LoginPage } = await import('../../pages/login-page.ts');
      return new LoginPage();
    },
    path: ROUTE_PATH.LOGIN,
    title: 'HUH Coffee | Login',
  },
  {
    async component(): Promise<BaseComponent> {
      const { RegistrationPage } = await import('../../pages/registration-page.ts');
      return new RegistrationPage();
    },
    path: ROUTE_PATH.REGISTRATION,
    title: 'HUH Coffee | Registration',
  },
  {
    async component(): Promise<BaseComponent> {
      const { CatalogPage } = await import('../../pages/catalog-page.ts');
      return new CatalogPage();
    },
    path: ROUTE_PATH.CATALOG,
    title: 'HUH Coffee | Catalog',
  },
];

export const FALLBACK_ROUTE: Route = {
  async component(): Promise<BaseComponent> {
    const { NotFoundPage } = await import('../../pages/not-found-page.ts');
    return new NotFoundPage();
  },
  path: WILDCARD_ROUTE,
  title: '404',
};
