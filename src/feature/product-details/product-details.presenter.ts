import type { ProductsService } from '~/api/services/products/products.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { ProductDetailsView } from './product-details.view';

export class ProductDetailsPresenter extends Presenter<ProductDetailsView> {
  private readonly productsService: ProductsService;

  public constructor(view: ProductDetailsView, productsService: ProductsService) {
    super(view);

    this.productsService = productsService;

    this.updateView();
  }

  private async updateView(): Promise<void> {
    await Promise.resolve();
    console.warn(this.productsService);
  }
}
