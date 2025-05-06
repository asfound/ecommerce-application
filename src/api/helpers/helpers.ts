import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import { ApiBuilder } from '../client/api-builder';

export const getApiRoot = (): ByProjectKeyRequestBuilder => {
  return ApiBuilder.instance.apiRoot;
};
