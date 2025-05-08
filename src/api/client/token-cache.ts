import type { TokenCache, TokenStore } from '@commercetools/ts-client';

import { localStorageService } from '~/services/browser-storage/browser-storage.service';
import { LOCAL_STORAGE_KEY } from '~/services/browser-storage/constants';

import type { ClientTokenStoreType } from './types';

import { refreshTokenSchema, tokenStoreSchema } from '../schemas/schemas';
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

    const cachedStoreRaw = localStorageService.getItem(storeType);
    const cachedRefreshTokenRaw = localStorageService.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

    if (cachedStoreRaw) {
      const parsedStore = tokenStoreSchema.parse(cachedStoreRaw);

      let refreshToken = parsedStore.refreshToken;

      if (storeType === CLIENT_TOKEN_STORE_TYPE.CUSTOMER && cachedRefreshTokenRaw) {
        const parsedRefreshToken = refreshTokenSchema.parse(cachedRefreshTokenRaw);
        refreshToken = parsedRefreshToken;
      }

      this.tokenStore = {
        ...parsedStore,
        refreshToken,
      };
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

    localStorageService.removeItem(this.storeType);
  }

  public get(): TokenStore {
    return this.tokenStore;
  }

  public hasValidToken(): boolean {
    const MINUTES_BEFORE_EXPIRATION = 5;
    const MILLISECONDS_IN_SECOND = 1000;
    const SECONDS_IN_MINUTE = 60;

    const expirationTime = this.tokenStore.expirationTime;

    if (!expirationTime) {
      return false;
    }

    return (
      expirationTime - Date.now() >
      MINUTES_BEFORE_EXPIRATION * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND
    );
  }

  public set(cache: TokenStore): void {
    Object.assign(this.tokenStore, cache);

    const { expirationTime, refreshToken, token } = this.tokenStore;

    if (this.storeType === CLIENT_TOKEN_STORE_TYPE.CUSTOMER) {
      localStorageService.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken ?? '');
      localStorageService.setItem(LOCAL_STORAGE_KEY.CUSTOMER, { expirationTime, token });
    } else {
      localStorageService.setItem(LOCAL_STORAGE_KEY.ANONYMOUS, this.tokenStore);
    }
  }
}
