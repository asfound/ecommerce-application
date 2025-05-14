import iconEyeHidden from '~/assets/icons/eye-hidden.svg';
import iconEyeVisible from '~/assets/icons/eye-visible.svg';
import { INPUT_TYPE } from '~/shared/constants/constants';
import { div } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';

import type { BaseInputProperties } from '../base-input';

import { BaseInput } from '../base-input';
import styles from './input-password.module.css';

export class InputPassword extends BaseInput {
  public get value(): string {
    return this.inputComponent.element.value;
  }

  private readonly toggleIconContainer = div(null, createSvgIcon(iconEyeHidden, styles.icon));

  public constructor(properties: BaseInputProperties) {
    super(properties);

    this.inputComponent.setAttributes({ type: INPUT_TYPE.PASSWORD });
    this.inputComponent.addClassNames(styles.paddingRight);
    this.append(this.toggleIconContainer);

    this.toggleIconContainer.addEventListener(
      'click',
      () => {
        const inputType = this.inputComponent.element.type;

        if (inputType === INPUT_TYPE.PASSWORD) {
          this.inputComponent.element.type = INPUT_TYPE.TEXT;
          this.toggleIconContainer.replaceChildren(createSvgIcon(iconEyeVisible, styles.icon));
          this.inputComponent.element.focus();
        } else {
          this.inputComponent.element.type = INPUT_TYPE.PASSWORD;
          this.toggleIconContainer.replaceChildren(createSvgIcon(iconEyeHidden, styles.icon));
          this.inputComponent.element.focus();
        }
      },
      {
        signal: this.abortController.signal,
      },
    );
  }
}
