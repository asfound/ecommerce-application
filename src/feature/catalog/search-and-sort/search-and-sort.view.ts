import { BaseComponent } from '~/components/base-component/base-component';
import { InputRadio } from '~/components/common/input/input-radio/input-radio';
import { InputSearch } from '~/components/common/input/input-search/input-search';
import { SEARCH_PROPS } from '~/shared/constants/input-properties';
import { div } from '~/shared/create-element/tags';
import { debounce } from '~/shared/utils/debounce';

import styles from './search-and-sort.module.css';

const SEARCH_DEBOUNCE_TIMEOUT = 600;

export class SearchAndSortView extends BaseComponent {
  private readonly inputSearch = new InputSearch(SEARCH_PROPS);

  private readonly inputSortName = new InputRadio({
    label: 'Name',
    name: 'sort-by',
  });

  private readonly inputSortPrice = new InputRadio({
    label: 'Price',
    name: 'sort-by',
  });

  private readonly sortContainer = div(
    { className: styles.sortContainer },
    'SORT BY:',
    this.inputSortName.element,
    this.inputSortPrice.element,
  );

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    this.append(this.inputSearch, this.sortContainer);
  }

  public bindSearchHandler(handler: (searchTerm: string) => void): void {
    this.inputSearch.addListener(
      'input',
      debounce(() => {
        handler(this.inputSearch.value.trim());
      }, SEARCH_DEBOUNCE_TIMEOUT),
    );
  }

  public clearInput(): void {
    this.inputSearch.clear();
  }

  public setInputPlaceholder(categoryName: string): void {
    this.inputSearch.setAttributes({ placeholder: `Search in ${categoryName}` });
  }
}
