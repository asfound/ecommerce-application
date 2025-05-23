import { debounce } from 'lodash';

import type { ProductsService } from '~/api/services/products/products.service';
import type { AppProduct } from '~/api/services/products/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { Presenter } from '~/shared/presenter/presenter';

import type { CatalogState } from '../store/store';
import type { ProductCardListView } from './product-card-list.view';

import { catalogLoadingAction } from '../store/actions';
import { catalogLoadingSelector } from '../store/selectors';
import { catalogLoadingStore, catalogStore } from '../store/store';
import { VIEW_UPDATE_DELAY } from './constants';

export class ProductCardListPresenter extends Presenter<ProductCardListView> {
  private currentPage = 1;

  private readonly productsService: ProductsService;

  public constructor(view: ProductCardListView, productsService: ProductsService) {
    super(view);

    this.productsService = productsService;

    this.updateView(catalogStore.getState());

    this.setupSubscriptions();
  }

  private readonly handleNavigateToDetails = (product: AppProduct): void => {
    Router.instance.navigate(ROUTE_PATH.PRODUCT_DETAILS, { name: product.name, sku: product.sku });
  };

  private setupSubscriptions(): void {
    this.subscribeLoading();

    this.subscribeCatalogStateChange();
  }

  private subscribeCatalogStateChange(): void {
    const unsubscribe = catalogStore.subscribe(
      (state) => state,
      debounce(this.updateView, VIEW_UPDATE_DELAY),
      {
        isImmediate: false,
      },
    );

    this.storeSubscription.add(unsubscribe);
  }

  private subscribeLoading(): void {
    const unsubscribe = catalogLoadingStore.subscribe(
      catalogLoadingSelector.selectLoading,
      (loading) => {
        this.view[loading ? 'showLoader' : 'hideLoader']();
      },
    );

    this.storeSubscription.add(unsubscribe);
  }

  private updateView = async (state: CatalogState): Promise<void> => {
    try {
      catalogLoadingAction.setLoading(true);

      const products = await this.productsService.filterProducts({
        ...state,
        currentPage: this.currentPage,
      });

      if (products.length === 0) {
        this.view.showNotFoundWidget(state.searchTerm);
        return;
      }

      this.view.createHTML(products, this.handleNavigateToDetails);
    } finally {
      catalogLoadingAction.setLoading(false);
    }
  };
}
