import { BaseComponent } from '~/components/base-component/base-component';
import { createStore } from '~/shared/store/create-store';

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

  private readonly store = createStore({ path: '', searchParameters: {} });

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

  public subscribePath(listener: (path: string) => void): void {
    this.store.subscribe((state) => state.path, listener);
  }

  private handleRouteChange(payload: {
    path: string;
    pushState: boolean;
    searchParameters?: SearchParameters;
  }): void {
    const { pathname, searchParameters } = this.parseURL({
      path: payload.path,
      searchParameters: payload.searchParameters,
    });

    const matcher = this.routeMatchers.find((matcher) => matcher.checkMatch(pathname));

    if (!matcher) {
      this.searchParameters = {};

      this.updatePage({ route: this.fallbackRoute });

      return;
    }

    if (matcher.route.canActivate?.some((interceptor) => !interceptor(this))) {
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

    const searchParameters = payload.searchParameters
      ? new URLSearchParams(payload.searchParameters)
      : searchParams;

    return { pathname, searchParameters: Object.fromEntries(searchParameters) };
  }

  private updateHistory(payload: {
    pathname: string;
    pushState: boolean;
    searchParameters: SearchParameters;
  }): void {
    const searchParameters = new URLSearchParams(payload.searchParameters);

    const url =
      searchParameters.size > 0
        ? `${payload.pathname}?${searchParameters.toString()}`
        : payload.pathname;

    if (payload.pushState) {
      globalThis.history.pushState({}, '', url);
    } else {
      globalThis.history.replaceState({}, '', url);
    }
  }

  private updatePage(payload: { route: Route }): void {
    this.store.setState({ path: payload.route.path });

    payload.route
      .component()
      .then((page) => {
        document.title = payload.route.title;
        this.routerOutlet.replaceChildren(page);
      })
      .catch(console.warn);
  }
}
