import resetIcon from '~/assets/icons/close.svg';
import { INPUT_TYPE } from '~/shared/constants/constants';
import { div } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';

import type { InputBaseProperties } from '../input-base';

import { InputBase } from '../input-base';
import styles from './input-number.module.css';

export class InputNumber extends InputBase {
  public get value(): string {
    return this.inputComponent.element.value;
  }

  private readonly resetIconSvg = createSvgIcon(
    resetIcon,
    [styles.resetIcon, styles.hidden].join(' '),
  );

  private readonly resetButton = div(
    {
      className: styles.resetButton,
      onClick: () => {
        this.inputComponent.element.value = '';
        this.resetIconSvg.classList.add(styles.hidden);
        this.inputComponent.element.focus();
      },
      signal: this.abortController.signal,
    },
    this.resetIconSvg,
  );

  public constructor(properties: InputBaseProperties) {
    super(properties);

    this.inputComponent.setAttributes({ type: INPUT_TYPE.NUMBER });

    this.inputComponent.addClassNames(styles.container, styles.input);

    this.append(this.resetButton);

    this.setupListeners();
  }

  public bindResetHandler(handler: VoidFunction): void {
    this.resetButton.addEventListener('click', handler, { signal: this.abortController.signal });
  }

  protected override setupListeners(): void {
    this.inputComponent.addListener('input', () => {
      if (this.inputComponent.element.value) {
        this.resetIconSvg.classList.remove(styles.hidden);
      } else {
        this.resetIconSvg.classList.add(styles.hidden);
      }
    });

    super.setupListeners();
  }
}
