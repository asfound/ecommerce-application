import type { ApiRootGetter } from '~/api/types/types';

import type { AppProduct, ProductsFilterPayload } from './types';

import { EXPAND_PATH } from './constants';
import { getQueryArguments } from './helpers';
import { mapToFlatAppProducts, mapVariantToAppProduct } from './mappers';

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

  public async getByProductId(id: string): Promise<AppProduct> {
    const response = await this.apiRoot()
      .productProjections()
      .withId({ ID: id })
      .get({
        queryArgs: { expand: EXPAND_PATH.PRODUCT_TYPE },
      })
      .execute();

    return mapVariantToAppProduct(response.body.masterVariant, response.body);
  }
}
