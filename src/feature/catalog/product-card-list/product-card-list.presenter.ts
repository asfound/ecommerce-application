import type { ProductsService } from '~/api/services/products/products.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { ProductCardListView } from './product-card-list.view';

import { catalogSelector } from '../store/selectors';
import { catalogStore } from '../store/store';

export class ProductCardListPresenter extends Presenter<ProductCardListView> {
  private readonly productsService: ProductsService;

  public constructor(view: ProductCardListView, productsService: ProductsService) {
    super(view);

    this.productsService = productsService;

    this.updateView();

    this.subscribeCategoryId();
  }

  private subscribeCategoryId(): void {
    const unsubscribe = catalogStore.subscribe(catalogSelector.selectCategoryId, (categoryId) => {
      this.productsService.getByCategoryId({ categoryId, limit: 12 }).then((products) => {
        this.view.createHTML(products);
      });
    });

    this.storeSubscription.add(unsubscribe);
  }

  private async updateView(): Promise<void> {
    const products = await this.productsService.getProducts({ limit: 12 });

    this.view.createHTML(products);
  }
}
