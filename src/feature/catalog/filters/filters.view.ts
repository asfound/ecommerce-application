import { BaseComponent } from '~/components/base-component/base-component';
import { Filter } from '~/components/filter/filter';
import { h2 } from '~/shared/create-element/tags';

import styles from './filters.module.css';
export class FiltersView extends BaseComponent {
  private readonly filterBestSeller = new Filter();

  private readonly filterPriceRange = new Filter();

  private readonly heading = h2(null, 'Filters');

  public constructor() {
    super({ className: styles.filters, tagName: 'div' });

    this.filterBestSeller.createHTML({
      onChange(checkedValues) {
        console.warn(checkedValues);
      },
      options: [{ label: 'Bestseller', value: 'true' }],
      title: 'Unique offers',
      type: 'checkboxes',
    });

    this.filterPriceRange.createHTML({
      onMaxPriceChange(maxPrice) {
        console.warn(maxPrice);
      },
      onMinPriceChange(minPrice) {
        console.warn(minPrice);
      },
      title: 'Price range',
      type: 'price-range',
    });

    this.append(this.heading, this.filterBestSeller, this.filterPriceRange);
  }
}
