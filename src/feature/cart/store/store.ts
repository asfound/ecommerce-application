import { createStore } from '~/shared/store/create-store';

export interface CartState {
  itemCount: number;
}

const initialState: CartState = {
  itemCount: 0,
};

export const cartStore = createStore(initialState);
