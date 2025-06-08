import { BaseComponent } from '~/components/base-component/base-component';

import type { NavigateOptions, Route, RouteMatcher, SearchParameters } from './types';

import { PUSH_STATE_MODE, ROUTER_ERROR } from './constants';
import { createRouteMatcher } from './helpers/route-matcher';
import { routerAction } from './store/actions';

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

  private readonly routerOutlet = new BaseComponent({ className: 'routerOutlet', tagName: 'div' });

  private constructor(routes: Route[], fallbackRoute: Route) {
    this.routeMatchers = routes.map((route) => createRouteMatcher(route));

    this.fallbackRoute = fallbackRoute;

    // TODO: if we don't use the router state, then we can add these handlers in the loop
    globalThis.addEventListener('popstate', () => {
      this.handleRouteChange({ path: globalThis.location.href, pushState: PUSH_STATE_MODE.NONE });
    });

    globalThis.addEventListener('DOMContentLoaded', () => {
      this.handleRouteChange({ path: globalThis.location.href, pushState: PUSH_STATE_MODE.NONE });
    });
  }

  public static initialize(routes: Route[], fallbackRoute: Route): void {
    if (Router._instance) {
      throw new Error(ROUTER_ERROR.ALREADY_INITIALIZED);
    }

    Router._instance = new Router(routes, fallbackRoute);
    routerAction.initialize(Router._instance);
  }

  public back(): void {
    globalThis.history.back();
  }

  public forward(): void {
    globalThis.history.forward();
  }

  public navigate(path: string, options?: NavigateOptions): void {
    const currentURL = new URL(globalThis.location.href);

    const targetURL = new URL(path, globalThis.location.origin);

    const samePathAndParameters =
      currentURL.pathname === targetURL.pathname && currentURL.search === targetURL.search;

    if (samePathAndParameters) {
      return;
    }

    this.handleRouteChange({
      path,
      pushState: options?.pushState ?? PUSH_STATE_MODE.PUSH,
      searchParameters: options?.searchParameters,
    });
  }

  public updateHistory(payload: NavigateOptions & { pathname: string }): void {
    const searchParameters = new URLSearchParams(payload.searchParameters);

    const url =
      searchParameters.size > 0
        ? `${payload.pathname}?${searchParameters.toString()}`
        : payload.pathname;

    if (payload.pushState && payload.pushState === PUSH_STATE_MODE.PUSH) {
      globalThis.history.pushState({}, '', url);
      return;
    }

    if (payload.pushState && payload.pushState === PUSH_STATE_MODE.REPLACE) {
      globalThis.history.replaceState({}, '', url);
      return;
    }
  }

  private handleRouteChange(payload: NavigateOptions & { path: string }): void {
    const { pathname, searchParameters } = this.parseURL({
      path: payload.path,
      searchParameters: payload.searchParameters,
    });

    const matcher = this.routeMatchers.find((matcher) => matcher.checkMatch(pathname));

    routerAction.setPathname(pathname);
    routerAction.setSearchParameters(searchParameters);

    if (matcher?.route.canActivate?.some((interceptor) => !interceptor(this))) {
      return;
    }

    if (!matcher) {
      routerAction.setSearchParameters({});

      this.updateHistory({ pathname, pushState: payload.pushState, searchParameters: {} });

      this.updatePage({ route: this.fallbackRoute });

      return;
    }

    this.updateHistory({ pathname, pushState: payload.pushState, searchParameters });

    this.updatePage({ route: matcher.route });
  }

  private parseURL(payload: { path: string; searchParameters?: SearchParameters }): {
    pathname: string;
    searchParameters: SearchParameters;
  } {
    const { pathname, searchParams } = new URL(payload.path, globalThis.location.origin);

    const searchParameters =
      payload.searchParameters == null
        ? searchParams
        : new URLSearchParams(payload.searchParameters);

    return { pathname, searchParameters: Object.fromEntries(searchParameters) };
  }

  private updatePage(payload: { route: Route }): void {
    payload.route
      .component()
      .then((page) => {
        document.title = '';
        document.title = payload.route.title;
        this.routerOutlet.replaceChildren(page);
      })
      .catch(console.warn);
  }
}
