import type { TokenCache, UserAuthOptions } from '@commercetools/ts-client';

import type { AUTH_FLOW_TYPE, CLIENT_TOKEN_STORE_TYPE } from './constants';

export type ApiBuilderOptions =
  | { refreshToken: string; tokenCache: TokenCache; type: typeof AUTH_FLOW_TYPE.REFRESH }
  | { tokenCache: TokenCache; type: typeof AUTH_FLOW_TYPE.ANONYMOUS }
  | { tokenCache: TokenCache; type: typeof AUTH_FLOW_TYPE.PASSWORD; user: UserAuthOptions };

export type ClientTokenStoreType =
  (typeof CLIENT_TOKEN_STORE_TYPE)[keyof typeof CLIENT_TOKEN_STORE_TYPE];
