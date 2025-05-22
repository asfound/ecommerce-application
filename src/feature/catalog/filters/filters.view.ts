import type {
  FilterCheckboxesProperties,
  FilterPriceRangeProperties,
} from '~/components/filter/filter';

import { BaseComponent } from '~/components/base-component/base-component';
import { Filter } from '~/components/filter/filter';
import { h2 } from '~/shared/create-element/tags';

import styles from './filters.module.css';
export class FiltersView extends BaseComponent {
  private readonly filterBestSeller = new Filter();

  private readonly filterPriceRange = new Filter();

  private readonly filterWeight = new Filter();

  private readonly heading = h2(null, 'Filters');

  public constructor() {
    super({ className: styles.filters, tagName: 'div' });

    this.append(this.heading, this.filterBestSeller);
  }

  public initBestSellerFilter(properties: FilterCheckboxesProperties): void {
    this.filterBestSeller.createHTML(properties);
    this.append(this.filterBestSeller);
  }

  public initPriceRangeFilter(properties: FilterPriceRangeProperties): void {
    this.filterPriceRange.createHTML(properties);
    this.append(this.filterPriceRange);
  }

  public initWeightFilter(properties: FilterCheckboxesProperties): void {
    this.filterWeight.createHTML(properties);
    this.append(this.filterWeight);
  }
}
