import type { ProductsFilterPayload } from '~/api/services/products/types';

import { SORT_DIRECTION, SORT_FIELD_TYPE } from '~/api/services/products/constants';
import iconSort from '~/assets/icons/sort.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { InputRadio } from '~/components/common/input/input-radio/input-radio';
import { InputSearch } from '~/components/common/input/input-search/input-search';
import { SEARCH_PROPS } from '~/shared/constants/input-properties';
import { button, div } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';
import { debounce } from '~/shared/utils/debounce';

import type { CatalogState } from '../store/store';

import { USER_INPUT_DEBOUNCE_TIMEOUT } from '../constants';
import { INPUT_SORT_PROPS, SEARCH_SORT_TEXT } from './constants';
import styles from './search-and-sort.module.css';

export type SortByFieldHandler = (sortField: ProductsFilterPayload['sortField']) => void;
export type SortDirectionHandler = (sortDirection: ProductsFilterPayload['sortDirection']) => void;

export class SearchAndSortView extends BaseComponent {
  private readonly sortIcon = createSvgIcon(iconSort, [styles.icon, styles.rotated].join(' '));

  private readonly buttonDirection = button(
    { className: styles.button },
    SEARCH_SORT_TEXT.ORDER,
    this.sortIcon,
  );

  private readonly inputSearch = new InputSearch(SEARCH_PROPS);

  private readonly inputSortName = new InputRadio(INPUT_SORT_PROPS.NAME);

  private readonly inputSortPrice = new InputRadio(INPUT_SORT_PROPS.PRICE);

  private readonly sortContainer = div(
    { className: styles.sortContainer },
    SEARCH_SORT_TEXT.SORT_BY,
    this.inputSortPrice.element,
    this.inputSortName.element,
    this.buttonDirection,
  );

  private sortDirection: ProductsFilterPayload['sortDirection'] = SORT_DIRECTION.ASC;

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
      }, USER_INPUT_DEBOUNCE_TIMEOUT),
    );
  }

  public bindSortByNameHandler(handler: SortByFieldHandler): void {
    this.inputSortName.addListener('change', () => {
      handler(SORT_FIELD_TYPE.NAME);
    });
  }

  public bindSortByPriceHandler(handler: SortByFieldHandler): void {
    this.inputSortPrice.addListener('change', () => {
      handler(SORT_FIELD_TYPE.PRICE);
    });
  }

  public bindSortDirectionHandler(handler: SortDirectionHandler): void {
    this.buttonDirection.addEventListener(
      'click',
      () => {
        this.sortDirection =
          this.sortDirection === SORT_DIRECTION.ASC ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC;

        handler(this.sortDirection);
      },
      { signal: this.abortController.signal },
    );
  }

  public clearInput(): void {
    this.inputSearch.clear();
  }

  public setInputPlaceholder(categoryName: string): void {
    this.inputSearch.setAttributes({ placeholder: SEARCH_SORT_TEXT.SEARCH_IN(categoryName) });
  }

  public setSortDirection(sortDirection: CatalogState['sortDirection']): void {
    if (sortDirection === SORT_DIRECTION.ASC) {
      this.sortDirection = SORT_DIRECTION.ASC;
      this.sortIcon.classList.add(styles.rotated);
    } else {
      this.sortDirection = SORT_DIRECTION.DESC;
      this.sortIcon.classList.remove(styles.rotated);
    }
  }

  public setSortField(sortField: CatalogState['sortField']): void {
    if (sortField === SORT_FIELD_TYPE.NAME) {
      this.inputSortName.setChecked(true);
      this.inputSortPrice.setChecked(false);
    } else {
      this.inputSortName.setChecked(false);
      this.inputSortPrice.setChecked(true);
    }
  }

  private setupListeners(): void {
    this.buttonDirection.addEventListener(
      'click',
      () => {
        this.sortIcon.classList.toggle(styles.rotated);
      },
      { signal: this.abortController.signal },
    );
  }
}
