import { BaseComponent } from '~/components/base-component/base-component';

import styles from './slider-bestsellers.module.css';

export class SliderBestsellersView extends BaseComponent {
  public constructor() {
    super({ className: ['SLIDER-BESTSELLER', styles.slider], tagName: 'div' });
  }
}
