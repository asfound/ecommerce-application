import { INPUT_TYPE } from '~/shared/constants/constants';

import type { InputBaseProperties } from '../input-base';

import { InputBase } from '../input-base';
import styles from './input-search.module.css';

export class InputSearch extends InputBase {
  public get value(): string {
    return this.inputComponent.element.value;
  }

  public constructor(properties: InputBaseProperties) {
    super(properties);

    this.inputComponent.addClassNames(styles.input);

    this.inputComponent.setAttributes({ type: INPUT_TYPE.SEARCH });
  }

  public override setAttributes(attributes: Partial<HTMLInputElement>): void {
    this.inputComponent.setAttributes(attributes);
  }
}
