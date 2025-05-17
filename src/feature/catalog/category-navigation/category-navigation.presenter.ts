import type { CategoriesService } from '~/api/services/categories/categories.service';
import type { AppCategory } from '~/api/services/categories/types';

import { Presenter } from '~/shared/presenter/presenter';

import type { CategoryNavigationView } from './category-navigation.view';

import { catalogAction } from '../store/actions';

export class CategoryNavigationPresenter extends Presenter<CategoryNavigationView> {
  private readonly categoriesService: CategoriesService;

  public constructor(view: CategoryNavigationView, categoriesService: CategoriesService) {
    super(view);

    this.categoriesService = categoriesService;

    this.updateView();
  }

  private handleCategoryItemClick = (category: AppCategory): void => {
    catalogAction.setCategoryId(category.id);
  };

  private async updateView(): Promise<void> {
    const categories = await this.categoriesService.getCategories();

    this.view.createHTML(categories, this.handleCategoryItemClick);
  }
}
