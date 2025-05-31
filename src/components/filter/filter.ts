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
  checked?: string[];
  onChange(checkedValues: CatalogState['weight'] | string[]): void;
  options: FilterOption[];
  title: string;
  type: 'checkboxes';
}

export interface FilterOption {
  label: string;
  value: boolean | string;
}

export interface FilterPriceRangeProperties {
  onMaxPriceChange(maxPrice: string): void;
  onMaxPriceReset(): void;
  onMinPriceChange(minPrice: string): void;
  onMinPriceReset(): void;
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

    this.destroyInputs();

    if (properties.type === 'price-range') {
      const priceRange = this.createPriceRangeFilter(properties);
      this.replaceChildren(this.summaryElement, priceRange);
      return;
    }

    const checkboxes = this.createCheckboxesFilter(properties);
    this.replaceChildren(this.summaryElement, checkboxes);
  }

  public override destroy(): void {
    this.destroyInputs();
    this.checkedValues.clear();
    super.destroy();
  }

  public hide(): void {
    this.addClassNames(styles.hidden);

    this.checkedValues.clear();
  }

  public resetCheckboxes(): void {
    for (const input of this.checkboxInputs) {
      input.setChecked(false);
    }
  }

  public resetInputs(): void {
    for (const input of this.numberInputs) {
      input.reset();
    }
  }

  public show(): void {
    this.removeClassNames(styles.hidden);
  }

  private createCheckboxesFilter(properties: FilterCheckboxesProperties): HTMLDivElement {
    const container = div(null);

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

      inputCheckbox.setChecked(properties.checked?.includes(option.value.toString()) ?? false);

      container.append(inputCheckbox.element);
    }

    return container;
  }

  private createPriceRangeFilter(properties: FilterPriceRangeProperties): HTMLDivElement {
    const inputMinPrice = new InputNumber({ name: 'min-price', placeholder: '$ Min' });

    inputMinPrice.addListener('input', () => {
      properties.onMinPriceChange(inputMinPrice.value);
    });

    inputMinPrice.bindResetHandler(() => {
      properties.onMinPriceReset();
    });

    const inputMaxPrice = new InputNumber({ name: 'max-price', placeholder: '$ Max' });

    inputMaxPrice.addListener('input', () => {
      properties.onMaxPriceChange(inputMaxPrice.value);
    });

    inputMaxPrice.bindResetHandler(() => {
      properties.onMaxPriceReset();
    });

    const pricesContainer = div(
      { className: styles.priceRangeContainer },
      inputMinPrice.element,
      inputMaxPrice.element,
    );

    this.numberInputs.add(inputMinPrice).add(inputMaxPrice);

    return pricesContainer;
  }

  private destroyInputs(): void {
    for (const input of this.checkboxInputs) input.destroy();
    this.checkboxInputs.clear();

    for (const input of this.numberInputs) input.destroy();
    this.numberInputs.clear();
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
