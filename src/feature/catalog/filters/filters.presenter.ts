import { Presenter } from '~/shared/presenter/presenter';
import { debounce } from '~/shared/utils/debounce';

import type { CatalogState } from '../store/store';
import type { FiltersView } from './filters.view';

import { USER_INPUT_DEBOUNCE_TIMEOUT } from '../constants';
import { catalogAction } from '../store/actions';
import {
  FILTER_BEST_SELLERS_PROPS,
  FILTER_PRICE_RANGE_PROPS,
  FILTER_WEIGHT_PROPS,
} from './constants';

export class FiltersPresenter extends Presenter<FiltersView> {
  public constructor(view: FiltersView) {
    super(view);

    this.initVIew();
  }

  private readonly handleBestSellerChange = (checkedValues: string[]): void => {
    catalogAction.setBestSeller(checkedValues.length > 0);
  };

  private handleMaxPriceChange(maxPrice: string): void {
    const max = maxPrice.length > 0 ? Number.parseFloat(maxPrice) : undefined;
    catalogAction.setMaxPrice(max);
  }

  private handleMinPriceChange(minPrice: string): void {
    const min = minPrice.length > 0 ? Number.parseFloat(minPrice) : undefined;
    catalogAction.setMinPrice(min);
  }

  private readonly handleWeightChange = (checkedValues: CatalogState['weight']): void => {
    catalogAction.setWeights(checkedValues);
  };

  private initVIew(): void {
    const debouncedHandleMaxPriceChange = debounce(
      this.handleMaxPriceChange.bind(this),
      USER_INPUT_DEBOUNCE_TIMEOUT,
    );
    const debouncedHandleMinPriceChange = debounce(
      this.handleMinPriceChange.bind(this),
      USER_INPUT_DEBOUNCE_TIMEOUT,
    );

    this.view.initPriceRangeFilter({
      ...FILTER_PRICE_RANGE_PROPS,
      onMaxPriceChange: debouncedHandleMaxPriceChange,
      onMinPriceChange: debouncedHandleMinPriceChange,
    });

    this.view.initBestSellerFilter({
      ...FILTER_BEST_SELLERS_PROPS,
      onChange: this.handleBestSellerChange,
    });

    this.view.initWeightFilter({
      ...FILTER_WEIGHT_PROPS,
      onChange: this.handleWeightChange,
    });
  }
}
