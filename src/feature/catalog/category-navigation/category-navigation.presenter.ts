import type { CategoriesService } from '~/api/services/categories/categories.service';
import type { AppCategory } from '~/api/services/categories/types';

import { Presenter } from '~/shared/presenter/presenter';

import type { CategoryNavigationView } from './category-navigation.view';

import { catalogCategoryNameAction } from '../store/actions';
import { catalogCategoryNameStore, catalogStore } from '../store/store';

export class CategoryNavigationPresenter extends Presenter<CategoryNavigationView> {
  private readonly categoriesService: CategoriesService;

  public constructor(view: CategoryNavigationView, categoriesService: CategoriesService) {
    super(view);

    this.categoriesService = categoriesService;

    this.initView();
  }

  private handleCategoryItemClick = (category: AppCategory): void => {
    catalogStore.setState({ categoryId: category.id, searchTerm: '' });
    catalogCategoryNameAction.setCategoryName(category.name);
  };

  private async initView(): Promise<void> {
    const categories = await this.categoriesService.getCategories();
    const activeCategoryName = catalogCategoryNameStore.getState().categoryName;

    this.view.createHTML(categories, this.handleCategoryItemClick, activeCategoryName);
  }
}
