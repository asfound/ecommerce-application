import type { ProductsService } from '~/api/services/products/products.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { SliderBestsellersView } from './slider-bestsellers.view';

export class SliderBestsellersPresenter extends Presenter<SliderBestsellersView> {
  private readonly productsService: ProductsService;

  public constructor(view: SliderBestsellersView, productsService: ProductsService) {
    super(view);

    this.productsService = productsService;

    this.initView();
  }

  public async initView(): Promise<void> {
    try {
      const q = await this.productsService.getFilteredProducts({
        bestSeller: true,
        currentPage: 1,
        priceRange: {},
        productsPerPage: 100,
        sortDirection: 'asc',
        sortField: 'price',
      });

      this.view.createHTML(q.products);
    } catch (error) {
      console.warn(error);
    }
  }
}
