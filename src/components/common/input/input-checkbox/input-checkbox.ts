import { INPUT_TYPE } from '~/shared/constants/constants';
import { label, span } from '~/shared/create-element/tags';

import type { InputBaseProperties } from '../input-base';

import { InputBase } from '../input-base';
import styles from './input-checkbox.module.css';

export interface InputCheckboxProperties extends InputBaseProperties {
  label?: string;
}

export class InputCheckbox extends InputBase {
  public get checked(): boolean {
    return this.inputComponent.element.checked;
  }

  public constructor(properties: InputCheckboxProperties) {
    super(properties);

    this.inputComponent.setAttributes({ type: INPUT_TYPE.CHECKBOX });

    if (properties.label) {
      this.append(
        label(
          { className: styles.label },
          this.inputComponent.element,
          span(null, properties.label),
        ),
      );

      this.inputComponent.addClassNames(styles.checkbox);
    }
  }

  public setChecked(checked: boolean): void {
    this.inputComponent.element.checked = checked;
  }
}
