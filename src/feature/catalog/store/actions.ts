import { catalogStore } from './store';

const setCategoryId = (categoryId: string): void => {
  catalogStore.setState({ categoryId });
};

const setSearchTerm = (searchTerm: string): void => {
  catalogStore.setState({ searchTerm });
};

export const catalogAction = {
  setCategoryId,
  setSearchTerm,
} as const;
