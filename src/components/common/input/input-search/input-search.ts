import { INPUT_TYPE } from '~/shared/constants/constants';

import type { InputBaseProperties } from '../input-base';

import { InputBase } from '../input-base';

export class InputSearch extends InputBase {
  public get value(): string {
    return this.inputComponent.element.value;
  }

  public constructor(properties: InputBaseProperties) {
    super(properties);

    this.inputComponent.setAttributes({ type: INPUT_TYPE.SEARCH });
  }
}
