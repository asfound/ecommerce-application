import { ClientTokenCache } from '../token-cache';

const anonCache = ClientTokenCache.getAnonymousCache();
const customerCache = ClientTokenCache.getCustomerCache();

describe('ClientTokenCache', () => {
  test('getAnonymousCache should return cache instance', () => {
    expect(anonCache).toBeInstanceOf(ClientTokenCache);
  });

  test('getCustomerCache should return cache instance', () => {
    expect(customerCache).toBeInstanceOf(ClientTokenCache);
  });
});
