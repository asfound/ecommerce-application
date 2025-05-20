import type { CatalogState } from './store';

import { catalogLoadingStore, catalogStore } from './store';

const setCategoryId = (categoryId: string): void => {
  catalogStore.setState({ categoryId });
};

const setSearchTerm = (searchTerm: string): void => {
  catalogStore.setState({ searchTerm });
};

const setCategoryName = (categoryName: string): void => {
  catalogStore.setState({ categoryName });
};

const setLoading = (loading: boolean): void => {
  catalogLoadingStore.setState({ loading });
};

const setSortDirection = (sortDirection: CatalogState['sortDirection']): void => {
  catalogStore.setState({ sortDirection });
};

const setSortField = (sortField: CatalogState['sortField']): void => {
  catalogStore.setState({ sortField });
};

export const catalogAction = {
  setCategoryId,
  setCategoryName,
  setLoading,
  setSearchTerm,
  setSortDirection,
  setSortField,
} as const;
