import { createStore } from '~/shared/store/create-store';

export interface AppState {
  loggedIn: boolean;
  productsCount: number;
}

const initialState: AppState = {
  loggedIn: false,
  productsCount: 0,
};

export const rootStore = createStore(initialState);

export type RootStore = typeof rootStore;
