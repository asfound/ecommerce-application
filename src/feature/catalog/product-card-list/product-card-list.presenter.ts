import type { ProductsService } from '~/api/services/products/products.service';
import type { AppProduct } from '~/api/services/products/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { Presenter } from '~/shared/presenter/presenter';

import type { ProductCardListView } from './product-card-list.view';

import { PRODUCTS_PER_PAGE } from '../constants';
import { catalogSelector } from '../store/selectors';
import { catalogStore } from '../store/store';

export class ProductCardListPresenter extends Presenter<ProductCardListView> {
  private readonly productsService: ProductsService;

  public constructor(view: ProductCardListView, productsService: ProductsService) {
    super(view);

    this.productsService = productsService;

    this.updateView();

    this.setupSubscriptions();
  }

  private readonly handleNavigateToDetails = (product: AppProduct): void => {
    Router.instance.navigate(ROUTE_PATH.PRODUCT_DETAILS, { name: product.name, sku: product.sku });
  };

  private setupSubscriptions(): void {
    this.subscribeCategoryId();
  }

  private subscribeCategoryId(): void {
    const unsubscribe = catalogStore.subscribe(
      catalogSelector.selectCategoryId,
      async (categoryId) => {
        const products = await this.productsService.getByCategoryId({
          categoryId,
          limit: PRODUCTS_PER_PAGE,
        });

        this.view.createHTML(products, this.handleNavigateToDetails);
      },
      { isImmediate: false },
    );

    this.storeSubscription.add(unsubscribe);
  }

  private async updateView(): Promise<void> {
    const products = await this.productsService.getProducts({ limit: PRODUCTS_PER_PAGE });

    this.view.createHTML(products, this.handleNavigateToDetails);
  }
}
