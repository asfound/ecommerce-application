import { BaseComponent } from '~/components/base-component/base-component';
import { HeroBanner } from '~/feature/hero-banner/hero-banner';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { div } from '~/shared/create-element/tags';

import styles from './main-page.module.css';

export class MainPage extends BaseComponent {
  public constructor() {
    super({ tagName: 'main' });

    const heroBanner = new HeroBanner();
    const TEMP = div({ className: [CSS_CLASS_NAME.WRAPPER, styles.temp] }, TO_REVIEWER);

    this.append(heroBanner, TEMP);
  }
}

//TODO: Remove after 3d sprint and don't forget css styles file!
const TO_REVIEWER =
  'Dear reviewer, \n\n реализацию требований к товарам со скидкой (RSS-ECOMM-3_02) можно проверить в подкатегории "Blend" категории "Dark Roast". Эта категория также содержит товары с только одним изображением, что позволяет проверить требования к слайдеру при наличии только одного изображения у продукта (RSS-ECOMM-3_10).\n\nСпасибо за уделённое время!';
