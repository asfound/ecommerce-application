import type { Route, RouteMatcher, SearchParameters } from '../types';

import { WILDCARD_ROUTE } from '../constants';

export const createRouteMatcher = (route: Route): RouteMatcher => {
  return route.path.includes(':')
    ? createMatcherWithParameters(route)
    : createMatcherWithoutParameters(route);
};

const createMatcherWithParameters = (route: Route): RouteMatcher => {
  const regex = createRouteWithParametersRegex(route);

  return {
    checkMatch(path): boolean {
      return regex.test(path);
    },
    extractParameters(path): Record<string, string> {
      const execArray = regex.exec(path);

      if (!execArray?.groups) {
        return {};
      }

      return execArray.groups;
    },
    extractSearchParameters,
    route,
  };
};

const createMatcherWithoutParameters = (route: Route): RouteMatcher => {
  const regex = createRouteWithoutParametersRegex(route);

  return {
    checkMatch(path): boolean {
      return regex.test(path);
    },
    extractParameters(): Record<string, string> {
      return {};
    },
    extractSearchParameters,
    route,
  };
};

const createRouteWithoutParametersRegex = (route: Route): RegExp => {
  if (route.path === WILDCARD_ROUTE) {
    return new RegExp('^.*$');
  }

  return new RegExp(`^${route.path}$`);
};

const createRouteWithParametersRegex = (route: Route): RegExp => {
  const regex = route.path.replaceAll(
    /:([^/]+)/g,
    (_, parameterName: string) => `(?<${parameterName}>[^/]+)`,
  );

  return new RegExp(`^${regex}$`);
};

const extractSearchParameters = (path: string): SearchParameters => {
  const queryIndex = path.indexOf('?');

  if (queryIndex === -1) {
    return {};
  }

  const QUERY_INDEX_SHIFT = 1;

  const queryString = path.slice(queryIndex + QUERY_INDEX_SHIFT);

  const searchParameters = new URLSearchParams(queryString);

  return Object.fromEntries(searchParameters.entries());
};
