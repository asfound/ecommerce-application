import type { AppCategory } from '~/api/services/categories/types';
import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { div } from '~/shared/create-element/tags';

export class CategoryNavigationView extends BaseComponent implements Component {
  public constructor() {
    super({ className: 'category-navigation', tagName: 'div' });
  }

  public createHTML(categories: AppCategory[]): void {
    console.warn(categories);
    this.append(div(null, 'Categories'));
  }
}
