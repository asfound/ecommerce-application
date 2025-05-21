import type { QueryParam } from '@commercetools/platform-sdk';

export interface AppProduct {
  bestSeller: boolean;
  description: string;
  image: { label: string; url: string };
  name: string;
  price: { default: number; discounted?: number };
  sku: string;
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

export interface ProductsFilterPayload {
  categoryId?: string;
  productsPerPage: number;
  searchTerm?: string;
  sortDirection: 'asc' | 'desc';
  sortField: 'name' | 'price';
}
