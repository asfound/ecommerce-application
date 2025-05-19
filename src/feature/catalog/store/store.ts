import { createStore } from '~/shared/store/create-store';

export interface CatalogState {
  categoryId: string;
  categoryName: string;
  loading: boolean;
  searchTerm: string;
}

const initialState: CatalogState = {
  categoryId: '',
  categoryName: '',
  loading: false,
  searchTerm: '',
};

export const catalogStore = createStore(initialState);
