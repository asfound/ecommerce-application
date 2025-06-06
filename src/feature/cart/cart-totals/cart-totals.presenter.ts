import { Presenter } from '~/shared/presenter/presenter';

import type { CartTotalsView } from './cart-totals.view';

export class CartTotalsPresenter extends Presenter<CartTotalsView> {
  public constructor(view: CartTotalsView) {
    super(view);
  }
}
