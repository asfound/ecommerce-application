import type { ProductsService } from '~/api/services/products/products.service';
import type { AppProduct } from '~/api/services/products/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { Presenter } from '~/shared/presenter/presenter';

import type { CatalogState } from '../store/store';
import type { ProductCardListView } from './product-card-list.view';

import { PRODUCTS_PER_PAGE } from '../constants';
import { catalogAction } from '../store/actions';
import { catalogSelector } from '../store/selectors';
import { catalogStore } from '../store/store';

export class ProductCardListPresenter extends Presenter<ProductCardListView> {
  private readonly productsService: ProductsService;

  public constructor(view: ProductCardListView, productsService: ProductsService) {
    super(view);

    this.productsService = productsService;

    this.initView();

    this.setupSubscriptions();
  }

  private readonly handleCategoryIdChange = async (categoryId: string): Promise<void> => {
    try {
      catalogAction.setLoading(true);

      const products = await this.productsService.getByCategoryId({
        categoryId,
        limit: PRODUCTS_PER_PAGE,
      });

      this.view.createHTML(products, this.handleNavigateToDetails);
    } finally {
      catalogAction.setLoading(false);
    }
  };

  private readonly handleNavigateToDetails = (product: AppProduct): void => {
    Router.instance.navigate(ROUTE_PATH.PRODUCT_DETAILS, { name: product.name, sku: product.sku });
  };

  private readonly handleSearchTermChange = async (searchTerm: string): Promise<void> => {
    try {
      catalogAction.setLoading(true);

      const products = await this.productsService.searchByTerm({
        categoryId: catalogStore.select(catalogSelector.selectCategoryId),
        limit: PRODUCTS_PER_PAGE,
        searchTerm,
      });

      if (products.length === 0) {
        this.view.showNotFoundWidget(searchTerm);
      } else {
        this.view.createHTML(products, this.handleNavigateToDetails);
      }
    } finally {
      catalogAction.setLoading(false);
    }
  };

  private async initView(): Promise<void> {
    try {
      catalogAction.setLoading(true);

      const products = await this.productsService.getProducts({ limit: PRODUCTS_PER_PAGE });

      this.view.createHTML(products, this.handleNavigateToDetails);
    } finally {
      catalogAction.setLoading(false);
    }
  }

  private setupSubscriptions(): void {
    this.subscribeCategoryId();

    this.subscribeSearchTerm();

    this.subscribeLoading();

    // TODO: refactor
    const unsubscribe = catalogStore.subscribe(
      catalogSelector.selectWithoutLoading,
      this.updateView,
      { isImmediate: false },
    );
    this.storeSubscription.add(unsubscribe);
  }

  private subscribeCategoryId(): void {
    const unsubscribe = catalogStore.subscribe(
      catalogSelector.selectCategoryId,
      this.handleCategoryIdChange,
      { isImmediate: false },
    );

    this.storeSubscription.add(unsubscribe);
  }

  private subscribeLoading(): void {
    const unsubscribe = catalogStore.subscribe(catalogSelector.selectLoading, (loading) => {
      this.view[loading ? 'showLoader' : 'hideLoader']();
    });

    this.storeSubscription.add(unsubscribe);
  }

  private subscribeSearchTerm(): void {
    const unsubscribe = catalogStore.subscribe(
      catalogSelector.selectSearchTerm,
      this.handleSearchTermChange,
      { isImmediate: false },
    );

    this.storeSubscription.add(unsubscribe);
  }

  private updateView = async (state: Omit<CatalogState, 'loading'>): Promise<void> => {
    const products = await this.productsService.filterProducts({
      ...state,
      productsPerPage: PRODUCTS_PER_PAGE,
    });

    this.view.createHTML(products, this.handleNavigateToDetails);
  };
}
