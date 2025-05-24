import type { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';

import { APP_LOCALE } from '~/shared/constants/constants';

import type { AppProduct, ProductsFilterPayload } from './types';

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

export const mapToFlatAppProducts = (
  projections: ProductProjection[],
  sortField: ProductsFilterPayload['sortField'],
  sortDirection: ProductsFilterPayload['sortDirection'],
): AppProduct[] => {
  const products = projections.flatMap((projection) => {
    const result: AppProduct[] = [];

    if (projection.masterVariant.isMatchingVariant) {
      result.push(mapVariantToAppProduct(projection.masterVariant, projection));
    }

    if (projection.variants.length > 0)
      for (const variant of projection.variants) {
        if (variant.isMatchingVariant) {
          result.push(mapVariantToAppProduct(variant, projection));
        }
      }

    return result;
  });

  return products.sort((a, b) => {
    if (sortField === 'price' && sortDirection === 'asc') {
      return a.price.default - b.price.default;
    }

    if (sortField === 'price' && sortDirection === 'desc') {
      return b.price.default - a.price.default;
    }

    if (sortField === 'name' && sortDirection === 'asc') {
      return a.name.localeCompare(b.name);
    }

    if (sortField === 'name' && sortDirection === 'desc') {
      return b.name.localeCompare(a.name);
    }

    return 0;
  });
};
