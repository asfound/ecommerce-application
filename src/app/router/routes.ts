import type { BaseComponent } from '~/components/base-component/base-component.ts';

import type { Route } from './types';

import { ROUTE_PATH } from './route-path.ts';

export const ROUTES: Route[] = [
  {
    async component(): Promise<BaseComponent> {
      const { MainPage } = await import('../../pages/main.ts');
      return new MainPage();
    },
    path: ROUTE_PATH.MAIN,
    title: 'Main',
  },
  {
    async component(): Promise<BaseComponent> {
      const { LoginPage } = await import('../../pages/login.ts');
      return new LoginPage();
    },
    path: ROUTE_PATH.LOGIN,
    title: 'Login',
  },
  {
    async component(): Promise<BaseComponent> {
      const { RegistrationPage } = await import('../../pages/registration.ts');
      return new RegistrationPage();
    },
    path: ROUTE_PATH.REGISTRATION,
    title: 'Registration',
  },
];

export const FALLBACK_ROUTE: Route = {
  async component(): Promise<BaseComponent> {
    const { NotFoundPage } = await import('../../pages/not-found.ts');
    return new NotFoundPage();
  },
  path: '*',
  title: '404',
};
