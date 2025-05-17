import { createStore } from '~/shared/store/create-store';

export interface CatalogState {
  categoryId: string;
}

const initialState: CatalogState = {
  categoryId: '',
};

export const catalogStore = createStore(initialState);
