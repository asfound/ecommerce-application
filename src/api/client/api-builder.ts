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
    this._apiRoot = this.createApiWithAnonymous();
  }

  public initialize(): void {
    const tokenCache = ClientTokenCache.getCustomerCache();
    const refreshToken = tokenCache.get().refreshToken;

    this._apiRoot = refreshToken
      ? this.createApiWithRefreshToken(refreshToken)
      : this.createApiWithAnonymous();
  }

  public useAnonymousBuilder(): void {
    this._apiRoot = this.createApiWithAnonymous();
  }

  public usePasswordBuilder(payload: UserAuthOptions): void {
    this._apiRoot = this.createApiWithPassword(payload);
  }

  private createApiWithAnonymous(): ByProjectKeyRequestBuilder {
    const tokenCache = ClientTokenCache.getAnonymousCache();
    return createApiBuilder({ tokenCache, type: AUTH_FLOW_TYPE.ANONYMOUS });
  }

  private createApiWithPassword(payload: UserAuthOptions): ByProjectKeyRequestBuilder {
    const tokenCache = ClientTokenCache.getCustomerCache();
    return createApiBuilder({ tokenCache, type: AUTH_FLOW_TYPE.PASSWORD, user: payload });
  }

  private createApiWithRefreshToken(refreshToken: string): ByProjectKeyRequestBuilder {
    const tokenCache = ClientTokenCache.getCustomerCache();
    return createApiBuilder({ refreshToken, tokenCache, type: AUTH_FLOW_TYPE.REFRESH });
  }
}
