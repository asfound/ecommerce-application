import type { CatalogState } from '~/feature/catalog/store/store';

import iconArrowUp from '~/assets/icons/arrow-up.svg';
import { div, summary } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import { InputCheckbox } from '../common/input/input-checkbox/input-checkbox';
import { InputNumber } from '../common/input/input-number/input-number';
import styles from './filter.module.css';

export interface FilterCheckboxesProperties {
  onChange(checkedValues: CatalogState['weight'] | string[]): void;
  options: { label: string; value: boolean | string }[];
  title: string;
  type: 'checkboxes';
}

export interface FilterPriceRangeProperties {
  onMaxPriceChange(maxPrice: string): void;
  onMinPriceChange(minPrice: string): void;
  title: string;
  type: 'price-range';
}

export type FilterProperties = FilterCheckboxesProperties | FilterPriceRangeProperties;

export class Filter extends BaseComponent<HTMLDetailsElement> implements Component {
  private readonly arrowIcon = createSvgIcon(iconArrowUp, styles.icon);

  private readonly checkboxInputs = new Set<InputCheckbox>();

  private readonly checkedValues = new Set<string>();

  private readonly numberInputs = new Set<InputNumber>();

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

  public override destroy(): void {
    for (const input of this.checkboxInputs) input.destroy();
    this.checkboxInputs.clear();

    for (const input of this.numberInputs) input.destroy();
    this.numberInputs.clear();

    super.destroy();
  }

  public hide(): void {
    this.addClassNames(styles.hidden);
  }

  public resetCheckboxes(): void {
    for (const input of this.checkboxInputs) {
      input.setChecked(false);
    }
  }

  public show(): void {
    this.removeClassNames(styles.hidden);
  }

  private createCheckboxesFilter(properties: FilterCheckboxesProperties): void {
    for (const option of properties.options) {
      const inputCheckbox = new InputCheckbox({
        label: option.label,
        name: option.value.toString(),
      });

      inputCheckbox.addListener('change', () => {
        if (inputCheckbox.checked) {
          this.checkedValues.add(option.value.toString());
        } else {
          this.checkedValues.delete(option.value.toString());
        }

        properties.onChange([...this.checkedValues]);
      });

      this.checkboxInputs.add(inputCheckbox);

      this.append(inputCheckbox);
    }
  }

  private createPriceRangeFilter(properties: FilterPriceRangeProperties): void {
    const inputMinPrice = new InputNumber({ name: 'min-price', placeholder: '$ Min' });
    inputMinPrice.addListener('input', () => {
      properties.onMinPriceChange(inputMinPrice.value);
    });

    const inputMaxPrice = new InputNumber({ name: 'max-price', placeholder: '$ Max' });
    inputMaxPrice.addListener('input', () => {
      properties.onMaxPriceChange(inputMaxPrice.value);
    });

    const pricesContainer = div(
      { className: styles.priceRangeContainer },
      inputMinPrice.element,
      inputMaxPrice.element,
    );

    this.numberInputs.add(inputMinPrice).add(inputMaxPrice);

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
