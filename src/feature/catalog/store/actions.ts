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

const setMaxPrice = (max: number | undefined): void => {
  catalogStore.setState((previous) => ({ priceRange: { ...previous.priceRange, max } }));
};

const setMinPrice = (min: number | undefined): void => {
  catalogStore.setState((previous) => ({ priceRange: { ...previous.priceRange, min } }));
};

const setWeights = (weights: CatalogState['weight']): void => {
  catalogStore.setState({ weight: weights });
};

export const catalogAction = {
  setBestSeller,
  setCategoryId,
  setMaxPrice,
  setMinPrice,
  setSearchTerm,
  setSortDirection,
  setSortField,
  setWeights,
} as const;

export const catalogLoadingAction = {
  setLoading,
} as const;

export const catalogCategoryNameAction = {
  setCategoryName,
} as const;
