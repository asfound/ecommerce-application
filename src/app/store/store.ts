import { createStore } from '~/shared/store/create-store';

export interface AppState {
  loggedIn: boolean;
}

const initialState: AppState = {
  loggedIn: false,
};

export const rootStore = createStore(initialState);

export type RootStore = typeof rootStore;
