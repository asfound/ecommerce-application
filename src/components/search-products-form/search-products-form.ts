import { SERVICE_HUB } from '~/api/services/service-hub';
import { SEARCH_PROPS } from '~/shared/constants/input-properties';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import { InputSearch } from '../common/input/input-search/input-search';
import styles from './search-products-form.module.css';

export type SearchHandlerFunction = (searchTerm: string) => void;

export class SearchProductsForm extends BaseComponent<HTMLFormElement> {
  private readonly buttonSearch = new Button({
    textContent: 'Search',
    type: 'submit',
  });

  private readonly inputSearch = new InputSearch(SEARCH_PROPS);

  public constructor() {
    super({ className: styles.form, tagName: 'form' });

    this.buttonSearch.setAttributes({ disabled: true });

    this.append(this.inputSearch, this.buttonSearch);

    this.setupListeners();
  }

  public bindSearchHandler(handler: SearchHandlerFunction): void {
    this.addListener('submit', (event) => {
      event.preventDefault();

      handler(this.inputSearch.value.trim());

      this.inputSearch.clear();
      this.buttonSearch.disable();
    });
  }

  private setupListeners(): void {
    this.inputSearch.addListener('input', () => {
      const emptyString = this.inputSearch.value.trim() === '';

      SERVICE_HUB.provideSuggestionsService()
        .suggest(this.inputSearch.value)
        .then((response) => {
          console.warn(response.body);
        });

      this.buttonSearch[emptyString ? 'disable' : 'enable']();
    });
  }
}
