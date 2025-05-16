import type { AppCategory } from '~/api/services/categories/types';

import { BaseComponent } from '../base-component/base-component';
import styles from './category-navigation-item.module.css';

export class CategoryNavigationItem extends BaseComponent {
  public constructor(category: AppCategory) {
    super({
      className: [styles.item, category.level === 0 ? styles.rootCategory : styles.subcategory],
      tagName: 'li',
      textContent: category.name,
    });
  }
}
