import type { BaseComponent } from '~/components/base-component/base-component';

import type { ROUTE_PATH } from './route-path';
import type { Router } from './router';

export type Interceptor = (router: Router) => boolean;

export interface Route {
  canActivate?: Interceptor[];
  component(): Promise<BaseComponent>;
  path: string;
  title: string;
}

export interface RouteMatcher {
  checkMatch(path: string): boolean;
  extractParameters(path: string): Record<string, string>;
  extractSearchParameters(path: string): SearchParameters;
  route: Route;
}

export type RoutePath = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];

export type SearchParameters = Record<string, string>;
