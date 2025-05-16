import { ApiBuilder } from '../api-builder';

describe('ApiBuilder', () => {
  test('apiRoot should be undefined before initialization', () => {
    expect(ApiBuilder.instance.apiRoot).toBeUndefined();
  });

  test('apiRoot should be defined after initialization', () => {
    ApiBuilder.instance.initialize();

    expect(ApiBuilder.instance.apiRoot).toBeDefined();
  });
});
