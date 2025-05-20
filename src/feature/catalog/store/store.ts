import type { ProductsFilterPayload } from '~/api/services/products/types';

import { createStore } from '~/shared/store/create-store';

export interface CatalogState {
  categoryId: string;
  searchTerm: string;
  sortDirection: ProductsFilterPayload['sortDirection'];
  sortField: ProductsFilterPayload['sortField'];
}

const initialState: CatalogState = {
  categoryId: '',
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
