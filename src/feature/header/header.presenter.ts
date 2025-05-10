import { Presenter } from '~/shared/presenter/presenter';

import type { HeaderView } from './header.view';

export class HeaderPresenter extends Presenter<HeaderView> {
  public constructor(view: HeaderView) {
    super(view);
  }
}
