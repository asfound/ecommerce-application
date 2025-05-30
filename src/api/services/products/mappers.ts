import {
  type FacetResults,
  FacetTypesValues,
  type ProductProjection,
  type ProductVariant,
} from '@commercetools/platform-sdk';
import { isString } from 'lodash';

import type { FilterOption } from '~/components/filter/filter';

import { APP_LOCALE } from '~/shared/constants/constants';

import type { AppProduct, MappedFilterOptions, ProductsFilterPayload } from './types';

import { FACET, PRODUCT_ATTRIBUTE } from './constants';
import { sortProducts, sortWeightOptions } from './helpers';

const isAttribute = (value: unknown): value is { key: string; label: string } => {
  return (
    value != null &&
    typeof value === 'object' &&
    Reflect.has(value, 'key') &&
    Reflect.has(value, 'label')
  );
};

export const mapVariantToAppProduct = (
  variant: ProductVariant,
  projection: ProductProjection,
  includeVariants = true,
): AppProduct => {
  const bestSellerAttribute = variant.attributes?.find(
    (attribute) => attribute.name === PRODUCT_ATTRIBUTE.BEST_SELLER,
  );

  const weightAttribute = variant.attributes?.find(
    (attribute) => attribute.name === PRODUCT_ATTRIBUTE.WEIGHT,
  );

  const weightValue: unknown = weightAttribute?.value;
  const weightLabel = isAttribute(weightValue) ? weightValue.label : '';

  const allVariants = [projection.masterVariant, ...projection.variants];
  const otherVariants = allVariants.filter((v) => v.sku !== variant.sku);

  return {
    bestSeller: !!bestSellerAttribute?.value,
    categories: projection.categories.map((category) => ({
      id: category.id,
      name: category.obj?.name[APP_LOCALE] ?? '',
    })),
    description: projection.description?.[APP_LOCALE] ?? '',
    image: { label: variant.images?.[0]?.label ?? '', url: variant.images?.[0]?.url ?? '' },
    images: variant.images?.map((image) => ({ label: image.label ?? '', url: image.url })) ?? [],
    name: projection.name[APP_LOCALE],
    price: {
      default: variant.prices?.[0]?.value?.centAmount ?? 0,
      discounted: variant.prices?.[0]?.discounted?.value?.centAmount,
    },
    productId: projection.id,
    productType: projection.productType.obj?.key,
    sku: variant.sku ?? '',
    variants: includeVariants
      ? otherVariants.map((v) => mapVariantToAppProduct(v, projection, false))
      : [],
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

  return products.sort((a, b) => sortProducts(a, b, { sortDirection, sortField }));
};

export const mapToFilerOptions = (facetResults: FacetResults): MappedFilterOptions => {
  const facetBrand = facetResults[FACET.ATTRIBUTE_BRAND];
  const facetWeightKey = facetResults[FACET.ATTRIBUTE_WEIGHT_KEY];
  const facetWeightLabel = facetResults[FACET.ATTRIBUTE_WEIGHT_LABEL];

  const brandOptions: FilterOption[] = [];
  const weightOptions: FilterOption[] = [];

  if (facetBrand.type === FacetTypesValues.Terms) {
    for (const { term } of facetBrand.terms) {
      if (isString(term)) {
        brandOptions.push({ label: term, value: term });
      }
    }
  }

  if (
    facetWeightKey.type === FacetTypesValues.Terms &&
    facetWeightLabel.type === FacetTypesValues.Terms
  ) {
    for (const [index, { term }] of facetWeightKey.terms.entries()) {
      const value: unknown = term;
      const label: unknown = facetWeightLabel.terms[index].term;

      if (isString(value) && isString(label)) {
        weightOptions.push({ label, value });
      }
    }
  }

  return {
    brandOptions,
    weightOptions: weightOptions.sort((a, b) => sortWeightOptions(a, b)),
  };
};
