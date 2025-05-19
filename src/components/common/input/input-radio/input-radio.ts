import { INPUT_TYPE } from '~/shared/constants/constants';
import { label, span } from '~/shared/create-element/tags';

import type { InputBaseProperties } from '../input-base';

import { InputBase } from '../input-base';
import styles from './input-radio.module.css';

export interface InputRadioProperties extends InputBaseProperties {
  label?: string;
}

export class InputRadio extends InputBase {
  public get checked(): boolean {
    return this.inputComponent.element.checked;
  }

  public constructor(properties: InputRadioProperties) {
    super(properties);

    this.inputComponent.setAttributes({ type: INPUT_TYPE.RADIO });

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
