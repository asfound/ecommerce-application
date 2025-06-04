import type { ApiRootGetter } from '~/api/types/types';

import type {
  AppProduct,
  AppProductWithInCart,
  MappedFilterOptions,
  ProductsFilterPayload,
} from './types';

import { EXPAND_PATH } from './constants';
import { getQueryArguments, getQueryFacets } from './helpers';
import { mapToFilterOptions, mapToFlatAppProducts, mapVariantToAppProduct } from './mappers';

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

  public async getFilteredProducts(
    payload: ProductsFilterPayload,
  ): Promise<MappedFilterOptions & { products: AppProduct[] }> {
    const queryArguments = getQueryArguments(payload);
    const facets = getQueryFacets(payload.categoryId ?? '');

    const response = await this.apiRoot()
      .productProjections()
      .search()
      .get({
        queryArgs: { ...queryArguments, expand: [EXPAND_PATH.CATEGORIES], ...facets },
      })
      .execute();

    const products = mapToFlatAppProducts(
      response.body.results,
      payload.sortField,
      payload.sortDirection,
    );

    const { brandOptions, weightOptions } = mapToFilterOptions(response.body.facets ?? {});

    return { brandOptions, products, weightOptions };
  }

  public async getProductById(id: string): Promise<AppProduct> {
    const response = await this.apiRoot()
      .productProjections()
      .withId({ ID: id })
      .get({
        queryArgs: { expand: [EXPAND_PATH.PRODUCT_TYPE, EXPAND_PATH.CATEGORIES] },
      })
      .execute();

    return mapVariantToAppProduct(response.body.masterVariant, response.body);
  }

  public markProductWithInCart(product: AppProduct, skuSet: Set<string>): AppProductWithInCart {
    return {
      ...product,
      inCart: skuSet.has(product.sku),
      variants: product.variants.map((variant) => this.markProductWithInCart(variant, skuSet)),
    };
  }
}
