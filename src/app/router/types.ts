import type { BaseComponent } from '~/components/base-component/base-component';

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
  extractSearchParameters(path: string): Record<string, string>;
  route: Route;
}

export type RoutePath = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];

// TODO: temporary for ESLint
interface Router {
  navigate(): void;
}

// TODO: temporary for ESLint
const ROUTE_PATH = {
  HOME: '/',
} as const;

console.warn(ROUTE_PATH);
