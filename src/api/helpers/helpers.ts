import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import { ApiBuilder } from '../client/api-builder';

export const isObject = (value: unknown): value is object => {
  return typeof value === 'object';
};

export const getApiRoot = (): ByProjectKeyRequestBuilder => {
  return ApiBuilder.instance.apiRoot;
};
