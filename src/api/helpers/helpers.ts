import type { TokenStore } from '@commercetools/ts-client';

export const isNonNullable = <TValue>(value: TValue): value is NonNullable<TValue> => {
  return value !== null && value !== undefined;
};

export const isObject = (value: unknown): value is object => {
  return typeof value === 'object';
};

export const isTokenStore = (value: unknown): value is TokenStore => {
  return (
    isNonNullable(value) &&
    isObject(value) &&
    Reflect.has(value, 'token') &&
    Reflect.has(value, 'expirationTime') &&
    Reflect.has(value, 'refreshToken')
  );
};
