import type {
  ClientResponse,
  CustomerSignInResult,
  MyCustomerSignin,
} from '@commercetools/platform-sdk';

import type { ApiRootGetter } from '~/api/types/types';
import type { BrowserStorageService } from '~/services/browser-storage/browser-storage.service';
import type { LocalStorageData } from '~/services/browser-storage/types';

import { ApiBuilder } from '~/api/client/api-builder';
import { ClientTokenCache } from '~/api/client/token-cache';
import { ACTIVE_CART_SIGNIN_MODE } from '~/api/constants/constants';
import { isSuccessResponse } from '~/api/helpers/helpers';
import { LOCAL_STORAGE_KEY } from '~/services/browser-storage/constants';

import type { LoginPayload, SignupPayload } from './types';

import { createCustomerDraft } from './helpers';

export class AuthService {
  private static instance: AuthService | null = null;

  private readonly apiRoot;

  private readonly localStorageService: BrowserStorageService<LocalStorageData>;

  private loggedIn = false;

  private constructor(
    apiRoot: ApiRootGetter,
    localStorageService: BrowserStorageService<LocalStorageData>,
  ) {
    this.apiRoot = apiRoot;

    this.localStorageService = localStorageService;

    const loggedIn = localStorageService.getItem(LOCAL_STORAGE_KEY.LOGGED_IN);

    if (loggedIn) {
      this.loggedIn = true;
    }
  }

  public static getInstance(
    apiRoot: ApiRootGetter,
    localStorageService: BrowserStorageService<LocalStorageData>,
  ): AuthService {
    AuthService.instance ??= new AuthService(apiRoot, localStorageService);

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

      this.localStorageService.setItem(LOCAL_STORAGE_KEY.LOGGED_IN, this.loggedIn);

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

    this.localStorageService.removeItem(LOCAL_STORAGE_KEY.LOGGED_IN);

    ClientTokenCache.clearCustomerCache();

    ApiBuilder.instance.useAnonymousBuilder();
  }

  public async signup(payload: SignupPayload): Promise<ClientResponse<CustomerSignInResult>> {
    const body = createCustomerDraft(payload);

    const response = await this.apiRoot().me().signup().post({ body }).execute();

    return response;
  }
}
