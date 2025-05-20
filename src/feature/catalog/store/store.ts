import { createStore } from '~/shared/store/create-store';

export interface CatalogState {
  categoryId: string;
  categoryName: string;
  loading: boolean;
  searchTerm: string;
  sortDirection: 'asc' | 'desc';
  sortField: 'name' | 'price';
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
