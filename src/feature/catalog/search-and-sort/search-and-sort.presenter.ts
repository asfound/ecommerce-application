import type { ProductsFilterPayload } from '~/api/services/products/types';

import { Presenter } from '~/shared/presenter/presenter';

import type { SearchAndSortView } from './search-and-sort.view';

import { catalogAction } from '../store/actions';
import { catalogCategoryNameSelector, catalogSelector } from '../store/selectors';
import { catalogCategoryNameStore, catalogStore } from '../store/store';

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
    sortDirection: ProductsFilterPayload['sortDirection'],
  ): void => {
    catalogAction.setSortDirection(sortDirection);
  };

  private readonly handleSortFieldChange = (
    sortField: ProductsFilterPayload['sortField'],
  ): void => {
    catalogAction.setSortField(sortField);
  };

  private initView(): void {
    this.view.setSortField(catalogStore.select(catalogSelector.selectSortField));
    this.view.setSortDirection(catalogStore.select(catalogSelector.selectSortDirection));
  }

  private setupSubscriptions(): void {
    this.subscribeCategoryNameChange();
    this.subscribeSortFieldChange();
    this.subscribeSortDirectionChange();
  }

  private subscribeCategoryNameChange(): void {
    const unsubscribe = catalogCategoryNameStore.subscribe(
      catalogCategoryNameSelector.selectCategoryName,
      (categoryName) => {
        this.view.clearInput();
        this.view.setInputPlaceholder(categoryName);
      },
      { isImmediate: false },
    );

    this.storeSubscription.add(unsubscribe);
  }

  private subscribeSortDirectionChange(): void {
    const unsubscribe = catalogStore.subscribe(
      catalogSelector.selectSortDirection,
      (sortDirection) => {
        this.view.setSortDirection(sortDirection);
      },
      { isImmediate: false },
    );

    this.storeSubscription.add(unsubscribe);
  }

  private subscribeSortFieldChange(): void {
    const unsubscribe = catalogStore.subscribe(
      catalogSelector.selectSortField,
      (sortField) => {
        this.view.setSortField(sortField);
      },
      { isImmediate: false },
    );

    this.storeSubscription.add(unsubscribe);
  }
}
