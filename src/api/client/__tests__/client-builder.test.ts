import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/ts-client';

import { createApiBuilder, createClientBuilder } from '../client-builder';

const clientBuilder = createClientBuilder();

const apiBuilder = createApiBuilder({
  tokenCache: {
    get: vi.fn(),
    set: vi.fn(),
  },
  type: 'anonymous',
});

describe('createClientBuilder', () => {
  test('clientBuilder should be defined', () => {
    expect(clientBuilder).toBeDefined();
  });

  test('clientBuilder should be instance of CLientBuilder', () => {
    expect(clientBuilder).toBeInstanceOf(ClientBuilder);
  });
});

describe('createApiBuilder', () => {
  test('apiBuilder should be defined', () => {
    expect(apiBuilder).toBeDefined();
  });

  test('apiBuilder should be instance of ByProjectKeyRequestBuilder', () => {
    expect(apiBuilder).toBeInstanceOf(ByProjectKeyRequestBuilder);
  });
});
