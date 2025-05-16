import type { AppCategory } from '~/api/services/categories/types';
import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { CategoryNavigationItem } from '~/components/category-navigation-item/category-navigation-item';
import { h2, summary } from '~/shared/create-element/tags';

import styles from './category-navigation.module.css';

export class CategoryNavigationView extends BaseComponent<HTMLDetailsElement> implements Component {
  private readonly summaryElement = summary({ className: styles.summary }, h2(null, 'Categories'));

  public constructor() {
    super({
      attributes: { open: true },
      className: styles.details,
      tagName: 'details',
    });
  }

  public createHTML(categories: AppCategory[]): void {
    const fragment = document.createDocumentFragment();

    for (const category of categories) {
      fragment.append(new CategoryNavigationItem(category).element);
    }

    this.append(this.summaryElement, fragment);
  }
}
