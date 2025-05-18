import { createStore } from '~/shared/store/create-store';

export interface CatalogState {
  categoryId: string;
  searchTerm: string;
}

const initialState: CatalogState = {
  categoryId: '',
  searchTerm: '',
};

export const catalogStore = createStore(initialState);
