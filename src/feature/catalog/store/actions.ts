import { catalogStore } from './store';

const setCategoryId = (categoryId: string): void => {
  catalogStore.setState({ categoryId });
};

const setSearchTerm = (searchTerm: string): void => {
  catalogStore.setState({ searchTerm });
};

const setCategoryName = (categoryName: string): void => {
  catalogStore.setState({ categoryName });
};

export const catalogAction = {
  setCategoryId,
  setCategoryName,
  setSearchTerm,
} as const;
