import type { ProductsFilterPayload } from '~/api/services/products/types';

import { createStore } from '~/shared/store/create-store';

import { PRODUCTS_PER_PAGE } from '../constants';

export interface CatalogState {
  bestSeller: boolean;
  categoryId: string;
  priceRange: ProductsFilterPayload['priceRange'];
  productsPerPage: number;
  searchTerm: string;
  sortDirection: ProductsFilterPayload['sortDirection'];
  sortField: ProductsFilterPayload['sortField'];
  weight: ProductsFilterPayload['weight'];
}

const initialState: CatalogState = {
  bestSeller: false,
  categoryId: '',
  priceRange: {},
  productsPerPage: PRODUCTS_PER_PAGE,
  searchTerm: '',
  sortDirection: 'asc',
  sortField: 'price',
  weight: [],
};

export const catalogStore = createStore(initialState);

export interface CatalogLoadingState {
  loading: boolean;
}

export const catalogLoadingStore = createStore<CatalogLoadingState>({ loading: true });

export interface CatalogCategoryNameState {
  categoryName: string;
}

export const catalogCategoryNameStore = createStore<CatalogCategoryNameState>({
  categoryName: '',
});
