import type { ApiRootGetter } from '~/api/types/types';

import { APP_LOCALE } from '~/shared/constants/constants';

import type { AppProduct } from './types';

import { mapToAppProducts } from './mappers';

export interface ProductsFilterPayload {
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

  public async filterProducts(payload: ProductsFilterPayload): Promise<AppProduct[]> {
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
}
