import type { CategoriesService } from '~/api/services/categories/categories.service';
import type { AppCategory } from '~/api/services/categories/types';
import type { AppProductCategory } from '~/api/services/products/types';
import type { BreadcrumbItem } from '~/components/breadcrumbs/breadcrumbs';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { PAGE_NAME } from '~/shared/constants/constants';
import { Presenter } from '~/shared/presenter/presenter';
import { getBreadcrumbCategories } from '~/shared/utils/get-breadcrumb-categories';

import type { CatalogBreadcrumbsView } from './breadcrumbs.view';

import { catalogCategoryNameAction } from '../store/actions';
import { catalogCategoryNameSelector } from '../store/selectors';
import { catalogCategoryNameStore, catalogStore } from '../store/store';

export class CatalogBreadcrumbsPresenter extends Presenter<CatalogBreadcrumbsView> {
  private categories: AppCategory[] = [];

  private readonly categoriesService: CategoriesService;

  public constructor(view: CatalogBreadcrumbsView, categoriesService: CategoriesService) {
    super(view);

    this.categoriesService = categoriesService;
    this.init();
  }

  public override destroy(): void {
    this.categories.length = 0;

    super.destroy();
  }

  private getBreadcrumbs(categories?: AppProductCategory[]): BreadcrumbItem[] {
    const baseItems: BreadcrumbItem[] = [
      {
        name: PAGE_NAME.MAIN,
        onClick: (): void => {
          Router.instance.navigate(ROUTE_PATH.MAIN);
        },
      },
      {
        name: PAGE_NAME.CATALOG,
        onClick: (): void => {
          catalogStore.reset();
          catalogCategoryNameStore.reset();
        },
      },
    ];

    const categoryItems: BreadcrumbItem[] = (categories ?? []).map((category) => ({
      name: category.name,
      onClick: (): void => {
        this.handleCategoryClick(category);
      },
    }));

    return [...baseItems, ...categoryItems];
  }

  private handleCategoryClick(category: AppProductCategory): void {
    catalogStore.setState({ categoryId: category.id, searchTerm: '' });
    catalogCategoryNameAction.setCategoryName(category.name);
    Router.instance.navigate(ROUTE_PATH.CATALOG);
  }

  private async init(): Promise<void> {
    await this.initCategories();
    this.subscribeCategoryChange();
  }

  private async initCategories(): Promise<void> {
    this.categories = await this.categoriesService.getCategories();
  }

  private subscribeCategoryChange(): void {
    const unsubscribe = catalogCategoryNameStore.subscribe(
      catalogCategoryNameSelector.selectCategoryName,
      (categoryName) => {
        this.updateView(categoryName);
      },
      { isImmediate: true },
    );

    this.storeSubscription.add(unsubscribe);
  }

  private updateView(activeCategoryName: string): void {
    const breadcrumbItems = this.getBreadcrumbs(
      getBreadcrumbCategories(activeCategoryName, this.categories),
    );

    this.view.createHTML(breadcrumbItems);
  }
}
