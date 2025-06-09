import type { DiscountCodesService } from '~/api/services/discount-codes/discount-codes.service';

import { Presenter } from '~/shared/presenter/presenter';
import { showToast } from '~/shared/utils/show-toast';

import type { DiscountCodesView } from './discount-codes.view';

import { DISCOUNT_CODE_ERROR } from './constants';

export class DiscountCodesPresenter extends Presenter<DiscountCodesView> {
  private readonly discountCodesService: DiscountCodesService;

  public constructor(view: DiscountCodesView, discountCodesService: DiscountCodesService) {
    super(view);

    this.discountCodesService = discountCodesService;

    this.initView();
  }

  private async initView(): Promise<void> {
    try {
      const response = await this.discountCodesService.getDiscountCodes();

      this.view.createHTML(response);
    } catch {
      showToast(DISCOUNT_CODE_ERROR.FAILED, true);
    }
  }
}
