import type { ProductsService } from '~/api/services/products/products.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { SearchAndSortView } from './search-and-sort.view';

export class SearchAndSortPresenter extends Presenter<SearchAndSortView> {
  private readonly productsService: ProductsService;

  public constructor(view: SearchAndSortView, productsService: ProductsService) {
    super(view);

    this.productsService = productsService;

    this.bindViewHandlers();
  }

  private bindViewHandlers(): void {
    this.view.bindSearchHandler(this.handleSearch);
  }

  private readonly handleSearch = (searchTerm: string): void => {
    console.warn(searchTerm);
    console.warn(this.productsService);
  };
}
