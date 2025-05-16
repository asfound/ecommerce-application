import type { CategoryPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';

import type { ApiRootGetter } from '~/api/types/types';

export class CategoriesService {
  private static instance: CategoriesService | null;

  private readonly apiRoot;

  private constructor(apiRoot: ApiRootGetter) {
    this.apiRoot = apiRoot;
  }

  public static getInstance(apiRoot: ApiRootGetter): CategoriesService {
    CategoriesService.instance ??= new CategoriesService(apiRoot);
    return CategoriesService.instance;
  }

  public async getCategories(): Promise<ClientResponse<CategoryPagedQueryResponse>> {
    const response = await this.apiRoot().categories().get().execute();

    return response;
  }
}
