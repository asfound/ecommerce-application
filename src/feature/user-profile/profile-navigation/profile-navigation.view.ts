import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { li } from '~/shared/create-element/tags';

import styles from './profile-navigation.module.css';

export interface ProfileNavigationItemProperties {
  name: string;
  onClick(): void;
}

export class ProfileNavigationView extends BaseComponent<HTMLDetailsElement> implements Component {
  private readonly navigationItems: HTMLLIElement[] = [];

  public constructor(items: ProfileNavigationItemProperties[]) {
    super({
      className: styles.details,
      tagName: 'ul',
    });

    this.createHTML(items);
  }

  public createHTML(items: ProfileNavigationItemProperties[]): void {
    for (const item of items) {
      const itemElement = li({ className: styles.item }, item.name);

      itemElement.addEventListener(
        'click',
        () => {
          this.handleNavigationClick(itemElement);
          item.onClick();
        },
        { signal: this.abortController.signal },
      );

      this.navigationItems.push(itemElement);
      this.append(itemElement);
    }

    this.navigationItems[0].classList.add(styles.active);
  }

  private handleNavigationClick(item: HTMLLIElement): void {
    for (const navItem of this.navigationItems) {
      navItem.classList.toggle(styles.active, navItem === item);
    }
  }
}
