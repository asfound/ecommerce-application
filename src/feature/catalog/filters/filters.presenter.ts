import { Presenter } from '~/shared/presenter/presenter';
import { debounce } from '~/shared/utils/debounce';

import type { FiltersView } from './filters.view';
import type { FiltersState } from './store/store';

import { USER_INPUT_DEBOUNCE_TIMEOUT } from '../constants';
import { catalogAction } from '../store/actions';
import { catalogCategoryNameSelector, catalogSelector } from '../store/selectors';
import { catalogCategoryNameStore, type CatalogState, catalogStore } from '../store/store';
import {
  FILTER,
  FILTER_BEST_SELLERS_PROPS,
  FILTER_BRAND_PROPS,
  FILTER_PRICE_RANGE_PROPS,
  FILTER_WEIGHT_PROPS,
  VALID_PRICE_LENGTH,
} from './constants';
import { filtersStore } from './store/store';

export class FiltersPresenter extends Presenter<FiltersView> {
  public constructor(view: FiltersView) {
    super(view);

    this.initVIew();

    this.subscribeStateChange();

    this.subscribeCategoryNameChange();
  }

  private readonly handleBestSellerChange = (checkedValues: string[]): void => {
    catalogAction.setBestSeller(checkedValues.length > 0);
  };

  private readonly handleBrandChange = (checkedValues: string[]): void => {
    catalogAction.setBrands(checkedValues);
  };

  private handleMaxPriceChange(maxPrice: string): void {
    catalogAction.setMaxPrice(this.normalizePrice(maxPrice));
  }

  private handleMaxPriceReset = (): void => {
    catalogAction.setMaxPrice(undefined);
  };

  private handleMinPriceChange(minPrice: string): void {
    catalogAction.setMinPrice(this.normalizePrice(minPrice));
  }

  private handleMinPriceReset = (): void => {
    catalogAction.setMinPrice(undefined);
  };

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
      onMaxPriceReset: this.handleMaxPriceReset,
      onMinPriceChange: debouncedHandleMinPriceChange,
      onMinPriceReset: this.handleMinPriceReset,
    });

    this.view.initBestSellerFilter({
      ...FILTER_BEST_SELLERS_PROPS,
      onChange: this.handleBestSellerChange,
    });

    this.view.hideFilter(FILTER.BRAND);
    this.view.hideFilter(FILTER.WEIGHT);
  }

  private normalizePrice(price: string): number | undefined {
    return price.length > 0 && price.length < VALID_PRICE_LENGTH
      ? Number.parseFloat(price)
      : undefined;
  }

  private readonly onCategoryNameChange = (categoryName: string): void => {
    this.view.hideFilter(FILTER.BRAND);
    this.view.hideFilter(FILTER.WEIGHT);

    catalogStore.setState({ brand: [], weight: [] });

    if (categoryName === '') {
      this.view.resetInputs();
      this.view.resetCheckboxes(FILTER.ALL);
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

  private subscribeStateChange(): void {
    const unsubscribe = filtersStore.subscribe((state) => state, this.updateView, {
      isImmediate: false,
    });

    this.storeSubscription.add(unsubscribe);
  }

  private readonly updateView = ({ brandOptions, weightOptions }: FiltersState): void => {
    if (brandOptions.length > 0) {
      this.view.renderBrandFilter({
        ...FILTER_BRAND_PROPS,
        checked: catalogStore.select(catalogSelector.selectBrand),
        onChange: this.handleBrandChange,
        options: brandOptions,
      });

      console.warn(catalogStore.getState().brand);
    } else {
      this.view.resetCheckboxes(FILTER.BRAND);
      this.view.hideFilter(FILTER.BRAND);
    }

    if (weightOptions.length > 0) {
      this.view.renderWeightFilter({
        ...FILTER_WEIGHT_PROPS,
        checked: catalogStore.select(catalogSelector.selectWeight),
        onChange: this.handleWeightChange,
        options: weightOptions,
      });

      console.warn(catalogStore.getState().weight);
    } else {
      this.view.resetCheckboxes(FILTER.WEIGHT);
      this.view.hideFilter(FILTER.WEIGHT);
    }
  };
}
