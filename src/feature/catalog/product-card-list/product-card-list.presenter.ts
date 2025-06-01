import { debounce, isError } from 'lodash';

import type { CartService } from '~/api/services/cart/cart.service';
import type { ProductsService } from '~/api/services/products/products.service';
import type {
  AppProduct,
  AppProductWithInCart,
  MappedFilterOptions,
} from '~/api/services/products/types';
import type { IntersectionLoader } from '~/components/intersection-loader/intersection-loader';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { Presenter } from '~/shared/presenter/presenter';
import { formatProductName } from '~/shared/utils/format-product-name';
import { showToast } from '~/shared/utils/show-toast';

import type { CatalogState } from '../store/store';
import type { ProductCardListView } from './product-card-list.view';

import { PRODUCT_CART_NOTIFICATION } from '../constants';
import { filtersStore } from '../filters/store/store';
import { catalogLoadingAction } from '../store/actions';
import { catalogLoadingSelector } from '../store/selectors';
import { catalogLoadingStore, catalogStore } from '../store/store';
import { PRODUCT_CARD_LIST_TEXT, VIEW_UPDATE_DELAY } from './constants';

export class ProductCardListPresenter extends Presenter<ProductCardListView> {
  private readonly cartService: CartService;

  // private readonly intersectionAnchor: IntersectionLoader;

  private currentPage = 1;

  private intersectionObserver: IntersectionObserver | null = null;

  private readonly productsService: ProductsService;

  public constructor(
    view: ProductCardListView,
    intersectionAnchor: IntersectionLoader,
    productsService: ProductsService,
    cartService: CartService,
  ) {
    super(view);

    // this.intersectionAnchor = intersectionAnchor;
    intersectionAnchor.hide();

    this.productsService = productsService;

    this.cartService = cartService;

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

  private async getMarkedProducts(): Promise<
    MappedFilterOptions & { products: AppProductWithInCart[] }
  > {
    try {
      const [data, skuSet] = await Promise.all([
        this.productsService.getFilteredProducts({
          ...catalogStore.getState(),
          currentPage: this.currentPage,
        }),
        this.cartService.getProductsSkuSet(),
      ]);

      const markedProducts = data.products.map((product) => ({
        ...product,
        inCart: skuSet.has(product.sku),
      }));

      return {
        brandOptions: data.brandOptions,
        products: markedProducts,
        weightOptions: data.weightOptions,
      };
    } catch {
      throw new Error(PRODUCT_CARD_LIST_TEXT.FAILED_TO_LOAD_PRODUCTS);
    }
  }

  // private initIntersectionObserver(): void {
  //   if (this.intersectionObserver) {
  //     return;
  //   }

  //   this.intersectionObserver = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting && !catalogLoadingStore.getState().loading) {
  //         this.loadNextPage();
  //       }
  //     },
  //     { root: null, threshold: 1 },
  //   );

  //   this.intersectionObserver.observe(this.intersectionAnchor.element);
  // }

  // private async loadNextPage(): Promise<void> {
  //   this.currentPage += 1;

  //   this.intersectionAnchor.show();

  //   const { products } = await this.productsService.getFilteredProducts({
  //     ...catalogStore.getState(),
  //     currentPage: this.currentPage,
  //   });

  //   if (products.length === 0) {
  //     this.destroyIntersectionObserver();
  //     this.intersectionAnchor.hide();

  //     return;
  //   }

  //   this.intersectionAnchor.hide();

  //   this.view.appendProducts(products, this.handleNavigateToDetails);
  // }

  private handleAddToCart = async (product: AppProduct): Promise<void> => {
    const productName = formatProductName(product);

    try {
      await this.cartService.addLineItem({ quantity: 1, sku: product.sku });

      showToast(PRODUCT_CART_NOTIFICATION.ADDED_TO_CART(productName));
    } catch {
      showToast(PRODUCT_CART_NOTIFICATION.FAILED_ADD_TO_CART(productName), true);

      throw new Error(PRODUCT_CART_NOTIFICATION.FAILED_ADD_TO_CART(productName));
    }
  };

  private readonly handleNavigateToDetails = (product: AppProduct): void => {
    Router.instance.navigate(ROUTE_PATH.PRODUCT_DETAILS, {
      searchParameters: {
        id: product.productId,
        sku: product.sku,
      },
    });
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
      this.currentPage = 1;

      catalogLoadingAction.setLoading(true);

      const { brandOptions, products, weightOptions } = await this.getMarkedProducts();

      if (products.length === 0) {
        this.view.showNotFoundWidget(state.searchTerm);
        return;
      }

      this.view.createHTML(products, {
        onAddToCart: this.handleAddToCart,
        onNavigateToDetails: this.handleNavigateToDetails,
      });

      filtersStore.setState({ brandOptions, weightOptions });

      // this.initIntersectionObserver();
    } catch (error: unknown) {
      if (isError(error)) {
        this.view.showNotFoundWidget(error.message, true);
      }
    } finally {
      catalogLoadingAction.setLoading(false);
    }
  };
}
