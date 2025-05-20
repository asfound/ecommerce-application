import type { ProductsFilterPayload } from '~/api/services/products/products.service';

import { createStore } from '~/shared/store/create-store';

export interface CatalogState {
  categoryId: string;
  categoryName: string;
  loading: boolean;
  searchTerm: string;
  sortDirection: ProductsFilterPayload['sortDirection'];
  sortField: ProductsFilterPayload['sortField'];
}

const initialState: CatalogState = {
  categoryId: '',
  categoryName: '',
  loading: false,
  searchTerm: '',
  sortDirection: 'asc',
  sortField: 'name',
};

export const catalogStore = createStore(initialState);

export interface CatalogLoadingState {
  loading: boolean;
}

const initialLoadingState: CatalogLoadingState = {
  loading: false,
};

export const catalogLoadingStore = createStore(initialLoadingState);
