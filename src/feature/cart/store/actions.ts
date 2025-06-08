import { cartStore } from './store';

const setItemsCount = (itemCount: number): void => {
  cartStore.setState({ itemCount });
};

const setCartTotal = (cartTotal: number): void => {
  cartStore.setState({ cartTotal });
};

export const cartAction = {
  setCartTotal,
  setItemsCount,
};
