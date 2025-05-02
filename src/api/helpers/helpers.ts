import type { TokenStore } from '@commercetools/ts-client';

export const isObject = (value: unknown): value is object => {
  return typeof value === 'object';
};

export const isTokenStore = (value: unknown): value is TokenStore => {
  return (
    value != null &&
    isObject(value) &&
    Reflect.has(value, 'token') &&
    Reflect.has(value, 'expirationTime') &&
    Reflect.has(value, 'refreshToken')
  );
};
