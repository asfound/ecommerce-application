import { Presenter } from '~/shared/presenter/presenter';
import { debounce } from '~/shared/utils/debounce';

import type { FiltersView } from './filters.view';

import { USER_INPUT_DEBOUNCE_TIMEOUT } from '../constants';
import { catalogAction } from '../store/actions';
import { catalogCategoryNameSelector } from '../store/selectors';
import { catalogCategoryNameStore, type CatalogState, catalogStore } from '../store/store';
import {
  CATEGORY_NAME,
  FILTER_BEST_SELLERS_PROPS,
  FILTER_BRAND_PROPS,
  FILTER_PRICE_RANGE_PROPS,
  FILTER_WEIGHT_PROPS,
} from './constants';

export class FiltersPresenter extends Presenter<FiltersView> {
  public constructor(view: FiltersView) {
    super(view);

    this.initVIew();

    this.subscribeCategoryNameChange();
  }

  private readonly handleBestSellerChange = (checkedValues: string[]): void => {
    catalogAction.setBestSeller(checkedValues.length > 0);
  };

  private readonly handleBrandChange = (checkedValues: string[]): void => {
    catalogAction.setBrands(checkedValues);
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

    this.view.initBrandFilter({
      ...FILTER_BRAND_PROPS,
      onChange: this.handleBrandChange,
    });

    this.view.hideFilter('brand');
    this.view.hideFilter('weight');
  }

  private readonly onCategoryNameChange = (categoryName: string): void => {
    if (categoryName === CATEGORY_NAME.ALL) {
      catalogStore.setState({ brand: [], weight: [] });

      this.view.hideFilter('brand');
      this.view.hideFilter('weight');
      this.view.resetCheckboxes('all');

      return;
    }

    if (
      categoryName === CATEGORY_NAME.ACCESSORIES ||
      categoryName === CATEGORY_NAME.GRINDERS ||
      categoryName === CATEGORY_NAME.BREWING ||
      categoryName === CATEGORY_NAME.DRINKWARE
    ) {
      catalogAction.setWeights([]);

      this.view.showFilter('brand');
      this.view.hideFilter('weight');
      this.view.resetCheckboxes('weight');

      return;
    } else {
      catalogAction.setBrands([]);

      this.view.showFilter('weight');
      this.view.hideFilter('brand');
      this.view.resetCheckboxes('brand');

      return;
    }
  };

  private subscribeCategoryNameChange(): void {
    const unsubscribe = catalogCategoryNameStore.subscribe(
      catalogCategoryNameSelector.selectCategoryName,
      this.onCategoryNameChange,
      { isImmediate: false },
    );

    this.storeSubscription.add(unsubscribe);
  }
}
