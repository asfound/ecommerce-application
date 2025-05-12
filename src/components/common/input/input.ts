import type { ValidatorFunction } from '~/shared/form-validators/types';

import iconEyeHidden from '~/assets/icons/eye-hidden.svg';
import iconEyeVisible from '~/assets/icons/eye-visible.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { INPUT_TYPE } from '~/shared/constants/constants';
import { img, label, span } from '~/shared/create-element/tags';

import styles from './input.module.css';

export interface InputProperties {
  enablePasswordToggle?: true;
  label?: string;
  listId?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  validators?: ValidatorFunction[];
}

export class Input extends BaseComponent {
  // TODO: use child classes for different types of inputs?
  public get checked(): boolean {
    return this.inputComponent.element.type === 'checkbox'
      ? this.inputComponent.element.checked
      : false;
  }

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

    if (this.properties.type === 'date') {
      this.inputComponent.element.type = 'text';
      this.inputComponent.element.addEventListener(
        'focus',
        () => {
          this.inputComponent.element.type = 'date';
        },
        { signal: this.abortController.signal },
      );
    } else {
      this.inputComponent.element.type = this.properties.type ?? 'text';
    }

    this.inputComponent.element.placeholder = this.properties.placeholder ?? '';

    this.validators = properties.validators ?? [];

    if (properties.enablePasswordToggle) {
      this.passwordToggleIcon.src = iconEyeHidden;
      this.inputComponent.addClassNames(styles.paddingRight);
      this.append(this.passwordToggleIcon);
    }

    //TODO: find out why `this.inputComponent.element.list` doesn't work
    if (properties.listId) {
      this.inputComponent.element.setAttribute('list', properties.listId);
    }

    if (properties.label) {
      this.append(
        label({ className: styles.label }, this.inputComponent.element, span({}, properties.label)),
      );
      this.inputComponent.addClassNames(styles.checkbox);
    } else {
      this.append(this.inputComponent, this.errorMessageComponent);
    }

    this.setupListeners();
  }

  public override addListener(
    type: keyof GlobalEventHandlersEventMap,
    listener: EventListener,
  ): void {
    this.inputComponent.addListener(type, listener);
  }

  public addValidator(validator: ValidatorFunction): void {
    this.validators.push(validator);
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
          this.inputComponent.element.focus();
        } else {
          this.inputComponent.element.type = INPUT_TYPE.PASSWORD;
          this.passwordToggleIcon.src = iconEyeHidden;
          this.inputComponent.element.focus();
        }
      },
      {
        signal: this.abortController.signal,
      },
    );
  }
}
