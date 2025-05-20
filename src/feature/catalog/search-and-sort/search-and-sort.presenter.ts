import type { ProductsPayload } from '~/api/services/products/products.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { SearchAndSortView } from './search-and-sort.view';

import { catalogAction } from '../store/actions';
import { catalogSelector } from '../store/selectors';
import { catalogStore } from '../store/store';

export class SearchAndSortPresenter extends Presenter<SearchAndSortView> {
  public constructor(view: SearchAndSortView) {
    super(view);

    this.bindViewHandlers();

    this.setupSubscriptions();

    this.initView();
  }

  private bindViewHandlers(): void {
    this.view.bindSearchHandler(this.handleSearch);
    this.view.bindSortByNameHandler(this.handleSortFieldChange);
    this.view.bindSortByPriceHandler(this.handleSortFieldChange);
    this.view.bindSortDirectionHandler(this.handleSortDirectionChange);
  }

  private readonly handleSearch = (searchTerm: string): void => {
    catalogAction.setSearchTerm(searchTerm);
  };

  private readonly handleSortDirectionChange = (
    sortDirection: ProductsPayload['sortDirection'],
  ): void => {
    catalogAction.setSortDirection(sortDirection);
  };

  private readonly handleSortFieldChange = (sortField: ProductsPayload['sortField']): void => {
    catalogAction.setSortField(sortField);
  };

  private initView(): void {
    this.view.setSortField(catalogStore.select(catalogSelector.selectSortField));
    this.view.setSortDirection(catalogStore.select(catalogSelector.selectSortDirection));
  }

  private setupSubscriptions(): void {
    this.subscribeCategoryNameChange();
  }

  private subscribeCategoryNameChange(): void {
    const unsubscribe = catalogStore.subscribe(
      catalogSelector.selectCategoryName,
      (categoryName) => {
        this.view.clearInput();
        this.view.setInputPlaceholder(categoryName);
      },
      { isImmediate: false },
    );

    this.storeSubscription.add(unsubscribe);
  }
}
