import iconSort from '~/assets/icons/sort.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { InputRadio } from '~/components/common/input/input-radio/input-radio';
import { InputSearch } from '~/components/common/input/input-search/input-search';
import { SEARCH_PROPS } from '~/shared/constants/input-properties';
import { button, div } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';
import { debounce } from '~/shared/utils/debounce';

import type { CatalogState } from '../store/store';

import styles from './search-and-sort.module.css';

const SEARCH_DEBOUNCE_TIMEOUT = 600;

export class SearchAndSortView extends BaseComponent {
  private readonly sortIcon = createSvgIcon(iconSort, [styles.icon, styles.rotated].join(' '));

  private readonly buttonOrder = button({ className: styles.button }, 'ORDER: ', this.sortIcon);

  private readonly inputSearch = new InputSearch(SEARCH_PROPS);

  private readonly inputSortName = new InputRadio({
    label: 'Name',
    name: 'sort-field',
  });

  private readonly inputSortPrice = new InputRadio({
    label: 'Price',
    name: 'sort-field',
  });

  private readonly sortContainer = div(
    { className: styles.sortContainer },
    'SORT BY:',
    this.inputSortName.element,
    this.inputSortPrice.element,
    this.buttonOrder,
  );

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    this.append(this.inputSearch, this.sortContainer);

    this.setupListeners();
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

  public setSortDirection(sortDirection: CatalogState['sortDirection']): void {
    if (sortDirection === 'asc') {
      this.sortIcon.classList.add(styles.rotated);
    } else {
      this.sortIcon.classList.remove(styles.rotated);
    }
  }

  public setSortField(sortField: CatalogState['sortField']): void {
    if (sortField === 'name') {
      this.inputSortName.setChecked(true);
      this.inputSortPrice.setChecked(false);
    } else {
      this.inputSortName.setChecked(false);
      this.inputSortPrice.setChecked(true);
    }
  }

  private setupListeners(): void {
    this.buttonOrder.addEventListener(
      'click',
      () => {
        this.sortIcon.classList.toggle(styles.rotated);
      },
      { signal: this.abortController.signal },
    );
  }
}
