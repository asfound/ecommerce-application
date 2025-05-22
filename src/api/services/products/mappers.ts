import type { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';

import { APP_LOCALE } from '~/shared/constants/constants';

import type { AppProduct } from './types';

import { PRODUCT_ATTRIBUTE } from './constants';

const isAttribute = (value: unknown): value is { key: string; label: string } => {
  return (
    value != null &&
    typeof value === 'object' &&
    Reflect.has(value, 'key') &&
    Reflect.has(value, 'label')
  );
};

const mapVariantToAppProduct = (
  variant: ProductVariant,
  projection: ProductProjection,
): AppProduct => {
  const bestSellerAttribute = variant.attributes?.find(
    (attribute) => attribute.name === PRODUCT_ATTRIBUTE.BEST_SELLER,
  );

  const weightAttribute = variant.attributes?.find(
    (attribute) => attribute.name === PRODUCT_ATTRIBUTE.WEIGHT,
  );

  const weightValue: unknown = weightAttribute?.value;
  const weightLabel = isAttribute(weightValue) ? weightValue.label : '';

  return {
    bestSeller: !!bestSellerAttribute?.value,
    description: projection.description?.[APP_LOCALE] ?? '',
    image: {
      label: variant.images?.[0]?.label ?? '',
      url: variant.images?.[0]?.url ?? '',
    },
    images:
      variant.images?.map((image) => ({
        label: image.label ?? '',
        url: image.url,
      })) ?? [],
    name: projection.name[APP_LOCALE],
    price: {
      default: variant.prices?.[0]?.value?.centAmount ?? 0,
      discounted: variant.prices?.[0]?.discounted?.value?.centAmount,
    },
    sku: variant.sku ?? '',
    variants: [],
    weight: weightAttribute ? weightLabel : undefined,
  };
};

const mapToAppProduct = (projection: ProductProjection): AppProduct => {
  const mainProduct = mapVariantToAppProduct(projection.masterVariant, projection);

  return {
    ...mainProduct,
    variants: projection.variants.map((variant) => mapVariantToAppProduct(variant, projection)),
  };
};

export const mapToAppProducts = (projections: ProductProjection[]): AppProduct[] => {
  return projections.map((projection) => mapToAppProduct(projection));
};
