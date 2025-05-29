import type { AppCategory } from '~/api/services/categories/types';
import type { AppProductCategory } from '~/api/services/products/types';

export function getBreadcrumbCategories(
  activeCategoryName: string,
  categories: AppCategory[],
): AppProductCategory[] {
  const currentCategory = categories.find((category) => category.name === activeCategoryName);

  if (!currentCategory) {
    return [];
  }

  const categoriesArray = currentCategory.ancestors.map((ancestor) => ({
    id: ancestor.id,
    name: ancestor.name,
  }));

  categoriesArray.push({ id: currentCategory.id, name: currentCategory.name });

  return categoriesArray;
}
