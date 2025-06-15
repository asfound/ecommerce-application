import type { BaseComponent } from '~/components/base-component/base-component.ts';

import { TITLE } from '~/shared/constants/constants.ts';

import type { Route } from './types';

import { WILDCARD_ROUTE } from './constants.ts';
import { isLoggedIn, isNotLoggedIn } from './interceptors/interceptors.ts';
import { ROUTE_PATH } from './route-path.ts';

// TODO combine page title form project title + page title
export const ROUTES: Route[] = [
  {
    async component(): Promise<BaseComponent> {
      const { MainPage } = await import('../../pages/main-page.ts');
      return new MainPage();
    },
    path: ROUTE_PATH.MAIN,
    title: `${TITLE} | Main`,
  },
  {
    canActivate: [isNotLoggedIn],
    async component(): Promise<BaseComponent> {
      const { LoginPage } = await import('../../pages/login-page.ts');
      return new LoginPage();
    },
    path: ROUTE_PATH.LOGIN,
    title: `${TITLE} | Login`,
  },
  {
    canActivate: [isNotLoggedIn],
    async component(): Promise<BaseComponent> {
      const { RegistrationPage } = await import('../../pages/registration-page.ts');
      return new RegistrationPage();
    },
    path: ROUTE_PATH.REGISTRATION,
    title: `${TITLE} | Registration`,
  },
  {
    async component(): Promise<BaseComponent> {
      const { CatalogPage } = await import('../../pages/catalog-page.ts');
      return new CatalogPage();
    },
    path: ROUTE_PATH.CATALOG,
    title: `${TITLE} | Catalog`,
  },
  {
    async component(): Promise<BaseComponent> {
      const { CartPage } = await import('../../pages/cart-page.ts');
      return new CartPage();
    },
    path: ROUTE_PATH.CART,
    title: `${TITLE} | Cart`,
  },
  {
    async component(): Promise<BaseComponent> {
      const { ProductDetailsPage } = await import('../../pages/product-details.ts');
      return new ProductDetailsPage();
    },
    path: ROUTE_PATH.PRODUCT_DETAILS,
    title: `${TITLE} | Product`,
  },
  {
    canActivate: [isLoggedIn],
    async component(): Promise<BaseComponent> {
      const { UserProfilePage } = await import('../../pages/user-profile-page.ts');
      return new UserProfilePage();
    },
    path: ROUTE_PATH.PROFILE,
    title: `${TITLE} | Profile`,
  },
  {
    async component(): Promise<BaseComponent> {
      const { AboutUsPage } = await import('../../pages/about-us.ts');
      return new AboutUsPage();
    },
    path: ROUTE_PATH.ABOUT,
    title: `${TITLE} | About`,
  },
];

export const FALLBACK_ROUTE: Route = {
  async component(): Promise<BaseComponent> {
    const { NotFoundPage } = await import('../../pages/not-found-page.ts');
    return new NotFoundPage();
  },
  path: WILDCARD_ROUTE,
  title: `${TITLE} | 404`,
};
