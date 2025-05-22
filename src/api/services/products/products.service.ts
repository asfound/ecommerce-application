import type { ApiRootGetter } from '~/api/types/types';

import type { AppProduct, ProductsFilterPayload } from './types';

import { getQueryArguments } from './helpers';
import { mapToFlatAppProducts } from './mappers';

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

  public async filterProducts(payload: ProductsFilterPayload): Promise<AppProduct[]> {
    const queryArguments = getQueryArguments(payload);

    const response = await this.apiRoot()
      .productProjections()
      .search()
      .get({ queryArgs: queryArguments })
      .execute();

    return mapToFlatAppProducts(response.body.results, payload.sortField, payload.sortDirection);
  }
}
