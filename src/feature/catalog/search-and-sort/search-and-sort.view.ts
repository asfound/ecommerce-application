import { BaseComponent } from '~/components/base-component/base-component';
import { InputSearch } from '~/components/common/input/input-search/input-search';
import { SEARCH_PROPS } from '~/shared/constants/input-properties';
import { debounce } from '~/shared/utils/debounce';

import styles from './search-and-sort.module.css';

const SEARCH_DEBOUNCE_TIMEOUT = 600;

export class SearchAndSortView extends BaseComponent {
  private readonly inputSearch = new InputSearch(SEARCH_PROPS);

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    this.append(this.inputSearch);
  }

  public bindSearchHandler(handler: (searchTerm: string) => void): void {
    this.inputSearch.addListener(
      'input',
      debounce(() => {
        handler(this.inputSearch.value.trim());
      }, SEARCH_DEBOUNCE_TIMEOUT),
    );
  }
}
