import { INPUT_TYPE } from '~/shared/constants/constants';

import type { InputBaseProperties } from '../input-base';

import { InputBase } from '../input-base';

export interface InputTextProperties extends InputBaseProperties {
  listId?: string;
}

export class InputText extends InputBase {
  public get value(): string {
    return this.inputComponent.element.value;
  }

  public constructor(properties: InputTextProperties) {
    super(properties);

    this.inputComponent.setAttributes({ type: INPUT_TYPE.TEXT });

    if (properties.listId) {
      this.inputComponent.element.setAttribute('list', properties.listId);
    }
  }
}
