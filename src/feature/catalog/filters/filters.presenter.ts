import { Presenter } from '~/shared/presenter/presenter';

import type { FiltersView } from './filters.view';

import { catalogAction } from '../store/actions';
import { FILTER_BEST_SELLERS_PROPS, FILTER_PRICE_RANGE_PROPS } from './constants';

export class FiltersPresenter extends Presenter<FiltersView> {
  public constructor(view: FiltersView) {
    super(view);

    this.initVIew();
  }

  private readonly handleBestSellerChange = (checkedValues: string[]): void => {
    catalogAction.setBestSeller(checkedValues.length > 0);
  };

  private readonly handleMaxPriceChange = (maxPrice: string): void => {
    catalogAction.setMaxPrice(Number.parseFloat(maxPrice));
  };

  private readonly handleMinPriceChange = (minPrice: string): void => {
    catalogAction.setMinPrice(Number.parseFloat(minPrice));
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
