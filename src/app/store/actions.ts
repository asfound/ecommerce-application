import { rootStore } from './store';

const setLoggedIn = (loggedIn: boolean): void => {
  rootStore.setState({ loggedIn });
};

export const rootAction = {
  setLoggedIn,
} as const;
