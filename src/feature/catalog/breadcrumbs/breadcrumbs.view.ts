import type { Component } from '~/components/base-component/types';
import type { BreadcrumbItem } from '~/components/breadcrumbs/breadcrumbs';

import { BaseComponent } from '~/components/base-component/base-component';
import { Breadcrumbs } from '~/components/breadcrumbs/breadcrumbs';

export class CatalogBreadcrumbsView extends BaseComponent implements Component {
  public constructor() {
    super({
      tagName: 'div',
    });
  }

  public createHTML(items: BreadcrumbItem[]): void {
    this.replaceChildren(new Breadcrumbs(items));
  }
}
