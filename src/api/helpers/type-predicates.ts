import type { TokenStore } from '@commercetools/ts-client';

import { isObject } from '~/shared/type-predicates/type-predicates';

export const isTokenStore = (value: unknown): value is TokenStore => {
  return (
    value != null &&
    isObject(value) &&
    Reflect.has(value, 'token') &&
    Reflect.has(value, 'expirationTime') &&
    Reflect.has(value, 'refreshToken')
  );
};
