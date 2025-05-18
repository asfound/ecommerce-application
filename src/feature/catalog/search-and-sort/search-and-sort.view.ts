import { BaseComponent } from '~/components/base-component/base-component';

import styles from './search-and-sort.module.css';
export class SearchAndSortView extends BaseComponent {
  public constructor() {
    super({ className: styles.container, tagName: 'div' });
  }
}
