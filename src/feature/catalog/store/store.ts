import { createStore } from '~/shared/store/create-store';

export interface CatalogState {
  categoryId: string;
  categoryName: string;
  searchTerm: string;
}

const initialState: CatalogState = {
  categoryId: '',
  categoryName: '',
  searchTerm: '',
};

export const catalogStore = createStore(initialState);
