import type { AppCategory } from '~/api/services/categories/types';
import type { Component } from '~/components/base-component/types';
import type { CategoryNavigationItemClickHandler } from '~/components/category-navigation-item/category-navigation-item';

import { BaseComponent } from '~/components/base-component/base-component';
import { CategoryNavigationItem } from '~/components/category-navigation-item/category-navigation-item';
import { h2, summary } from '~/shared/create-element/tags';

import styles from './category-navigation.module.css';
import { CATEGORY_HEADING } from './constants';

export class CategoryNavigationView extends BaseComponent<HTMLDetailsElement> implements Component {
  private activeItem: CategoryNavigationItem | null = null;

  private readonly summaryElement = summary(
    { className: styles.summary },
    h2(null, CATEGORY_HEADING),
  );

  public constructor() {
    super({
      attributes: { open: true },
      className: styles.details,
      tagName: 'details',
    });
  }

  public createHTML(categories: AppCategory[], onClick: CategoryNavigationItemClickHandler): void {
    this.append(this.summaryElement);

    for (const category of categories) {
      const categoryItem = new CategoryNavigationItem(category, (category) => {
        onClick(category);
        this.setActiveItem(categoryItem);
      });

      this.append(categoryItem);
    }
  }

  private setActiveItem(categoryItem: CategoryNavigationItem): void {
    if (this.activeItem) {
      this.activeItem.setActive(false);
    }
    this.activeItem = categoryItem;
    this.activeItem.setActive(true);
  }
}
