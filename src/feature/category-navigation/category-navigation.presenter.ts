import type { CategoriesService } from '~/api/services/categories/categories.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { CategoryNavigationView } from './category-navigation.view';

export class CategoryNavigationPresenter extends Presenter<CategoryNavigationView> {
  private readonly categoriesService: CategoriesService;

  public constructor(view: CategoryNavigationView, categoriesService: CategoriesService) {
    super(view);

    this.categoriesService = categoriesService;

    this.categoriesService
      .getCategories()
      .then(({ body }) => {
        view.createHTML(body.results);
      })
      .catch(console.warn);
  }
}
