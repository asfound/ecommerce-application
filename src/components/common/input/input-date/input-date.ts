import { INPUT_TYPE } from '~/shared/constants/constants';

import type { InputBaseProperties } from '../input-base';

import { InputBase } from '../input-base';
import styles from './input-date.module.css';

export class InputDate extends InputBase {
  public get value(): string {
    return this.inputComponent.element.value;
  }

  public constructor(properties: InputBaseProperties) {
    super(properties);

    this.inputComponent.addClassNames(styles.input);
    this.inputComponent.setAttributes({ type: INPUT_TYPE.TEXT });

    this.inputComponent.addListener('focus', () => {
      this.inputComponent.setAttributes({ type: INPUT_TYPE.DATE });
    });

    this.inputComponent.addListener('blur', () => {
      this.inputComponent.setAttributes({ type: INPUT_TYPE.TEXT });
    });
  }
}
