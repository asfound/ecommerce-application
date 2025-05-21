import iconArrowUp from '~/assets/icons/arrow-up.svg';
import { div, summary } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import { InputCheckbox } from '../common/input/input-checkbox/input-checkbox';
import { InputNumber } from '../common/input/input-number/input-number';
import styles from './filter.module.css';

export type FilterProperties = FilterCheckboxesProperties | FilterPriceRangeProperties;

interface FilterCheckboxesProperties {
  onChange(checkedValues: string[]): void;
  options: { label: string; value: string }[];
  title: string;
  type: 'checkboxes';
}

interface FilterPriceRangeProperties {
  onMaxPriceChange(maxPrice: string): void;
  onMinPriceChange(minPrice: string): void;
  title: string;
  type: 'price-range';
}

export class Filter extends BaseComponent<HTMLDetailsElement> implements Component {
  private readonly arrowIcon = createSvgIcon(iconArrowUp, styles.icon);

  private readonly checkedValues = new Set<string>();

  private readonly titleElement = div({ className: styles.title });

  private readonly summaryElement = summary(
    { className: styles.summary },
    this.titleElement,
    this.arrowIcon,
  );

  public constructor() {
    super({
      attributes: { open: true },
      className: ['FILTER', styles.container],
      tagName: 'details',
    });

    this.setupListeners();
  }

  public createHTML(properties: FilterProperties): void {
    this.titleElement.textContent = properties.title;

    this.append(this.summaryElement);

    if (properties.type === 'price-range') {
      this.createPriceRangeFilter(properties);
      return;
    }

    this.createCheckboxesFilter(properties);
  }

  private createCheckboxesFilter(properties: FilterCheckboxesProperties): void {
    for (const option of properties.options) {
      const inputCheckbox = new InputCheckbox({ label: option.label, name: option.value });

      inputCheckbox.addListener('change', () => {
        if (inputCheckbox.checked) {
          this.checkedValues.add(option.value);
        } else {
          this.checkedValues.delete(option.value);
        }

        properties.onChange([...this.checkedValues]);
      });

      this.append(inputCheckbox);
    }
  }

  private createPriceRangeFilter(properties: FilterPriceRangeProperties): void {
    const inputMinPrice = new InputNumber({ name: 'min-price', placeholder: 'From' });
    inputMinPrice.addListener('input', () => {
      properties.onMinPriceChange(inputMinPrice.value);
    });

    const inputMaxPrice = new InputNumber({ name: 'max-price', placeholder: 'To' });
    inputMaxPrice.addListener('input', () => {
      properties.onMaxPriceChange(inputMaxPrice.value);
    });

    const pricesContainer = div(
      { className: styles.priceRangeContainer },
      inputMinPrice.element,
      inputMaxPrice.element,
    );

    this.append(pricesContainer);
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
