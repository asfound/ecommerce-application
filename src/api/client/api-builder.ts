import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import type { UserAuthOptions } from '@commercetools/ts-client';

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

  private _apiRoot: ByProjectKeyRequestBuilder;

  private constructor() {
    this._apiRoot = this.createAnonymousBuilder();
  }

  public initialize(): void {
    const tokenCache = ClientTokenCache.getCustomerCache();
    const refreshToken = tokenCache.get().refreshToken;

    this._apiRoot = refreshToken
      ? this.createWithRefreshTokenBuilder(refreshToken)
      : this.createAnonymousBuilder();
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

  private createWithPasswordBuilder(payload: UserAuthOptions): ByProjectKeyRequestBuilder {
    const tokenCache = ClientTokenCache.getCustomerCache();
    return createApiBuilder({ tokenCache, type: AUTH_FLOW_TYPE.PASSWORD, user: payload });
  }

  private createWithRefreshTokenBuilder(refreshToken: string): ByProjectKeyRequestBuilder {
    const tokenCache = ClientTokenCache.getCustomerCache();
    return createApiBuilder({ refreshToken, tokenCache, type: AUTH_FLOW_TYPE.REFRESH });
  }
}
