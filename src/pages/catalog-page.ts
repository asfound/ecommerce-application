import { debounce } from 'lodash';

import { SERVICE_HUB } from '~/api/services/service-hub';
import iconUp from '~/assets/icons/arrow-up.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { IntersectionLoader } from '~/components/intersection-loader/intersection-loader';
import { CatalogBreadcrumbsPresenter } from '~/feature/catalog/breadcrumbs/breadcrumbs.presenter';
import { CatalogBreadcrumbsView } from '~/feature/catalog/breadcrumbs/breadcrumbs.view';
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
import { button, div } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';

import styles from './catalog-page.module.css';

const SCROLL_DEBOUNCE_MILLISECONDS = 150;
const SCROLL_Y_OFFSET = 600;

export class CatalogPage extends BaseComponent {
  private readonly breadcrumbsPresenter: CatalogBreadcrumbsPresenter;

  private readonly buttonToTop = button(
    { className: [styles.buttonToTop, styles.hidden] },
    createSvgIcon(iconUp, styles.icon),
  );

  private readonly categoryNavigationPresenter: CategoryNavigationPresenter;

  private readonly filtersPresenter: FiltersPresenter;

  private readonly intersectionAnchor = new IntersectionLoader();

  private readonly productCardListPresenter: ProductCardListPresenter;

  private readonly searchAndSortPresenter: SearchAndSortPresenter;

  public constructor() {
    super({ className: [CSS_CLASS_NAME.WRAPPER, styles.page], tagName: 'div' });

    this.breadcrumbsPresenter = new CatalogBreadcrumbsPresenter(
      new CatalogBreadcrumbsView(),
      SERVICE_HUB.provideCategoriesService(),
    );

    this.categoryNavigationPresenter = new CategoryNavigationPresenter(
      new CategoryNavigationView(),
      SERVICE_HUB.provideCategoriesService(),
    );

    this.productCardListPresenter = new ProductCardListPresenter(
      new ProductCardListView(),
      this.intersectionAnchor,
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
      this.breadcrumbsPresenter.getView().element,
      this.productCardListPresenter.getView().element,
      this.intersectionAnchor.element,
    );

    this.append(sidebarElement, mainContentElement, this.buttonToTop);

    this.setupListeners();
  }

  public override destroy(): void {
    this.categoryNavigationPresenter.destroy();
    this.productCardListPresenter.destroy();
    this.searchAndSortPresenter.destroy();
    this.filtersPresenter.destroy();
    this.intersectionAnchor.destroy();

    catalogStore.reset();

    super.destroy();
  }

  private setupListeners(): void {
    this.buttonToTop.addEventListener(
      'click',
      () => {
        window.scrollTo({ top: 0 });
      },
      { signal: this.abortController.signal },
    );

    window.addEventListener(
      'scroll',
      debounce(() => {
        if (window.scrollY >= SCROLL_Y_OFFSET) {
          this.buttonToTop.classList.remove(styles.hidden);
        } else {
          this.buttonToTop.classList.add(styles.hidden);
        }
      }, SCROLL_DEBOUNCE_MILLISECONDS),
      { signal: this.abortController.signal },
    );
  }
}
