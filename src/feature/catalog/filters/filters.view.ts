import { BaseComponent } from '~/components/base-component/base-component';
import { Filter } from '~/components/filter/filter';

import styles from './filters.module.css';
export class FiltersView extends BaseComponent {
  private readonly filterBestSeller = new Filter();

  private readonly filterPriceRange = new Filter();

  public constructor() {
    super({ className: styles.filters, tagName: 'div' });

    this.filterBestSeller.createHTML({
      onChange(checkedValues) {
        console.warn(checkedValues);
      },
      options: [{ label: 'Bestseller', value: 'true' }],
      title: 'Best seller',
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

    this.append(this.filterBestSeller, this.filterPriceRange);
  }
}
