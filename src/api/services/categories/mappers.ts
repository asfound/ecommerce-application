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

  const categoryMap = new Map<string, AppCategory>();

  for (const category of sortedCategories) {
    categoryMap.set(category.id, {
      ancestors: [],
      description: category.description?.[APP_LOCALE] ?? '',
      id: category.id,
      level: 0,
      name: category.name[APP_LOCALE],
    });
  }

  for (const category of sortedCategories) {
    const categoryFromMap = categoryMap.get(category.id);

    if (!categoryFromMap) {
      continue;
    }

    const ancestors = category.ancestors
      .map((ancestor) => categoryMap.get(ancestor.id))
      .filter((category) => category != null);

    categoryFromMap.ancestors = ancestors;
    categoryFromMap.level = ancestors.length;
  }

  return [...categoryMap.values()];
};
