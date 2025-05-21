import { Presenter } from '~/shared/presenter/presenter';

import type { FiltersView } from './filters.view';

import { FILTER_BEST_SELLERS_PROPS, FILTER_PRICE_RANGE_PROPS } from './constants';

export class FiltersPresenter extends Presenter<FiltersView> {
  public constructor(view: FiltersView) {
    super(view);

    this.initVIew();
  }

  private readonly handleBestSellerChange = (checkedValues: string[]): void => {
    console.warn('best seller change handler', checkedValues);
  };

  private readonly handleMaxPriceChange = (maxPrice: string): void => {
    console.warn('max price change handler', maxPrice);
  };

  private readonly handleMinPriceChange = (minPrice: string): void => {
    console.warn('min price change handler', minPrice);
  };

  private initVIew(): void {
    this.view.initPriceRangeFilter({
      ...FILTER_PRICE_RANGE_PROPS,
      onMaxPriceChange: this.handleMaxPriceChange,
      onMinPriceChange: this.handleMinPriceChange,
    });

    this.view.initBestSellerFilter({
      ...FILTER_BEST_SELLERS_PROPS,
      onChange: this.handleBestSellerChange,
    });
  }
}
