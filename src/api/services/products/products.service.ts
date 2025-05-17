import type { ApiRootGetter } from '~/api/types/types';

import type { AppProduct } from './types';

import { mapToAppProducts } from './mappers';

export class ProductsService {
  private static instance: null | ProductsService = null;

  private readonly apiRoot: ApiRootGetter;

  public constructor(apiRoot: ApiRootGetter) {
    this.apiRoot = apiRoot;
  }

  public static getInstance(apiRoot: ApiRootGetter): ProductsService {
    ProductsService.instance ??= new ProductsService(apiRoot);
    return ProductsService.instance;
  }

  public async getProducts(payload: { limit: number }): Promise<AppProduct[]> {
    const response = await this.apiRoot()
      .productProjections()
      .get({ queryArgs: { limit: payload.limit } })
      .execute();

    return mapToAppProducts(response.body.results);
  }
}
