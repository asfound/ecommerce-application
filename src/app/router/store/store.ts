import { createStore } from '~/shared/store/create-store';

import type { SearchParameters } from '../types';

export interface RouterState {
  pathname: string;
  searchParameters: SearchParameters;
}

const initialState: RouterState = {
  pathname: '',
  searchParameters: {},
};

export const routerStore = createStore(initialState);
