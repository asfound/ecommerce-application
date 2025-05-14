import { INPUT_TYPE } from '~/shared/constants/constants';

import type { BaseInputProperties } from '../base-input';

import { BaseInput } from '../base-input';

export interface InputTextProperties extends BaseInputProperties {
  listId?: string;
}

export class InputText extends BaseInput {
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
