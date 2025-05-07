import type {
  ClientResponse,
  CustomerSignInResult,
  MyCustomerSignin,
} from '@commercetools/platform-sdk';

import type { ApiRootGetter } from '~/api/types/types';

import { ApiBuilder } from '~/api/client/api-builder';
import { ClientTokenCache } from '~/api/client/token-cache';
import { ACTIVE_CART_SIGNIN_MODE } from '~/api/constants/constants';
import { isSuccessResponse } from '~/api/helpers/helpers';

import type { LoginPayload, SignupPayload } from './types';

import { createCustomerDraft } from './helpers/helpers';

export class AuthService {
  private static instance: AuthService | null = null;

  private readonly apiRoot;

  private loggedIn = false;

  private constructor(apiRoot: ApiRootGetter) {
    this.apiRoot = apiRoot;

    const loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn) {
      this.loggedIn = true;
    }
  }

  public static getInstance(apiRoot: ApiRootGetter): AuthService {
    AuthService.instance ??= new AuthService(apiRoot);

    return AuthService.instance;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public async login(payload: LoginPayload): Promise<ClientResponse<CustomerSignInResult>> {
    const body: MyCustomerSignin = {
      activeCartSignInMode: ACTIVE_CART_SIGNIN_MODE.MERGE_WITH_EXISTING,
      email: payload.email,
      password: payload.password,
    };

    const response = await this.apiRoot().me().login().post({ body }).execute();

    if (isSuccessResponse(response)) {
      this.loggedIn = true;

      localStorage.setItem('loggedIn', JSON.stringify(this.loggedIn)); // TODO: replace by local storage service

      ClientTokenCache.clearAnonymousCache();

      ApiBuilder.instance.usePasswordBuilder({
        password: payload.password,
        username: payload.email,
      });

      await this.apiRoot().me().get().execute();
    }

    return response;
  }

  public logout(): void {
    this.loggedIn = false;

    localStorage.removeItem('loggedIn'); // TODO: replace by local storage service

    ClientTokenCache.clearCustomerCache();

    ApiBuilder.instance.useAnonymousBuilder();
  }

  public async signup(payload: SignupPayload): Promise<ClientResponse<CustomerSignInResult>> {
    const body = createCustomerDraft(payload);

    const response = await this.apiRoot().me().signup().post({ body }).execute();

    return response;
  }
}
