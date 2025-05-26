import type { ProductsService } from '~/api/services/products/products.service';

import { routerAction } from '~/app/router/store/actions';
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

  private readonly handleWeightChange = (sku: string): void => {
    routerAction.setAndReplaceSearchParameters({ sku });
  };

  private async updateView(): Promise<void> {
    try {
      const searchParameters = routerStore.select(routerSelector.selectSearchParameters);

      this.view.showLoader();

      const product = await this.productsService.getByProductId(searchParameters.id);

      this.view.createHTML({
        currentSKU: searchParameters.sku,
        onWeightChange: this.handleWeightChange,
        product,
      });
    } finally {
      this.view.scrollToTop();
      this.view.hideLoader();
    }
  }
}
