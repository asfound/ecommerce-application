import { Presenter } from '~/shared/presenter/presenter';

import type { SearchAndSortView } from './search-and-sort.view';

export class SearchAndSortPresenter extends Presenter<SearchAndSortView> {
  public constructor(view: SearchAndSortView) {
    super(view);
  }
}
