import type { SearchParameters } from '../types';

import { routerStore } from './store';

const setPathname = (pathname: string): void => {
  routerStore.setState({ pathname });
};

const setSearchParameters = (searchParameters: SearchParameters): void => {
  routerStore.setState({ searchParameters });
};

export const routerAction = {
  setPathname,
  setSearchParameters,
} as const;
