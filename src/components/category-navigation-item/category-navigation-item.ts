import type { AppCategory } from '~/api/services/categories/types';

import { BaseComponent } from '../base-component/base-component';
import styles from './category-navigation-item.module.css';

export type CategoryNavigationItemClickHandler = (category: AppCategory) => void;

export class CategoryNavigationItem extends BaseComponent {
  public constructor(category: AppCategory, onClick: CategoryNavigationItemClickHandler) {
    super({
      className: [styles.item, category.level === 0 ? styles.rootCategory : styles.subcategory],
      tagName: 'div',
      textContent: category.name,
    });

    this.addListener('click', () => {
      onClick(category);
    });
  }

  public setActive(active: boolean): void {
    this.toggleClassName(styles.active, active);
  }
}
