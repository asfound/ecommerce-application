import { rootStore } from './store';

const setLoggedIn = (loggedIn: boolean): void => {
  rootStore.setState({ loggedIn });
};

const setProductsCount = (productsCount: number): void => {
  rootStore.setState({ productsCount });
};

export const rootAction = {
  setLoggedIn,
  setProductsCount,
} as const;
