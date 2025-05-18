import type { ClientResponse, SuggestionResult } from '@commercetools/platform-sdk';

import type { ApiRootGetter } from '~/api/types/types';

import { APP_LOCALE } from '~/shared/constants/constants';

export class SuggestionsService {
  private static instance: null | SuggestionsService = null;

  private readonly apiRoot: ApiRootGetter;

  public constructor(apiRoot: ApiRootGetter) {
    this.apiRoot = apiRoot;
  }

  public static getInstance(apiRoot: ApiRootGetter): SuggestionsService {
    SuggestionsService.instance ??= new SuggestionsService(apiRoot);
    return SuggestionsService.instance;
  }

  public suggest(input: string): Promise<ClientResponse<SuggestionResult>> {
    const response = this.apiRoot()
      .productProjections()
      .suggest()
      .get({
        queryArgs: {
          [`searchKeywords.${APP_LOCALE}`]: input,
          fuzzy: true,
        },
      })
      .execute();

    return response;
  }
}
