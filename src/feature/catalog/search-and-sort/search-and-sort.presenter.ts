import { Presenter } from '~/shared/presenter/presenter';

import type { SearchAndSortView } from './search-and-sort.view';

import { catalogAction } from '../store/actions';

export class SearchAndSortPresenter extends Presenter<SearchAndSortView> {
  public constructor(view: SearchAndSortView) {
    super(view);

    this.bindViewHandlers();
  }

  private bindViewHandlers(): void {
    this.view.bindSearchHandler(this.handleSearch);
  }

  private readonly handleSearch = (searchTerm: string): void => {
    catalogAction.setSearchTerm(searchTerm);
  };
}
