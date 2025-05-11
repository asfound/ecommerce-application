import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import type { UserAuthOptions } from '@commercetools/ts-client';

import { localStorageService } from '~/services';
import { LOCAL_STORAGE_KEY } from '~/services/browser-storage/constants';

import { createApiBuilder } from './client-builder';
import { AUTH_FLOW_TYPE } from './constants';
import { ClientTokenCache } from './token-cache';

export class ApiBuilder {
  public static get instance(): ApiBuilder {
    ApiBuilder._instance ??= new ApiBuilder();
    return ApiBuilder._instance;
  }

  private static _instance: ApiBuilder | null = null;

  public get apiRoot(): ByProjectKeyRequestBuilder {
    return this._apiRoot;
  }

  private _apiRoot!: ByProjectKeyRequestBuilder;

  public initialize(): void {
    const customerLoggedIn = localStorageService.getItem(LOCAL_STORAGE_KEY.LOGGED_IN);

    const customerCache = ClientTokenCache.getCustomerCache();
    const customerTokenStore = customerCache.get();
    const customerToken = customerTokenStore.token;
    const customerHasValidToken = customerCache.hasValidToken();

    if (customerLoggedIn && customerHasValidToken && customerToken) {
      this._apiRoot = this.createWithExistingTokenBuilder(`Bearer ${customerToken}`);
    } else {
      ClientTokenCache.clearCustomerCache();
      localStorageService.removeItem(LOCAL_STORAGE_KEY.LOGGED_IN);
      this._apiRoot = this.createAnonymousBuilder();
    }
  }

  public useAnonymousBuilder(): void {
    this._apiRoot = this.createAnonymousBuilder();
  }

  public usePasswordBuilder(payload: UserAuthOptions): void {
    this._apiRoot = this.createWithPasswordBuilder(payload);
  }

  private createAnonymousBuilder(): ByProjectKeyRequestBuilder {
    const tokenCache = ClientTokenCache.getAnonymousCache();
    return createApiBuilder({ tokenCache, type: AUTH_FLOW_TYPE.ANONYMOUS });
  }

  private createWithExistingTokenBuilder(authorization: string): ByProjectKeyRequestBuilder {
    return createApiBuilder({ authorization, type: AUTH_FLOW_TYPE.EXISTING });
  }

  private createWithPasswordBuilder(payload: UserAuthOptions): ByProjectKeyRequestBuilder {
    const tokenCache = ClientTokenCache.getCustomerCache();
    return createApiBuilder({ tokenCache, type: AUTH_FLOW_TYPE.PASSWORD, user: payload });
  }
}
