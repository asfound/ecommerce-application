import type {
  ClientResponse,
  CustomerSignInResult,
  MyCustomerSignin,
} from '@commercetools/platform-sdk';

import type { ApiRootGetter } from '~/api/types/types';

import { ApiBuilder } from '~/api/client/api-builder';
import { ClientTokenCache } from '~/api/client/token-cache';
import { isSuccessResponse } from '~/api/helpers/helpers';

import type { LoginPayload, SignupPayload } from './types';

import { createCustomerDraft } from './helpers/helpers';

export class AuthService {
  private static _instance: AuthService | null = null;

  private readonly apiRoot;

  private constructor(apiRoot: ApiRootGetter) {
    this.apiRoot = apiRoot;
  }

  public static getInstance(apiRoot: ApiRootGetter): AuthService {
    AuthService._instance ??= new AuthService(apiRoot);

    return AuthService._instance;
  }

  public isLoggedIn(): boolean {
    const loggedIn = localStorage.getItem('loggedIn'); // TODO: replace by local storage service

    return loggedIn ? true : false;
  }

  public async login(payload: LoginPayload): Promise<ClientResponse<CustomerSignInResult>> {
    const body: MyCustomerSignin = {
      activeCartSignInMode: 'MergeWithExistingCustomerCart',
      email: payload.email,
      password: payload.password,
    };

    const response = await this.apiRoot().me().login().post({ body }).execute();

    if (isSuccessResponse(response)) {
      ClientTokenCache.clearAnonymousCache();

      ApiBuilder.instance.usePasswordBuilder({
        password: payload.password,
        username: payload.email,
      });
    }

    return response;
  }

  public logout(): void {
    ClientTokenCache.clearCustomerCache();

    ApiBuilder.instance.useAnonymousBuilder();
  }

  public async signup(payload: SignupPayload): Promise<ClientResponse<CustomerSignInResult>> {
    const body = createCustomerDraft(payload);

    const response = await this.apiRoot().me().signup().post({ body }).execute();

    if (isSuccessResponse(response)) {
      ClientTokenCache.clearAnonymousCache();

      ApiBuilder.instance.usePasswordBuilder({
        password: payload.password,
        username: payload.email,
      });
    }

    return response;
  }
}
