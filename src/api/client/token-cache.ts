import type { TokenCache, TokenStore } from '@commercetools/ts-client';

import type { ClientTokenStoreType } from './types';

import { isTokenStore } from '../helpers/type-predicates';
import { CLIENT_TOKEN_STORE_TYPE } from './constants';

const DEFAULT_TOKEN_STORE = {
  expirationTime: 0,
  refreshToken: undefined,
  token: '',
};

export class ClientTokenCache implements TokenCache {
  private static anonymousCache: ClientTokenCache | null;

  private static customerCache: ClientTokenCache | null;

  private readonly storeType: ClientTokenStoreType;

  private tokenStore: TokenStore;

  public constructor(storeType: ClientTokenStoreType) {
    this.storeType = storeType;

    this.tokenStore = { ...DEFAULT_TOKEN_STORE };

    const cachedStore = localStorage.getItem(this.storeType); // TODO: replace by service

    if (cachedStore) {
      const parsed: unknown = JSON.parse(cachedStore);

      if (isTokenStore(parsed)) {
        this.tokenStore = parsed;
      }
    }
  }

  public static clearAnonymousCache(): void {
    ClientTokenCache.anonymousCache?.clear();
  }

  public static clearCustomerCache(): void {
    ClientTokenCache.customerCache?.clear();
  }

  public static getAnonymousCache(): ClientTokenCache {
    ClientTokenCache.anonymousCache ??= new ClientTokenCache(CLIENT_TOKEN_STORE_TYPE.ANONYMOUS);

    return ClientTokenCache.anonymousCache;
  }

  public static getCustomerCache(): ClientTokenCache {
    ClientTokenCache.customerCache ??= new ClientTokenCache(CLIENT_TOKEN_STORE_TYPE.CUSTOMER);

    return ClientTokenCache.customerCache;
  }

  public clear(): void {
    this.tokenStore = { ...DEFAULT_TOKEN_STORE };

    localStorage.removeItem(this.storeType); // TODO: replace by service
  }

  public get(): TokenStore {
    return this.tokenStore;
  }

  public set(cache: TokenStore): void {
    Object.assign(this.tokenStore, cache);

    localStorage.setItem(this.storeType, JSON.stringify(this.tokenStore)); // TODO: replace by service
  }
}
