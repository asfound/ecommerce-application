import { catalogStore } from './store';

const setCategoryId = (categoryId: string): void => {
  catalogStore.setState({ categoryId });
};

export const catalogAction = {
  setCategoryId,
} as const;
