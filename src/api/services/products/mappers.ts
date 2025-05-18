import type { ProductProjection } from '@commercetools/platform-sdk';

import { APP_LOCALE } from '~/shared/constants/constants';

import type { AppProduct } from './types';

import { PRODUCT_ATTRIBUTE } from './constants';

export const mapToAppProducts = (products: ProductProjection[]): AppProduct[] => {
  return products.map((product) => ({
    bestSeller: product.masterVariant.attributes?.find(
      (attribute) => attribute.name === PRODUCT_ATTRIBUTE.BEST_SELLER,
    )?.value
      ? true
      : false,
    description: product.description?.[APP_LOCALE] ?? '',
    image: {
      label: product.masterVariant.images?.[0].label ?? '',
      url: product.masterVariant.images?.[0].url ?? '',
    },
    name: product.name[APP_LOCALE],
    price: {
      default: product.masterVariant.prices?.[0].value.centAmount ?? 0,
      discounted: product.masterVariant.prices?.[0].discounted?.value.centAmount,
    },
    sku: product.masterVariant.sku ?? '',
  }));
};
