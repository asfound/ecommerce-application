import { li, span, ul } from '~/shared/create-element/tags';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import styles from './breadcrumbs.module.css';

const LAST_ELEMENT = 1;

export interface BreadcrumbItem {
  name: string;
  onClick?(): void;
}

export class Breadcrumbs extends BaseComponent implements Component {
  public constructor(items: BreadcrumbItem[]) {
    super({ tagName: 'div' });

    this.createHTML(items);
  }

  public createHTML(items: BreadcrumbItem[]): void {
    const list = ul({ className: styles.breadcrumbs });

    for (const [index, item] of items.entries()) {
      const listItem = li({ className: styles.item });

      if (item.onClick && index < items.length - LAST_ELEMENT) {
        const linkSpan = span({ className: styles.link }, item.name);
        const separator = span({ className: styles.separator }, '>');

        linkSpan.addEventListener(
          'click',
          () => {
            item.onClick?.();
          },
          { signal: this.abortController.signal },
        );
        listItem.append(linkSpan, separator);
      } else {
        const currentSpan = span({ className: styles.current }, item.name);
        listItem.append(currentSpan);
      }

      list.append(listItem);
    }

    this.append(list);
  }
}
