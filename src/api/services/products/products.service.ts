import type { ApiRootGetter } from '~/api/types/types';

import { APP_LOCALE } from '~/shared/constants/constants';

import type { AppProduct } from './types';

import { mapToAppProducts } from './mappers';

const TEMPORARY_SORT = `name.${APP_LOCALE} asc`;

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

  public async getByCategoryId(payload: {
    categoryId: string;
    limit: number;
  }): Promise<AppProduct[]> {
    const response = await this.apiRoot()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          ['filter.query']: [`categories.id: subtree("${payload.categoryId}")`],
          limit: payload.limit,
          markMatchingVariants: true,
        },
      })
      .execute();

    return mapToAppProducts(response.body.results);
  }

  public async getProducts(payload: { limit: number }): Promise<AppProduct[]> {
    const response = await this.apiRoot()
      .productProjections()
      .get({ queryArgs: { limit: payload.limit, sort: TEMPORARY_SORT } })
      .execute();

    return mapToAppProducts(response.body.results);
  }

  public async searchByTerm(payload: { limit: number; searchTerm: string }): Promise<AppProduct[]> {
    const response = await this.apiRoot()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          [`text.${APP_LOCALE}`]: payload.searchTerm,
          fuzzy: true,
          limit: payload.limit,
          markMatchingVariants: true,
          sort: TEMPORARY_SORT,
        },
      })
      .execute();

    return mapToAppProducts(response.body.results);
  }
}
