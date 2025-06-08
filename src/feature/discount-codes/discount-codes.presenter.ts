import type { DiscountCodesService } from '~/api/services/discount-codes/discount-codes.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { DiscountCodesView } from './discount-codes.view';

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
      console.warn(response.body);

      this.view.createHTML();
    } catch {
      console.warn('error');
    }
  }
}
