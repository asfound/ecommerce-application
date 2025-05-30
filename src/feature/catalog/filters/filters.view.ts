import type {
  FilterCheckboxesProperties,
  FilterPriceRangeProperties,
} from '~/components/filter/filter';

import { BaseComponent } from '~/components/base-component/base-component';
import { Filter } from '~/components/filter/filter';
import { div, h2 } from '~/shared/create-element/tags';

import { FILTER, FILTER_VIEW_TEXT } from './constants';
import styles from './filters.module.css';

export type AvailableFilter = (typeof FILTER)[keyof typeof FILTER];

export class FiltersView extends BaseComponent {
  private readonly filterBestSeller = new Filter();

  private readonly filterBrand: Filter = new Filter();

  private readonly filterBrandContainer = div(null);

  private readonly filterPriceRange = new Filter();

  private readonly filterWeight: Filter = new Filter();

  private readonly filterWeightContainer = div(null);

  private readonly heading = h2({ className: styles.heading }, FILTER_VIEW_TEXT.FILTERS);

  public constructor() {
    super({ className: styles.filters, tagName: 'div' });

    this.append(this.heading, this.filterBestSeller);
  }

  public hideFilter(filter: AvailableFilter): void {
    if (filter === FILTER.BRAND) {
      this.filterBrand.hide();
      return;
    }

    this.filterWeight.hide();
  }

  public initBestSellerFilter(properties: FilterCheckboxesProperties): void {
    this.filterBestSeller.createHTML(properties);
    this.append(this.filterBestSeller);
  }

  public initPriceRangeFilter(properties: FilterPriceRangeProperties): void {
    this.filterPriceRange.createHTML(properties);
    this.append(this.filterPriceRange);
  }

  public renderBrandFilter(properties: FilterCheckboxesProperties): void {
    this.filterBrand.createHTML(properties);
    this.filterBrand.show();
    this.filterBrandContainer.replaceChildren(this.filterBrand.element);
    this.append(this.filterBrandContainer);
  }

  public renderWeightFilter(properties: FilterCheckboxesProperties): void {
    this.filterWeight.createHTML(properties);
    this.filterWeight.show();
    this.filterWeightContainer.replaceChildren(this.filterWeight.element);
    this.append(this.filterWeightContainer);
  }

  public resetCheckboxes(filter: AvailableFilter): void {
    if (filter === FILTER.ALL) {
      this.filterBrand.resetCheckboxes();
      this.filterWeight.resetCheckboxes();
      this.filterBestSeller.resetCheckboxes();
      return;
    }

    if (filter === FILTER.BRAND) {
      this.filterBrand.resetCheckboxes();
      return;
    }

    this.filterWeight.resetCheckboxes();
  }

  public resetInputs(): void {
    this.filterPriceRange.resetInputs();
  }

  public showFilter(filter: AvailableFilter): void {
    if (filter === FILTER.BRAND) {
      this.filterBrand.show();
      return;
    }

    this.filterWeight.show();
  }
}
