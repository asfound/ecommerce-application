import { debounce } from 'lodash';

import type { ProductsService } from '~/api/services/products/products.service';
import type { AppProduct } from '~/api/services/products/types';
import type { IntersectionLoader } from '~/components/intersection-loader/intersection-loader';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { Presenter } from '~/shared/presenter/presenter';

import type { CatalogState } from '../store/store';
import type { ProductCardListView } from './product-card-list.view';

import { filtersStore } from '../filters/store/store';
import { catalogLoadingAction } from '../store/actions';
import { catalogLoadingSelector } from '../store/selectors';
import { catalogLoadingStore, catalogStore } from '../store/store';
import { VIEW_UPDATE_DELAY } from './constants';

export class ProductCardListPresenter extends Presenter<ProductCardListView> {
  private currentPage = 1;

  private readonly intersectionAnchor: IntersectionLoader;

  private intersectionObserver: IntersectionObserver | null = null;

  private loading = false;

  private readonly productsService: ProductsService;

  public constructor(
    view: ProductCardListView,
    intersectionAnchor: IntersectionLoader,
    productsService: ProductsService,
  ) {
    super(view);

    this.intersectionAnchor = intersectionAnchor;
    intersectionAnchor.hide();

    this.productsService = productsService;

    this.updateView(catalogStore.getState());

    this.setupSubscriptions();
  }

  public override destroy(): void {
    this.destroyIntersectionObserver();

    super.destroy();
  }

  private destroyIntersectionObserver(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }

  private readonly handleNavigateToDetails = (product: AppProduct): void => {
    Router.instance.navigate(ROUTE_PATH.PRODUCT_DETAILS, {
      searchParameters: {
        id: product.productId,
        sku: product.sku,
      },
    });
  };

  private initIntersectionObserver(): void {
    if (this.intersectionObserver) {
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.loading) {
          this.loadNextPage();
        }
      },
      { root: null, threshold: 1 },
    );

    this.intersectionObserver.observe(this.intersectionAnchor.element);
  }

  private async loadNextPage(): Promise<void> {
    this.currentPage += 1;

    this.intersectionAnchor.show();

    const { products } = await this.productsService.getFilteredProducts({
      ...catalogStore.getState(),
      currentPage: this.currentPage,
    });

    if (products.length === 0) {
      this.destroyIntersectionObserver();
      this.intersectionAnchor.hide();

      return;
    }

    this.intersectionAnchor.hide();

    this.view.appendProducts(products, this.handleNavigateToDetails);
  }

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
      this.currentPage = 1;

      this.loading = true;

      catalogLoadingAction.setLoading(true);

      const { brandOptions, products, weightOptions } =
        await this.productsService.getFilteredProducts({
          ...state,
          currentPage: this.currentPage,
        });

      if (products.length === 0) {
        this.view.showNotFoundWidget(state.searchTerm);
        return;
      }

      this.view.createHTML(products, this.handleNavigateToDetails);

      filtersStore.setState({ brandOptions, weightOptions });

      this.initIntersectionObserver();
    } finally {
      catalogLoadingAction.setLoading(false);
      this.loading = false;
    }
  };
}
