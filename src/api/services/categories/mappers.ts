import type { Category } from '@commercetools/platform-sdk';

import { APP_LOCALE } from '~/shared/constants/constants';

import type { AppCategory } from './types';

const sortCategories = (categories: Category[]): Category[] => {
  return [...categories].sort(
    (a, b) => Number.parseFloat(a.orderHint) - Number.parseFloat(b.orderHint),
  );
};

export const mapToAppCategories = (categories: Category[]): AppCategory[] => {
  const sortedCategories = sortCategories(categories);

  return sortedCategories.map((category) => ({
    ancestors: category.ancestors,
    description: category.description?.[APP_LOCALE] ?? '',
    id: category.id,
    name: category.name[APP_LOCALE],
  }));
};
