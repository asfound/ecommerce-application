import type { ApiRootGetter } from '~/api/types/types';

import { APP_LOCALE } from '~/shared/constants/constants';

import type { AppProduct } from './types';

import { mapToAppProducts } from './mappers';

const TEMPORARY_SORT = `name.${APP_LOCALE} asc`;

export interface ProductsPayload {
  categoryId?: string;
  productsPerPage: number;
  searchTerm?: string;
  sortDirection: 'asc' | 'desc';
  sortField: 'name' | 'price';
}

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

  public async filterProducts(payload: ProductsPayload): Promise<AppProduct[]> {
    const response = await this.apiRoot()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          [`text.${APP_LOCALE}`]: payload.searchTerm ?? undefined,
          ['filter.query']: payload.categoryId
            ? [`categories.id: subtree("${payload.categoryId}")`]
            : undefined,
          limit: payload.productsPerPage,
          markMatchingVariants: true,
          sort:
            payload.sortField === 'name'
              ? `name.${APP_LOCALE} ${payload.sortDirection}`
              : `price ${payload.sortDirection}`,
        },
      })
      .execute();

    return mapToAppProducts(response.body.results);
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
          sort: TEMPORARY_SORT,
        },
      })
      .execute();

    return mapToAppProducts(response.body.results);
  }

  public async getProducts(payload: { limit: number }): Promise<AppProduct[]> {
    const response = await this.apiRoot()
      .productProjections()
      .get({
        queryArgs: {
          limit: payload.limit,
          sort: TEMPORARY_SORT,
        },
      })
      .execute();

    return mapToAppProducts(response.body.results);
  }

  public async searchByTerm(payload: {
    categoryId: string;
    limit: number;
    searchTerm: string;
  }): Promise<AppProduct[]> {
    const response = await this.apiRoot()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          [`text.${APP_LOCALE}`]: payload.searchTerm,
          ['filter.query']: payload.categoryId
            ? [`categories.id: subtree("${payload.categoryId}")`]
            : undefined,
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
