import type { HttpMiddlewareOptions } from '@commercetools/ts-client';

export const { API_URL, AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY, SCOPES } = {
  API_URL: import.meta.env.VITE_CTP_API_URL,
  AUTH_URL: import.meta.env.VITE_CTP_AUTH_URL,
  CLIENT_ID: import.meta.env.VITE_CTP_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_CTP_CLIENT_SECRET,
  PROJECT_KEY: import.meta.env.VITE_CTP_PROJECT_KEY,
  SCOPES: import.meta.env.VITE_CTP_SCOPES,
};

export const COMMON_AUTH_OPTIONS = {
  host: AUTH_URL,
  httpClient: fetch,
  projectKey: PROJECT_KEY,
  scopes: SCOPES.split(' '),
};

export const COMMON_CLIENT_CREDENTIALS = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};

export const HTTP_MIDDLEWARE_OPTIONS: HttpMiddlewareOptions = {
  host: API_URL,
  httpClient: globalThis.fetch,
};

export const AUTH_FLOW_TYPE = {
  ANONYMOUS: 'anonymous',
  EXISTING: 'existing',
  PASSWORD: 'password',
} as const;

export const CLIENT_TOKEN_STORE_TYPE = {
  ANONYMOUS: 'anonymous',
  CUSTOMER: 'customer',
} as const;
