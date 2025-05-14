import { INPUT_TYPE } from '~/shared/constants/constants';

import type { BaseInputProperties } from '../base-input';

import { BaseInput } from '../base-input';
import styles from './input-date.module.css';

export class InputDate extends BaseInput {
  public get value(): string {
    return this.inputComponent.element.value;
  }

  public constructor(properties: BaseInputProperties) {
    super(properties);

    this.inputComponent.addClassNames(styles.input);
    this.inputComponent.setAttributes({ type: INPUT_TYPE.TEXT });

    this.inputComponent.addListener('focus', () => {
      this.inputComponent.setAttributes({ type: INPUT_TYPE.DATE });
    });
  }
}
