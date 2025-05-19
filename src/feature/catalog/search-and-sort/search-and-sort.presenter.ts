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
  }

  private bindViewHandlers(): void {
    this.view.bindSearchHandler(this.handleSearch);
  }

  private readonly handleSearch = (searchTerm: string): void => {
    catalogAction.setSearchTerm(searchTerm);
  };

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
