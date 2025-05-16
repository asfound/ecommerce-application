import type { CategoriesService } from '~/api/services/categories/categories.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { CategoryNavigationView } from './category-navigation.view';

export class CategoryNavigationPresenter extends Presenter<CategoryNavigationView> {
  private readonly categoriesService: CategoriesService;

  public constructor(view: CategoryNavigationView, categoriesService: CategoriesService) {
    super(view);

    this.categoriesService = categoriesService;

    this.updateView();
  }

  private async updateView(): Promise<void> {
    const categories = await this.categoriesService.getCategories();

    this.view.createHTML(categories);
  }
}
