import type { ProductsService } from '~/api/services/products/products.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { ProductCardListView } from './product-card-list.view';

export class ProductCardListPresenter extends Presenter<ProductCardListView> {
  private readonly productsService: ProductsService;

  public constructor(view: ProductCardListView, productsService: ProductsService) {
    super(view);

    this.productsService = productsService;

    this.updateView();
  }

  private async updateView(): Promise<void> {
    const products = await this.productsService.getProducts({ limit: 12 });

    this.view.createHTML(products);
  }
}
