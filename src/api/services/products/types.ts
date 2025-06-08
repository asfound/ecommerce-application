import type { QueryParam } from '@commercetools/platform-sdk';

import type { FilterOption } from '~/components/filter/filter';

import type { SORT_DIRECTION, SORT_FIELD_TYPE } from './constants';

export interface AppCartProduct {
  image: AppProductImage;
  lineItemKey: string;
  name: string;
  price: { default: number; discounted?: number };
  promoCodePrice?: number;
  quantity: number;
  sku: string;
  totalPrice: number;
  weight: string | undefined;
}

export interface AppProduct {
  bestSeller: boolean;
  categories: AppProductCategory[];
  description: string;
  image: AppProductImage;
  images: AppProductImage[];
  name: string;
  price: { default: number; discounted?: number };
  productId: string;
  productType: string | undefined;
  sku: string;
  variants: AppProduct[];
  weight: string | undefined;
}

export interface AppProductCategory {
  id: string;
  name: string;
}

export interface AppProductImage {
  label: string;
  url: string;
}

export interface AppProductWithInCart extends AppProduct {
  inCart: boolean;
  variants: AppProductWithInCart[];
}

export interface FilterQueryArguments {
  [key: string]: QueryParam;
  expand?: string | string[];
  facet?: string | string[];
  filter?: string | string[];
  'filter.facets'?: string | string[];
  'filter.query'?: string | string[];
  fuzzy?: boolean;
  fuzzyLevel?: number;
  limit?: number;
  localeProjection?: string | string[];
  markMatchingVariants?: boolean;
  offset?: number;
  priceChannel?: string;
  priceCountry?: string;
  priceCurrency?: string;
  priceCustomerGroup?: string;
  priceCustomerGroupAssignments?: string | string[];
  sort?: string | string[];
  staged?: boolean;
  storeProjection?: string;
}

export interface MappedFilterOptions {
  brandOptions: FilterOption[];
  weightOptions: FilterOption[];
}

export interface ProductsFilterPayload {
  bestSeller: boolean;
  brand?: string[];
  categoryId?: string;
  currentPage: number;
  priceRange: { max?: number; min?: number };
  productsPerPage: number;
  searchTerm?: string;
  sortDirection: SortDirection;
  sortField: SortField;
  weight?: WeightType[];
}

export type SortDirection = (typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION];

export type SortField = (typeof SORT_FIELD_TYPE)[keyof typeof SORT_FIELD_TYPE];

export type WeightType = 'lg' | 'md' | 'sm';
