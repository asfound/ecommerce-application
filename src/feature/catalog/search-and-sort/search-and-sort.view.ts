import { BaseComponent } from '~/components/base-component/base-component';
import { InputSearch } from '~/components/common/input/input-search/input-search';
import { SEARCH_PROPS } from '~/shared/constants/input-properties';

import styles from './search-and-sort.module.css';
export class SearchAndSortView extends BaseComponent {
  private readonly inputSearch = new InputSearch(SEARCH_PROPS);

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    this.append(this.inputSearch);
  }
}
