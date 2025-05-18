import { SEARCH_PROPS } from '~/shared/constants/input-properties';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import { InputSearch } from '../common/input/input-search/input-search';
import styles from './search-products-form.module.css';

export class SearchProductsForm extends BaseComponent<HTMLFormElement> {
  private readonly buttonSearch = new Button({
    textContent: 'Search',
    type: 'submit',
  });

  private readonly inputSearch = new InputSearch(SEARCH_PROPS);

  public constructor() {
    super({ className: styles.form, tagName: 'form' });

    this.append(this.inputSearch, this.buttonSearch);
  }
}
