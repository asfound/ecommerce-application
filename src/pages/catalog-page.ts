import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';
import { CategoryNavigationPresenter } from '~/feature/category-navigation/category-navigation.presenter';
import { CategoryNavigationView } from '~/feature/category-navigation/category-navigation.view';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';

export class CatalogPage extends BaseComponent {
  private readonly categoryNavigationPresenter: CategoryNavigationPresenter;

  public constructor() {
    super({ className: CSS_CLASS_NAME.WRAPPER, tagName: 'div' });

    this.categoryNavigationPresenter = new CategoryNavigationPresenter(
      new CategoryNavigationView(),
      SERVICE_HUB.provideCategoriesService(),
    );

    this.append(this.categoryNavigationPresenter.getView());
  }

  public override destroy(): void {
    this.categoryNavigationPresenter.destroy();

    super.destroy();
  }
}
