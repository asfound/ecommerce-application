import { INPUT_TYPE } from '~/shared/constants/constants';
import { label, span } from '~/shared/create-element/tags';

import type { BaseInputProperties } from '../base-input';

import { BaseInput } from '../base-input';
import styles from './input-checkbox.module.css';

export interface InputCheckboxProperties extends BaseInputProperties {
  label?: string;
}

export class InputCheckbox extends BaseInput {
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
}
