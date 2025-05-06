import { BaseComponent } from '~/components/base-component/base-component';

import type { Route, RouteMatcher } from './types';

import { createRouteMatcher } from './helpers/route-matcher';

export class Router {
  public static get instance(): Router {
    if (!Router._instance) {
      throw new Error('Router is not initialized');
    }

    return Router._instance;
  }

  private static _instance: null | Router = null;

  public get outlet(): BaseComponent {
    return this.routerOutlet;
  }

  private readonly fallbackRoute: Route;

  private readonly routeMatchers: RouteMatcher[];

  private readonly routerOutlet = new BaseComponent({ className: 'router-outlet', tagName: 'div' });

  private searchParameters: Record<string, string> = {};

  private constructor(routes: Route[], fallbackRoute: Route) {
    this.routeMatchers = routes.map((route) => createRouteMatcher(route));

    this.fallbackRoute = fallbackRoute;

    globalThis.addEventListener('popstate', () => {
      this.handleRouteChange({ path: globalThis.location.href, pushState: false }).catch(
        console.error,
      );
    });

    globalThis.addEventListener('DOMContentLoaded', () => {
      this.handleRouteChange({ path: globalThis.location.href, pushState: false }).catch(
        console.error,
      );
    });
  }

  public static initialize(routes: Route[], fallbackRoute: Route): void {
    if (Router._instance) {
      throw new Error('Router is already initialized');
    }

    Router._instance = new Router(routes, fallbackRoute);
  }

  public back(): void {
    globalThis.history.back();
  }

  public forward(): void {
    globalThis.history.forward();
  }

  public getSearchParameters(): Record<string, string> {
    return this.searchParameters;
  }

  public async navigate(path: string, searchParameters?: Record<string, string>): Promise<void> {
    const { pathname } = new URL(globalThis.location.href);

    if (path === pathname) {
      return;
    }

    await this.handleRouteChange({ path, pushState: true, searchParameters });
  }

  public setSearchParameters(searchParameters: Record<string, string>): void {
    Object.assign(this.searchParameters, searchParameters);

    const query = new URLSearchParams(this.searchParameters).toString();

    globalThis.history.replaceState({}, '', `${location.pathname}?${query}`);
  }

  private async handleRouteChange(payload: {
    path: string;
    pushState: boolean;
    searchParameters?: Record<string, string>;
  }): Promise<void> {
    const path = this.parseURL({ path: payload.path, searchParameters: payload.searchParameters });

    const matcher = this.routeMatchers.find((matcher) => matcher.checkMatch(path));

    if (!matcher) {
      this.searchParameters = {};

      await this.updatePage({ route: this.fallbackRoute });

      return;
    }

    if (matcher.route.canActivate?.some((interceptor) => !interceptor(this))) {
      return;
    }

    this.searchParameters = matcher.extractSearchParameters(path);

    if (payload.pushState) {
      globalThis.history.pushState({}, '', path);
    }

    await this.updatePage({ route: matcher.route });
  }

  private parseURL(payload: { path: string; searchParameters?: Record<string, string> }): string {
    const { pathname, search } = new URL(payload.path, globalThis.location.origin);

    const searchParameters = payload.searchParameters
      ? new URLSearchParams(payload.searchParameters)
      : new URLSearchParams(search);

    return `${pathname}${searchParameters.size > 0 ? `?${searchParameters}` : ''}`;
  }

  private async updatePage(payload: { route: Route }): Promise<void> {
    document.title = payload.route.title;

    const page = await payload.route.component();

    this.routerOutlet.replaceChildren(page);
  }
}
