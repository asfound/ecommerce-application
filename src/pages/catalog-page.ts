import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';
import { CategoryNavigationPresenter } from '~/feature/catalog/category-navigation/category-navigation.presenter';
import { CategoryNavigationView } from '~/feature/catalog/category-navigation/category-navigation.view';
import { ProductCardListPresenter } from '~/feature/catalog/product-card-list/product-card-list.presenter';
import { ProductCardListView } from '~/feature/catalog/product-card-list/product-card-list.view';
import { catalogStore } from '~/feature/catalog/store/store';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';

import styles from './catalog-page.module.css';

export class CatalogPage extends BaseComponent {
  private readonly categoryNavigationPresenter: CategoryNavigationPresenter;

  private readonly productCardListPresenter: ProductCardListPresenter;

  public constructor() {
    super({ className: [CSS_CLASS_NAME.WRAPPER, styles.page], tagName: 'div' });

    this.categoryNavigationPresenter = new CategoryNavigationPresenter(
      new CategoryNavigationView(),
      SERVICE_HUB.provideCategoriesService(),
    );

    this.productCardListPresenter = new ProductCardListPresenter(
      new ProductCardListView(),
      SERVICE_HUB.provideProductsService(),
    );

    this.append(
      this.categoryNavigationPresenter.getView(),
      this.productCardListPresenter.getView(),
    );
  }

  public override destroy(): void {
    this.categoryNavigationPresenter.destroy();
    this.productCardListPresenter.destroy();
    catalogStore.reset();

    super.destroy();
  }
}
