import type { QueryParam } from '@commercetools/platform-sdk';

export interface AppProduct {
  bestSeller: boolean;
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

export interface AppProductImage {
  label: string;
  url: string;
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
  bestSeller: boolean;
  brand?: string[];
  categoryId?: string;
  currentPage: number;
  priceRange: { max?: number; min?: number };
  productsPerPage: number;
  searchTerm?: string;
  sortDirection: 'asc' | 'desc';
  sortField: 'name' | 'price';
  weight?: ('lg' | 'md' | 'sm')[];
}
