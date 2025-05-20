import type { ProductsFilterPayload } from '~/api/services/products/types';

import { createStore } from '~/shared/store/create-store';

import { PRODUCTS_PER_PAGE } from '../constants';

export interface CatalogState {
  categoryId: string;
  productsPerPage: number;
  searchTerm: string;
  sortDirection: ProductsFilterPayload['sortDirection'];
  sortField: ProductsFilterPayload['sortField'];
}

const initialState: CatalogState = {
  categoryId: '',
  productsPerPage: PRODUCTS_PER_PAGE,
  searchTerm: '',
  sortDirection: 'asc',
  sortField: 'name',
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
