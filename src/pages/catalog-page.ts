import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';
import { CategoryNavigationPresenter } from '~/feature/catalog/category-navigation/category-navigation.presenter';
import { CategoryNavigationView } from '~/feature/catalog/category-navigation/category-navigation.view';
import { FiltersPresenter } from '~/feature/catalog/filters/filters.presenter';
import { FiltersView } from '~/feature/catalog/filters/filters.view';
import { ProductCardListPresenter } from '~/feature/catalog/product-card-list/product-card-list.presenter';
import { ProductCardListView } from '~/feature/catalog/product-card-list/product-card-list.view';
import { SearchAndSortPresenter } from '~/feature/catalog/search-and-sort/search-and-sort.presenter';
import { SearchAndSortView } from '~/feature/catalog/search-and-sort/search-and-sort.view';
import { catalogStore } from '~/feature/catalog/store/store';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { div, h2 } from '~/shared/create-element/tags';

import styles from './catalog-page.module.css';

export class CatalogPage extends BaseComponent {
  private readonly categoryNavigationPresenter: CategoryNavigationPresenter;

  private readonly filtersPresenter: FiltersPresenter;

  private readonly productCardListPresenter: ProductCardListPresenter;

  private readonly searchAndSortPresenter: SearchAndSortPresenter;

  public constructor() {
    super({ className: [CSS_CLASS_NAME.WRAPPER, styles.page], tagName: 'div' });

    this.categoryNavigationPresenter = new CategoryNavigationPresenter(
      new CategoryNavigationView(),
      SERVICE_HUB.provideCategoriesService(),
    );

    const intersectionAnchor = h2(null, 'LOADING...');

    this.productCardListPresenter = new ProductCardListPresenter(
      new ProductCardListView(),
      intersectionAnchor,
      SERVICE_HUB.provideProductsService(),
    );

    this.searchAndSortPresenter = new SearchAndSortPresenter(new SearchAndSortView());

    this.filtersPresenter = new FiltersPresenter(new FiltersView());

    const sidebarElement = div(
      { className: styles.sidebarElement },
      this.categoryNavigationPresenter.getView().element,
      this.filtersPresenter.getView().element,
    );

    const mainContentElement = div(
      { className: styles.mainContentElement },
      this.searchAndSortPresenter.getView().element,
      this.productCardListPresenter.getView().element,
      intersectionAnchor,
    );

    this.append(sidebarElement, mainContentElement);
  }

  public override destroy(): void {
    this.categoryNavigationPresenter.destroy();
    this.productCardListPresenter.destroy();
    this.searchAndSortPresenter.destroy();
    this.filtersPresenter.destroy();

    catalogStore.reset();

    super.destroy();
  }
}
