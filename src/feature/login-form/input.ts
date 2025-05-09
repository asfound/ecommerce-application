import type { ValidatorFunction } from '~/shared/form-validators/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { INPUT_TYPE } from '~/shared/constants/constants';
import { img } from '~/shared/create-element/tags';

import iconEyeHidden from '../../assets/icons/eye-hidden.svg';
import iconEyeVisible from '../../assets/icons/eye-visible.svg';
import styles from './input.module.css';

export interface InputProperties {
  enablePasswordToggle?: true;
  name?: string;
  placeholder?: string;
  type?: string;
  validators?: ValidatorFunction[];
}

export class Input extends BaseComponent {
  public get value(): string {
    return this.inputComponent.element.value;
  }

  private readonly errorMessageComponent = new BaseComponent({
    className: styles.errorMessage,
    tagName: 'div',
  });

  private readonly inputComponent = new BaseComponent<HTMLInputElement>({
    attributes: { autocomplete: 'off' },
    className: styles.input,
    tagName: 'input',
  });

  private readonly passwordToggleIcon = img({ className: styles.passwordToggleIcon });

  private readonly properties;

  private readonly validators: ValidatorFunction[] = [];

  public constructor(properties: InputProperties) {
    super({ className: styles.container, tagName: 'div' });

    this.properties = properties;

    this.inputComponent.element.name = this.properties.name ?? '';
    this.inputComponent.element.type = this.properties.type ?? 'text';
    this.inputComponent.element.placeholder = this.properties.placeholder ?? '';

    this.validators = properties.validators ?? [];

    if (properties.enablePasswordToggle) {
      this.passwordToggleIcon.src = iconEyeHidden;
      this.inputComponent.addClassNames(styles.paddingRight);
      this.append(this.passwordToggleIcon);
    }

    this.append(this.inputComponent, this.errorMessageComponent);

    this.setupListeners();
  }

  public clearErrorMessage(): void {
    this.errorMessageComponent.setTextContent('');

    this.inputComponent.removeClassNames(styles.invalid);

    this.inputComponent.addClassNames(styles.valid);
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessageComponent.setTextContent(errorMessage);

    this.inputComponent.addClassNames(styles.invalid);

    this.inputComponent.removeClassNames(styles.valid);
  }

  public validate(): boolean {
    for (const validator of this.validators) {
      const errorMessage = validator(this.inputComponent.element.value);

      if (errorMessage) {
        this.setErrorMessage(errorMessage);
        return false;
      }
    }

    this.clearErrorMessage();
    return true;
  }

  private setupListeners(): void {
    this.inputComponent.addListener('input', () => {
      this.validate();
    });

    this.passwordToggleIcon.addEventListener(
      'click',
      () => {
        const inputType = this.inputComponent.element.type;

        if (inputType === INPUT_TYPE.PASSWORD) {
          this.inputComponent.element.type = INPUT_TYPE.TEXT;
          this.passwordToggleIcon.src = iconEyeVisible;
        } else {
          this.inputComponent.element.type = INPUT_TYPE.PASSWORD;
          this.passwordToggleIcon.src = iconEyeHidden;
        }
      },
      {
        signal: this.abortController.signal,
      },
    );
  }
}
