import type { ValidatorFunction } from '~/shared/form-validators/types';

import { BaseComponent } from '~/components/base-component/base-component';

import styles from './base-input.module.css';

export interface InputBaseProperties {
  name?: string;
  placeholder?: string;
  validators?: ValidatorFunction[];
}

export abstract class InputBase extends BaseComponent {
  protected readonly errorMessageComponent = new BaseComponent({
    className: styles.errorMessage,
    tagName: 'div',
  });

  protected readonly inputComponent = new BaseComponent<HTMLInputElement>({
    attributes: { autocomplete: 'off' },
    className: styles.input,
    tagName: 'input',
  });

  private readonly properties: InputBaseProperties;

  private readonly validators: ValidatorFunction[] = [];

  public constructor(properties: InputBaseProperties) {
    super({ className: styles.container, tagName: 'div' });

    this.properties = properties;

    this.validators = properties.validators ?? [];

    this.inputComponent.setAttributes({
      name: this.properties.name,
      placeholder: this.properties.placeholder,
    });

    this.append(this.inputComponent, this.errorMessageComponent);

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

  public clear(): void {
    this.inputComponent.element.value = '';
  }

  public clearErrorMessage(): void {
    this.errorMessageComponent.setTextContent('');
    this.inputComponent.removeClassNames(styles.invalid);
    this.inputComponent.addClassNames(styles.valid);
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessageComponent.setTextContent(errorMessage);
    this.inputComponent.removeClassNames(styles.valid);
    this.inputComponent.addClassNames(styles.invalid);
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

  protected setupListeners(): void {
    this.inputComponent.addListener('input', () => {
      this.validate();
    });
  }
}
