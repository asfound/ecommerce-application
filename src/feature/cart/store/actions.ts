import { cartStore } from './store';

const setItemCount = (itemCount: number): void => {
  cartStore.setState({ itemCount });
};

export const cartAction = {
  setItemsCount: setItemCount,
};
