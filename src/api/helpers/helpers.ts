import type { ByProjectKeyRequestBuilder, ClientResponse } from '@commercetools/platform-sdk';

import { ApiBuilder } from '../client/api-builder';
import { RESPONSE_STATUS_CODE } from '../constants/constants';

export const getApiRoot = (): ByProjectKeyRequestBuilder => {
  return ApiBuilder.instance.apiRoot;
};

export const isSuccessResponse = <T>(response: ClientResponse<T>): boolean => {
  return (
    response.statusCode != null &&
    response.statusCode >= RESPONSE_STATUS_CODE.OK_MIN &&
    response.statusCode < RESPONSE_STATUS_CODE.OK_MAX
  );
};
