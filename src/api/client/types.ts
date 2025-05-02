import type { TokenCache, UserAuthOptions } from '@commercetools/ts-client';

import type { AUTH_FLOW_TYPE, CLIENT_TOKEN_STORE_TYPE } from './constants';

export type ApiBuilderPayload = AnonymousFlowPayload | PasswordFlowPayload | RefreshFlowPayload;

export type ClientTokenStoreType =
  (typeof CLIENT_TOKEN_STORE_TYPE)[keyof typeof CLIENT_TOKEN_STORE_TYPE];

interface AnonymousFlowPayload extends BaseApiBuilderPayload {
  type: typeof AUTH_FLOW_TYPE.ANONYMOUS;
}

interface BaseApiBuilderPayload {
  tokenCache: TokenCache;
  type: (typeof AUTH_FLOW_TYPE)[keyof typeof AUTH_FLOW_TYPE];
}

interface PasswordFlowPayload extends BaseApiBuilderPayload {
  type: typeof AUTH_FLOW_TYPE.PASSWORD;
  user: UserAuthOptions;
}

interface RefreshFlowPayload extends BaseApiBuilderPayload {
  refreshToken: string;
  type: typeof AUTH_FLOW_TYPE.REFRESH;
}
