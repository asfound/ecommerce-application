import { createStore } from '~/shared/store/create-store';

export interface CartState {
  cartTotal: number;
  itemCount: number;
}

const initialState: CartState = {
  cartTotal: 0,
  itemCount: 0,
};

export const cartStore = createStore(initialState);
