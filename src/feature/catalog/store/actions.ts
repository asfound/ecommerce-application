import type { CatalogState } from './store';

import { catalogCategoryNameStore, catalogLoadingStore, catalogStore } from './store';

const setCategoryId = (categoryId: string): void => {
  catalogStore.setState({ categoryId });
};

const setSearchTerm = (searchTerm: string): void => {
  catalogStore.setState({ searchTerm });
};

const setCategoryName = (categoryName: string): void => {
  catalogCategoryNameStore.setState({ categoryName });
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

const setBestSeller = (bestSeller: boolean): void => {
  catalogStore.setState({ bestSeller });
};

const setMaxPrice = (max: number): void => {
  catalogStore.setState({ priceRange: { max } });
};

const setMinPrice = (min: number): void => {
  catalogStore.setState({ priceRange: { min } });
};

export const catalogAction = {
  setBestSeller,
  setCategoryId,
  setMaxPrice,
  setMinPrice,
  setSearchTerm,
  setSortDirection,
  setSortField,
} as const;

export const catalogLoadingAction = {
  setLoading,
} as const;

export const catalogCategoryNameAction = {
  setCategoryName,
} as const;
