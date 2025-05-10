import { BaseComponent } from '~/components/base-component/base-component';

import type { Route, RouteMatcher, SearchParameters } from './types';

import { ROUTER_ERROR } from './constants';
import { createRouteMatcher } from './helpers/route-matcher';

export class Router {
  public static get instance(): Router {
    if (!Router._instance) {
      throw new Error(ROUTER_ERROR.NOT_INITIALIZED);
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

  private searchParameters: SearchParameters = {};

  private constructor(routes: Route[], fallbackRoute: Route) {
    this.routeMatchers = routes.map((route) => createRouteMatcher(route));

    this.fallbackRoute = fallbackRoute;

    // TODO: if we don't use the router state, then we can add these handlers in the loop
    globalThis.addEventListener('popstate', () => {
      this.handleRouteChange({ path: globalThis.location.href, pushState: false });
    });

    globalThis.addEventListener('DOMContentLoaded', () => {
      this.handleRouteChange({ path: globalThis.location.href, pushState: false });
    });
  }

  public static initialize(routes: Route[], fallbackRoute: Route): void {
    if (Router._instance) {
      throw new Error(ROUTER_ERROR.ALREADY_INITIALIZED);
    }

    Router._instance = new Router(routes, fallbackRoute);
  }

  public back(): void {
    globalThis.history.back();
  }

  public forward(): void {
    globalThis.history.forward();
  }

  public getSearchParameters(): SearchParameters {
    return this.searchParameters;
  }

  public navigate(path: string, searchParameters?: SearchParameters): void {
    const { pathname } = new URL(globalThis.location.href);

    if (path === pathname) {
      return;
    }

    this.handleRouteChange({ path, pushState: true, searchParameters });
  }

  public setSearchParameters(searchParameters: SearchParameters): void {
    Object.assign(this.searchParameters, searchParameters);

    const query = new URLSearchParams(this.searchParameters).toString();

    globalThis.history.replaceState({}, '', `${location.pathname}?${query}`);
  }

  private handleRouteChange(payload: {
    path: string;
    pushState: boolean;
    searchParameters?: SearchParameters;
  }): void {
    const path = this.parseURL({ path: payload.path, searchParameters: payload.searchParameters });

    const matcher = this.routeMatchers.find((matcher) => matcher.checkMatch(path));

    if (!matcher) {
      this.searchParameters = {};

      this.updatePage({ route: this.fallbackRoute });

      return;
    }

    if (matcher.route.canActivate?.some((interceptor) => !interceptor(this))) {
      return;
    }

    this.searchParameters = matcher.extractSearchParameters(path);

    if (payload.pushState) {
      globalThis.history.pushState({}, '', path);
    }

    this.updatePage({ route: matcher.route });
  }

  private parseURL(payload: { path: string; searchParameters?: SearchParameters }): string {
    const { pathname, search } = new URL(payload.path, globalThis.location.origin);

    const searchParameters = payload.searchParameters
      ? new URLSearchParams(payload.searchParameters)
      : new URLSearchParams(search);

    return `${pathname}${searchParameters.size > 0 ? `?${searchParameters}` : ''}`;
  }

  private updatePage(payload: { route: Route }): void {
    payload.route
      .component()
      .then((page) => {
        document.title = payload.route.title;
        this.routerOutlet.replaceChildren(page);
      })
      .catch(console.warn);
  }
}
