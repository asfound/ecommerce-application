import type { ProductsService } from '~/api/services/products/products.service';

import { routerSelector } from '~/app/router/store/selectors';
import { routerStore } from '~/app/router/store/store';
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
    const searchParameters = routerStore.select(routerSelector.selectSearchParameters);

    const product = await this.productsService.getByProductId(searchParameters.id);

    this.view.createHTML(product, searchParameters.sku);
  }
}
