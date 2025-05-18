import { BaseComponent } from '~/components/base-component/base-component';
import { SearchProductsForm } from '~/components/search-products-form/search-products-form';

import styles from './search-and-sort.module.css';
export class SearchAndSortView extends BaseComponent {
  private readonly formSearch = new SearchProductsForm();

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    this.append(this.formSearch);
  }
}
