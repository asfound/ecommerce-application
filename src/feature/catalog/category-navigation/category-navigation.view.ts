import type { AppCategory } from '~/api/services/categories/types';
import type { Component } from '~/components/base-component/types';
import type { CategoryNavigationItemClickHandler } from '~/components/category-navigation-item/category-navigation-item';

import iconArrowUp from '~/assets/icons/arrow-up.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { CategoryNavigationItem } from '~/components/category-navigation-item/category-navigation-item';
import { h2, summary } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';

import styles from './category-navigation.module.css';
import { CATEGORY_HEADING } from './constants';

export class CategoryNavigationView extends BaseComponent<HTMLDetailsElement> implements Component {
  private activeItem: CategoryNavigationItem | null = null;

  private readonly arrowIcon = createSvgIcon(iconArrowUp, styles.icon);

  private readonly categoryItems = new Map<string, CategoryNavigationItem>();

  private readonly summaryElement = summary(
    { className: styles.summary },
    h2({ className: styles.heading }, CATEGORY_HEADING),
    this.arrowIcon,
  );

  public constructor() {
    super({
      attributes: { open: true },
      className: styles.details,
      tagName: 'details',
    });

    this.setupListeners();
  }

  public createHTML(
    categories: AppCategory[],
    onClick: CategoryNavigationItemClickHandler,
    activeCategoryName: string,
  ): void {
    this.append(this.summaryElement);

    for (const category of categories) {
      const categoryItem = new CategoryNavigationItem(category, (category) => {
        onClick(category);
        this.setActiveItem(categoryItem);
      });

      if (category.name === activeCategoryName) {
        this.setActiveItem(categoryItem);
      }

      this.categoryItems.set(category.name, categoryItem);
      this.append(categoryItem);
    }
  }

  public override destroy(): void {
    for (const item of this.categoryItems.values()) {
      item.destroy();
    }

    this.categoryItems.clear();

    super.destroy();
  }

  public updateActiveItem(categoryName: string): void {
    for (const [name, item] of this.categoryItems) {
      if (name === categoryName) {
        this.setActiveItem(item);
        return;
      }
    }

    if (this.activeItem) {
      this.activeItem.setActive(false);
      this.activeItem = null;
    }
  }

  private setActiveItem(categoryItem: CategoryNavigationItem): void {
    if (this.activeItem) {
      this.activeItem.setActive(false);
    }
    this.activeItem = categoryItem;
    this.activeItem.setActive(true);
  }

  private setupListeners(): void {
    this.addListener('toggle', () => {
      if (this.element.open) {
        this.arrowIcon.classList.add(styles.rotated);
      } else {
        this.arrowIcon.classList.remove(styles.rotated);
      }
    });
  }
}
