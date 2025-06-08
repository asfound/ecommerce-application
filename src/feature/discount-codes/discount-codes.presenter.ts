import { Presenter } from '~/shared/presenter/presenter';

import type { DiscountCodesView } from './discount-codes.view';

export class DiscountCodesPresenter extends Presenter<DiscountCodesView> {
  public constructor(view: DiscountCodesView) {
    super(view);
  }
}
