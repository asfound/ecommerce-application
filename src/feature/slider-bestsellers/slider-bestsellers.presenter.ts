import type { ProductsService } from '~/api/services/products/products.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { SliderBestsellersView } from './slider-bestsellers.view';

export class SliderBestsellersPresenter extends Presenter<SliderBestsellersView> {
  private readonly productsService: ProductsService;

  public constructor(view: SliderBestsellersView, productsService: ProductsService) {
    super(view);

    this.productsService = productsService;

    console.warn(this.productsService);
  }
}
