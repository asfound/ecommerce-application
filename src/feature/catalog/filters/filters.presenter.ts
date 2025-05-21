import { Presenter } from '~/shared/presenter/presenter';

import type { FiltersView } from './filters.view';

export class FiltersPresenter extends Presenter<FiltersView> {
  public constructor(view: FiltersView) {
    super(view);
  }
}
