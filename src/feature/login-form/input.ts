import { BaseComponent } from '~/components/base-component/base-component';

import styles from './input.module.css';

export interface InputProperties {
  name?: string;
  placeholder?: string;
  type?: string;
  validators?: ValidatorFunction[];
}

export type ValidatorFunction = (value: string) => null | string;

export class Input extends BaseComponent {
  public get value(): string {
    return this.inputComponent.element.value;
  }

  private readonly errorMessageComponent = new BaseComponent({
    className: styles.errorMessage,
    tagName: 'div',
  });

  private readonly inputComponent = new BaseComponent<HTMLInputElement>({
    className: styles.input,
    tagName: 'input',
  });

  private readonly properties;

  private readonly validators: ValidatorFunction[] = [];

  public constructor(properties: InputProperties) {
    super({ className: styles.container, tagName: 'div' });

    this.properties = properties;

    this.inputComponent.element.name = this.properties.name ?? '';
    this.inputComponent.element.type = this.properties.type ?? 'text';
    this.inputComponent.element.placeholder = this.properties.placeholder ?? '';

    this.validators = properties.validators ?? [];

    this.inputComponent.addListener('input', () => {
      this.validate();
    });

    this.append(this.inputComponent, this.errorMessageComponent);
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
}
