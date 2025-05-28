import type { CategoriesService } from '~/api/services/categories/categories.service';
import type { AppCategory } from '~/api/services/categories/types';
import type { BreadcrumbItem } from '~/components/breadcrumbs/breadcrumbs';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { Presenter } from '~/shared/presenter/presenter';

import type { CatalogBreadcrumbsView } from './breadcrumbs.view';

import { catalogCategoryNameAction } from '../store/actions';
import { catalogSelector } from '../store/selectors';
import { catalogCategoryNameStore, catalogStore } from '../store/store';

export class CatalogBreadcrumbsPresenter extends Presenter<CatalogBreadcrumbsView> {
  private categories: AppCategory[] = [];

  private readonly categoriesService: CategoriesService;

  public constructor(view: CatalogBreadcrumbsView, categoriesService: CategoriesService) {
    super(view);

    this.categoriesService = categoriesService;

    this.initCategories();
    this.subscribeCategoryChange();
  }

  public override destroy(): void {
    this.categories.length = 0;

    super.destroy();
  }

  private getBreadcrumbs(categories?: { id: string; name: string }[]): BreadcrumbItem[] {
    const baseItems: BreadcrumbItem[] = [
      {
        name: 'Main',
        onClick: (): void => {
          Router.instance.navigate(ROUTE_PATH.MAIN);
        },
      },
      {
        name: 'Catalog',
        onClick: (): void => {
          catalogStore.reset();
          catalogCategoryNameStore.reset();
        },
      },
    ];

    const categoryItems: BreadcrumbItem[] = (categories ?? []).map((category) => ({
      name: category.name,
      onClick: (): void => {
        catalogStore.setState({ categoryId: category.id, searchTerm: '' });
        catalogCategoryNameAction.setCategoryName(category.name);
        Router.instance.navigate(ROUTE_PATH.CATALOG);
      },
    }));

    return [...baseItems, ...categoryItems];
  }

  private async initCategories(): Promise<void> {
    this.categories = await this.categoriesService.getCategories();
  }

  private subscribeCategoryChange(): void {
    const unsubscribe = catalogStore.subscribe(
      catalogSelector.selectCategoryId,
      (categoryId) => {
        this.updateView(categoryId);
      },
      { isImmediate: true },
    );

    this.storeSubscription.add(unsubscribe);
  }

  private updateView(activeCategoryId: string): void {
    this.view.createHTML(
      this.getBreadcrumbs(getBreadcrumbCategories(activeCategoryId, this.categories)),
    );
  }
}

function getBreadcrumbCategories(
  categoryId: string,
  categories: AppCategory[],
): { id: string; name: string }[] {
  const categoriesArray = [];
  const currentCategory = categories.find((category) => category.id === categoryId);

  if (currentCategory?.ancestors.length) {
    for (const ancestor of currentCategory.ancestors) {
      categoriesArray.push({ id: ancestor.id, name: ancestor.name });
    }
  }

  if (currentCategory) {
    categoriesArray.push({ id: currentCategory.id, name: currentCategory.name });
  }

  return categoriesArray;
}
