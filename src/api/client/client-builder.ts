import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/ts-client';

import type { ApiBuilderPayload } from './types';

import {
  AUTH_FLOW_TYPE,
  COMMON_AUTH_OPTIONS,
  COMMON_CLIENT_CREDENTIALS,
  HTTP_MIDDLEWARE_OPTIONS,
  PROJECT_KEY,
} from './constants';

export const createClientBuilder = (): ClientBuilder => {
  return new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withHttpMiddleware(HTTP_MIDDLEWARE_OPTIONS);
};

export const createApiBuilder = (payload: ApiBuilderPayload): ByProjectKeyRequestBuilder => {
  const builder = createClientBuilder();

  switch (payload.type) {
    case AUTH_FLOW_TYPE.ANONYMOUS: {
      builder.withAnonymousSessionFlow({
        ...COMMON_AUTH_OPTIONS,
        credentials: COMMON_CLIENT_CREDENTIALS,
        tokenCache: payload.tokenCache,
      });
      break;
    }

    case AUTH_FLOW_TYPE.EXISTING: {
      builder.withExistingTokenFlow(payload.authorization, { force: true });
      break;
    }

    case AUTH_FLOW_TYPE.PASSWORD: {
      builder.withPasswordFlow({
        ...COMMON_AUTH_OPTIONS,
        credentials: {
          ...COMMON_CLIENT_CREDENTIALS,
          user: payload.user,
        },
        tokenCache: payload.tokenCache,
      });
      break;
    }

    case AUTH_FLOW_TYPE.REFRESH: {
      builder.withRefreshTokenFlow({
        ...COMMON_AUTH_OPTIONS,
        credentials: COMMON_CLIENT_CREDENTIALS,
        refreshToken: payload.refreshToken,
        tokenCache: payload.tokenCache,
      });
      break;
    }
  }

  const client = builder.build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
};
